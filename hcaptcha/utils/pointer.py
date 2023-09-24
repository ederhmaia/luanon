import math
import random
import bezier
import numpy

from utils.vector import Vector

from utils.utils_pointer import UtilsPointer


class Pointer:
    def __init__(self, start_pointer=None, end_pointer=None, width: int = 300, steps: int = 200, return_int: bool = False) -> None:
        if start_pointer is None:
            start_pointer = {"x": 0, "y": 0}
        if end_pointer is None:
            end_pointer = {"x": 100, "y": 100}
        self.start_pointer = Vector(**start_pointer)
        self.end_pointer = Vector(**end_pointer)
        self.width = width
        self.steps = steps
        self.return_int = return_int

    def bezier_curve(self) -> bezier.curve.Curve:
        # After trying many times, I think this is the best value
        _min = 2
        _max = 20
        vec = UtilsPointer.direction(self.start_pointer, self.end_pointer)
        length = UtilsPointer.magnitude(vec)
        spread = UtilsPointer.clamp(length, _min, _max)
        anchors = UtilsPointer.generate_bezier_anchors(
            self.start_pointer,
            self.end_pointer, spread
        )
        all_vectors = [self.start_pointer] + anchors + [self.end_pointer]
        nodes = [
            [elem.x for elem in all_vectors],
            [elem.y for elem in all_vectors],
        ]
        return bezier.curve.Curve.from_nodes(nodes)

    def get_fake_bezier(self) -> list:
        curve = self.bezier_curve()
        length = curve.length * 0.8
        baseTime = random.random() * self.steps
        steps = math.ceil((math.log2(UtilsPointer.fits(length, self.width) + 1) + baseTime) * 3)
        s_vals = numpy.linspace(0.0, 1.0, steps)
        points = curve.evaluate_multi(s_vals)
        vectors = []
        for i in range(steps):
            vectors.append(Vector(points[0][i], points[1][i]))
        if self.return_int:
            return [{"x": int(vector.x), "y": int(vector.y)} for vector in vectors]
        return [vector.__dict__ for vector in vectors]
