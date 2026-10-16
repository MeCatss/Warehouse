from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()

client = MongoClient(os.getenv("MONGODB_URL"))
db = client["warehouse-database"]
products = db["products"]
history = db["history"]

# print("Found user document:", products.find_one()) #test connection with mongoatlas
