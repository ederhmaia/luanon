import numpy as np

import core
import image_exceptions

from image_types import ImageType


class Image:
    image_bytes: bytes
    image_type: str
    _image_core: core.ImageCore
    image_data: dict[str, list[dict[str, int | bytes]]]
    headers: dict[str, int]

    _angle: int
    _pixel: np.array

    def __init__(self, image_bytes_or_path: bytes | str) -> None:
        self.image_bytes: bytes = (
            image_bytes_or_path
            if isinstance(image_bytes_or_path, bytes)
            else open(image_bytes_or_path, "rb").read()
        )

        # Each time update self.image_bytes, must recall this function
        self._init()

    def _init(self) -> None:
        self.image_type, self._image_core = self._check_signature()
        self.image_data = self._image_core.get_image_data(self.image_bytes)
        self.headers = self._image_core.get_headers(self.image_data)

        self._angle = 0
        # self._pixel = self._image_core.get_pixels(self.image_data, self.headers)

    def _check_signature(self) -> tuple[str, core.ImageCore]:
        image_types = {
            ImageType.PNG: {"signature": b"\x89PNG\r\n\x1a\n", "core": core.PNG},
            ImageType.JPEG: {"signature": b"\xff\xd8\xff", "core": core.JPEG},
        }

        for extension, data in image_types.items():
            if self.image_bytes.startswith(data["signature"]):
                return extension, data["core"]

        raise image_exceptions.ImageTypeNotSupported()

    @property
    def width(self) -> int:
        return self.headers["width"]

    @property
    def height(self) -> int:
        return self.headers["height"]

    @property
    def bit_depth(self) -> int:
        return self.headers["bit_depth"]

    @property
    def color_type(self) -> int:
        return self.headers["color_type"]

    @property
    def channels(self) -> int:
        return self.headers["channels"]

    @property
    def angle(self) -> int:
        return self._angle

    @property
    def pixels(self) -> np.array:
        return self._pixel

    def save(self, filename: str) -> None:
        pass
