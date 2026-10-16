from pydantic import BaseModel, Field
from typing import Optional
from datetime import date

class ProductModel(BaseModel):
    Product_Name: str = Field(default='Name', description="Produck Name")
    Category: str = Field(default='Description', description="Product Description")
    Date_Received: date
    Expiration_Date: Optional[date] = Field(default=0, description="Expiration Date (optional)")
    Stock_Quantity: int = Field(default=0, description="Initial stock level")
    Unit_Price: Optional[float] = Field(default=0, description="Product Price/Value")