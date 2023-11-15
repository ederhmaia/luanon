"""
    Tác giả: GnU
    Ngày tạo: 11/14/2023
    ©2023 LuaNonTeam
"""

import os
import json
import queue
import base64
import signal
import threading
import subprocess


class JSRuntime:

    def __init__(self, filename: str = "") -> None:
        # Replace để đảm bảo cái này không bị lỗi prefix \ và /
        filename = os.path.abspath(filename or __file__.replace("js_runtime.py", "js_runtime.js"))
        self._node: subprocess.Popen = subprocess.Popen(
            ["node", filename],
            stdin=subprocess.PIPE,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            encoding="UTF-8",
            text=True
        )
        self._lock_event = threading.Lock()
        self._stop_event = threading.Event()
        self._queue: queue.Queue = queue.Queue()

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

    def eval(self, command: str, timeout: int = 30) -> tuple[str | int | bool, str]:
        with self._lock_event:
            self._node.stdin.write(json.dumps({"command": base64.b64encode(command.encode()).decode(), "timeout": timeout}) + "\n")
            self._node.stdin.flush()

            def get_result() -> None:
                while not self._stop_event.is_set():
                    try:
                        output = self._node.stdout.readline().strip()
                        if output:
                            self._queue.put(tuple(json.loads(output).values()))
                        else:
                            self._queue.put(("", "PyError: Kết quả trả về là rỗng."))
                    except json.decoder.JSONDecodeError as error:
                        self._queue.put(("", f"PyError: {repr(error)}"))

            threading.Thread(target=get_result, daemon=True).start()

            try:
                result = self._queue.get(timeout=timeout)
            except queue.Empty:
                result = "", "Hết thời gian chạy lệnh"
            self._stop_event.set()
            return result

    def call(self, function_name: str, *args: str | int | bool, timeout: int = 30) -> tuple[str | int | bool, str]:
        return self.eval(self._create_function_call(function_name, *args), timeout)
