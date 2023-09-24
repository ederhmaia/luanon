import errors


class CloudflareException(Exception):
    """
    Base exception class for cloudscraper.
    """


class CloudflareAccessDenied(CloudflareException):
    """
    Raise an exception for cloudflare 1020 error.
    """

    def __str__(self) -> str:
        return errors.cf_1020_error + "\n"


class CloudflareSolveError(CloudflareException):
    """
    Raise an exception when failed to solve cloudflare.
    """

    def __str__(self) -> str:
        return errors.cf_solve_error + "\n"


class CloudflareChallengeError(CloudflareException):
    """
    Raise an exception when failed to solve cloudflare.
    """

    def __str__(self) -> str:
        return errors.cf_challenge_error + "\n"
