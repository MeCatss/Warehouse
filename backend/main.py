from fastapi import FastAPI
from models import ProductModel, EditModel
from fastapi.middleware.cors import CORSMiddleware
from services import ProductService, HistoryService, KPIService

app = FastAPI()
product_service = ProductService()
history_service = HistoryService()
kpi_service = KPIService()

@app.get("/")
def connection_test():
    return product_service.con_test()

@app.get("/products")
def get_product():
    return product_service.get_all_products()

@app.get("/products/{id}")
def getone_product(id):
    return product_service.get_one_products(id)

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
# History log fetch
@app.get("/history")
def get_history():
    return history_service.history_product()

# Key Performance Indicator (KPI)

@app.get("/total-products")
def get_total_products():
    return kpi_service.get_total_products()

@app.get("/total-stock")
def get_total_stock():
    return kpi_service.get_total_stock()

@app.get("/out-stock")
def out_of_stock():
    return kpi_service.get_out_of_stock()

@app.get("/expired-soon")
def expired_soon():
    return kpi_service.get_expiring_soon()

@app.get("/expired")
def expired_soon():
    return kpi_service.get_expired()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)