import numpy as np
import json
import glob
import re
import geminiModel
# import contextModel

import spacy
import spacy.cli
from nltk.sentiment import SentimentAnalyzer, SentimentIntensityAnalyzer


def final(file, destination, array, filename, count):
    name = filename.split('.')[0]

    def load_data(fileData):
        with open(fileData, "r", encoding="utf-8") as f:
            data = json.load(f)
        return data

    data = load_data(file)
    global counter
    counter = count

    def lemmatization(texts, allowed_postags=["NOUN", "ADJ", "VERB", "ADV"]):
        nlp = spacy.load("en_core_web_sm", disable=["parser", "ner"])
        text_out = []
        global counter
        counter = count

        for text in texts["reviews"]:
            stem = geminiModel.gemini(text["review_body"], array)
            print(stem)
        text_out.append(final)
        return text_out

    lemma_array = []
    for item in data:
        lemmatizedText = lemmatization(item)

    with open(destination, "w") as f:
        json.dump(data, f, indent=4)
    return counter
