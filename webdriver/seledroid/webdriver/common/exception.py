class WebDriverException(Exception):
	pass

class ApplicationClosed(WebDriverException):
	pass

class NoSuchElementException(WebDriverException):
	pass

class InvalidElementStateException(WebDriverException):
	pass

class UnexpectedTagNameException(WebDriverException):
	pass