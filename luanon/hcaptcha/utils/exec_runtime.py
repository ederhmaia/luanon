import os
import shutil
import threading
import subprocess
from subprocess import PIPE

current_path = os.path.dirname(__file__)

class ExecRuntime:

    def __init__(self, url: str = "", referer: str = "", user_agent: str = "", script: str = "") -> None:
        self.url = url
        self.referer = referer
        self.user_agent = user_agent
        self.script = script

    @staticmethod
    def get_script_call(name: str, *args) -> str:
        result = [f"`{arg}`" if isinstance(arg, str) else str(arg) for arg in args]
        return f"{name}({','.join(result)})"

    @staticmethod
    def save_data(data: str, path: str) -> None:
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
            f"--scriptCall={self.get_script_call(name, *args)}"
        ]
        if promise:
            data.extend([
                f"--promise=true",
                f"--maxWait={max_wait * 1000}"
            ])
        else:
            data.extend([
                f"--promise=false"
            ])
        self.save_data("\n".join(data), filename)
        cmd = [
            "node",
            os.path.join(current_path, "exec_runtime.js"),
            f"--filename={filename}"
        ]
        proc = subprocess.Popen(cmd, stdout=PIPE, stderr=PIPE)
        timer = threading.Timer(max_wait, proc.kill)
        timer.start()
        try:
            stdout, stderr = proc.communicate()
            result = (stdout + stderr).decode("utf-8").strip()
        finally:
            timer.cancel()
        os.remove(filename)
        return result
