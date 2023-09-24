import time

from . import exceptions
from .pointer import Pointer
from .motion_data import MotionData
from .exec_runtime import ExecRuntime


def get_timestamp(plus: int = 0) -> int:
    return int(time.time() * 1000) + plus


__all__ = [
    "exceptions",
    "Pointer",
    "MotionData",
    "ExecRuntime",
    "get_timestamp"
]
