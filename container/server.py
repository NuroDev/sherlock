#!/usr/bin/env python3
from flask import Flask, jsonify, request
import json
import subprocess
import re

app = Flask(__name__)

@app.route("/health", methods=["GET"])
def health():
    return jsonify({"status": "healthy"}), 200

@app.route("/check", methods=["POST"])
def check_username():
    data = request.get_json()

    username = data.get("username") if data else None
    if not username:
        return jsonify({"success": False, "data": {}, "error": "No username provided"}), 400

    try:
        result = subprocess.run(
            ["sherlock", "--print-found", "--timeout", "1", username],
            capture_output=True,
            text=True,
            timeout=120
        )

        # Sherlock outputs lines like: "[+] Facebook: https://www.facebook.com/username"
        found_sites = {}
        for line in result.stdout.split("\n"):
            match = re.match(r"^\[\+\]\s+([^:]+):\s+(https?://\S+)", line.strip())
            if match:
                site_name = match.group(1).strip()
                url = match.group(2).strip()
                found_sites[site_name] = {
                    "url": url,
                    "status": "found"
                }

        if found_sites:
            return jsonify({"success": True, "data": found_sites})
        else:
            return jsonify({"success": True, "data": {}, "message": "No profiles found"})
    except subprocess.TimeoutExpired:
        return jsonify({"success": False, "data": {}, "error": "Request timed out after 120 seconds"}), 504
    except Exception as e:
        return jsonify({"success": False, "data": {}, "error": str(e)}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8080)
