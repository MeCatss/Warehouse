from database import products

class ProductService:
    def __init__(self):
        self.collection = products

    def get_all_products(self): #
        result = list(self.collection.find({}, {"_id": 0}))
        return {"products": result}

    def contest(self):
        return {"Connection Secure"}

    def history_product(self): #sort by product submitted 
        result = list(self.collection.find({}, {"_id": 0}))
        return {"products": result}

# GET /products/{id} — single product
# POST /products — add new product
# PUT /products/{id} — edit product
# DELETE /products/{id} — remove product
# PUT /products/{id}/restock — increase stock
# GET /history — all history logs
# GET /kpi — total products, total stock, low stock count, expiring soon count