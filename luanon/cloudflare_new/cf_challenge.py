"""
    Tác giả: GnU
    Ngày tạo: 11/06/2023
    ©2023 LuaNonTeam
"""
import json

import requests

from dataclasses import dataclass
from luanon.cloudflare_new import cf_util
from luanon.cloudflare_new.cf_body import CfRequestBody, CfResponseBody
from luanon.cloudflare_new.jsdom_runtime import JSDomRuntime


@dataclass
class CfChallenge:
    cloudflare_scraper: "CloudflareScraper"
    session: requests.Session
    content: dict
    response: requests.Response | None

    @classmethod
    def render(cls, cloudflare_scraper: "CloudflareScraper", session: requests.Session, response: requests.Response) -> "CfChallenge":
        content = cf_util.parse_content(response)
        return cls(cloudflare_scraper, session, content, response)

    @property
    def is_solved(self) -> bool:
        return cf_util.check_cloudflare_enabled(self.response)

    def solve_challenge(self) -> None:
        if self.cloudflare_scraper.cf_debug:
            print("Solving...")
            print(self.content["_cf_chl_opt"])

        base_challenge = self.session.get(self.content["cpo"])
        open("a.js", "w").write(base_challenge.text)
        match self.content["_cf_chl_opt"]["cType"]:
            case "managed":
                data = cf_util.parse_data(base_challenge, self.content["_cf_chl_opt"])
                print(self.response.text)
                _cf_chl_ctx, a = JSDomRuntime(f"""
                                window._cf_chl_opt = {json.dumps({**self.content["_cf_chl_opt"], **{"img": "iVBORw0KGgoAAAANSUhEUgAAACkAAAAwCAIAAAAD28TyAAAABElEQVQAAAABnSTXkQAAAABJRU5ErkJggg=="}})};
                                """ + base_challenge.text,
                                              url=cf_util.get_base_url(self.response.url),
                                              referer=cf_util.get_base_url(self.response.url),
                                              html=self.response.text).call("", promise=True)
                print(555555555, _cf_chl_ctx)
                print(555555555, a)
                _cf_chl_ctx = CfRequestBody({
                    "gjJw8": self.content["_cf_chl_opt"]["cType"],
                    "cjLL8": self.content["_cf_chl_opt"]["cNounce"],
                    "YMPhv8": self.content["_cf_chl_opt"]["cvId"],
                    "JtXT7": 0,
                    "Ewdi8": 0,
                    "NeUtpl3": 1,
                    "fAdNmY5": self.content["_cf_chl_opt"]["cRq"],
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

                body_encoded = f"v_{self.content["_cf_chl_opt"]["cRay"]}={_cf_chl_ctx.encode()}"
                headers = {
                    "Content-type": "application/x-www-form-urlencoded",
                    "CF-Challenge": self.content["_cf_chl_opt"]["cHash"],
                    "Content-Length": str(len(body_encoded)),
                    "Origin": cf_util.get_base_url(base_challenge.url)[:-1],
                    "Referer": cf_util.get_base_url(base_challenge.url),
                    "Sec-Fetch-Dest": "empty",
                    "Sec-Fetch-Mode": "cors",
                    "Sec-Fetch-Site": "same-origin"
                }

                luanon_challenge = self.session.post(data["server_post_url"], data=body_encoded, headers=headers)
                print(luanon_challenge.text)
                luanon_challenge_body = CfResponseBody(luanon_challenge.text, c_ray=self.content["_cf_chl_opt"]["cRay"])
                print(22222222, self.content["_cf_chl_opt"]["cRay"], luanon_challenge_body.decode())
            case _:
                # Hmm
                return None
