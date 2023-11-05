"""
    Tác giả: GnU
    Ngày tạo: 11/06/2023
    ©2023 LuaNonTeam
"""

import requests
import traceback

from typing import override
from . import cf_exception


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
        response = super().request(method=method, url=url, **kwargs)
        if not self._check_cloudflare_enabled(response):
            return response
        for retry in range(self.cf_max_retries):
            try:
                if not isinstance(response, requests.Response):
                    response = super().request(method=method, url=url, **kwargs)
                print(response)
            except Exception:
                if self.cf_debug:
                    traceback.print_exc()
            response = None
