from seledroid.webdriver.remote.web_element import WebElement


def presence_of_element_located(locator):
	def _predicate(driver, locator, command):
		driver.shut_up = True
		locator = driver.find_element(*locator, command)
		driver.shut_up = False
		if not isinstance(locator, WebElement):
			return False
		else:
			if locator.element.result == True:
				return True
			else:
				return locator
	return lambda driver, command: _predicate(driver, locator, command)

def visibility_of_element_located(locator):
	def _predicate(driver, locator, command):
		driver.shut_up = True
		locator = driver.find_element(*locator, command)
		driver.shut_up = False
		if not isinstance(locator, WebElement):
			return False
		else:
			if locator.element.result == True:
				return True
			elif locator.is_displayed == True:
				return locator
			else:
				return False
	return lambda driver, command: _predicate(driver, locator, command)

def invisibility_of_element_located(locator):
	def _predicate(driver, locator, command):
		driver.shut_up = True
		locator = driver.find_element(*locator, command)
		driver.shut_up = False
		if not isinstance(locator, WebElement):
			return False
		else:
			if locator.element.result == True:
				return True
			elif locator.is_displayed == False:
				return locator
			else:
				return False
	return lambda driver, command: _predicate(driver, locator, command)

def element_to_be_clickable(locator):
	def _predicate(driver, locator, command):
		driver.shut_up = True
		if not isinstance(locator, WebElement):
			locator = driver.find_element(*locator, command)
		driver.shut_up = False
		if not isinstance(locator, WebElement):
			return False
		else:
			if locator.element.result == True:
				return True
			elif locator.is_displayed == True and locator.disabled == False:
				return locator
			else:
				return False
	return lambda driver, command: _predicate(driver, locator, command)