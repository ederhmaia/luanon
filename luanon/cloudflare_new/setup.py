"""
    Tác giả: GnU
    Ngày tạo: 11/06/2023
    ©2023 LuaNonTeam
"""

from luanon.base_setup import base_setup

Setup = lambda: base_setup({
    "python": [
        "json5==0.9.14",
        "requests==2.31.0",
        "beautifulsoup4==4.12.2"
    ],
    "nodejs": [
        "fs@0.0.1-security",
        "vm@0.1.0",
        "minimist@1.2.8",
        # JSDOM
        "https://github.com/luanon404/jsdom-cloudflare/tarball/main --omit=dev"
    ]
})

Setup()
