import utils
import random

from utils.pointer import Pointer


class MotionData:

    def __init__(self) -> None:
        start_pointer = {"x": 100, "y": 100}
        end_pointer = {"x": 1000, "y": 1000}
        self.pointer = Pointer(start_pointer, end_pointer, return_int=True)

    @staticmethod
    def get_screen_properties() -> dict:
        return {
            "availWidth": 2048,
            "availHeight": 1104,
            "width": 2048,
            "height": 1152,
            "colorDepth": 24,
            "pixelDepth": 24,
            "top": 0,
            "left": 0,
            "availTop": 0,
            "availLeft": 0,
            "mozOrientation": "landscape-primary",
            "onmozorientationchange": None
        }

    @staticmethod
    def get_navigator_properties() -> dict:
        return {
            "mimeTypes": {
                "0": {
                    "type": "application/pdf",
                    "description": "Portable Document Format",
                    "suffixes": "pdf"
                },
                "1": {
                    "type": "text/pdf",
                    "description": "Portable Document Format",
                    "suffixes": "pdf"
                },
                "length": 2
            },
            "plugins": {
                "0": {
                    "description": "Portable Document Format",
                    "filename": "internal-pdf-viewer",
                    "name": "PDF Viewer",
                    "length": 2
                },
                "1": {
                    "description": "Portable Document Format",
                    "filename": "internal-pdf-viewer",
                    "name": "Chrome PDF Viewer",
                    "length": 2
                },
                "2": {
                    "description": "Portable Document Format",
                    "filename": "internal-pdf-viewer",
                    "name": "Chromium PDF Viewer",
                    "length": 2
                },
                "3": {
                    "description": "Portable Document Format",
                    "filename": "internal-pdf-viewer",
                    "name": "Microsoft Edge PDF Viewer",
                    "length": 2
                },
                "4": {
                    "description": "Portable Document Format",
                    "filename": "internal-pdf-viewer",
                    "name": "WebKit built-in PDF",
                    "length": 2
                },
                "length": 5
            },
            "pdfViewerEnabled": True,
            "doNotTrack": "unspecified",
            "maxTouchPoints": 0,
            "oscpu": "Windows NT 10.0; Win64; x64",
            "vendor": "",
            "vendorSub": "",
            "productSub": "20100101",
            "cookieEnabled": True,
            "buildID": "20181001000000",
            "mediaSession": {
                "playbackState": "none"
            },
            "webdriver": False,
            "hardwareConcurrency": 12,
            "appCodeName": "Mozilla",
            "appName": "Netscape",
            "appVersion": "5.0 (Windows)",
            "platform": "Win32",
            "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/117.0",
            "product": "Gecko",
            "language": "en-US",
            "languages": {
                "0": "en-US",
                "1": "en"
            },
            "onLine": True
        }

    def get_mm(self) -> list:
        return [[p["x"], p["y"], utils.get_timestamp(plus=random.randint(15, 30))] for p in self.pointer.get_fake_bezier()]

    def get_frame_data(self) -> dict:
        mm = self.get_mm()
        timestamp = utils.get_timestamp()
        return {
            "st": timestamp,
            "dct": timestamp,
            "mm": mm,
            "mm-mp": 0,
            "md": [
                random.choice(mm)
            ],
            "md-mp": 0,
            "mu": [
                random.choice(mm)
            ],
            "mu-mp": 0
        }

    def get_top_level_data(self) -> dict:
        return {
            "inv": False,
            "st": utils.get_timestamp(),
            "sc": self.get_screen_properties(),
            "nv": self.get_navigator_properties(),
            "dr": "",
            "exec": False,
            "wn": [],
            "wn-mp": 0,
            "xy": [],
            "xy-mp": 0,
            "mm": self.get_mm(),
            "mm-mp": 0
        }
