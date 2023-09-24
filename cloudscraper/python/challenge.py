import json
import re
from urllib.parse import urlencode

import bs4
import httpx
import json5

import exceptions
import utils
from script_runner import ScriptRunner


class Challenge:

    def __init__(self, client: httpx.Client, debug: bool = False) -> None:
        self.client = client
        self.debug = debug

    @staticmethod
    def detect(resp: httpx.Response) -> bool:
        if '<span class="cf-code-label">Error code <span>1020</span></span>' in resp.text:
            raise exceptions.CloudflareAccessDenied()
        return (resp.status_code in [403, 503]
                and resp.headers.get("server") == "cloudflare"
                and "_cf_chl_opt" in resp.text)

    def solve(self, origin_resp: httpx.Response) -> httpx.Response:

        soup = bs4.BeautifulSoup(origin_resp.content, "html.parser")
        form = soup.find("form", {"id": "challenge-form"})
        action = form.get("action")
        form_data = {elem.get("name"): elem.get("value") for elem in form.find_all("input")}

        html = origin_resp.text.replace("\n", " ")
        _cf_chl_opt = json5.loads(re.search("window._cf_chl_opt=(.*?);", html).group(1))
        script_link = re.search("cpo.src\s=\s(.*?);", html).group(1)[1:-1]

        script = self.client.get(script_link).text
        prefix = "\\" + re.search("return\s[0-9a-zA-Z]{1,}='.+'\.split\('(.*?)'\)", script).group(1)
        secret_key = re.search(f"({prefix}|')" + "([0-9a-zA-Z+\-$]{65})" + f"({prefix}|')", script).group(2)
        server_link = re.search(f"({prefix}|')" + "(/0\.\d+:.{10}:.{43}/)" + f"({prefix}|')", script).group(2)
        server_link = utils.path_join("/cdn-cgi/challenge-platform/h/", _cf_chl_opt["cFPWv"], "/flow/ov1/", server_link, _cf_chl_opt["cRay"], _cf_chl_opt["cHash"])

        _cf_chl_ctx = {
            "chReq": _cf_chl_opt["cType"],
            "cNounce": _cf_chl_opt["cNounce"],
            "cvId": _cf_chl_opt["cvId"],
            "chC": 0,
            "chCAS": 0,
            "oV": 1,
            "cRq": _cf_chl_opt["cRq"],
            "ie": 0,
            "if": False,
            "ffs": False
        }

        input_encoded = f"v_{_cf_chl_opt['cRay']}={utils.encode_input(_cf_chl_ctx, secret_key)}"
        headers = {
            "Content-type": "application/x-www-form-urlencoded",
            "CF-Challenge": _cf_chl_opt["cHash"],
            "Content-Length": str(len(input_encoded)),
            "Origin": str(self.client.base_url),
            "Referer": str(origin_resp.url) + "/",
            "Sec-Fetch-Dest": "empty",
            "Sec-Fetch-Mode": "cors",
            "Sec-Fetch-Site": "same-origin"
        }

        for retries in range(5):
            if self.debug:
                print(f"Retries {retries + 1}: First POST")
            try:
                resp = self.client.post(server_link, data=input_encoded, headers=headers, timeout=10)
                output_decoded = utils.decode_output(resp.text, _cf_chl_opt["cRay"])
                break
            except Exception:
                if retries == 4:
                    raise exceptions.CloudflareChallengeError()

        _cf_chl_ctx = ScriptRunner(
            self.client,
            origin_resp.text,
            output_decoded,
            _cf_chl_opt,
            _cf_chl_ctx
        ).get_result(
        )
        # print(json.dumps(_cf_chl_ctx))

        input_encoded = f"v_{_cf_chl_opt['cRay']}={utils.encode_input(_cf_chl_ctx, secret_key)}"
        headers = {
            "Content-type": "application/x-www-form-urlencoded",
            "CF-Challenge": _cf_chl_opt["cHash"],
            "Content-Length": str(len(input_encoded)),
            "Origin": str(self.client.base_url),
            "Referer": str(origin_resp.url) + "/",
            "Sec-Fetch-Dest": "empty",
            "Sec-Fetch-Mode": "cors",
            "Sec-Fetch-Site": "same-origin"
        }

        for retries in range(5):
            if self.debug:
                print(f"Retries {retries + 1}: Second POST")
            try:
                resp = self.client.post(server_link, data=input_encoded, headers=headers, timeout=10)
                output_decoded = utils.decode_output(resp.text, _cf_chl_opt["cRay"])
                break
            except Exception:
                if retries == 4:
                    raise exceptions.CloudflareChallengeError()

        _ = eval(re.search("window._=(\[\".*?\"\]);", output_decoded).group(1))  # json.loads() cant convert str list to list (Caused single quote)
        print(_)

        if "sh" in _ and "aw" in _:
            for index, item in enumerate(_):
                if item == "sh":
                    form_data.update({"sh": _[index + 2]})
                if item == "aw":
                    form_data.update({"aw": _[index + 1]})
            if self.debug:
                print(f"JSChallenge: sh {form_data['sh']} aw {form_data['aw']}")
        elif "human_button_text" in _:
            if self.debug:
                print("ManagedChallenge: JS button")
            exit()
        elif any(["turnstile" in item for item in _]):
            if self.debug:
                print("ManagedChallenge: Captcha turnstile")
            exit()
        else:
            raise exceptions.CloudflareChallengeError()

        data = urlencode(form_data)
        headers = {
            "Content-type": "application/x-www-form-urlencoded",
            "Content-Length": str(len(data)),
            "Sec-Fetch-Dest": "document",
            "Sec-Fetch-Mode": "navigate",
            "Sec-Fetch-Site": "same-origin"
        }

        for retries in range(5):
            if self.debug:
                print(f"Retries {retries + 1}: Final POST")
            try:
                return self.client.post(action, data=data, headers=headers, timeout=10)
            except Exception:
                if retries == 4:
                    raise exceptions.CloudflareChallengeError()
