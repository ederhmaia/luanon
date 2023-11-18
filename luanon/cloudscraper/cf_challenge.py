"""
    Tác giả: GnU
    Ngày tạo: 11/06/2023
    ©2023 LuaNonTeam
"""
import json
import time

import requests

from dataclasses import dataclass

from luanon.cloudscraper import cf_util
from luanon.cloudscraper.cf_body import CfRequestBody, CfResponseBody
from luanon.cloudscraper.jsdom_runtime import JSDomRuntime


@dataclass
class CfChallenge:
    cloudflare_scraper: "CloudflareScraper"
    session: requests.Session
    response: requests.Response | None

    @classmethod
    def render(cls, cloudflare_scraper: "CloudflareScraper", session: requests.Session, response: requests.Response) -> "CfChallenge":
        return cls(cloudflare_scraper, session, response)

    @property
    def is_solved(self) -> bool:
        return cf_util.check_cloudflare_enabled(self.response)

    def solve_challenge(self) -> None:
        # Khởi tạo
        jsdom_runtime = JSDomRuntime("jsdom_runtime/jsdom_runtime.js")
        print(jsdom_runtime.eval("""
            const requests_list = [];
            
            var abc = "hi";
            class CustomResourceLoader extends jsdom.ResourceLoader {
                fetch(url, options) {
                    requests_list.push({ url, options });
                    return super.fetch(url, options);
                }
            }
            
            const loader = new CustomResourceLoader({ userAgent: `""" + "Mozilla/5.0" + """` });
            
            const dom = new jsdom.JSDOM(
                `""" + self.response.text + """`,
                {
                    url: `""" + cf_util.get_base_url(self.response.url) + """`,
                    referer: `""" + cf_util.get_base_url(self.response.url) + """`,
                    contentType: "text/html",
                    includeNodeLocations: true,
                    runScripts: "dangerously",
                    pretendToBeVisual: true,
                    resources: loader,
                    allowSpecialUseDomain: true,
                    rejectPublicSuffixes: false,
                    beforeParse: function (window) {
                        
                        let win = window.XMLHttpRequest;
                        win.prototype.open = function(method, url) {
                            this._url = url;
                            requests_list.push({ url: this._url });
                        };
                        win.prototype.send = function(body) {
                            requests_list.push({ url: this._url, body });
                        };
                        window.XMLHttpRequest = win;
                        window.sendRequest = function (url) {
                            abc = url;
                        };
                    }
                }
            );
            dom.window.sendRequest = function (url) {
                abc = url;
            };
            const ctx = dom.getInternalVMContext();
            
            ctx.window.sendRequest = function (url) {
                abc = url;
            };
            ctx.window.XMLHttpRequest.prototype.open = function(method, url) {
                            this._url = url;
                            requests_list.push({ url: this._url });
                        };
                        ctx.window.XMLHttpRequest.prototype.send = function(body) {
                            requests_list.push({ url: this._url, body });
                        };
        """))
        _cf_chl_opt, _ = jsdom_runtime.eval("ctx.window._cf_chl_opt")
        script_url = cf_util.find_value_in_requests_list(
            "url",
            jsdom_runtime.eval("requests_list")[0],
            lambda x: "/cdn-cgi/challenge-platform/" in x
        )
        base_challenge = self.session.get(script_url)
        print(jsdom_runtime.eval("vm.runInContext(`" + cf_util.clean_script(base_challenge.text, "base") + "`, ctx)"))
        time.sleep(10)
        print(11111, jsdom_runtime.eval("abc"))
        print(json.dumps(jsdom_runtime.eval("requests_list")[0], indent=4))
        exit(0)
        match _cf_chl_opt["cType"]:
            case "managed":
                data = cf_util.parse_data(base_challenge, _cf_chl_opt)
                print(data)
                _cf_chl_ctx = CfRequestBody({
                    "gjJw8": _cf_chl_opt["cType"],
                    "cjLL8": _cf_chl_opt["cNounce"],
                    "YMPhv8": _cf_chl_opt["cvId"],
                    "JtXT7": 0,
                    "Ewdi8": 0,
                    "NeUtpl3": 1,
                    "fAdNmY5": _cf_chl_opt["cRq"],
                    "vruOBE0": {
                        "FhXKw9": 0,
                        "gauD0": 7,
                        "JxhU8": 0,
                        "guUl9": 0,
                        "zVPs2": 7,
                        "vNxUXF8": 0,
                        "RdZTbB2": 0,
                        "NglV8": 14
                    },
                    "guqU9": False
                }, secret_key=data["secret_key"])

                body_encoded = f"v_{_cf_chl_opt["cRay"]}={_cf_chl_ctx.encode()}"
                headers = {
                    "Content-type": "application/x-www-form-urlencoded",
                    "CF-Challenge": _cf_chl_opt["cHash"],
                    "Content-Length": str(len(body_encoded)),
                    "Origin": cf_util.get_base_url(base_challenge.url)[:-1],
                    "Referer": cf_util.get_base_url(base_challenge.url),
                    "Sec-Fetch-Dest": "empty",
                    "Sec-Fetch-Mode": "cors",
                    "Sec-Fetch-Site": "same-origin"
                }

                luanon_challenge = self.session.post(data["server_post_url"], data=body_encoded, headers=headers)
                print(luanon_challenge.text)
                luanon_challenge_body = CfResponseBody(luanon_challenge.text, c_ray=_cf_chl_opt["cRay"])
                print(22222222, _cf_chl_opt["cRay"], luanon_challenge_body.decode())
            case _:
                # Hmm
                return None
