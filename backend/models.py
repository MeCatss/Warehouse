from pydantic import BaseModel, Field, field_validator
from typing import Optional
from datetime import datetime

class ProductModel(BaseModel):
    Product_Name: str = Field(default='Name', description="Produck Name")
    Category: str = Field(default='Description', description="Product Description")
    Date_Received: datetime
    Expiration_Date: Optional[datetime] = Field(default=0, description="Expiration Date (optional)")
    Stock_Quantity: int = Field(default=0, description="Initial stock level")
    Unit_Price: Optional[float] = Field(default=0, description="Product Price/Value")

class EditModel(BaseModel):
    Product_Name: Optional[str] = None
    Category: Optional[str] = None
    Expiration_Date: Optional[datetime] = None
    Unit_Price: Optional[float] = None

    @field_validator('Product_Name', 'Category', mode='before')
    def empty_string_to_none(cls, v):
        if v == "string":
            return None
        return v

    @field_validator('Expiration_Date', mode='before')
    def default_date_to_none(cls, v):
        if v == datetime :
            return None
        return v

    @field_validator('Unit_Price', mode='before')
    def zero_to_none(cls, v):
        if v == 0:
            return None
        return v