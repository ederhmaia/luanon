import os
import time
import threading
from typing import Union

import torch

from base_hcaptcha import BaseHCaptcha

from transformers import ViTImageProcessor, ViTModel

from optimum.onnxruntime import ORTModelForFeatureExtraction

class HCaptcha:

    def __init__(self, host: str, site_key: str = "", href: str = "", worker: int = 1, debug: bool = False) -> None:
        self.host = host
        self.site_key = site_key
        self.href = href
        self.worker = worker
        self.debug = debug

    def solve(self, host: str = None, site_key: str = None, href: str = None, worker: int = None, debug: bool = None) -> Union[str, None]:
        host = host if host else self.host
        site_key = site_key if site_key else self.site_key
        href = href if href else self.href
        worker = worker if worker else self.worker
        debug = debug if debug else self.debug

        # Put here to prevent create many times
        feature_extraction = {
            "processor": ViTImageProcessor.from_pretrained("onnx/"),
            "model": ORTModelForFeatureExtraction.from_pretrained("onnx/")
        }

        resp = BaseHCaptcha(host, site_key, href, worker, debug).render(feature_extraction)
        if isinstance(resp, str):
            return resp
        return self.solve(host, site_key, href, worker, debug)

        def adapter():
            while not event.is_set():
                try:
                    resp = BaseHCaptcha(host, site_key, href, worker, debug).render(feature_extraction)
                    if isinstance(resp, str) and not event.is_set():
                        event.set()
                        return resp
                    time.sleep(1)
                except Exception:
                    pass

        event = threading.Event()
        threads = []
        for index in range(worker):
            if debug:
                print("Worker", index, "starting")
            thread = threading.Thread(target=adapter)
            thread.daemon = True
            threads.append(thread)
            thread.start()
        while not event.is_set():
            pass
        for thread in threads:
            result = thread.join()
            if result:
                return result
