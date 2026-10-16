from fastapi import FastAPI
from models import ProductModel
from services import ProductService, HistoryService

app = FastAPI()
product_service = ProductService()

@app.get("/")
def connection_test():
    return product_service.con_test()

@app.get("/products")
def get_product():
    return product_service.get_all_products()

@app.get("/products/{id}")
def getone_product(id):
    return product_service.get_one_products(id)

@app.get("/history")
def get_history():
    return HistoryService.history_product()

@app.post("/products")
def add_product(payload: ProductModel):
    return product_service.add_product(payload.dict())

@app.put("/products/{product_id}/restock")
def restock_product(product_id: str, quantity: int):
    return product_service.restock_product(product_id, quantity)




