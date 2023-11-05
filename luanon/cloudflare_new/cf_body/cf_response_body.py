"""
    Tác giả: GnU
    Ngày tạo: 11/05/2023
    ©2023 LuaNonTeam
"""

import base64

from typing import override
from dataclasses import dataclass

from .cf_base_body import CfBaseBody


@dataclass
class CfResponseBody(CfBaseBody):
    value: str
    c_ray: str

    def __str__(self) -> str:
        return self.value

    @override
    def encode(self) -> str:
        if not self.c_ray.endswith("_0"):
            self.c_ray += "_0"
        num_1 = 32
        for char in self.c_ray:
            num_1 ^= ord(char)
        result = []
        for index, char in enumerate(self.value):
            num_2 = ((ord(char) + num_1 + index % 65535) % 255)
            result.append(chr(num_2))
        binary = "".join(result).encode("latin1")
        self.value = base64.b64encode(binary).decode("latin1")
        return self.value

    @override
    def decode(self) -> str:
        binary = base64.b64decode(self.value).decode("latin1")
        if not self.c_ray.endswith("_0"):
            self.c_ray += "_0"
        result = []
        num_1 = 32
        for char in self.c_ray:
            num_1 ^= ord(char)
        for index, char in enumerate(binary):
            num_2 = ord(char)
            result.append(chr(((num_2 & 255) - num_1 - index % 65535 + 65535) % 255))
        self.value = "".join(result)
        return self.value


""" Sài seo?

value = "test"
cf_response_body = CfResponseBody(value) -> test
encoded_value = cf_response_body.encode() -> encode
decoded_value = cf_response_body.decode() -> decode
cf_response_body -> decode

"""
