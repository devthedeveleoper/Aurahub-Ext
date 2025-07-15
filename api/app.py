from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import requests
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

CORS(app, origins=os.getenv("CORS_ORIGINS").split(","))

STREAMTAPE_LOGIN = os.getenv("STREAMTAPE_LOGIN")
STREAMTAPE_KEY = os.getenv("STREAMTAPE_KEY")
DEFAULT_FOLDER = os.getenv("STREAMTAPE_FOLDER")

@app.route("/", methods=["GET"])
def home():
    return "Welcome to the StreamTape API!"

@app.route("/api/files", methods=["GET"])
def list_files():
    folder = request.args.get("folder", DEFAULT_FOLDER)
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

@app.route("/api/upload-url", methods=["GET"])
def get_upload_url():
    folder = request.args.get("folder", DEFAULT_FOLDER)
    url = f"https://api.streamtape.com/file/ul?login={STREAMTAPE_LOGIN}&key={STREAMTAPE_KEY}&folder={folder}"
    try:
        r = requests.get(url)
        return jsonify(r.json())
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
