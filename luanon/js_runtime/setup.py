"""
    Tác giả: GnU
    Ngày tạo: 11/09/2023
    ©2023 LuaNonTeam
"""

from luanon.base import base_install, base_uninstall

packages = {
    "python": [],
    "nodejs": [
        "vm@0.1.0"
    ]
}

Install = lambda: base_install(packages)
Uninstall = lambda: base_uninstall(packages)
