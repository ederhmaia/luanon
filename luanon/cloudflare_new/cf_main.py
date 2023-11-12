"""
    Tác giả: GnU
    Ngày tạo: 11/06/2023
    ©2023 LuaNonTeam
"""

import requests
import traceback

from typing import override

from . import cf_util
from .cf_challenge import CfChallenge


class CloudflareScraper(requests.Session):

    def __init__(self, cf_max_retries: int = 3, cf_debug: bool = False) -> None:
        super().__init__()
        self.cf_max_retries = cf_max_retries
        self.cf_debug = cf_debug

    @override
    def request(self, method, url, **kwargs) -> requests.Response:
        if "timeout" not in kwargs:
            kwargs.update({"timeout": 30})
        base_response = super().request(method=method, url=url, **kwargs)
        if not cf_util.check_cloudflare_enabled(base_response):
            return base_response
        for retry in range(1, self.cf_max_retries + 1):
            if self.cf_debug:
                print("retry", retry)
            try:
                if not base_response:
                    base_response = super().request(method=method, url=url, **kwargs)
                solver = CfChallenge.render(self, super(), base_response)
                solver.solve_challenge()
                if solver.is_solved:
                    # Success
                    return solver.response
            except Exception:
                if retry + 1 != self.cf_max_retries:
                    # Last try
                    base_response = None
                if self.cf_debug:
                    traceback.print_exc()
        # Fail
        return base_response
