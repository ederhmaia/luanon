"""
    Tác giả: GnU
    Ngày tạo: 11/06/2023
    ©2023 LuaNonTeam
"""

import pip
import json

with open("requirements.json") as file:
    packages = json.load(file)["python"]
    packages.insert(0, "install")
    packages.insert(1, "--force-reinstall")
    pip.main(packages)
