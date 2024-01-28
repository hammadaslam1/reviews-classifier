import numpy as np
import json
import glob
import re
from textblob import TextBlob

# gensim
import gensim
import gensim.corpora as corpora
from gensim.utils import simple_preprocess
from gensim.models import CoherenceModel

# spacy
import spacy
from nltk.corpus import stopwords

# sentiments
from nltk.sentiment import SentimentAnalyzer, SentimentIntensityAnalyzer

# vis
import pyLDAvis
import pyLDAvis.gensim

# import warnings
# warnings.filterwarnings('ignore', category=DeprecationWarning)


def load_data(file):
    with open(file, 'r', encoding='utf-8') as f:
        data = json.load(f)
    return data


# data_array = []
data = load_data(
    'C:/Hammad Aslam/BS IT (post ADP)/3rd Semester/Capstone Project/Project/backend/datasets/combined_data.json')
# print(data)

# data_array.append(data)

# print(data_array)


def gen_words(texts):
    final = []
    new = gensim.utils.simple_preprocess(texts, deacc=True)
    # print(new)
    blob = TextBlob(' '.join(new))
    final = blob.noun_phrases
    return final


def lemmatization(texts, allowed_postags=['NOUN', 'ADJ', 'VERB', 'ADV']):
    nlp = spacy.load('en_core_web_sm', disable=['parser', 'ner'])
    text_out = []

    for text in texts["reviews"]:
        # print(text["review_body"])
        new_record = re.sub(' +', ' ', text["review_body"])
        # print(new_record)
        doc = nlp(new_record)
        # print(doc)
        sentiment = ''
        sid = SentimentIntensityAnalyzer()
        scores = sid.polarity_scores(new_record)
        if scores["compound"]> 0.5:
            sentiment = 'Strictly Positive'
        elif scores["compound"]>0:
            sentiment = 'Neutrally Positive'
        elif scores["compound"]>-0.5:
            sentiment = 'Neutrally Negative'
        elif scores["compound"]>=-1:
            sentiment = 'Strictly Negative'
            
        # print(sentiment)
        text["sentiment"] = sentiment
        newText = []
        for token in doc:
            # if token.pos_ in allowed_postags:
            newText.append(token.lemma_)
            token_list = [token for token in doc]
            filtered_list = [token for token in doc if not token.is_stop]
            lemmas = [
                f"{token.lemma_}"
                for token in filtered_list
            ]
            string = ' '.join(lemmas)
        final = " ".join(lemmas)
        stem = gen_words(final)
        text["review_topics"] = stem
    text_out.append(final)
    return text_out


lemma_array = []
for item in data:
    lemmatizedText = lemmatization(item)
    lemma_array.append(lemmatizedText)

# print(data)


# with open('./backend/datasets/combined_data.json', 'w') as f:
with open('./backend/datasets/aaaa.json', 'w') as f:
    json.dump(data, f, indent=4)

# print(lemma_array)
# new_data = gen_words(lemma_array)
