from database import products, history
from bson import ObjectId
from datetime import datetime

class ProductService:
    def __init__(self):
        self.collection = products
        self.history = history

    def con_test(self):
        return {"Connection Secure"}

    def get_all_products(self): 
        result = list(self.collection.find({}))
        for item in result:
            item["_id"] = str(item["_id"])
        return {"products": result}

    def get_one_products(self, id): 
        product = self.collection.find_one({"_id": ObjectId(id)})
        if product:
            product["_id"] = str(product["_id"])
            return {"product": product}
        return {"error": "Product not found"}

    def add_product(self, product_data: dict):
        result = self.collection.insert_one(product_data)
        self.history.insert_one({
            "product_name": product_data["Product_Name"],
            "action": "added",
            "amount": product_data["Stock_Quantity"],
            "date": datetime.now()
        })

        return {"message": "Product added", "id": str(result.inserted_id)}
    # def restock_product(self, id):

    # def remove_product(self, id):

    # def edit_product(self, id):

class HistoryService:

    def history_product(self): #sort by product submitted 
        result = list(self.collection.find({}, {"_id": 0}))
        return {"history": result}


# POST /products — add new product
# PUT /products/{id} — edit product
# DELETE /products/{id} — remove product
# PUT /products/{id}/restock — increase stock
# GET /history — all history logs
# GET /kpi — total products, total stock, low stock count, expiring soon count