import numpy as np


class ImageCoreUnknownFilterType(Exception):
    """
    Exception class.
    """

    def __init__(self, filter_type: int) -> None:
        self.filter_type = filter_type

    def __str__(self) -> str:
        return f"Unknown filter type '{self.filter_type}' when decode image data."


class ImageCoreUnknownColorType(Exception):
    """
    Exception class.
    """

    def __init__(self, color_type: int) -> None:
        self.color_type = color_type

    def __str__(self) -> str:
        return f"Unknown color type '{self.color_type}' when decode image data." \
               "Image color type must be one of 0, 2, 3, 4, 6"


class ImageCore:
    """
    This class is used to detect image core types such as PNG, JPEG, etc.
    """

    @staticmethod
    def get_image_data(image_bytes: bytes) -> dict[str, list[dict[str, int | bytes]]]:
        """
        This function uses a for loop to read image chunks.

        :param image_bytes: Bytes of the image.
        :return: Dictionary of all chunk data.
        """

    @staticmethod
    def get_headers(image_data: dict[str, list[dict[str, int | bytes]]]) -> dict[str, int]:
        """
        This function uses struct to decode image headers.

        :param image_data: Dictionary data of the image.
        :return: Dictionary with 5 keys - width, height, bit_depth, color_type, channels.
        """

    @staticmethod
    def get_pixels(image_data: dict[str, list[dict[str, int | bytes]]], headers: dict[str, int]) -> np.array:
        """
        This function extracts RGB pixel data from the image data.

        :param image_data: Dictionary data of the image.
        :param headers: Dictionary with image header information.
        :return: List of RGB pixel data as nested lists.
        """
