"""
    Tác giả: GnU
    Ngày tạo: 11/06/2023
    ©2023 LuaNonTeam
"""

from .cf_error import CfError


class CloudflareException(Exception):
    """
    Base exception class for cloudscraper.
    """


class CloudflareAccessDenied(CloudflareException):
    """
    Raise an exception for cloudflare 1020 error.
    """

    def __str__(self) -> str:
        return CfError.cf_1020_error + "\n"


class CloudflareSolveError(CloudflareException):
    """
    Raise an exception when failed to solve cloudflare.
    """

    def __str__(self) -> str:
        return CfError.cf_solve_error + "\n"


class CloudflareChallengeError(CloudflareException):
    """
    Raise an exception when failed to solve cloudflare.
    """

    def __init__(self, detail: str):
        self.detail = detail

    def __str__(self) -> str:
        return CfError.cf_challenge_error.format(detail=self.detail) + "\n"
