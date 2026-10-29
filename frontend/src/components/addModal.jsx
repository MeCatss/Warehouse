import { useState } from "react";
import axios from 'axios'

export default function AddModal({ onClose }) {
    const next2Year = new Date(new Date().setFullYear(new Date().getFullYear() + 2));
    const [form, setForm] = useState({
        Product_Name: "",
        Category: "",
        Date_Received: new Date().toISOString().split('T')[0],
        Expiration_Date: next2Year.toISOString().split('T')[0],
        Stock_Quantity: "",
        Unit_Price: "",
    });
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value});
    }
    console.log(form)


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = {
            ...form,
            Stock_Quantity: Number(form.Stock_Quantity),
            Unit_Price: form.Unit_Price ? Number(form.Unit_Price) : null,
            };
            console.log(payload)
            const res = await axios.post("http://localhost:8000/products", payload);
            console.log(res.data);
            onClose();
        } catch (err) {
            console.log("gagal", err.message, err.response?.data);
        }
        };

  return (
    <div onClick={onClose}
      className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-lg p-6 w-96">
        <h2>Add Product</h2>
        <form onSubmit={handleSubmit}>
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
            <label>
                Date Received
            </label>
            <input
                type="date"
                name="Date_Received"
                value={form.Date_Received}
                onChange={handleChange}
                placeholder="Item Input Date"
                className="border p-2 w-full"
            />
            <label>
                Expiration Date
            </label>
            <input
                type="date"
                name="Expiration_Date"
                value={form.Expiration_Date}
                onChange={handleChange}
                placeholder="Item Expiration Date (Optional)"
                className="border p-2 w-full"
            />
            <input
                name="Stock_Quantity"
                type="number"
                value={form.Stock_Quantity}
                onChange={handleChange}
                placeholder="Item Amount"
                className="border p-2 w-full"
            />
            <input
                name="Unit_Price"
                type="number"
                value={form.Unit_Price}
                onChange={handleChange}
                placeholder="Item Value (Optional)"
                className="border p-2 w-full"
            />
            <button type="submit" className="border p-2 w-full hover:border-white cursor-pointer">
                Submit
            </button>
        </form>
      </div>
    </div>
  );
}