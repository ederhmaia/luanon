"""
    Tác giả: GnU
    Ngày tạo: 11/14/2023
    ©2023 LuaNonTeam
"""

import os

from luanon.js_runtime import JSRuntime


class JSDomRuntime(JSRuntime):

    def __init__(self, filename: str) -> None:
        super().__init__(os.path.abspath(filename))
