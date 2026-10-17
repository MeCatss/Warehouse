from database import products, history
from bson import ObjectId
from datetime import datetime
from pymongo import ReturnDocument

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
            "action": "Added",
            "amount": product_data["Stock_Quantity"],
            "date": datetime.now()
        })
        
        return {"message": "Product added", "id": str(result.inserted_id)}
    
    def restock_product(self, id: str, quantity:int):
        updated_product = self.collection.find_one_and_update(
            {"_id": ObjectId(id)}, 
            {"$inc": {"Stock_Quantity": quantity}}, 
            return_document=ReturnDocument.AFTER)
        if updated_product:
            updated_product["_id"] = str(updated_product["_id"])
            return {"message": updated_product}
        return {"error"}

    def remove_product(self, id):
        product = self.collection.find_one({"_id": ObjectId(id)})
        if not product:
            return {"error": "Product not found"}
        self.history.insert_one({
                    "product_name": product["Product_Name"],
                    "action": "Removed",
                    "amount": product["Stock_Quantity"],
                    "date": datetime.now()
                })
        self.collection.delete_one({"_id": ObjectId(id)})
        return {str(product["Product_Name"]): "Removed"}

    def edit_product(self, id: str, update_data: dict):
        product = self.collection.find_one({"_id": ObjectId(id)})
        if not product:
            return {"error": "Product not found"}
        
        updated_fields = {k: v for k, v in update_data.items() if v is not None}
        
        if not updated_fields:
            return {"message": "No fields to update"}
        
        self.collection.update_one(
            {"_id": ObjectId(id)},
            {"$set": updated_fields}
        )
        
        self.history.insert_one({
            "product_name": product["Product_Name"],
            "action": "edited",
            "amount": None,
            "changes": updated_fields,
            "date": datetime.now()
        })
        
        return {"message": f"{product['Product_Name']} updated"}

class HistoryService:
    def __init__(self):
        self.history = history
    def history_product(self): #sort by product submitted 
        result = list(self.history.find({}, {"_id": 0}))
        return {"history": result}


# PUT /products/{id} — edit product
# GET /kpi — total products, total stock, low stock count, expiring soon count