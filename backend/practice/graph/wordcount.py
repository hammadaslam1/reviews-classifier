import csv
import json
from nltk.tokenize import sent_tokenize, word_tokenize
from textstat import syllable_count, flesch_reading_ease, automated_readability_index

# Function to extract numerical rating from strings like '5.0 out of 5 stars'


def extract_numerical_rating(rating_str):
    parts = rating_str.split(' ')
    if parts:
        return float(parts[0])
    else:
        return None

# Function to calculate the helpfulness score for a review


def calculate_helpfulness_score(rating, review):
    num_characters = len(review)
    num_syllables =syllable_count(review)
    num_words = len(word_tokenize(review))
    num_sentences = len(sent_tokenize(review))
    fres_score = flesch_reading_ease(review)
    ari_score = automated_readability_index(review)
    
    print(f"num_characters: {len(review)}")
    print(f"num_syllables: {syllable_count(review)}")
    print(f"num_words: {len(word_tokenize(review))}")
    print(f"num_sentences: {len(sent_tokenize(review))}")
    print(f"flesch_reading_ease: {flesch_reading_ease(review)}")
    print(f"automated_readability_index: {automated_readability_index(review)}")

    # Calculate helpfulness score using a weighted sum of the mentioned variables
    helpfulness_score = (rating * 0.2) + (num_characters * 0.1) + (num_syllables * 0.1) + (
        num_words * 0.1) + (num_sentences * 0.1) + (100 - fres_score) * 0.2 + (ari_score * 0.2)
    print(f"helpfulness_score: {helpfulness_score}")
    return helpfulness_score


# Read data from CSV file
csv_file = "computers_tablets.csv"  # Replace with your CSV file name
output_json_file = "output.json"  # Output JSON file name

# Process each row in the CSV file and store the results in a list of dictionaries
output_data = []
with open(csv_file, 'r', encoding='ISO-8859-1') as file:
    reader = csv.DictReader(file)
    for row in reader:
        # Check if both 'review_rating' and 'reviews' columns have valid data
        if 'review_rating' in row and 'reviews' in row and row['review_rating'] and row['reviews']:
            # Remove leading and trailing whitespaces
            rating_str = row['review_rating'].strip()
            rating = extract_numerical_rating(rating_str)
            if rating is not None:  # Check if the rating could be extracted successfully
                review = row['reviews']

                # Calculate helpfulness score
                helpfulness_score = calculate_helpfulness_score(rating, review)

                # Store results in a dictionary
                result_dict = {
                    'rating': rating,
                    'review': review,
                    'helpfulness_score': helpfulness_score
                }
                output_data.append(result_dict)
                exit()

# Write results to a JSON file
with open(output_json_file, 'w') as json_file:
    json.dump(output_data, json_file, indent=4)

print(f"Results saved to {output_json_file}")
