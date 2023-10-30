import html
import base64

from seledroid.webdriver.common import utils
from seledroid.webdriver.common.by import By
from seledroid.webdriver.remote.command import Command
from seledroid.webdriver.common.exception import NoSuchElementException, InvalidElementStateException

class WebElement:
	
	def __init__(self, execute, element):
		self.execute = execute
		self.element = element
		self.shut_up = False
	
	def __repr__(self):
		return "WebElement(%s)" %self.element.result
	
	#----------function----------#
	
	def click(self):
		return self.get_attribute("click()") # get return of click function and also call it
	
	def click_java(self):
		position = "%f %f" %(self.position)
		return self.execute(Command.CLICK_JAVA, position=position).result
	
	def clear(self):
		return self.set_attribute("value", "")
	
	def focus(self):
		self.get_attribute("focus()")

	def find_element_by_id(self, id_):
		return self.find_element(by=By.ID, value=id_)
		
	def find_element_by_name(self, name):
		return self.find_element(by=By.NAME, value=name)
	
	def find_element_by_xpath(self, xpath):
		return self.find_element(by=By.XPATH, value=xpath)
	
	def find_element_by_link_text(self, link_text):
		return self.find_element(by=By.LINK_TEXT, value=link_text)
	
	def find_element_by_partial_link_text(self, partial_link_text):
		return self.find_element(by=By.PARTIAL_LINK_TEXT, value=partial_link_text)
	
	def find_element_by_tag_name(self, tag_name):
		return self.find_element(by=By.TAG_NAME, value=tag_name)
	
	def find_element_by_class_name(self, class_name):
		return self.find_element(by=By.CLASS_NAME, value=class_name)
	
	def find_element_by_css_selector(self, css_selector):
		return self.find_element(by=By.CSS_SELECTOR, value=css_selector)
	
	def find_elements_by_id(self, id_):
		return self.find_elements(by=By.ID, value=id_)
		
	def find_elements_by_name(self, name):
		return self.find_elements(by=By.NAME, value=name)
	
	def find_elements_by_xpath(self, xpath):
		return self.find_elements(by=By.XPATH, value=xpath)
	
	def find_elements_by_link_text(self, link_text):
		return self.find_elements(by=By.LINK_TEXT, value=link_text)
	
	def find_elements_by_partial_link_text(self, partial_link_text):
		return self.find_elements(by=By.PARTIAL_LINK_TEXT, value=partial_link_text)
	
	def find_elements_by_tag_name(self, tag_name):
		return self.find_elements(by=By.TAG_NAME, value=tag_name)
	
	def find_elements_by_class_name(self, class_name):
		return self.find_elements(by=By.CLASS_NAME, value=class_name)
	
	def find_elements_by_css_selector(self, css_selector):
		return self.find_elements(by=By.CSS_SELECTOR, value=css_selector)
	
	def find_element(self, by, value, command=""):
		if command:
			element = self.execute(Command.FIND_ELEMENT, request=command, path=self.element.path, by=by, value=value)
		else:
			element = self.execute(Command.FIND_ELEMENT, path=self.element.path, by=by, value=value)
		
		if not element.result:
			if not self.shut_up:
				utils.exception(NoSuchElementException, "No element match with by=By.%s value=%s" %(by, value))
		return WebElement(self.execute, element)
	
	def find_elements(self, by, value):
		elements = self.execute(Command.FIND_ELEMENTS, path=self.element.path, by=by, value=value)
		result = []
		for element in elements.result:
			data = utils.DictMap(elements) # copy to new dict
			data.command = Command.FIND_ELEMENT
			data.path = "%s[%s]" %(elements.path, element[0])
			data.result = element[1]
			result.append(WebElement(self.execute, data))
		return result
	
	def get_attribute(self, attribute_name):
		if attribute_name == "class":
			attribute_name = "className"
		return self.execute(self.element.command, request=Command.GET_ATTRIBUTE, attribute_name=attribute_name, path=self.element.path, by=self.element.by, value=self.element.value).result
	
	@property
	def height(self):
		return self.get_attribute("getBoundingClientRect().height")
		
	@property
	def width(self):
		return self.get_attribute("getBoundingClientRect().width")
	
	@property
	def inner_html(self):
		return self.get_attribute("innerHTML")
	
	@inner_html.setter
	def inner_html(self, text):
		return self.set_attribute("innerHTML", text)
	
	@property
	def outer_html(self):
		return self.get_attribute("outerHTML")
	
	@outer_html.setter
	def outer_html(self, text):
		return self.set_attribute("outerHTML", text)
	
	@property
	def position(self):
		x = self.get_attribute("getBoundingClientRect().x")
		y = self.get_attribute("getBoundingClientRect().y")
		return x, y
	
	@property
	def disabled(self):
		return self.get_attribute("disabled")
	
	@disabled.setter
	def disabled(self, value):
		if value:
			return self.set_attribute("disabled", "true", is_string=False)
		return self.remove_attribute("disabled")
	
	@property
	def is_displayed(self):
		if self.height > 0 and self.width > 0:
			return True
		return False
	
	@property
	def read_only(self):
		return self.get_attribute("readOnly")
	
	def remove_attribute(self, attribute_name):
		return self.execute(self.element.command, request=Command.REMOVE_ATTRIBUTE, attribute_name=attribute_name, path=self.element.path, by=self.element.by, value=self.element.value).result
	
	def send_key(self, key):
		if self.read_only:
			utils.exception(InvalidElementStateException, "Element is read-only: %s" %self.element.result)
		self.focus()
		return self.execute(self.element.command, request=Command.SEND_KEY, key=key, path=self.element.path, by=self.element.by, value=self.element.value).result
	
	def send_text(self, text):
		if self.read_only:
			utils.exception(InvalidElementStateException, "Element is read-only: %s" %self.element.result)
		self.focus()
		return self.execute(self.element.command, request=Command.SEND_TEXT, text=text, path=self.element.path, by=self.element.by, value=self.element.value).result
	
	def set_attribute(self, attribute_name, attribute_value, is_string=True):
		is_string = "true" if is_string else "false"
		return self.execute(self.element.command, request=Command.SET_ATTRIBUTE, attribute_name=attribute_name, attribute_value=attribute_value, is_string=is_string, path=self.element.path, by=self.element.by, value=self.element.value).result
	
	@property
	def value(self):
		return self.get_attribute("value")
	
	@value.setter
	def value(self, value):
		return self.set_attribute("value", value)