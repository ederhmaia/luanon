"""
    Tác giả: GnU
    Ngày tạo: 11/05/2023
    ©2023 LuaNonTeam
"""

import json
import lzstring

from typing import override
from dataclasses import dataclass

from .cf_base_body import CfBaseBody


@dataclass
class CfRequestBody(CfBaseBody):
    value: str | dict
    secret_key: str

    def __str__(self) -> str:
        return self.value

    @override
    def encode(self) -> str:
        # Convert to javascript JSON object
        json_value = json.dumps(self.value, separators=(",", ":"))
        lzstring.keyStrBase64 = self.secret_key
        self.value = lzstring.LZString.compressToBase64(json_value)
        return self.value

    @override
    def decode(self) -> dict:
        lzstring.keyStrBase64 = self.secret_key
        self.value = json.loads(lzstring.LZString.decompressFromBase64(self.value))
        return self.value


""" Sài seo?

value = "test"
cf_request_body = CfRequestBody(value) -> test
encoded_value = cf_request_body.encode() -> encode
decoded_value = cf_request_body.decode() -> decode
cf_request_body -> decode

"""
