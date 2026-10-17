from fastapi import FastAPI
from models import ProductModel, EditModel
from services import ProductService, HistoryService

app = FastAPI()
product_service = ProductService()
history_service = HistoryService()
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
    return history_service.history_product()

@app.post("/products")
def add_product(product_data: ProductModel):
    return product_service.add_product(product_data.model_dump())

@app.delete("/products/{id}")
def removeproduct(id):
    return product_service.remove_product(id)

@app.put("/products/{product_id}/restock")
def restock_product(product_id: str, quantity: int):
    return product_service.restock_product(product_id, quantity)

@app.put("/products/{product_id}")
def updateproduct(product_id: str, product_data: EditModel):
    return product_service.edit_product(product_id, product_data.model_dump())


