



# ai_blog.py
from flask import Blueprint, request, jsonify
import os
import requests
from dotenv import load_dotenv

load_dotenv()

OPENROUTER_API_KEY = os.getenv("OPENAI_API_KEY")
if not OPENROUTER_API_KEY:
    raise ValueError("OPENAI_API_KEY environment variable is not set. Please set it in your .env file.")
  # good practice
OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions"

ai_blog_bp = Blueprint('ai_blog', __name__)  # renamed to ai_blog_bp for clarity

@ai_blog_bp.route("/api/chat", methods=["POST"])
def chat():
    data = request.json
    topic = data.get("topic")

    if not topic:
        return jsonify({"error": "Topic is required"}), 400

    payload = {
        "model": "mistralai/mistral-7b-instruct",
        "messages": [{"role": "user", "content": f"Write a detailed blog post on: {topic}"}],
    }

    headers = {
        "Authorization": f"Bearer {OPENROUTER_API_KEY}",
        "Content-Type": "application/json",
    }

    try:
        response = requests.post(OPENROUTER_URL, json=payload, headers=headers)
        response.raise_for_status()
        data = response.json()
        blog_content = data["choices"][0]["message"]["content"]
        return jsonify({"blog": blog_content})
    except requests.exceptions.HTTPError as http_err:
        return jsonify({"error": f"HTTP error: {http_err}", "details": response.text}), response.status_code
    except Exception as e:
        return jsonify({"error": str(e)}), 500
