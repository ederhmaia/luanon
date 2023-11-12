"""
    Tác giả: GnU
    Ngày tạo: 11/09/2023
    ©2023 LuaNonTeam
"""

import os
import shutil
import hashlib
import threading
import subprocess

from typing import Any
from dataclasses import dataclass


@dataclass
class JSRuntime:
    script: str = ""
    url: str = ""
    referer: str = ""
    user_agent: str = ""
    html: str = ""
    _current_path: str = os.path.dirname(__file__)
    _base_js_file: str = "js_runtime.js"

    @staticmethod
    def _create_function_call(name: str, *args: Any) -> str:
        # Nothing
        if not name.strip():
            return ""

        js_args = []

        for arg in args:
            match arg:
                case str():
                    js_args.append(arg)
                case int():
                    js_args.append(str(int))
                case bool():
                    js_args.append(str(arg).lower())
                case _:
                    js_args.append(str(arg))

        return f"{name}({",".join([str(arg) for arg in args])})"

    @staticmethod
    def _write_data_to_file(data: str, path: str) -> None:
        base_path = os.path.dirname(path)
        os.makedirs(base_path, exist_ok=True)
        with open(path, "w", encoding="UTF-8") as file:
            file.write(data)

    def clear_memory(self):
        shutil.rmtree(os.path.join(self._current_path, "__memory__"))

    def call(self, name: str, args: list = (), max_wait: int = 30, promise: bool = False) -> tuple[str, str]:
        data = [
            f"--scriptStr={self.script}",
            f"--url={self.url}",
            f"--referer={self.referer}",
            f"--userAgent={self.user_agent}",
            f"--html={self.html}",
            f"--scriptCall={self._create_function_call(name, *args)}",
            f"--promise={str(promise).lower()}",
            f"--maxWait={max_wait * 1000}"
        ]

        tag = hashlib.md5(str(data).encode()).hexdigest()
        filename = os.path.join(self._current_path, "__memory__", f"{tag}.txt")

        data.insert(0, f"--tag={tag}")
        data = [d.replace("\n", " ") for d in data]
        self._write_data_to_file("\n".join(data), filename)

        cmd = [
            "node",
            os.path.join(self._current_path, self._base_js_file),
            f"--filename={filename}"
        ]
        proc = subprocess.Popen(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        timer = threading.Timer(max_wait, proc.kill)
        timer.start()
        try:
            stdout, stderr = proc.communicate()
        finally:
            timer.cancel()
        os.remove(filename)
        return stdout.decode("UTF-8").strip(), stderr.decode("UTF-8").strip()

    def eval(self, script: str) -> tuple[str, str]:
        return self.call(f"(function () {{ return {script} }})")
