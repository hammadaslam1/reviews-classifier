import numpy as np
import json
import glob
import re
from textblob import TextBlob
import sys

sys.path.append("./backend/practice")
import geminiModel

# gensim
# import gensim
# import gensim.corpora as corpora
# from gensim.utils import simple_preprocess
# from gensim.models import CoherenceModel

# spacy
import spacy
import spacy.cli
import nltk
# spacy.cli.download("en_core_web_sm")
from nltk.corpus import stopwords
nltk.download('vader_lexicon')

# sentiments
from nltk.sentiment import SentimentAnalyzer, SentimentIntensityAnalyzer

# vis
# import pyLDAvis
# import pyLDAvis.gensim

# import warnings
# warnings.filterwarnings('ignore', category=DeprecationWarning)


def load_data(file):
    with open(file, "r", encoding="utf-8") as f:
        data = json.load(f)
    return data


# data_array = []
# data = load_data("./backend/datasets/categories/electronics/camera_and_photo.json")
# print(data)

# data_array.append(data)

# print(data_array)


# def gen_words(texts):
#     final = []
#     new = gensim.utils.simple_preprocess(texts, deacc=True)
#     # print(new)
#     blob = TextBlob(" ".join(new))
#     final = blob.noun_phrases
#     return final


def lemmatization(texts, allowed_postags=["NOUN", "ADJ", "VERB", "ADV"]):
    nlp = spacy.load("en_core_web_sm", disable=["parser", "ner"])
    text_out = []

    for text in texts["reviews"]:
        new_record = re.sub(" +", " ", text["review_body"])
        doc = nlp(new_record)
        sentiment = ""
        sid = SentimentIntensityAnalyzer()
        scores = sid.polarity_scores(new_record)
        if scores["compound"] >= 0:
            sentiment = "Positive"
        elif scores["compound"] < 0:
            sentiment = "Negative"

        text["sentiment"] = sentiment
        for token in doc:
            filtered_list = [token for token in doc if not token.is_stop]
            lemmas = [f"{token.lemma_}" for token in filtered_list]
            string = " ".join(lemmas)
        final = " ".join(lemmas)
        # print(final)
        stem = geminiModel.gemini(text["review_body"])
        text["review_topics"] = stem
        print(text['review_topics'])
    # text_out.append(final)
    # print
    return text_out


lemma_array = []
for item in data:
    lemmatizedText = lemmatization(item)
    lemma_array.append(lemmatizedText)


# with open("./backend/datasets/categories/electronics/camera_and_photo.json", "w") as f:
#     json.dump(data, f, indent=4)
