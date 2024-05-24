import numpy as np # linear algebra
import pandas as pd # data processing, CSV file I/O (e.g. pd.read_csv)
pd.options.mode.chained_assignment = None

#Pre-Processing Imports
from datetime import datetime, timedelta
from dateutil.relativedelta import relativedelta
import matplotlib.pyplot as plt

import contractions
#Feature Extraction Imports

#Sentiment
from textblob import TextBlob

#POS Tagging
import nltk
nltk.download("popular")
from nltk import FreqDist
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize, sent_tokenize
from collections import Counter
stop_words = set(stopwords.words('english'))
import re

#Text Feature Generation
import string
import joblib



def fixContra(text):
    return contractions.fix(text)



def extract_stats(review):
    data_stat = {}
    review = fixContra(review)
    review = review.replace('\W', ' ')
    review = review.replace('\d', ' ')
    testimonial = TextBlob(review)
    Sentiment = testimonial.sentiment.polarity
    Subjectivity = testimonial.sentiment.subjectivity
    neg = 0
    words = review.split()
    for w in words:
        testimonial = TextBlob(w)
        score = testimonial.sentiment.polarity
        if score < 0:
            neg += 1
    neg_count = neg
    word_count = len(review.split(' '))
    unique_words = len(set(review.lower().split(' ')))

    articles = ['a', 'an', 'the']
    negations = ['no', 'not', 'none', 'nobody', 'nothing',
                 'neither', 'nowhere', 'never', 'hardly', 'barely', 'scarcely']
    auxilliary = ['am', 'is', 'are', 'was', 'were', 'be', 'being', 'been', 'will', 'would', 'shall', 'should',
                  'may', 'might', 'must', 'can', 'could', 'do',    'does', 'did', 'have', 'having', 'has', 'had']

    filter = re.sub('[^\w\s]', '', review)
    conver_lower = filter.lower()
    Tinput = conver_lower.split(" ")
    for i in range(0, len(Tinput)):
        Tinput[i] = "".join(Tinput[i])
    UniqW = Counter(Tinput)
    s = " ".join(UniqW.keys())
    tokenized = sent_tokenize(s)
    Noun = 0
    Adj = 0
    Verb = 0
    Adv = 0
    Pro = 0
    Pre = 0
    Con = 0
    Art = 0
    Nega = 0
    Aux = 0
    for i in tokenized:
        wordsList = nltk.word_tokenize(i)
        Art = 0
        Nega = 0
        Aux = 0
        for word in wordsList:
            if word in articles:
                Art += 1
            elif word in negations:
                Nega += 1
            elif word in auxilliary:
                Aux += 1
        tagged = nltk.pos_tag(wordsList)
        counts = Counter(tag for word, tag in tagged)
        Noun += sum([counts[i] for i in counts.keys() if 'NN' in i])
        Adj += sum([counts[i] for i in counts.keys() if 'JJ' in i])
        Verb += sum([counts[i] for i in counts.keys() if 'VB' in i])
        Adv += sum([counts[i] for i in counts.keys() if 'RB' in i])
        Pro += sum([counts[i] for i in counts.keys() if (('PRP' in i) or ('PRP$' in i) or ('WP' in i) or ('WP$' in i))])
        Pre += sum([counts[i] for i in counts.keys() if 'IN' in i])
        Con += sum([counts[i] for i in counts.keys() if 'CC' in i])

    authenticity = (Pro + unique_words - neg_count) / word_count
    at = 30 + (Art + Pre - Pro - Aux - Con - Adv - Nega)
    data_stat = [Sentiment/word_count, Subjectivity/word_count, neg_count/word_count, word_count/word_count, unique_words/word_count, Noun/word_count, Adj/word_count, Verb/word_count, Adv/word_count, Pro/word_count, Pre/word_count, Con/word_count, Art/word_count, Aux/word_count, authenticity, at]
    print(Sentiment, Subjectivity, neg, word_count, unique_words, Noun, Adj, Verb, Adv, Pro, Pre, Con, Art, Aux, authenticity, at)
    return data_stat