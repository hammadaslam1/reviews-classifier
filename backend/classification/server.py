import json
from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
from fakeness import extract_stats
from joblib import dump, load

app = Flask(__name__)
CORS(app)

uniPath = 'F:/react projects/reviews-classifier'
saadPath = 'D:/BS-IT/4th semester/Capstone Project II/opinio/reviews-classifier'

hammadPath = 'C:/Hammad Aslam/BS IT (post ADP)/3rd Semester/Capstone Project/reviews-classifier'
homePath = hammadPath

@app.route("/", methods=["GET"])
def all_products():
    with open(homePath+"/backend/datasets/categories/allFiles/appliances.json", "r") as f:
        data = json.load(f)
    # return jsonify(data)
    return data

@app.route("/helpfulness/", methods=["POST"])
def helpfulness():
    data = request.get_json()  # Get JSON data from the request
    array = data.get('array')  # Extract the array from the JSON data
    model = load(homePath+"/backend/models/HelpfulnessClassifier.joblib")
    response = model.predict(array)
    # return jsonify(data)
    return response

@app.route("/fakeness", methods=["POST"])
def fakeness():
    try:
        data = request.get_json()  # Get JSON data from the request
        review = data.get('review')  # Extract the review from the JSON data

        if not review:
            return jsonify({'error': 'No review provided'}), 400

        # Load the model (ensure the path is correct)
        model = load("C:/Hammad Aslam/BS IT (post ADP)/3rd Semester/Capstone Project/reviews-classifier/backend/models/FakenessRandomForestClassifier.joblib")

        # Extract stats from the review (implement extract_stats function as needed)
        stats = extract_stats(review)
        print(f"Extracted stats: {stats}")

        # Predict using the model
        response = model.predict([stats])
        response = response.tolist()
        print(f"Raw model response: {response}")
        # Convert response to list if it's a numpy array
        # if isinstance(response, np.ndarray):
        #     response = response.tolist()
        print(f"Converted response: {response}")

        # Prepare the result
        result = {'stats': stats, 'response': response}

        return jsonify(result), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route("/products/<path:fullPath>", methods=["GET"])
def product(fullPath):

    with open(
        homePath+"/backend/datasets/categories/allFiles/"
        + fullPath,
        "r",
        encoding="utf-8",
    ) as f:
        data = json.load(f)
    # product = data[index]
    return data


@app.route("/sentiment/<path:fullPath>/<int:index>", methods=["GET"])
def sentiment(fullPath, index):
    with open(
        homePath+"/backend/datasets/categories/allFiles/"
        + fullPath,
        "r",
        encoding="utf-8",
    ) as f:
        data = json.load(f)
        print(data)
    product = data[index]
    return product


@app.route("/reviews/<path:fullPath>/<int:index>", methods=["GET"])
def reviews_topics(fullPath, index):
    with open(
        homePath+"/backend/datasets/categories/allFiles/"
        + fullPath,
        "r",
        encoding="utf-8",
    ) as f:
        data = json.load(f)
    product = data[index]
    return product["reviews"]


if __name__ == "__main__":
    app.run(debug=True, port=8080)
