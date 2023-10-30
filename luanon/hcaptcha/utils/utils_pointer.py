import math
import random

from utils.vector import Vector


class UtilsPointer:
    @staticmethod
    def add(a: Vector, b: Vector) -> Vector:
        return Vector(a.x + b.x, a.y + b.y)

    @staticmethod
    def clamp(target: float, _min: float, _max: float) -> float:
        return min(_max, max(_min, target))

    @staticmethod
    def div(a: Vector, b: float) -> Vector:
        return Vector(a.x / b, a.y / b)

    @staticmethod
    def fits(distance: float, width: float) -> float:
        a = 0
        b = 2
        _id = math.log2(distance / width + 1)
        return a + b * _id

    @staticmethod
    def magnitude(a: Vector) -> float:
        return math.sqrt(a.x ** 2 + a.y ** 2)

    @staticmethod
    def mult(a: Vector, b: float) -> Vector:
        return Vector(a.x * b, a.y * b)

    @staticmethod
    def perpendicular(a: Vector) -> Vector:
        return Vector(a.y, -1 * a.x)

    @staticmethod
    def sub(a: Vector, b: Vector) -> Vector:
        return Vector(a.x - b.x, a.y - b.y)

    @staticmethod
    def direction(a: Vector, b: Vector) -> Vector:
        return UtilsPointer.sub(b, a)

    @staticmethod
    def unit(a: Vector) -> Vector:
        return UtilsPointer.div(a, UtilsPointer.magnitude(a))

    @staticmethod
    def set_magnitude(a: Vector, amount: float) -> Vector:
        return UtilsPointer.mult(UtilsPointer.unit(a), amount)

    @staticmethod
    def random_vector(a: Vector, b: Vector) -> Vector:
        vec = UtilsPointer.add(b, UtilsPointer.sub(a, b))
        multiplier = random.random()
        return UtilsPointer.add(a, UtilsPointer.mult(vec, multiplier))

    @staticmethod
    def random_normal_line(a: Vector, b: Vector, _range: float) -> tuple:
        random_midpoint = UtilsPointer.random_vector(a, b)
        normal_vector = UtilsPointer.set_magnitude(
            UtilsPointer.perpendicular(Vector(random_midpoint.x - a.x, random_midpoint.y - a.y)),
            _range
        )
        return random_midpoint, normal_vector

    @staticmethod
    def generate_bezier_anchors(a: Vector, b: Vector, spread: float) -> list:
        side = 1 if round(random.random()) == 1 else -1

        def calculate_random_point_on_normal_line() -> Vector:
            random_midpoint, normal_vector = UtilsPointer.random_normal_line(a, b, spread)
            choice_vector = UtilsPointer.mult(normal_vector, side)
            return UtilsPointer.random_vector(
                random_midpoint,
                UtilsPointer.add(random_midpoint, choice_vector)
            )

        return sorted([
            calculate_random_point_on_normal_line(),
            calculate_random_point_on_normal_line()
        ], key=lambda vector: vector.x)
