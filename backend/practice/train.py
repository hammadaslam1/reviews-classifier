import nltk
nltk.download('punkt', quiet=True)
nltk.download('averaged_perception_tagger', quiet=True)
from nltk import pos_tag
from textblob import TextBlob
import spacy
import re

nlp = spacy.load('en_core_web_sm')

def get_advanced_sentiment():
    text = 'I used this to keep hot chocolate warm for a Christmas event outdoor with my kids. It stored easily in a bag cooler, poured easily, & saved money. I might put a cold drink in it for them in the summer when out in the heat.'
    doc = nlp(text)
    sentiment = 0
    for token in doc: 
        # print(token.sentiment)
        sentiment += token.sentiment
    print(f"advanced sentiment: {sentiment}")

    def clean_text(text):
        text = text.lower()
        text = re.sub(r'[^\w\s]', '', text)
        text = nltk.word_tokenize(text)
        return text

    def get_keywords(text):
        doc = nlp(text)
        entities = []
        for ent in doc.ents:
            entities.append((ent.text, ent.label_))
        return entities
    
    keywords = get_keywords(text)
    print(f"keywords: {keywords}")

    return sentiment

text = 'the battery life is disappointing, but overall a good product.'
advanced_sentiment = get_advanced_sentiment()