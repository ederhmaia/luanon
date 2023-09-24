import base64
import json
import re
import struct
import subprocess

import httpx
import lzstring


def encode_input(data: dict, secret_key: str) -> str:
    data = json.dumps(data, separators=(",", ":"))  # Convert to javascript JSON object
    lzstring.keyStrBase64 = secret_key
    return lzstring.LZString.compressToBase64(data)


def decode_input(data: str, secret_key: str) -> dict:
    lzstring.keyStrBase64 = secret_key
    return json.loads(lzstring.LZString.decompressFromBase64(data))


def encode_output(data: str, c_ray: str) -> str:
    c_ray += "_0"
    num_1 = 32
    for char in c_ray:
        num_1 ^= ord(char)
    result = []
    for index, char in enumerate(data):
        num_2 = ((ord(char) + num_1 + index % 65535) % 255)
        result.append(chr(num_2))
    binary = "".join(result).encode("latin1")
    return base64.b64encode(binary).decode("latin1")


def decode_output(data: str, c_ray: str) -> str:
    binary = base64.b64decode(data).decode("latin1")
    c_ray += "_0"
    result = []
    num_1 = 32
    for char in c_ray:
        num_1 ^= ord(char)
    for index, char in enumerate(binary):
        num_2 = ord(char)
        result.append(chr(((num_2 & 255) - num_1 - index % 65535 + 65535) % 255))
    return "".join(result)


def get_image_size(client: httpx.Client, url: str) -> tuple:
    resp = client.get(url, headers={"Range": "bytes=0-23"})
    # (25, 1) -> (width, height)
    return struct.unpack(">ii", resp.content[16:24])


def path_join(*paths: str) -> str:
    result = "/".join(paths)
    return re.sub("/+", "/", result)


def magic_eval(info: dict) -> str:
    script = json.dumps(info).encode("UTF-8")
    process = subprocess.Popen(["node", "script_runner.js"], stdin=subprocess.PIPE, stdout=subprocess.PIPE)

    process.stdin.write(script)
    process.stdin.flush()

    return process.stdout.read().decode("UTF-8")
