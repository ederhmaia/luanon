"""
    This file contains error messages.
"""

_github_repo_link = "https://github.com/luanon404/cloudscraper"

cf_1020_error: str = "Cloudflare has blocked this request [1020] (Caused by User-Agent or Proxy)"
cf_solve_error: str = f"Change your User-Agent or use a Proxy, then try again. If the error persists, report it at {_github_repo_link}"
cf_challenge_error: str = "Failed to solve the challenge"