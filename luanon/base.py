"""
    Tác giả: GnU
    Ngày tạo: 11/09/2023
    ©2023 LuaNonTeam
"""

# Chứa các hàm cơ sở cần thiết để chạy được những module của thư viện luanon

import subprocess


def log(name: str, *messages: any) -> None:
    full_message = " - ".join(map(str, messages))
    print(f"[{name}] - {full_message}")


def base_install(packages: dict[str, list[str]]) -> None:
    py_packages = packages["python"]
    for py_package in py_packages:
        try:
            log("Python", "Đang cài đặt", f"[{py_package}]")
            cmd = [
                "pip",
                "install",
                "--force-reinstall",
                py_package
            ]
            result = subprocess.run(cmd, capture_output=True, text=True)
            if result.returncode == 0:
                log("Python", "Cài đặt thành công", f"[{py_package}]")
            else:
                log("Python", "Cài đặt thất bại", f"[{py_package}]")
                for err in result.stderr.split("\n"):
                    if err:
                        log("Python", "Lỗi", err)
            print("")
        except Exception as ex:
            log("Python", "Lỗi", repr(ex))

    nodejs_packages = packages["nodejs"]
    for nodejs_package in nodejs_packages:
        try:
            log("NodeJS", "Đang cài đặt", f"[{nodejs_package}]")
            cmd = [
                "npm",
                "install",
                "--global",
                "--force",
                "--no-save",
                nodejs_package
            ]
            result = subprocess.run(" ".join(cmd), shell=True, capture_output=True, text=True)
            if result.returncode == 0:
                log("NodeJS", "Cài đặt thành công", f"[{nodejs_package}]")
            else:
                log("NodeJS", "Cài đặt thất bại", f"[{nodejs_package}]")
                for err in result.stderr.split("\n"):
                    if err:
                        log("NodeJS", "Lỗi", err)
            print("")
        except Exception as ex:
            log("NodeJS", "Lỗ4i", repr(ex))


def base_uninstall(packages: dict[str, list[str]]) -> None:
    py_packages = packages["python"]
    for py_package in py_packages:
        try:
            log("Python", "Đang gỡ cài đặt", f"[{py_package}]")
            cmd = [
                "pip",
                "uninstall",
                "--yes",
                py_package
            ]
            result = subprocess.run(cmd, capture_output=True, text=True)
            if result.returncode == 0:
                log("Python", "Gỡ cài đặt thành công", f"[{py_package}]")
            else:
                log("Python", "Gỡ cài đặt thất bại", f"[{py_package}]")
                for err in result.stderr.split("\n"):
                    if err:
                        log("Python", "Lỗi", err)
            print("")
        except Exception as ex:
            log("Python", "Lỗi", repr(ex))

    nodejs_packages = packages["nodejs"]
    for nodejs_package in nodejs_packages:
        try:
            log("NodeJS", "Đang gỡ cài đặt", f"[{nodejs_package}]")
            cmd = [
                "npm",
                "uninstall",
                "--global",
                "--force",
                nodejs_package
            ]
            result = subprocess.run(" ".join(cmd), shell=True, capture_output=True, text=True)
            if result.returncode == 0:
                log("NodeJS", "Gỡ cài đặt thành công", f"[{nodejs_package}]")
            else:
                log("NodeJS", "Gỡ cài đặt thất bại", f"[{nodejs_package}]")
                for err in result.stderr.split("\n"):
                    if err:
                        log("NodeJS", "Lỗi", err)
            print("")
        except Exception as ex:
            log("NodeJS", "Lỗi", repr(ex))
