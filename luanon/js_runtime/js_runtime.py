"""
    Tác giả: GnU
    Ngày tạo: 11/14/2023
    ©2023 LuaNonTeam
"""

import io
import os
import json
import queue
import signal
import threading
import subprocess
from dataclasses import dataclass


@dataclass
class JSRuntime:
    _node: subprocess.Popen = subprocess.Popen(
        ["node", "js_runtime.js"],
        stdin=subprocess.PIPE,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        encoding="UTF-8",
        text=True
    )
    _lock_event = threading.Lock()
    _stop_event = threading.Event()
    _queue: queue.Queue = queue.Queue()

    def close(self) -> None:
        if self._node and self._node.poll() is None:
            os.kill(self._node.pid, signal.SIGINT)
            self._node.wait()
        if self._lock_event.locked():
            self._lock_event.release()
        self._stop_event.set()
        self._queue.put(None)

    @staticmethod
    def _create_function_call(function_name: str, *args: str | int | bool) -> str:
        if not function_name.strip():
            return ""

        js_args = []

        for arg in args:
            match arg:
                case bool():
                    js_args.append(str(arg).lower())
                case int():
                    js_args.append(str(arg))
                case _:
                    js_args.append(f"`{arg}`")

        return f"{function_name}({', '.join(js_args)})"

    def get_result(self, stream: io.TextIOWrapper) -> None:
        while not self._stop_event.is_set():
            try:
                self._queue.put(tuple(json.loads(stream.readline().strip()).values()))
            except json.decoder.JSONDecodeError as error:
                self._queue.put(("", repr(error)))

    def eval(self, command: str, timeout: int = 30) -> tuple[str | int | bool, str]:
        with self._lock_event:
            self._node.stdin.write(json.dumps({"command": command.replace("\n", " "), "timeout": timeout}) + "\n")
            self._node.stdin.flush()

            threading.Thread(target=self.get_result, args=(self._node.stdout,), daemon=True).start()

            try:
                result = self._queue.get(timeout=timeout)
            except queue.Empty:
                result = "", "Hết thời gian chạy lệnh"
            self._stop_event.set()
            return result

    def call(self, function_name: str, *args: str | int | bool, timeout: int = 30) -> tuple[str | int | bool, str]:
        return self.eval(self._create_function_call(function_name, *args), timeout)
