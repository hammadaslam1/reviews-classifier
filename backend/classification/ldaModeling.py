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


# preparing the data

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
length = data_length('./backend/datasets/combined_data.json')
data_array = []
for i in range(0, length):
    data = load_data(
        './backend/datasets/combined_data.json')[i]["product_description"]
    data_array.append(data[0])
    # print(data)

# print(data_array)

stopwords = stopwords.words('english')
# print (stopwords)

# lemmatization


def lemmatization(texts, allowed_postags=['NOUN', 'ADJ', 'VERB', 'ADV']):
    nlp = spacy.load('en_core_web_sm', disable=['parser', 'ner'])
    text_out = []
    # a = texts.split()
    # b = [x for x in a if x!='']
    for text in texts:
        new_record = re.sub(' +', ' ', text)
        # print(new_record)
        doc = nlp(new_record)
        # print(doc)
        newText = []
        for token in doc:
            # if token.pos_ in allowed_postags:
            newText.append(token.lemma_)
            # token_list = [token for token in doc]
            filtered_list = [token for token in doc if not token.is_stop]
            lemmas = [
                f"{token.lemma_}"
                for token in filtered_list
            ]
            # string = ' '.join(lemmas)
        final = " ".join(lemmas)
        text_out.append(final)
    return text_out


lemmatizedText = lemmatization(data_array)
# print(lemmatizedText)


def gen_words(texts):
    final = []
    for text in texts:
        new = gensim.utils.simple_preprocess(text, deacc=True)
        final.append(new)
    return final


new_data = gen_words(lemmatizedText)

# new_data = []
# for i in lemmatizedText:
#     news = gen_words(i)
#     new_data.append(news)

print(new_data)


id2word = corpora.Dictionary(new_data)

corpus = []
for text in new_data:
    a = id2word.doc2bow(text)
    corpus.append(a)

# print(corpus[1])

# word = id2word[[2][:1][0]]
# print(word)


lda_model = gensim.models.ldamodel.LdaModel(
    corpus=corpus, id2word=id2word, num_topics=30, random_state=100, update_every=1, chunksize=100, passes=10, alpha="auto")

# print(lda_model)



pyLDAvis.enable_notebook()
vis = pyLDAvis.gensim.prepare(lda_model, corpus, id2word, mds="mmds", R=30)
vis
