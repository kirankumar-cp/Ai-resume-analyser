from pymongo import MongoClient

MONGO_URL = "mongodb://localhost:27017"

client = MongoClient(MONGO_URL)

database = client["ai_resume_analyzer"]

analyses_collection = database["analyses"]