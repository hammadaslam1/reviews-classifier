from flask import Flask, jsonify
from flask_cors import CORS
import json
import os
import sentiments
from sentiments import *

# app instance
app = Flask(__name__)
CORS(app)


@app.route("/", methods=['GET'])
def all_products():
    with open('./backend/datasets/aaaa.json', 'r', encoding='utf-8') as f:
        data = json.load(f)
    # return jsonify(data)
    return data


@app.route("/computers/<int:index>", methods=['GET'])
def computers_laptops(index):
    with open('./backend/datasets/categories/computers/computers_laptops.json', 'r', encoding='utf-8') as f:
        data = json.load(f)
        print(data)
    product = data[index]
    return product


@app.route("/electronics/<int:index>", methods=['GET'])
def camera_and_photo(index):
    with open('./backend/datasets/categories/electronics/camera_and_photo.json', 'r', encoding='utf-8') as f:
        data = json.load(f)
        print(data)
    product = data[index]
    return product


@app.route("/home/<int:index>", methods=['GET'])
def home_improvement(index):
    with open('./backend/datasets/categories/tools_and_home_improvement/home_improvement.json', 'r', encoding='utf-8') as f:
        data = json.load(f)
        print(data)
    product = data[index]
    return product


@app.route("/appliances/<int:index>", methods=['GET'])
def appliances(index):
    with open('./backend/datasets/categories/tools_and_home_improvement/appliances.json', 'r', encoding='utf-8') as f:
        data = json.load(f)
        print(data)
    product = data[index]
    return product


@app.route("/kitchen/<int:index>", methods=['GET'])
def kitchen_bath_fixtures(index):
    with open('./backend/datasets/categories/tools_and_home_improvement/kitchen_bath_fixtures.json', 'r', encoding='utf-8') as f:
        data = json.load(f)
        print(data)
    product = data[index]
    return product


@app.route("/products/<path:fullPath>", methods=['GET'])
def product(fullPath):

    with open('./backend/datasets/categories/'+fullPath, 'r', encoding='utf-8') as f:
        data = json.load(f)
    # product = data[index]
    return data


@app.route("/reviews/<path:fullPath>/<int:index>", methods=['GET'])
def reviews_topics(fullPath, index):
    with open('./backend/datasets/categories/'+fullPath, 'r', encoding='utf-8') as f:
        data = json.load(f)
    product = data[index]
    return product['reviews']


if __name__ == "__main__":
    app.run(debug=True, port=8080)
