"""
    Tác giả: GnU
    Ngày tạo: 11/06/2023
    ©2023 LuaNonTeam
"""

import re
import json5
import requests

from bs4 import BeautifulSoup
from urllib.parse import urlparse

from luanon.cloudscraper import cf_exception
from luanon.cloudscraper.jsdom_runtime import JSDomRuntime


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


# Will remove in version 1.0.1
def parse_content(response: requests.Response) -> dict:
    result = {}
    soup = BeautifulSoup(response.content, features="html.parser")
    script = soup.find("script").text

    # window._cf_chl_opt = { ... };
    _cf_chl_opt = re.search(r"window\._cf_chl_opt\s*=\s*({.+?});", script)
    if not isinstance(_cf_chl_opt, re.Match):
        return result
    # json5 cant handle both ' and "
    # Also json5 cant handle `cT: Math.floor(Date.now() / 1000)`
    _cf_chl_opt, _ = JSDomRuntime().eval(_cf_chl_opt.group(1))
    result["_cf_chl_opt"] = json5.loads(_cf_chl_opt)

    quote = r"('|\")"
    # cpo.src = '/cdn-cgi/challenge-platform/h/b/orchestrate/chl_page/v1?ray=...';
    cpo = re.search(rf"cpo\.src\s*=\s*{quote}(.+?){quote};", script)
    if not isinstance(cpo, re.Match):
        return result
    # Group 1 -> ' | "
    # Group 2 -> /cdn-cgi/challenge-platform/h/b/orchestrate/chl_page/v1?ray=...
    # Group 3 -> ' | "
    result["cpo"] = urljoin(get_base_url(response.url), cpo.group(2))

    return result


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

    value_generator = iter(value for value in data if re.match(r"^/\d{9,10}:\d{10}:[a-zA-Z0-9_-]{43}/$", value))
    server_params = next(value_generator, None)
    if not isinstance(server_params, str):
        return result

    server_post_url = get_base_url(response.url)
    server_post_url = urljoin(server_post_url, "/cdn-cgi/challenge-platform/")
    server_post_url = urljoin(server_post_url, f"/h/{_cf_chl_opt["cFPWv"]}/")
    server_post_url = urljoin(server_post_url, "/flow/ov1/")
    server_post_url = urljoin(server_post_url, server_params)
    server_post_url = urljoin(server_post_url, f"/{_cf_chl_opt["cRay"]}/")
    server_post_url = urljoin(server_post_url, f"/{_cf_chl_opt["cHash"]}/")
    result["server_post_url"] = server_post_url

    return result
