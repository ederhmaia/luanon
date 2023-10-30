import socket

class IPManager:

    @staticmethod
    def get_local_ipv4_address(default_ipv4_connection_address: str="8.8.8.8") -> str:
        with socket.socket(socket.AF_INET, socket.SOCK_DGRAM) as sock:
            try:
                sock.connect((default_ipv4_connection_address, 1))
                IP = sock.getsockname()[0]
            except Exception:
                IP = "127.0.0.1"
        return IP

    @staticmethod
    def get_local_ipv6_address(default_ipv6_connection_address: str="2001:4860:4860::8888") -> str:
        with socket.socket(socket.AF_INET6, socket.SOCK_DGRAM) as sock:
            try:
                sock.connect((default_ipv6_connection_address, 1))
                IP = sock.getsockname()[0]
            except Exception:
                IP = "::1"
        return IP