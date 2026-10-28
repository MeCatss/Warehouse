import { useState } from "react";

export default function AddModal({ onClose }) {
    const [form, setForm] = useState({
        Product_Name: "",
        Category: "",
        Date_Received: new Date().toISOString().split('T')[0],
        Expiration_Date: new Date().toISOString().split('T')[0],
        Stock_Quantity: "",
        Unit_Price: "",
    });
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value});
    }
    console.log(form)
  return (
    <div onClick={onClose}
      className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-lg p-6 w-96">
        <h2>Add Product</h2>
        <input
            name="Product_Name"
            value={form.Product_Name}
            onChange={handleChange}
            placeholder="Item Name"
            className="border p-2 w-full"
        />
        <input
            name="Category"
            value={form.Category}
            onChange={handleChange}
            placeholder="Item Description (Optional)"
            className="border p-2 w-full"
        />
        <input
            name="Date_Received"
            value={form.Date_Received}
            onChange={handleChange}
            placeholder="Item Input Date"
            className="border p-2 w-full"
        />
        <input
            name="Expiration_Date"
            value={form.Expiration_Date}
            onChange={handleChange}
            placeholder="Item Expiration Date (Optional)"
            className="border p-2 w-full"
        />
        <input
            name="Stock_Quantity"
            value={form.Stock_Quantity}
            onChange={handleChange}
            placeholder="Item Amount"
            className="border p-2 w-full"
        />
        <input
            name="Unit_Price"
            value={form.Unit_Price}
            onChange={handleChange}
            placeholder="Item Value (Optional)"
            className="border p-2 w-full"
        />
      </div>
    </div>
  );
}