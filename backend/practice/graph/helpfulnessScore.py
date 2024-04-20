

import nltk
from nltk.sentiment.vader import SentimentIntensityAnalyzer
import json
from pyphen import Pyphen
from textstat import syllable_count, flesch_reading_ease, automated_readability_index


def calculate_helpfulness(text, rating):
    # Preprocessing
    tokens = nltk.word_tokenize(text)
    tokens = [t for t in tokens if t.isalpha() and t.lower(
    ) not in nltk.corpus.stopwords.words('english')]
    text = ' '.join(tokens)

    # Text Metrics Extraction
    word_count = len(tokens)
    sentence_count = len(nltk.sent_tokenize(text))
    # syllable_count = Pyphen().inserted(text).count('-') + 1
    character_count = len(text.replace(' ', ''))
    fres_score = flesch_reading_ease(text)
    ari_score = automated_readability_index(text)

    # Sentiment Analysis
    sia = SentimentIntensityAnalyzer()
    sentiment_scores = sia.polarity_scores(text)

    # Calculate Helpfulness Score
    helpfulness_score = 0
    unhelpfulness_score = 0
    if sentiment_scores['compound'] >= 0.05:

        # method 1:

        # helpfulness_score += 1
        # helpfulness_score += word_count // 5
        # helpfulness_score += sentence_count // 2
        # helpfulness_score += syllable_count // 10
        # helpfulness_score += character_count // 50

        # method 2:

        helpfulness_score = (rating * 0.2) + (character_count * 0.1) + (
            word_count * 0.1) + (sentence_count * 0.1) + (100 - fres_score) * 0.2 + (ari_score * 0.2)

    elif sentiment_scores['compound'] <= -0.05:
        unhelpfulness_score += 1

    # Normalize Scores
    helpfulness_score = (helpfulness_score / len(text)) * 100 if len(text) > 0 else 0
    unhelpfulness_score = (unhelpfulness_score / len(text)) * 100 if len(text) > 0 else 0

    return helpfulness_score, unhelpfulness_score, sentiment_scores['compound']


files = ['camera_and_photo.json', 'computers_laptops.json', 'computers_tablets.json', 'home_improvement.json', 'kitchen_bath_fixtures.json',
         'mens_jackets.json', 'mens_running_shoes.json', 'mens_smart_watches.json', 'mens_wrist_watches.json', 'wifi_and_networking.json', 'women_casual_jackets.json']
count = 0
for file in files:
    with open('C:/Hammad Aslam/BS IT (post ADP)/3rd Semester/Capstone Project/Project/backend/datasets/categories/allFiles/'+file, 'r') as f:
        data = json.load(f)
    for item in data:
        for review in item['reviews']:
            review['review_votes'] = review['review_helpfulness'].split(' ')[0] if review['review_helpfulness'] != "" else '0'
            review['review_helpfulness'], review['review_unhelpfulness'], sentiment_scores = calculate_helpfulness(
                review['review_body'], float(review['review_rating']))
            if sentiment_scores >= 0.5:
                review["sentiment"] = 'Positive'
            else:
                review["sentiment"] = 'Negative'

    with open('C:/Hammad Aslam/BS IT (post ADP)/3rd Semester/Capstone Project/Project/backend/datasets/categories/allFiles/'+file, "w") as f:
        json.dump(data, f, indent=4)
    print(f"{file} has been done and {len(files)-count-1} remaining files")
    count += 1
