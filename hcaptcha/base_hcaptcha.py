import re
import json
import httpx
import shutil

from typing import Dict, Any
from urllib.parse import urlencode

from utils import MotionData, ExecRuntime
from utils_hcaptcha import UtilsHCaptcha

shutil.rmtree("__pycache__")


class BaseHCaptcha:

    def __init__(self, host: str, site_key: str = "", href: str = "", worker: int = 1, debug: bool = False) -> None:
        self.host = host
        self.site_key = site_key
        self.href = href
        self.worker = worker
        self.debug = debug

        self.base_api_url = "https://hcaptcha.com"
        self.assets_api_url = "https://newassets.hcaptcha.com"

        self.session = httpx.Client(follow_redirects=True, http2=True)
        self.headers = {
            "Host": "hcaptcha.com",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/117.0",
            "Accept-Language": "en-US,en;q=0.5",
            "Accept-Encoding": "gzip, deflate, br",
            "Alt-Used": "hcaptcha.com",
            "Connection": "keep-alive",
            "DNT": "1",
            "TE": "trailers",
            "Pragma": "no-cache",
            "Cache-Control": "no-cache"
        }

        self.motion_data = MotionData()
        self.latest_version = self.get_latest_version()

    def get_latest_version(self) -> str:
        if self.debug:
            print("start", "get_latest_version")
        url = self.base_api_url + "/1/api.js?render=explicit&onload=hcaptchaOnLoad"
        headers = {
            **self.headers,
            **{
                "Accept": "*/*",
                "Referer": f"https://{self.host}/",
                "Sec-Fetch-Dest": "script",
                "Sec-Fetch-Mode": "no-cors",
                "Sec-Fetch-Site": "cross-site"
            }
        }
        resp = UtilsHCaptcha.get(self.session, url, headers)
        version = re.search(self.assets_api_url + "/captcha/v1/(.*?)/static", resp.text).group(1)
        if self.debug:
            print("end", "get_latest_version", version)
        return version

    def get_c(self) -> Dict[str, Any]:
        if self.debug:
            print("start", "get_c")
        url = f"{self.base_api_url}/checksiteconfig?v={self.latest_version}&host={self.host}&sitekey={self.site_key}&sc=1&swa=1"
        data = ""
        headers = {
            **self.headers,
            **{
                "Accept": "application/json",
                "Origin": self.assets_api_url,
                "Referer": self.assets_api_url + "/",
                "Sec-Fetch-Dest": "empty",
                "Sec-Fetch-Mode": "cors",
                "Sec-Fetch-Site": "same-site",
                "Content-Length": str(len(data)),
                "Content-Type": "text/plain"
            }
        }
        resp = UtilsHCaptcha.post(self.session, url, headers=headers, data=data)
        c = resp.json()["c"]
        if self.debug:
            print("end", "get_c", c)
        return c

    def get_n(self, c: Dict[str, Any]) -> str:
        if self.debug:
            print("start", "get_n")
        req = c["req"]
        decoded = UtilsHCaptcha.jwt_decode(req)
        script_url = decoded["l"] + f"/{decoded['n']}.js"
        headers = {
            **self.headers,
            **{
                "Accept": "*/*",
                "Host": httpx.URL(self.assets_api_url).host,
                "Referer": f"{self.assets_api_url}/captcha/v1/{self.latest_version}/static/hcaptcha.html",
                "Sec-Fetch-Dest": "script",
                "Sec-Fetch-Mode": "no-cors",
                "Sec-Fetch-Site": "same-origin",
            }
        }
        resp = UtilsHCaptcha.get(self.session, script_url, headers=headers)
        exec_runtime = ExecRuntime(url=script_url, script=resp.text)
        n = exec_runtime.call("hsw", [req], max_wait=30, promise=True)
        if self.debug:
            print("end", "get_n", n)
        return n

    def get_captcha(self):
        if self.debug:
            print("start", "get_captcha")
        c = self.get_c()
        n = self.get_n(c)
        widget_id = UtilsHCaptcha.get_widget_id()

        url = f"{self.base_api_url}/getcaptcha/{self.site_key}"
        data = urlencode({
            "sitekey": self.site_key,
            "host": self.host,
            "hl": "en",
            "motionData": json.dumps({
                **self.motion_data.get_frame_data(),
                "topLevel": self.motion_data.get_top_level_data(),
                "session": [],
                "widgetList": [
                    widget_id
                ],
                "widgetId": widget_id,
                "href": self.href,
                "prev": {
                    "escaped": False,
                    "passed": False,
                    "expiredChallenge": False,
                    "expiredResponse": False
                },
                "v": 1,
            }),
            "n": n,
            "v": self.latest_version,
            "c": json.dumps(c)
        })
        headers = {
            **self.headers,
            **{
                "Accept": "application/json",
                "Origin": self.assets_api_url,
                "Referer": self.assets_api_url + "/",
                "Sec-Fetch-Dest": "empty",
                "Sec-Fetch-Mode": "cors",
                "Sec-Fetch-Site": "same-site",
                "Content-Length": str(len(data)),
                "Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
            }
        }
        resp = UtilsHCaptcha.check_response(UtilsHCaptcha.post(self.session, url, headers=headers, data=data))
        if self.debug:
            print("end", "get_captcha", resp)
        if not resp:
            return None
        if "requester_question" not in resp.json():
            return None
        if isinstance(resp, str):
            # Auto pass case (but I have never seen this case before)
            return resp
        return resp.json()

    def render(self, feature_extraction: dict):
        if self.debug:
            print("start", "render")
        captcha = self.get_captcha()
        if self.debug:
            print("doing", "render", "captcha", captcha)
        if not isinstance(captcha, dict):
            return None
        question = captcha["requester_question"]["en"]
        captcha_type = captcha["request_type"]
        tasklist = captcha["tasklist"]
        example_image = captcha["requester_question_example"]
        answers = {}

        if captcha_type == "image_label_binary":
            for task in tasklist:
                image_main_url = example_image[0]
                image_check_url = task["datapoint_uri"]
                similarity = UtilsHCaptcha.check_similarity(feature_extraction["model"], feature_extraction["processor"], image_main_url, image_check_url)
                if self.debug:
                    print("doing", "render", "task", task)
                    print("doing", "render", "similarity", similarity)
                if similarity >= 0.25:
                    answers[task["task_key"]] = "true"
                else:
                    answers[task["task_key"]] = "false"
        else:
            print("PASS", captcha_type)

        c = captcha["c"]
        n = self.get_n(c)
        key = captcha["key"]
        url = f"{self.base_api_url}/checkcaptcha/{self.site_key}/{key}"
        data = json.dumps({
            "job_mode": captcha_type,
            "answers": answers,
            "serverdomain": self.host,
            "sitekey": self.site_key,
            "motionData": json.dumps({
                **self.motion_data.get_frame_data(),
                "topLevel": self.motion_data.get_top_level_data(),
                "v": 1
            }),
            "n": n,
            "v": self.latest_version,
            "c": json.dumps(c)
        })
        headers = {
            **self.headers,
            **{
                "Accept": "*/*",
                "Origin": self.assets_api_url,
                "Referer": self.assets_api_url + "/",
                "Sec-Fetch-Dest": "empty",
                "Sec-Fetch-Mode": "cors",
                "Sec-Fetch-Site": "same-site",
                "Content-Length": str(len(data)),
                "Content-Type": "application/json; charset=utf-8"
            }
        }
        resp = UtilsHCaptcha.check_response(UtilsHCaptcha.post(self.session, url, headers=headers, data=data))
        if self.debug:
            print("end", "render", resp, resp.text)
        if isinstance(resp, str):
            # Auto pass case (but I have never seen this case before)
            return resp
        return None
