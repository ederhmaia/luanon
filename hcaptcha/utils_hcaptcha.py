import io
import jwt
import time
import numpy
import httpx
import random
import string
import requests

from typing import Dict, Any, Optional, Union

import torch
from PIL import Image
from scipy.linalg import norm


class UtilsHCaptcha:

    @staticmethod
    def get(session: httpx.Client, url: str, headers: Dict[str, str]) -> httpx.Response:
        for _ in range(3):
            try:
                resp = session.get(url, headers=headers, timeout=15)
                return resp
            except Exception:
                pass
            time.sleep(1)

    @staticmethod
    def post(session: httpx.Client, url: str, headers: Dict[str, str], data: Optional[str]) -> httpx.Response:
        for _ in range(3):
            try:
                resp = session.post(url, headers=headers, data=data, timeout=15)
                return resp
            except Exception:
                pass
            time.sleep(1)

    @staticmethod
    def download_image(url: str) -> bytes:
        return requests.get(url).content

    @staticmethod
    def jwt_decode(encoded: str) -> Any:
        return jwt.decode(encoded, options={"verify_signature": False})

    @staticmethod
    def get_widget_id() -> str:
        return "".join(random.choices(string.ascii_lowercase + string.digits, k=random.randint(10, 12)))

    @staticmethod
    def check_response(resp: Union[str, httpx.Response]) -> Union[None, str, httpx.Response]:
        if any(error in resp.text for error in ["Maximum requests exceeded.", "Over rate limit"]):
            return None
        elif "generated_pass_UUID" in resp.json():
            return resp.json()["generated_pass_UUID"]
        else:
            return resp

    @staticmethod
    def check_similarity(model, processor, image_main_url, image_check_url):
        with torch.no_grad():
            features = [
                numpy.squeeze(
                    model(**processor(
                        images=Image.open(io.BytesIO(UtilsHCaptcha.download_image(image_url))).convert("RGB").resize((224, 224)),
                        return_tensors="pt"
                    )).last_hidden_state.numpy()
                ).flatten()
                for image_url in [image_main_url, image_check_url]
            ]

            similarity = numpy.dot(features[0], features[1]) / (norm(features[0]) * norm(features[1]))
            return similarity
