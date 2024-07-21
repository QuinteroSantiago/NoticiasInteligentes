from transformers import AutoTokenizer, AutoModelForSequenceClassification
import torch

# Load the pre-trained BERT model and tokenizer
tokenizer = AutoTokenizer.from_pretrained("cardiffnlp/twitter-xlm-roberta-base-sentiment")
model = AutoModelForSequenceClassification.from_pretrained("cardiffnlp/twitter-xlm-roberta-base-sentiment")

# Function to perform sentiment analysis on input text
def sentiment_analysis(text):
    # Tokenize input text
    inputs = tokenizer(text, return_tensors="pt", truncation=True, max_length=512)

    # Get model predictions
    outputs = model(**inputs)

    # Calculate sentiment score
    sentiment_score = outputs.logits.softmax(dim=-1)
    sentiment_score = sentiment_score[:, 2].item() - sentiment_score[:, 0].item()  # Positive score - Negative score

    return sentiment_score