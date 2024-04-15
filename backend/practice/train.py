from gensim.models import LdaModel
import gensim.corpora as corpora
import json
from nltk import pos_tag
import re
import spacy  # Optional for advanced NLP
from textblob import TextBlob
import nltk
nltk.download('punkt', quiet=True)
nltk.download('averaged_perceptron_tagger', quiet=True)

text = 'this pc is fine but battery is not good enough'
def clean_text(text):
    text = text.lower()  # Convert to lowercase
    text = re.sub(r'[^\w\s]', '', text)  # Remove non-alphanumeric characters
    text = nltk.word_tokenize(text)  # Tokenize into words
    return text


def get_sentiment(text):
    blob = TextBlob(text)
    sentiment = blob.sentiment
    polarity = sentiment.polarity
    subjectivity = sentiment.subjectivity
    return polarity, subjectivity


# Example usage
# text = "This product is amazing! Highly recommend."
polarity, subjectivity = get_sentiment(text)
print(f"Polarity: {polarity}, Subjectivity: {subjectivity}")

nlp = spacy.load('en_core_web_sm')  # Load smaller English model for efficiency


def get_advanced_sentiment(text):
    doc = nlp(text)
    sentiment = 0
    for token in doc:
        sentiment += token.sentiment
    return sentiment


# Example usage
# text = "The battery life is disappointing, but overall a good product."
advanced_sentiment = get_advanced_sentiment(text)
print(f"Advanced Sentiment: {advanced_sentiment}")


def get_keywords(text):
    tokens = clean_text(text)
    tagged_tokens = pos_tag(tokens)
    keywords = [word for word, pos in tagged_tokens if pos in [
        'NN', 'NNS', 'JJ', 'JJR', 'JJS']]
    return keywords


# Example usage
# text = "The picture quality is great, but the sound is a bit muffled."
keywords = get_keywords(text)
print(f"Keywords: {keywords}")


def get_entities(text):
    doc = nlp(text)
    entities = []
    for ent in doc.ents:
        entities.append((ent.text, ent.label_))
    return entities


# Example usage
# text = "This camera takes fantastic photos in low light conditions."
entities = get_entities(text)
print(f"Entities: {entities}")

reviews = []
with open('C:/Hammad Aslam/BS IT (post ADP)/3rd Semester/Capstone Project/Project/backend/datasets/categories/allFiles/appliances.json') as f:
    data = json.load(f)
    for product in data:
        # print(product['reviews'])
        for review in product['reviews']:
            reviews.append(clean_text(review['review_body']))


    # Assuming you have prepared preprocessed review data in a list called 'reviews'
    dictionary = corpora.Dictionary(reviews)
    corpus = [dictionary.doc2bow(review) for review in reviews]

    # Train the LDA model (adjust num_topics as needed)
    lda_model = LdaModel(corpus, id2word=dictionary, num_topics=5)

    # Get topics and associated keywords
    topics = lda_model.print_topics()
    print(f"Topics: {topics}")
