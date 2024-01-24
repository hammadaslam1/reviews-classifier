from textblob import TextBlob
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from nltk import FreqDist
import re

def extract_topics(text):
    # Remove non-alphabetic characters and convert to lowercase
    cleaned_text = re.sub(r'[^a-zA-Z\s]', '', text).lower()

    # Tokenize the cleaned text
    words = word_tokenize(cleaned_text)

    # Remove stopwords
    stop_words = set(stopwords.words('english'))
    filtered_words = [word for word in words if word.lower() not in stop_words]
    print(filtered_words)
    # Create a TextBlob object
    blob = TextBlob(' '.join(filtered_words))

    # Get noun phrases
    noun_phrases = []
    noun_phrases.append(blob.noun_phrases)

    return noun_phrases

# Example text
text = "I bought this Compaq A1500 this week and am more than satisfied with it. Simple installation without any problems, excellent photo quality resolution even on plain paper, very good managing software and the best part is, I didn't need any customer support to make it run :).\nVery good product with excellent features, quality and resolution. Believe me it's better than the best available in this price range."

# Extract topics
topics = extract_topics(text)

# Print the extracted topics
print("Extracted Topics:")
for topic in topics:
    print(topic)
