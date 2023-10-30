import os
import threading
import subprocess
from typing import Any

current_path = os.path.dirname(__file__)


class JSRuntime:

    def __init__(self, url: str = "", referer: str = "", user_agent: str = "", script: str = "") -> None:
        self.url = url
        self.referer = referer
        self.user_agent = user_agent
        self.script = script

    @staticmethod
    def _create_function_call(name: str, *args: Any) -> str:
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

        return f"{name}({','.join([str(arg) for arg in args])})"

    @staticmethod
    def _write_data_to_file(data: str, path: str) -> None:
        base_path = os.path.dirname(path)
        os.makedirs(base_path, exist_ok=True)
        with open(path, "w", encoding="UTF-8") as file:
            file.write(data)

    def call(self, name: str, args: list, max_wait: int = 30, promise: bool = False) -> str:
        tag = str(id(self))
        filename = os.path.join(current_path, "__memory__", f"{tag}.txt")
        data = [
            f"--tag={tag}",
            f"--url={self.url}",
            f"--referer={self.referer}",
            f"--userAgent={self.user_agent}",
            f"--scriptStr={self.script}",
            f"--scriptCall={self._create_function_call(name, *args)}",
            f"--promise={str(promise).lower()}",
            f"--maxWait={max_wait * 1000}"
        ]
        self._write_data_to_file("\n".join(data), filename)
        cmd = [
            "node",
            os.path.join(current_path, "js_runtime.js"),
            f"--filename={filename}"
        ]
        proc = subprocess.Popen(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        timer = threading.Timer(max_wait, proc.kill)
        timer.start()
        try:
            stdout, stderr = proc.communicate()
            result = (stdout + stderr).decode("UTF-8").strip()
        finally:
            timer.cancel()
        os.remove(filename)
        return result
