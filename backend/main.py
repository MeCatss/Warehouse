from fastapi import FastAPI
from database import products

app = FastAPI()

@app.get("/")
def main():
    return {"message": "Warehouse API running"}

@app.get("/products")
def get_products():
    result = list(products.find({}, {"_id": 0}))
    return {"products": result}