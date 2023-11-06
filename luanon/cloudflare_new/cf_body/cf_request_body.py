"""
    Tác giả: GnU
    Ngày tạo: 11/05/2023
    ©2023 LuaNonTeam
"""

import json

from typing import override
from dataclasses import dataclass

from .cf_base_body import CfBaseBody
from .lz_string import LzString


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
        lz_string = LzString(self.secret_key)
        self.value = lz_string.text_to_base64(json_value)
        return self.value

    @override
    def decode(self) -> dict:
        lz_string = LzString(self.secret_key)
        self.value = json.loads(lz_string.base64_to_text(self.value))
        return self.value


""" Sài seo?

value = "test"
secret_key = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="

cf_request_body = CfRequestBody(value, secret_key)
print(cf_request_body)
# test

encoded_value = cf_request_body.encode()
print(encoded_value)
# EQFwpgzixA==

decoded_value = cf_request_body.decode()
print(decoded_value)
# test

print(cf_request_body)
# test

"""
