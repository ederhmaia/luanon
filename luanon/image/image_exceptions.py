class ImageTypeNotSupported(Exception):

    def __str__(self) -> str:
        return "This image type is not supported now."
