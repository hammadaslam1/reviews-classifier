# Using Hugging Face's transformers library for NER
from transformers import BertTokenizer, BertForTokenClassification
import torch

tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')
model = BertForTokenClassification.from_pretrained('bert-base-uncased', num_labels=3)

# Example input text
text = "Apple is a great company."

inputs = tokenizer(text, return_tensors="pt")
outputs = model(**inputs)

# Example outputs
predictions = torch.argmax(outputs.logits, dim=2)
print(predictions)
