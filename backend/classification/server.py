import json
from flask import Flask
from flask_cors import CORS

# app instance
app = Flask(__name__)
CORS(app)


@app.route("/", methods=['GET'])
def all_products():
    with open('./backend/datasets/aaaa.json', 'r', encoding='utf-8') as f:
        data = json.load(f)
    # return jsonify(data)
    return data





@app.route("/products/<path:fullPath>", methods=['GET'])
def product(fullPath):

    with open('./backend/datasets/categories/'+fullPath, 'r', encoding='utf-8') as f:
        data = json.load(f)
    # product = data[index]
    return data


@app.route("/sentiment/<path:fullPath>/<int:index>", methods=['GET'])
def sentiment(fullPath, index):
    with open('./backend/datasets/categories/'+fullPath, 'r', encoding='utf-8') as f:
        data = json.load(f)
        print(data)
    product = data[index]
    return product


@app.route("/reviews/<path:fullPath>/<int:index>", methods=['GET'])
def reviews_topics(fullPath, index):
    with open('./backend/datasets/categories/'+fullPath, 'r', encoding='utf-8') as f:
        data = json.load(f)
    product = data[index]
    return product['reviews']


if __name__ == "__main__":
    app.run(debug=True, port=8080)
