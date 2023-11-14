"""
    Tác giả: GnU
    Ngày tạo: 11/14/2023
    ©2023 LuaNonTeam
"""

import subprocess

from dataclasses import dataclass

from luanon.js_runtime import JSRuntime


@dataclass
class JSDomRuntime(JSRuntime):
    _node: subprocess.Popen = subprocess.Popen(
        ["node", "jsdom_runtime.js"],
        stdin=subprocess.PIPE,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        encoding="UTF-8",
        text=True
    )

