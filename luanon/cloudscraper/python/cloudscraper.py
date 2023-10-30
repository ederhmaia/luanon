import traceback
from typing import Any, Dict

import httpx

import exceptions
from challenge import Challenge


class CloudScraper(httpx.Client):

    def __init__(self, user_agent: str = "", max_retries: int = 3, debug: bool=False) -> None:
        super().__init__()
        options = {
            "http2": True,
            "timeout": None,
            "follow_redirects": True,
            "headers": {
                "User-Agent": user_agent or "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/109.0",
                "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
                "Accept-Language": "en-US,en;q=0.5",
                "Accept-Encoding": "gzip, deflate, br",
                "Connection": "keep-alive",
                "Upgrade-Insecure-Requests": "1",
                "Cache-Control": "no-cache",
                "Pragma": "no-cache"
            }
        }

        self.client = httpx.Client(**options)
        self.max_retries = max_retries
        self.debug = debug

    def request(self, method: str, url: str, *args: Any, **kwargs: Dict[str, Any]) -> httpx.Response:
        if kwargs.get("headers", None) is not None:
            kwargs["headers"].update(self.headers)

        for _ in range(self.max_retries):
            resp = self.client.request(method, url, *args, **kwargs)
            self.client.base_url = resp.url.scheme + "://" + resp.url.host
            try:
                resp = Challenge(self.client, debug=self.debug).solve(resp)
            except Exception:
                if self.debug:
                    traceback.print_exc()
                continue
            finally:
                if Challenge.detect(resp) is False:
                    return resp

        raise exceptions.CloudflareSolveError()