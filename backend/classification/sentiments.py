from flask import Flask, jsonify
from flask_cors import CORS
import json
import os

# app instance
app = Flask(__name__)
CORS(app)


@app.route("/hammad", methods=['GET'])
def hammad():
    return "hammad"

# reviews_sentiment(0)

if __name__ == "__main__":
    app.run(debug=True, port=8080)