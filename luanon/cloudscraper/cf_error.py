"""
    Tác giả: GnU
    Ngày tạo: 11/06/2023
    ©2023 LuaNonTeam
"""

from dataclasses import dataclass


@dataclass
class CfError:
    _github_repo_link: str = "https://github.com/luanon404/luanon"

    cf_1020_error: str = "Cloudflare đã chặn yêu cầu của bạn (lỗi 1020), vui lòng đổi User-Agent hoặc sử dụng proxy"
    cf_solve_error: str = f"Lỗi không biết, Vui lòng đổi User-Agent hoặc sử dụng proxy, vẫn bị thì report tại {_github_repo_link}"
    cf_challenge_error: str = "Giải thất bại <{detail}>"
