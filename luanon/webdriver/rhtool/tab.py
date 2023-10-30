import socket

from dataclasses import dataclass

import utils

from command import Command
from ip_manager import IPManager
from exception import CouldNotOpenNewTab

@dataclass
class Tab:
    
    start_url: str
    use_ipv4: bool
    use_ipv6: bool
    
    def create(self) -> object:
        if self.use_ipv4:
            try:
                self.sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
                self.sock.connect(("10.180.134.57", 8080))
                self.sock.sendall(utils.s_encode(utils.build_data(Command.NEW_TAB)))
                if utils.s_decode(utils.recv_all(self.sock))["result"] == Command.OK:
                    return self
            except Exception:
                0/0
        if self.use_ipv6:
            try:
                self.sock = socket.socket(socket.AF_INET6, socket.SOCK_STREAM)
                self.sock.connect((IPManager.get_local_ipv6_address(), 8080))
                self.sock.sendall(utils.s_encode(utils.build_data(Command.NEW_TAB)))
                if utils.s_decode(utils.recv_all(self.sock))["result"] == Command.OK:
                    return self
            except Exception:
                0/0
        raise CouldNotOpenNewTab("Something wrong, report at https://github.com/luanon404/rhtool/issues/new")
