"""
    Tác giả: GnU
    Ngày tạo: 11/09/2023
    ©2023 LuaNonTeam
"""

import os
import pip

import traceback


def base_setup(packages: dict[str, list[str]]) -> None:
    py_packages = packages["python"]
    for py_package in py_packages:
        try:
            cmd = [
                "install",
                "--force-reinstall",
                py_package
            ]
            # Make sure to use pip with running python version
            # Prevent when you have many python version
            pip.main(cmd)
        except Exception:
            traceback.print_exc()

    nodejs_packages = packages["nodejs"]
    for nodejs_package in nodejs_packages:
        try:
            cmd = [
                "npm",
                "uninstall",
                "--global",
                "--force",
                nodejs_package
            ]
            # Maybe I should not use --force?
            os.system(" ".join(cmd))
        except Exception:
            traceback.print_exc()
    for nodejs_package in nodejs_packages:
        try:
            cmd = [
                "npm",
                "install",
                "--global",
                "--force",
                "--no-save",
                nodejs_package
            ]
            # Maybe I should not use --force?
            os.system(" ".join(cmd))
        except Exception:
            traceback.print_exc()
