"""
    Tác giả: GnU
    Ngày tạo: 11/06/2023
    ©2023 LuaNonTeam
"""
import base64
import re
import requests

from typing import Callable
from urllib.parse import urlparse

from luanon.cloudscraper import cf_exception


def get_base_url(url: str) -> str:
    parsed_url = urlparse(url)
    return f"{parsed_url.scheme}://{parsed_url.netloc}/"


def urljoin(base_url: str, *args: str):
    for url in args:
        base_url = base_url.rstrip("/") + "/" + url.strip("/")
    return base_url


def check_cloudflare_enabled(response: requests.Response) -> bool:
    if '<span class="cf-code-label">Error code <span>1020</span></span>' in response.text:
        raise cf_exception.CloudflareAccessDenied()
    if (response.headers.get("server", "") == "cloudflare"
            and response.status_code == 403):
        return True
    return False


def find_value_in_requests_list(name: str, requests_list: list, condition: Callable) -> any:
    for request in requests_list:
        value = request.get(name)
        if value is not None and condition(value):
            return value
    return None


def parse_data(response: requests.Response, _cf_chl_opt: dict) -> dict:
    result = {}
    quote = r"('|\")"
    string_ = r"[a-zA-Z0-9]"
    # function a(le){return xx='xxx'.split('x'),
    data = re.search(rf"function\s+{string_}{{1,}}\({string_}{{2,}}\){{return\s+{string_}{{2,}}\s*=\s*{quote}(.+?){quote}\.split\({quote}(.+?){quote}\),", response.text)
    if not isinstance(data, re.Match):
        return result
    # Group 1 -> ' | "
    # Group 2 -> xxx
    # Group 3 -> ' | "
    # Group 4 -> ' | "
    # Group 5 -> x
    # Group 6 -> ' | "
    data = data.group(2).split(data.group(5))

    value_generator = iter(value for value in data if (len(value) == 65 and re.match(r"^([a-zA-Z0-9+\-$]{65})$", value)))
    secret_key = next(value_generator, None)
    if not isinstance(secret_key, str):
        return result
    result["secret_key"] = secret_key

    # value_generator = iter(value for value in data if re.match(r"^/\d{9,10}:\d{10}:[a-zA-Z0-9_-]{43}/$", value))
    # server_params = next(value_generator, None)
    # if not isinstance(server_params, str):
    #     return result
    #
    # server_post_url = get_base_url(response.url)
    # server_post_url = urljoin(server_post_url, "/cdn-cgi/challenge-platform/")
    # server_post_url = urljoin(server_post_url, f"/h/{_cf_chl_opt["cFPWv"]}/")
    # server_post_url = urljoin(server_post_url, "/flow/ov1/")
    # server_post_url = urljoin(server_post_url, server_params)
    # server_post_url = urljoin(server_post_url, f"/{_cf_chl_opt["cRay"]}/")
    # server_post_url = urljoin(server_post_url, f"/{_cf_chl_opt["cHash"]}/")
    # result["server_post_url"] = server_post_url

    return result


def clean_script(script: str, challenge: str) -> str:
    match challenge:
        case "base":
            # (/\r\n/g,'\n') -> (/\\r\\n/g,'\\n')
            script = script.replace(base64.b64decode(b"KC9cclxuL2csJ1xuJyk=").decode(), base64.b64decode(b"KC9cXHJcXG4vZywnXFxuJyk=").decode())
    return script
