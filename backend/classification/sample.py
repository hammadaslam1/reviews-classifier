# !pip install spacy
# !pip install numpy
# !pip install gensim
# !pip install pyLDAvis
import numpy as np
import json
import glob
import re

# gensim
import gensim
import gensim.corpora as corpora
from gensim.utils import simple_preprocess
from gensim.models import CoherenceModel

# spacy
import spacy
from nltk.corpus import stopwords

# vis
import pyLDAvis
import pyLDAvis.gensim

import warnings
warnings.filterwarnings('ignore', category=DeprecationWarning)


def data_length(file):
    # global jsonLength
    with open(file, 'r', encoding='utf-8') as f:
        data = json.load(f)
    # jsonLength = len(data)
    return len(data)


def load_data(file):
    with open(file, 'r', encoding='utf-8') as f:
        data = json.load(f)
    return data


# print(data_length('./backend/datasets/combined_data.json'))
length = data_length(
    'C:/Hammad Aslam/BS IT (post ADP)/3rd Semester/Capstone Project/Project/backend/datasets/combined_data.json')


data_array = []
for i in range(0, length):
    data = load_data(
        'C:/Hammad Aslam/BS IT (post ADP)/3rd Semester/Capstone Project/Project/backend/datasets/combined_data.json')[i]["reviews"]
    # print(data)

    data_array.append(data)


# import sys
# !{sys.executable} -m spacy download en_core_web_sm
def lemmatization(texts, allowed_postags=['NOUN', 'ADJ', 'VERB', 'ADV']):
    nlp = spacy.load('en_core_web_sm', disable=['parser', 'ner'])
    text_out = []
    for text in texts:
        # print(text)
        text_in = []
        for item in text:
            # print(item)
            new_record = re.sub(' +', ' ', item["review_body"])
            # print(new_record)
            doc = nlp(new_record)
            # print(doc)
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
                # string = ' '.join(lemmas)
            final = " ".join(lemmas)
            text_in.append(final)
        text_out.append(text_in)
    return text_out


lemmatizedText = lemmatization(data_array)


def gen_words(texts):
    final = []
    for text in texts:
        inner = []
        for item in text:
            new = gensim.utils.simple_preprocess(item, deacc=True)
        inner.append(new)
    final.append(inner)
    return final


new_data = gen_words(lemmatizedText)

# new_data = []
# for i in lemmatizedText:
#     news = gen_words(i)
#     new_data.append(news)

# print(new_data[1])
new_data = new_data[0]
print(new_data)
id2word = corpora.Dictionary(new_data)


corpus = []
for text in new_data:
    a = id2word.doc2bow(text)
    corpus.append(a)

print(corpus)

# word = id2word[[2][:1][0]]
# print(word)


lda_model = gensim.models.ldamodel.LdaModel(
    corpus=corpus, id2word=id2word, num_topics=30, random_state=100, update_every=1, chunksize=100, passes=10, alpha="auto")

# print(lda_model)

# pyLDAvis.enable_notebook()
# vis = pyLDAvis.gensim.prepare(lda_model, corpus, id2word, mds="mmds", R=30)
# vis
