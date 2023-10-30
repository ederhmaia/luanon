from seledroid.webdriver.common import utils
from seledroid.webdriver.common.by import By
from seledroid.webdriver.common.exception import NoSuchElementException, UnexpectedTagNameException

class Select:
	
	def __init__(self, element):
		
		if element.get_attribute("tagName") != "SELECT":
			utils.exception(UnexpectedTagNameException, "Select only works on <select> elements, not on <%s>" %element.get_attribute("tagName"))
		self._element = element
		self.is_multiple = self._element.get_attribute("multiple")

	@property
	def options(self):
		return self._element.find_elements(By.TAG_NAME, "option")
	
	@property
	def all_selected_options(self):
		ret = []
		for otp in self.options:
			if otp.get_attribute("selected"):
				ret.append(otp)
		return ret
	
	@property
	def first_selected_option(self):
		for otp in self.options:
			if otp.get_attribute("selected"):
				return otp
		utils.exception(NoSuchElementException, "No options are selected")
	
	def select_by_value(self, value):
		css = "option[value='%s']" %value
		opts = self._element.find_elements(By.CSS_SELECTOR, css)
		matched = False
		for opt in opts:
			self._set_selected(opt)
			if not self.is_multiple:
				return
			matched = True
		if not matched:
			utils.exception(NoSuchElementException, "Cannot locate option with value: %s" %value)
	
	def select_by_index(self, index):
		for opt in self.options:
			if opt.get_attribute("index") == index:
				self._set_selected(opt)
				return
		utils.exception(NoSuchElementException, "Could not locate element with index %d" %index)
	
	def select_by_visible_text(self, text):
		matched = False
		for opt in self.options:
			if opt.inner_html == text:
				self._set_selected(opt)
				if not self.is_multiple:
					return
				matched = True
		if not matched:
			utils.exception(NoSuchElementException, "Could not locate element with visible text: %s" %text)
	
	def deselect_all(self):
		if not self.is_multiple:
			utils.exception(NotImplementedError, "You may only deselect all options of a multi-select")
		for opt in self.options:
			self._unset_selected(opt)
	
	def deselect_by_value(self, value):
		if not self.is_multiple:
			utils.exception(NotImplementedError, "You may only deselect options of a multi-select")
		matched = False
		css = "option[value='%s']" %value
		opts = self._element.find_elements(By.CSS_SELECTOR, css)
		for opt in opts:
			self._unset_selected(opt)
			matched = True
		if not matched:
			utils.exception(NoSuchElementException, "Could not locate element with value: %s" %value)
	
	def deselect_by_index(self, index):
		if not self.is_multiple:
			utils.exception(NotImplementedError, "You may only deselect options of a multi-select")
		for opt in self.options:
			if opt.get_attribute("index") == index:
				self._unset_selected(opt)
				return
		utils.exception(NoSuchElementException, "Could not locate element with index %d" %index)

	def deselect_by_visible_text(self, text):
		if not self.is_multiple:
			utils.exception(NotImplementedError, "You may only deselect options of a multi-select")
		matched = False
		for opt in self.options:
			if opt.inner_html == text:
				self._set_selected(opt)
				if not self.is_multiple:
					return
				matched = True
		if not matched:
			utils.exception(NoSuchElementException, "Could not locate element with visible text: %s" %text)
	
	def _set_selected(self, option):
		if not option.get_attribute("selected"):
			option.set_attribute("selected", "true")

	def _unset_selected(self, option):
		if option.get_attribute("selected"):
			option.set_attribute("selected", "false")