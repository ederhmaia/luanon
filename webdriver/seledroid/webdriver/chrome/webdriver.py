import os
import json
import socket
import time
import html
import base64

from seledroid.webdriver.common import utils
from seledroid.webdriver.common.by import By
from seledroid.webdriver.remote.command import Command
from seledroid.webdriver.remote.web_element import WebElement
from seledroid.webdriver.common.exception import NoSuchElementException, ApplicationClosed
from seledroid.webdriver.remote.remote_connection import RemoteConnection

class WebDriver(RemoteConnection):
	
	def __init__(self, gui=True, pip_mode=False, lang="en", debug=False, accept_time_out=60, recv_time_out=60*60):
		super(WebDriver, self).__init__(accept_time_out=accept_time_out)
		self.encode_req = lambda data, encode=True: ("%s\n" %utils.DictMap(data)).encode() if encode else "%s\n" %data
		self.shut_up = False
		data = {
			"command": Command.INIT,
			"pip_mode": pip_mode,
			"lang": lang,
			"debug": debug,
			"host": self.host,
			"port": self.port,
			"state": gui
		}
		if "HOME" in os.environ and any(platform in os.environ["HOME"] for platform in ["termux", "pydroid3"]):
			if "pydroid3" in os.environ["HOME"]:
				data = {
					"method": "launch-intent",
					"action": "android.intent.action.VIEW",
					"data": "webdriver://com.luanon.seledroid.chromium/?data=" + base64.b64encode(json.dumps(data).encode()).decode(),
				}
				with socket.socket(socket.AF_UNIX, socket.SOCK_STREAM) as sock:
					sock.connect(os.environ["PYDROID_RPC"])
					sock.sendall((json.dumps(data) + "\n").encode())
			if "termux" in os.environ["HOME"]:
				data = self.encode_req(data, False)
				os.system(self.command("start", "com.luanon.seledroid.chromium/.SplashActivity", data))
		else:
			raise Exception("Only supports termux and pydroid3 at this moment")

		try:
			self.client_accept = self.accept()[0]
			self.client_accept.settimeout(recv_time_out)
		except TimeoutError:
			utils.exception(TimeoutError, "Could not connect chrome webdriver")
		self.get("https://google.com")
	
	def __enter__(self):
		return self
	
	def __exit__(self, exc_type, exc_val, exc_tb):
		self.close()
	
	#----------utils----------#
	
	def command(self, action, name, data=""):
		return "am %s -n %s -d '%s' > /dev/null" %(action, name, data)
	
	def check_result(self, commnad, recv):
		data = utils.DictMap(json.loads(recv), "no_encode_again")
		if commnad == data.command:
			return data
	
	def execute(self, command, **kwargs):
		data = self.encode_req({
			"command": command,
			**kwargs
		})
		self.client_accept.send(data)
		recv = self.recv_all()
		return self.check_result(command, recv)
	
	def recv_all(self):
		"""
			byte or string faster?
			byte faster 0.2 - 1 second
		"""
		result = b""
		length = b""
		while True:
			try:
				data = self.client_accept.recv(1)
			except Exception:
				utils.exception(TimeoutError, "Time out to receive data")
			if not data.decode().isdigit():
				result += data
				break
			length += data
		try:
			length = int(length.decode())
		except Exception:
			utils.exception(ApplicationClosed, "Please close me by driver.close() conmand")
		while len(result) < length:
			result += self.client_accept.recv(self.max_recv)
		return utils.decode_data(result)
		
	#----------function----------#
	
	def close(self):
		return self.execute(Command.CLOSE).result
	
	@property
	def current_url(self):
		return self.execute(Command.CURRENT_URL).result
	
	def clear_cookie(self, cookie_name, url=""):
		return self.execute(Command.CLEAR_COOKIE, url=url, cookie_name=cookie_name).result
	
	def clear_cookies(self, url=""):
		return self.execute(Command.CLEAR_COOKIES, url=url).result
	
	def click_java(self, x, y):
		position = "%f %f" %(x, y)
		return self.execute(Command.CLICK_JAVA, position=position).result
	
	def clear_local_storage(self):
		return self.execute(Command.CLEAR_LOCAL_STORAGE).result
	
	def clear_session_storage(self):
		return self.execute(Command.CLEAR_SESSION_STORAGE).result
	
	def delete_all_cookie(self):
		return self.execute(Command.DELETE_ALL_COOKIE).result
	
	def execute_script(self, script):
		if not self.current_url: # need web loaded to execute script
			return
		return self.execute(Command.EXECUTE_SCRIPT, script=script).result
	
	def find_element_by_id(self, id_):
		return self.find_element(by=By.ID, value=id_)
	
	def find_element_by_xpath(self, xpath):
		return self.find_element(by=By.XPATH, value=xpath)
	
	def find_element_by_link_text(self, link_text):
		return self.find_element(by=By.LINK_TEXT, value=link_text)
	
	def find_element_by_partial_link_text(self, partial_link_text):
		return self.find_element(by=By.PARTIAL_LINK_TEXT, value=partial_link_text)
		
	def find_element_by_name(self, name):
		return self.find_element(by=By.NAME, value=name)
	
	def find_element_by_tag_name(self, tag_name):
		return self.find_element(by=By.TAG_NAME, value=tag_name)
	
	def find_element_by_class_name(self, class_name):
		return self.find_element(by=By.CLASS_NAME, value=class_name)
	
	def find_element_by_css_selector(self, css_selector):
		return self.find_element(by=By.CSS_SELECTOR, value=css_selector)
	
	def find_elements_by_id(self, id_):
		return self.find_elements(by=By.ID, value=id_)
	
	def find_elements_by_xpath(self, xpath):
		return self.find_elements(by=By.XPATH, value=xpath)
	
	def find_elements_by_link_text(self, link_text):
		return self.find_elements(by=By.LINK_TEXT, value=link_text)
	
	def find_elements_by_partial_link_text(self, partial_link_text):
		return self.find_elements(by=By.PARTIAL_LINK_TEXT, value=partial_link_text)
	
	def find_elements_by_name(self, name):
		return self.find_elements(by=By.NAME, value=name)
	
	def find_elements_by_tag_name(self, tag_name):
		return self.find_elements(by=By.TAG_NAME, value=tag_name)
	
	def find_elements_by_class_name(self, class_name):
		return self.find_elements(by=By.CLASS_NAME, value=class_name)
	
	def find_elements_by_css_selector(self, css_selector):
		return self.find_elements(by=By.CSS_SELECTOR, value=css_selector)
	
	def find_element(self, by, value, command=""):
		if command:
			element = self.execute(Command.FIND_ELEMENT, request=command, by=by, value=value)
		else:
			element = self.execute(Command.FIND_ELEMENT, by=by, value=value)
		if not element.result:
			if not self.shut_up:
				utils.exception(NoSuchElementException, "No element match with by=By.%s value=%s" %(by, value))
		return WebElement(self.execute, element)
	
	def find_elements(self, by, value):
		elements = self.execute(Command.FIND_ELEMENTS, by=by, value=value)
		result = []
		for element in elements.result:
			data = utils.DictMap(elements) # copy
			data.command = Command.FIND_ELEMENT
			data.path = "%s[%s]" %(elements.path, element[0])
			data.result = element[1]
			result.append(WebElement(self.execute, data))
		return result
	
	def get(self, url):
		return self.execute(Command.GET, url=url).result
	
	def get_cookie(self, cookie_name, url=""):
		return self.execute(Command.GET_COOKIE, url=url, cookie_name=cookie_name).result
	
	def get_cookies(self, url=""):
		return self.execute(Command.GET_COOKIES, url=url).result
	
	def get_local_storage(self):
		"""break utils.DictMap because its risk"""
		result = dict(self.execute(Command.GET_LOCAL_STORAGE).result) # convert to dict because if there is value like .keys so can't use .keys()
		return dict(zip(result.keys(), result.values()))
	
	def get_session_storage(self):
		"""break utils.DictMap because its risk"""
		result = dict(self.execute(Command.GET_SESSION_STORAGE).result) # convert to dict because if there is value like .keys so can't use .keys()
		return dict(zip(result.keys(), result.values()))
	
	def get_recaptcha_v3_token(self, action=""):
		site_key = ""
		try:
			site_key = self.find_element(By.CSS_SELECTOR, "script[src*=\"https://www.google.com/recaptcha/api.js?render=\"]")
		except Exception:
			return None
		site_key = site_key.get_attribute("src").replace("https://www.google.com/recaptcha/api.js?render=", "")
		return self.execute(Command.GET_RECAPTCHA_V3_TOKEN, site_key=site_key, action=action).result
	
	@property
	def headers(self):
		return self.execute(Command.GET_HEADERS).result
	
	@headers.setter
	def headers(self, headers):
		headers = {key.title(): value for key, value in headers.items()}
		return self.execute(Command.SET_HEADERS, headers=json.dumps(headers)).result
	
	def override_js_function(self, script):
		return self.execute(Command.OVERRIDE_JS_FUNCTION, script=script).result
	
	@property
	def page_source(self):
		page_source = self.execute(Command.PAGE_SOURCE).result
		return page_source
	
	def swipe(self, xStart, yStart, xEnd, yEnd, speed=1):
		position = "%f %f %f %f" %(xStart, yStart, xEnd, yEnd)
		return self.execute(Command.SWIPE, position=position, speed=speed).result
	
	def swipe_down(self):
		return self.execute(Command.SWIPE_DOWN).result
	
	def swipe_up(self):
		return self.execute(Command.SWIPE_UP).result
	
	def set_cookie(self, cookie_name, value, url=""):
		return self.execute(Command.SET_COOKIE, url=url, cookie_name=cookie_name, value=value).result
	
	def set_proxy(self, host, port):
		proxy = "%s %s" %(host, port)
		return  self.execute(Command.SET_PROXY, proxy=proxy).result
	
	def scroll_to(self, x, y):
		position = "%d %d" %(x, y)
		return self.execute(Command.SCROLL_TO, position=position).result
	
	def set_local_storage(self, key, value, is_string=True):
		is_string = "true" if is_string else "false"
		return self.execute(Command.SET_LOCAL_STORAGE, key=key, value=value, is_string=is_string).result
	
	def set_session_storage(self, key, value, is_string=True):
		is_string = "true" if is_string else "false"
		return self.execute(Command.SET_SESSION_STORAGE, key=key, value=value, is_string=is_string).result
	
	@property
	def user_agent(self):
		return self.execute(Command.GET_USER_AGENT).result
	
	@user_agent.setter
	def user_agent(self, user_agent):
		return  self.execute(Command.SET_USER_AGENT, user_agent=user_agent).result
		
	@property
	def title(self):
		return self.execute(Command.TITLE).result
	
	def wait(self, delay):
		return time.sleep(delay)
