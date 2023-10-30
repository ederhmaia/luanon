import json
import socket

def s_encode(j_data: dict) -> bytes:
    return (json.dumps(j_data) + "\n").encode()

def s_decode(j_data: bytes) -> dict:
    return json.loads(j_data.decode().strip())

def build_data(command: str, data: dict={}) -> dict:
    return {"command": command, "data": data}

def recv_all(sock: socket.socket) -> bytes:
    data = b""
    length = b""
    while True:
        chunk = sock.recv(1)
        if chunk.isdigit():
            length += chunk
        else:
            data += chunk
            length = int(length)
            break
    while len(data) < length:
        max_recv = 1024 if (length - len(data)) >= 1024 else (length - len(data))
        data += sock.recv(max_recv)
    print(data)
    input()
    return data