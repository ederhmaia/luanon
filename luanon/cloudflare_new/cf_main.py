"""
    Tác giả: GnU
    Ngày tạo: 11/06/2023
    ©2023 LuaNonTeam
"""

import requests
import traceback

from typing import override
from . import cf_util, cf_exception
from .cf_challenge import CfChallenge


class CloudflareScraper(requests.Session):

    def __init__(self, cf_max_retries: int = 3, cf_debug: bool = False) -> None:
        super().__init__()
        self.cf_max_retries = cf_max_retries
        self.cf_debug = cf_debug

    @staticmethod
    def _check_cloudflare_enabled(response: requests.Response) -> bool:
        if '<span class="cf-code-label">Error code <span>1020</span></span>' in response.text:
            raise cf_exception.CloudflareAccessDenied()
        if (response.headers.get("server", "") == "cloudflare"
                and response.status_code == 403):
            return True
        return False

    @override
    def request(self, method, url, **kwargs) -> requests.Response:
        base_response = super().request(method=method, url=url, **kwargs)
        if not self._check_cloudflare_enabled(base_response):
            return base_response
        for retry in range(self.cf_max_retries):
            try:
                response = super().request(method=method, url=url, **kwargs)
                solver = CfChallenge.render(self, super(), response)
                solver.solve_challenge()
                if solver.is_solved:
                    # Success
                    return solver.response
            except Exception:
                if self.cf_debug:
                    traceback.print_exc()
        # Fail
        return base_response
