import os
import json
import time
import shlex
import socket
import requests
import subprocess

from dataclasses import dataclass

import utils

from command import Command
from ip_manager import IPManager
from exception import PlatformNotSupport, RHDriverServerNotResponse, CouldNotDownloadRHDriver, CouldNotInstallRHDriver

@dataclass
class RHDriverManager:

    rhdriver_download_location = "/sdcard/Download/rhdriver.apk"
    rhdriver_download_link = "https://github.com/luanon404/android-webdrivers/raw/main/signed-apk-files/rhdriver.apk"

    @staticmethod
    def download_rhdriver_apk() -> bool:
        with open(RHDriverManager.rhdriver_download_location, "wb") as apk:
            for _ in range(3):
                try:
                    resp = requests.get(RHDriverManager.rhdriver_download_link)
                    if resp.status_code == 200:
                        apk.write(resp.content)
                        apk.close()
                        return True
                except Exception:
                    pass
        RHDriverManager.delete_rhdriver_apk()
        raise CouldNotDownloadRHDriver("Driver download failed, please do it manually")

    @staticmethod
    def delete_rhdriver_apk() -> None:
        if os.path.exists(RHDriverManager.rhdriver_download_location):
            os.remove(RHDriverManager.rhdriver_download_location)

    @staticmethod
    def termux_open() -> bool:
        command = "am start -a android.intent.action.VIEW -d 'webdriver://com.luanon.rhdriver' com.luanon.rhdriver"
        proc = subprocess.run(shlex.split(command), capture_output=True)
        return (False if b"Error" in proc.stderr else True)

    @staticmethod
    def termux_install() -> bool:
        command = "am start -a android.intent.action.VIEW -t 'application/vnd.android.package-archive' -d 'file:///sdcard/Download/rhdriver.apk'"
        proc = subprocess.run(shlex.split(command), capture_output=True)
        return (False if b"Error" in proc.stderr else True)

    @staticmethod
    def pydroid3_open() -> None:
        data = json.dumps({"method": "launch-intent", "action": "android.intent.action.VIEW", "data": "webdriver://com.luanon.rhdriver"})
        with socket.socket(socket.AF_UNIX, socket.SOCK_STREAM) as sock:
            sock.connect(os.environ["PYDROID_RPC"])
            sock.sendall(utils.s_encode(data))

    @staticmethod
    def open(use_ipv4: bool, use_ipv6: bool, max_wait: int=30) -> None:
        if "HOME" in os.environ and any(platform in os.environ["HOME"] for platform in ["termux", "pydroid3"]):
            if "pydroid3" in os.environ["HOME"]:
                RHDriverManager.pydroid3_open()
            if "termux" in os.environ["HOME"]:
                if RHDriverManager.termux_open() == False:
                    RHDriverManager.download_rhdriver_apk()
                    if RHDriverManager.termux_install() == False:
                        raise CouldNotInstallRHDriver("RHDriver install failed, please do it manually")
                    RHDriverManager.delete_rhdriver_apk()
            is_running = False
            end_time = time.time() + max_wait
            while not is_running:
                if time.time() >= end_time:
                    if "pydroid3" in os.environ["HOME"]:
                        RHDriverManager.download_rhdriver_apk()
                        raise CouldNotInstallRHDriver("Please use termux for automatic installation or you can install it manually, rhdriver is located at '/sdcard/Download/rhdriver.apk'")
                    raise RHDriverServerNotResponse("There is an error with the driver's server, try close the driver and open again or opening issues on github https://github.com/luanon404/rhtool/issues/new")
                is_running = RHDriverManager._is_server_opened(use_ipv4, use_ipv6)
            time.sleep(1)
        else:
            raise PlatformNotSupport("Only supports termux and pydroid3 at this moment")

    @staticmethod
    def _is_server_opened(use_ipv4: bool, use_ipv6: bool) -> bool:
        if use_ipv4:
            try:
                with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as sock:
                    sock.connect((IPManager.get_local_ipv4_address(), 8080))
                    sock.sendall(utils.s_encode(utils.build_data(Command.PING)))
                    if utils.s_decode(utils.recv_all(sock))["result"] == Command.OK:
                        return True
            except Exception:
                pass
        if use_ipv6:
            try:
                with socket.socket(socket.AF_INET6, socket.SOCK_STREAM) as sock:
                    sock.connect((IPManager.get_local_ipv6_address(), 8080))
                    sock.sendall(utils.s_encode(utils.build_data(Command.PING)))
                    if utils.s_decode(utils.recv_all(sock))["result"] == Command.OK:
                        return True
            except Exception:
                pass
        return False