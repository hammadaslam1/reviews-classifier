import numpy as np
import json
import glob
import re
# from textblob import TextBlob

# import sys

# sys.path.append("./backend/practice")
import geminiModel

# spacy
import spacy
import spacy.cli
# import nltk
# from nltk.corpus import stopwords
#
# nltk.download("vader_lexicon")

# sentiments
# from nltk.sentiment import SentimentAnalyzer, SentimentIntensityAnalyzer


def final(file, destination, array, filename):
    # print(file)
    name = filename.split('.')[0]

    def load_data(fileData):
        with open(fileData, "r", encoding="utf-8") as f:
            data = json.load(f)
        return data

    data = load_data(file)
    # lemmatization
    # lemmatization
    global count
    count = 0

    def lemmatization(texts, allowed_postags=["NOUN", "ADJ", "VERB", "ADV"]):
        nlp = spacy.load("en_core_web_sm", disable=["parser", "ner"])
        text_out = []
        # count = 0
        global count
        texts['category'] = ['hometools']
        texts['subcategory'] = [name]

        for text in texts["reviews"]:
            # new_record = re.sub(" +", " ", text["review_body"])
            # doc = nlp(new_record)
            # sentiment = ""
            # sid = SentimentIntensityAnalyzer()
            # scores = sid.polarity_scores(new_record)
            # if scores["compound"] > 0.5:
            #     sentiment = "Strictly Positive"
            # elif scores["compound"] > 0:
            #     sentiment = "Neutrally Positive"
            # elif scores["compound"] > -0.5:
            #     sentiment = "Neutrally Negative"
            # elif scores["compound"] >= -1:
            #     sentiment = "Strictly Negative"

            # text["sentiment"] = sentiment
            # for token in doc:
            #     filtered_list = [token for token in doc if not token.is_stop]
            #     lemmas = [f"{token.lemma_}" for token in filtered_list]
            #     string = " ".join(lemmas)
            # final = " ".join(lemmas)
            # print(final)
            stem = geminiModel.gemini(text["review_body"], array)
            text["review_topics"] = stem.split(', ')
            print(text["review_topics"])
            count = count + 1
            print(count)
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
