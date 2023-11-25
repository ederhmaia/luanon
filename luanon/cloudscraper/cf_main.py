"""
    Tác giả: GnU
    Ngày tạo: 11/06/2023
    ©2023 LuaNonTeam
"""

import requests
import traceback

from requests.structures import CaseInsensitiveDict
from typing import override

from . import cf_util
from .cf_challenge import CfChallenge
from luanon.base import log


class CloudflareScraper(requests.Session):

    def __init__(self, user_agent: str = "", cf_max_retries: int = 3, cf_debug: bool = False) -> None:
        super().__init__()
        self.cf_max_retries = cf_max_retries
        self.cf_debug = cf_debug

        # Ghi đè một vài tham số của thư viện requests
        self.headers = CaseInsensitiveDict({
            "User-Agent": user_agent or "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/120.0",
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
            "Accept-Language": "en-US,en;q=0.5",
            "Accept-Encoding": "gzip, deflate, br",
            "Connection": "keep-alive",
            "Upgrade-Insecure-Requests": "1",
            "Cache-Control": "no-cache",
            "Pragma": "no-cache"
        })
        self.timeout = 30

    @override
    def request(self, method, url, **kwargs) -> requests.Response:
        base_response = super().request(method=method, url=url, **kwargs)

        if not cf_util.check_cloudflare_enabled(base_response):
            return base_response

        for retry in range(1, self.cf_max_retries + 1):
            if self.cf_debug:
                log("CF_Main", "Đang thử bypass lần", retry)
            try:
                solver = CfChallenge.render(self, super(), base_response)
                solver.solve_challenge()
                if solver.is_solved:
                    return solver.response
            except Exception:
                if self.cf_debug:
                    traceback.print_exc()
                if retry != self.cf_max_retries:
                    base_response = None

        return base_response
