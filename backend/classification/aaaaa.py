from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from nltk.stem import WordNetLemmatizer
from gensim import corpora, models
import re


def preprocess_text(text):
    # Remove non-alphabetic characters and convert to lowercase
    cleaned_text = re.sub(r'[^a-zA-Z\s]', '', text).lower()

    # Tokenize the cleaned text
    words = word_tokenize(cleaned_text)

    # Remove stopwords and perform lemmatization
    stop_words = set(stopwords.words('english'))
    lemmatizer = WordNetLemmatizer()
    processed_words = [lemmatizer.lemmatize(word) for word in words if word.lower() not in stop_words]

    return processed_words

def lda_topic_identification(text, num_topics=3):
    # Preprocess the text
    processed_text = preprocess_text(text)

    # Create a dictionary and a corpus
    dictionary = corpora.Dictionary([processed_text])
    corpus = [dictionary.doc2bow(processed_text)]

    # Train the LDA model
    lda_model = models.LdaModel(corpus, num_topics=num_topics, id2word=dictionary, passes=15)

    # Get the topics
    topics = lda_model.print_topics(num_words=5)

    return topics

# Example text
text = "I bought this Compaq A1500 this week and am more than satisfied with it. Simple installation without any problems, excellent photo quality resolution even on plain paper, very good managing software and the best part is, I didn't need any customer support to make it run :).\nVery good product with excellent features, quality and resolution. Believe me it's better than the best available in this price range."

# Identify topics using LDA
topics = lda_topic_identification(text)

# Print the identified topics
# print("Identified Topics:")
# for topic in topics:
#     print(topic)

# from bertopic import BERTopic
# from sklearn.datasets import fetch_20newsgroups

# # Load a sample dataset for demonstration purposes
# newsgroups = fetch_20newsgroups(subset='all')
# documents = newsgroups.data[:100]  # Using a subset for demonstration

# # Initialize BERTopic
# model = BERTopic(language="english")

# # Fit BERTopic model on the documents
# topics, probabilities = model.fit_transform(documents)

# # Get the most frequent topics
# top_topics = model.get_topic_freq()

# # Print the top topics
# print("Top Topics:")
# for topic in top_topics:
#     print(f"Topic {topic[0]}: {topic[1]} documents")

# # Visualize the topics
# model.visualize_topics()
