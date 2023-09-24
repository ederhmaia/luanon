import random

import requests
from PIL import Image, ImageDraw
import torch
from transformers import OwlViTProcessor, OwlViTForObjectDetection

# Load the processor and model
processor = OwlViTProcessor.from_pretrained("google/owlvit-base-patch32")
model = OwlViTForObjectDetection.from_pretrained("google/owlvit-base-patch32")

# Load the image from a URL
url = "https://imgs.hcaptcha.com/iKP1K4qpX8uvdiOTOC5MeSrACKeOeIuxJuYG_IWA7KEDjdd-WA4vnJ2qXSbubcFWHw5RwQM_AKb3zkzdTMOBhEO_lO-Zc-qHu_9WNfqc-o1SswahQk11xW-il8tNPZjqmj9olewaBH2T7oevxiMJR8NNZAcGu8MV4fJzL6OdNsPArDDCIRdfhV7APiqtZ500eEyoOL69R0vGaBWVgDfifNXo1rK71JoelbSu-Fu5LUSExODjRGxjoPQAUP9zIF2zxPraL80ORLTblywcDb9aXUugQfRM3SyXctcOAJTp"
image = Image.open(requests.get(url, stream=True).raw)

# Define the text descriptions for objects in the image
texts = [["a photo of the cat", "a photo of a dog"]]

# Preprocess the inputs
inputs = processor(text=texts, images=image, return_tensors="pt")
outputs = model(**inputs)

# Target image sizes (height, width) to rescale box predictions [batch_size, 2]
target_sizes = torch.Tensor([image.size[::-1]])

# Convert outputs (bounding boxes and class logits) to COCO API format
results = processor.post_process(outputs=outputs, target_sizes=target_sizes)

# Retrieve predictions for the first image for the corresponding text queries
i = 0
text = texts[i]
boxes, scores, labels = results[i]["boxes"], results[i]["scores"], results[i]["labels"]

# Define a score threshold to filter out weak detections
score_threshold = 0.1

# Create a drawing context for the image
draw = ImageDraw.Draw(image)

# Iterate through detected objects and draw bounding boxes
for box, score, label in zip(boxes, scores, labels):
    box = [round(i, 2) for i in box.tolist()]
    if score >= score_threshold:
        print(f"Detected {text[label]} with confidence {round(score.item(), 3)} at location {box}")
        label_text = text[label]
        confidence = round(score.item(), 3)
        draw.rectangle(box, outline="red", width=3)
        draw.text((box[0], box[1]), f"{label_text} ({confidence})", fill=random.choice(["red", "blue", "green", "yellow", "brown", "black", "white"]))

# Display the image with bounding boxes
image.show()
