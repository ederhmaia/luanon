"""
    Tác giả: GnU
    Ngày tạo: 11/09/2023
    ©2023 LuaNonTeam
"""

from luanon.base_setup import base_setup

Setup = lambda: base_setup({
    "python": [],
    "nodejs": [
        "fs@0.0.1-security",
        "vm@0.1.0",
        "minimist@1.2.8",
        # JSDOM
        "jsdom@22.1.0",
        "canvas@2.11.2"
    ]
})
