import numpy as np
import json
import glob
import re
# from textblob import TextBlob

# import sys

# sys.path.append("./backend/practice")
# import geminiModel

# spacy
import spacy
import spacy.cli
# import nltk
# from nltk.corpus import stopwords
#
# nltk.download("vader_lexicon")

# sentiments
from nltk.sentiment import SentimentAnalyzer, SentimentIntensityAnalyzer


def final(file, destination, array, filename, count):
    # print(file)
    name = filename.split('.')[0]

    def load_data(fileData):
        with open(fileData, "r", encoding="utf-8") as f:
            data = json.load(f)
        return data

    data = load_data(file)
    # lemmatization
    # lemmatization
    global counter
    counter = count

    def lemmatization(texts, allowed_postags=["NOUN", "ADJ", "VERB", "ADV"]):
        nlp = spacy.load("en_core_web_sm", disable=["parser", "ner"])
        text_out = []
        # count = 0
        global counter
        counter = count
        # texts['category'] = ['home_tools']
        # texts['subcategory'] = [name]

        for text in texts["reviews"]:
            new_record = re.sub(" +", " ", text["review_body"])
            doc = nlp(new_record)
            sentiment = ""
            sid = SentimentIntensityAnalyzer()
            scores = sid.polarity_scores(new_record)
            text['review_rating'] = text['review_rating'].split(' ')[0] if text['review_rating']!="" else '0.0'
            if  float(text['review_rating'])>3:
                sentiment = "Positive"
            elif   float(text['review_rating'])==3:
                sentiment = "Neutrally Positive"
            elif  float(text['review_rating'])<3:
                sentiment = "Negative"
            print(f"sentiment: {sentiment} and rating: {text['review_rating']} and score: {scores['compound']}")
            text["sentiment"] = sentiment
            # for token in doc:
            #     filtered_list = [token for token in doc if not token.is_stop]
            #     lemmas = [f"{token.lemma_}" for token in filtered_list]
            #     string = " ".join(lemmas)
            # final = " ".join(lemmas)
            # print(final)
            # stem = geminiModel.gemini(text["review_body"], array)
            # text["review_topics"] = stem.split(', ')
            # text['review_topics'] = [
            #     item for item in text["review_topics"] if 'input' not in item and 'K42jr-a1' not in item and len(item) <= 25 and 'empty' not in item]
            # print(text["review_topics"])
            if text['review_rating']!="0.0":
                counter = counter + 1
        # print(count)
            # print(text['review_topics'])
        text_out.append(final)
        # print
        return text_out

    lemma_array = []
    for item in data:
        lemmatizedText = lemmatization(item)
        # lemma_array.append(lemmatizedText)
    # print(lemmatizedText)

    with open(destination, "w") as f:
        json.dump(data, f, indent=4)
    return counter
