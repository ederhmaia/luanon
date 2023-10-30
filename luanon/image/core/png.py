import numpy as np

import zlib
import struct

from . import image_core


class PNG(image_core.ImageCore):
    # https://en.wikipedia.org/wiki/PNG

    @staticmethod
    def get_image_data(image_bytes):
        image_data = {}
        pos = 8  # Skip header

        while pos < len(image_bytes):
            # Extract chunk length
            chunk_length = struct.unpack(">I", image_bytes[pos:pos + 4])[0]
            pos += 4  # Skip chunk length

            # Extract chunk name
            chunk_name = image_bytes[pos:pos + 4].decode("UTF-8")
            pos += 4  # Skip chunk name

            # Extract chunk data
            chunk_data = image_bytes[pos:pos + chunk_length]
            pos += chunk_length  # Skip chunk data
            pos += 4  # Skip CRC

            data = {
                "data": chunk_data,
                "length": chunk_length
            }

            # Store chunk data in the dictionary
            if chunk_name in image_data:
                image_data[chunk_name].append(data)
            else:
                image_data[chunk_name] = [data]

        return image_data

    @staticmethod
    def get_headers(image_data):
        # Extract image header information
        ihdr_data = b"".join([ihdr["data"] for ihdr in image_data["IHDR"]])
        width, height, bit_depth, color_type, _, _, _ = struct.unpack(">IIBBBBB", ihdr_data)

        # Determine the number of channels based on color type
        if color_type == 0:
            channels = 1
        elif color_type in [4, 6]:
            channels = 4
        else:
            channels = 3

        return {
            "width": width,
            "height": height,
            "bit_depth": bit_depth,
            "color_type": color_type,
            "channels": channels
        }

    @staticmethod
    def get_pixels(image_data, headers):
        # Extract and decode image data
        idat_data = b"".join([idat["data"] for idat in image_data["IDAT"]])
        decoded_image_data = zlib.decompress(idat_data)

        # Process pixel data based on color type
        width = headers["width"]
        height = headers["height"]
        color_type = headers["color_type"]
        channels = headers["channels"]

        match color_type:
            case 0 | 2 | 6:
                stride = headers["width"] * headers["channels"]
                array = np.empty((height, stride), dtype=np.uint8)

                for h in range(height):
                    filter_type = decoded_image_data[h * stride + h]

                    for width_depth in range(stride):
                        a = int(array[h, width_depth - channels] if width_depth >= channels else 0)
                        b = int(array[h - 1, width_depth] if h > 0 else 0)
                        c = int(array[h - 1, width_depth - channels] if h > 0 and width_depth >= channels else 0)

                        raw_pixel = decoded_image_data[h * stride + h + width_depth + 1]

                        if filter_type == 0:  # None
                            pixel = raw_pixel
                        elif filter_type == 1:  # Sub
                            pixel = raw_pixel + a
                        elif filter_type == 2:  # Up
                            pixel = raw_pixel + b
                        elif filter_type == 3:  # Average
                            pixel = raw_pixel + (a + b) // 2
                        elif filter_type == 4:  # Paeth
                            p = a + b - c
                            pixel = raw_pixel + (a if abs(p - a) <= abs(p - b) and abs(p - a) <= abs(p - c) else
                                                 b if abs(p - b) <= abs(p - c) else c)
                        else:
                            raise image_core.ImageCoreUnknownFilterType(filter_type)

                        array[h, width_depth] = pixel & 0xff  # truncation to byte
                array = array.reshape(height, width, channels)
                if color_type == 0:
                    array = np.repeat(array, 3, axis=2)
                return array
            case 3:
                plte_data = b"".join([plte["data"] for plte in image_data["PLTE"]])
                # Remove excess data
                array = list(plte_data)[:width * height * channels]
                return np.array(array, dtype=np.uint8).reshape(height, width, channels)
            case 4:
                pass
            case _:
                raise image_core.ImageCoreUnknownColorType(color_type)
