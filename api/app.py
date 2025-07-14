from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import requests
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

cors_origins = os.getenv("CORS_ORIGINS", "http://localhost:5173").split(",")

CORS(app, origins=cors_origins)

STREAMTAPE_LOGIN = os.getenv("STREAMTAPE_LOGIN")
STREAMTAPE_KEY = os.getenv("STREAMTAPE_KEY")
FOLDER_ID = os.getenv("STREAMTAPE_FOLDER_ID", "Ti1XN9WKft0")  # Default fallback

@app.route("/", methods=["GET"])
def home():
    return "Welcome to the AuraHub API!"

@app.route("/api/files", methods=["GET"])
def list_files():
    folder = request.args.get("folder", FOLDER_ID)
    url = f"https://api.streamtape.com/file/listfolder?login={STREAMTAPE_LOGIN}&key={STREAMTAPE_KEY}&folder={folder}"
    try:
        r = requests.get(url)
        return jsonify(r.json())
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/api/thumbnail", methods=["GET"])
def get_thumbnail():
    file_id = request.args.get("file")
    url = f"https://api.streamtape.com/file/getsplash?login={STREAMTAPE_LOGIN}&key={STREAMTAPE_KEY}&file={file_id}"
    try:
        r = requests.get(url)
        return jsonify(r.json())
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
