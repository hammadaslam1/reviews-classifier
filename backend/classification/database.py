import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from nltk.stem import WordNetLemmatizer
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.decomposition import LatentDirichletAllocation
from sklearn.svm import SVC
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report
from gensim.summarization import summarize

nltk.download('punkt')
nltk.download('stopwords')
nltk.download('wordnet')


def preprocess_text(text):
    stop_words = set(stopwords.words('english'))
    lemmatizer = WordNetLemmatizer()

    # Tokenize
    tokens = word_tokenize(text.lower())

    # Remove stopwords and punctuation, and lemmatize
    tokens = [lemmatizer.lemmatize(
        token) for token in tokens if token.isalnum() and token not in stop_words]

    return ' '.join(tokens)


def extract_features(texts):
    vectorizer = TfidfVectorizer(max_df=0.8, min_df=1, stop_words='english')
    tfidf_matrix = vectorizer.fit_transform(texts)
    return tfidf_matrix, vectorizer


def train_lda_model(tfidf_matrix, num_topics):
    lda_model = LatentDirichletAllocation(
        n_components=num_topics, max_iter=10, learning_method='online', random_state=42)
    lda_model.fit(tfidf_matrix)
    return lda_model


def classify_topics(lda_model, tfidf_matrix, labels):
    # Check the length of tfidf_matrix and labels
    if len(tfidf_matrix) != len(labels):
        raise ValueError(
            "Number of samples in tfidf_matrix and labels must be the same.")

    # Split the dataset into training and testing sets
    X_train, X_test, y_train, y_test = train_test_split(
        tfidf_matrix, labels, test_size=0.2, random_state=42
    )

    # Train the classifier
    clf = SVC(kernel='linear')
    clf.fit(X_train, y_train)

    # Make predictions
    y_pred = clf.predict(X_test)

    # Evaluate the classifier
    print(classification_report(y_test, y_pred))


def summarize_document(text, topic):
    summarized_text = summarize(text)
    print(f'Summary for topic {topic}:')
    print(summarized_text)


# Example usage
documents = [
    "Topic modeling is a technique used to uncover the main themes in text data.",
    "Latent Dirichlet Allocation (LDA) is a popular algorithm for topic modeling.",
    "Gensim is a Python library for topic modeling and other natural language processing tasks."
]

# Preprocess documents
preprocessed_documents = [preprocess_text(doc) for doc in documents]
print('preprocessed_documents')
print(preprocessed_documents)
# Extract features
tfidf_matrix, vectorizer = extract_features(preprocessed_documents)
print('tfidf_matrix')
print(tfidf_matrix)

# Train LDA model
num_topics = 2
lda_model = train_lda_model(tfidf_matrix, num_topics)
print('lda_model')
print(lda_model)

# Classify topics
labels = ['Topic Modeling', 'Library and NLP', 'Topic Modeling']
classify_topics(lda_model, tfidf_matrix, labels)

# Summarize documents based on topics
for i in range(num_topics):
    documents_for_topic = [documents[j] for j in range(
        len(documents)) if lda_model.transform(tfidf_matrix)[j].argmax() == i]
    topic = labels[i]
    for doc in documents_for_topic:
        summarize_document(doc, topic)
