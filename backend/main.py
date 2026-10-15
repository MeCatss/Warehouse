from fastapi import FastAPI
# from database import products
from services import ProductService

app = FastAPI()
product_service = ProductService()

@app.get("/")
def connection_test():
    return product_service.contest()

@app.get("/products")
def get_product():
    return product_service.get_all_products()





