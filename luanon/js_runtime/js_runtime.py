"""
    Tác giả: GnU
    Ngày tạo: 11/14/2023
    ©2023 LuaNonTeam
"""

import json
import subprocess
from dataclasses import dataclass


@dataclass
class JSRuntime:
    node: subprocess.Popen | None = None

    def __del__(self) -> None:
        self.close()

    def open(self) -> "JSRuntime":
        if not isinstance(self.node, subprocess.Popen):
            self.node = subprocess.Popen(
                ["node", "js_runtime.js"],
                stdin=subprocess.PIPE,
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE,
                encoding="UTF-8",
                text=True
            )
        return self

    def close(self) -> None:
        if self.node:
            self.node.stdout.close()
            self.node.stderr.close()
            if self.node.poll() is None:
                self.node.terminate()
            self.node.wait()
            self.node = None

    @staticmethod
    def _create_function_call(function_name: str, *args: str | int | bool) -> str:
        # Nothing
        if not function_name.strip():
            return ""

        js_args = []

        for arg in args:
            match arg:
                case str():
                    js_args.append(f"`{arg}`")
                # print(isinstance(True, int))
                # True
                # Nên chổ này match cái bool trước để tránh nhầm bool thành int
                case bool():
                    js_args.append(str(arg).lower())
                case int():
                    js_args.append(str(arg))
                case _:
                    js_args.append(f"`{arg}`")
        return f"global.{function_name}({", ".join(js_args)})"

    def exec(self, command: str, timeout: int = 0) -> tuple[str | int | bool, str]:
        command = json.dumps({"command": command, "timeout": timeout})
        self.node.stdin.write(command + "\n")
        self.node.stdin.flush()
        return tuple(json.loads(self.node.stdout.readline().strip()).values())

    def eval(self, command: str, timeout: int = 30) -> tuple[str | int | bool, str]:
        return self.exec(command, timeout)

    def call(self, function_name: str, *args: str | int | bool, timeout: int = 30) -> tuple[str | int | bool, str]:
        return self.exec(self._create_function_call(function_name, *args), timeout)


"""Ví dụ

j = JSRuntime()
j.open()
j.exec("global.hello = function (name) { return `hello, ${name}` }")

print(j.eval("global.hello(`gnu`)"))
> ('hello, gnu', '')

print(j.call("hello", "gnu"))
> ('hello, gnu', '')

j.close()

"""
