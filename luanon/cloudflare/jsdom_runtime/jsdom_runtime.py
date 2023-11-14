"""
    Tác giả: GnU
    Ngày tạo: 11/09/2023
    ©2023 LuaNonTeam
"""

import os

from luanon.js_runtime import JSRuntime


class JSDomRuntime(JSRuntime):

    def __init__(self, script: str = "", url: str = "", referer: str = "", user_agent: str = "", html: str = "") -> None:
        super().__init__(script, url, referer, user_agent, html, os.path.dirname(__file__), "jsdom_runtime.js")
