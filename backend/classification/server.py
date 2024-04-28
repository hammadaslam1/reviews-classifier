import json
from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

uniPath = 'F:/react projects/reviews-classifier'
saadPath = 'D:/BS-IT/4th semester/Capstone Project II/opinio/reviews-classifier'

hammadPath = 'C:/Hammad Aslam/BS IT (post ADP)/3rd Semester/Capstone Project/Project'
homePath = saadPath

@app.route("/", methods=["GET"])
def all_products():
    with open(
        homePath+"/backend/datasets/categories/allFiles/appliances.json",
        "r",
    ) as f:
        data = json.load(f)
    # return jsonify(data)
    return data


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
