import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from dotenv import load_dotenv
from flask_jwt_extended import JWTManager
from datetime import timedelta

load_dotenv()

app = Flask(__name__)
CORS(app, origins=["http://localhost:5173"])


class Config:
    SQLALCHEMY_DATABASE_URI = os.getenv("SQLALCHEMY_DATABASE_URI")
    SQLALCHEMY_TRACK_MODIFICATIONS = os.getenv("SQLALCHEMY_TRACK_MODIFICATIONS", "False").lower() == "true"
    SECRET_KEY = os.getenv("SECRET_KEY")
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY")
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(days=1)

app.config.from_object(Config)

db = SQLAlchemy()
db.init_app(app)
jwt = JWTManager(app)

print("✅ Database configuration loaded successfully")
