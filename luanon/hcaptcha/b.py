import numpy
from PIL import Image
from numpy.linalg import norm
from transformers import ViTImageProcessor, ViTModel

image_a = Image.open("a.jpg")
image_b = Image.open("b.jpg")

processor = ViTImageProcessor.from_pretrained("model/processor")
model = ViTModel.from_pretrained("model/model")

inputs_a = processor(images=image_a, return_tensors="pt")
outputs_a = model(**inputs_a)
last_hidden_states_a = outputs_a.last_hidden_state

inputs_b = processor(images=image_b, return_tensors="pt")
outputs_b = model(**inputs_b)
last_hidden_states_b = outputs_b.last_hidden_state

print(last_hidden_states_a)
print(last_hidden_states_b)

feature_a = numpy.squeeze(last_hidden_states_a).flatten().detach().numpy()
feature_b = numpy.squeeze(last_hidden_states_b).flatten().detach().numpy()

print(feature_a)
print(feature_b)

similarity = numpy.dot(feature_a, feature_b) / (norm(feature_a) * norm(feature_b))
print(similarity)
