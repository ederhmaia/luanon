import numpy as np


def create_image(width: int, height: int, color: tuple | list = (0, 0, 0)) -> np.array:
    empty_image = np.empty((height, width, len(color)), dtype=np.uint8)
    for index, value in enumerate(color):
        empty_image[:, :, index] = value
    return empty_image
