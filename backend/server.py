from flask import Flask, jsonify
from flask_cors import CORS
import json
import os

# app instance
app = Flask(__name__)
CORS(app)


@app.route("/", methods=['GET'])
def return_home():
    with open('./backend/datasets/combined_data.json', 'r', encoding='utf-8') as f:
        data = json.load(f)
    # return jsonify(data)
    return data


if __name__ == "__main__":
    app.run(debug=True, port=8080)
