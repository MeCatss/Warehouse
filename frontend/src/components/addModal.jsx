import { useState } from "react";
import axios from 'axios'
import { X } from "lucide-react";

export default function AddModal({ onClose, onSuccess }) {
    const inputClass = "bg-zinc-100 rounded-lg px-3 py-2 w-full text-sm outline-none focus:ring-2 focus:ring-zinc-400";
    const labelClass = "block text-sm font-medium mb-1.5";
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
    // console.log(form)
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = {
            ...form,
            Stock_Quantity: Number(form.Stock_Quantity),
            Unit_Price: form.Unit_Price ? Number(form.Unit_Price) : null,
            };
            // console.log(payload)
            const res = await axios.post("http://localhost:8000/products", payload);
            // console.log(res.data);
            onSuccess();
            onClose();
        } catch (err) {
            console.log("failed", err.message, err.response?.data);
        }
        };

  return (
  <div onClick={onClose} className="fixed z-50 inset-0 bg-black/50 flex items-center justify-center p-4">
    <div onClick={(e) => e.stopPropagation()} className="relative bg-white rounded-xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
      <button type="button" onClick={onClose} className="absolute top-4 right-4 text-zinc-500 hover:text-zinc-900 cursor-pointer">
        <X size={18} />
      </button>
      <h2 className="text-lg font-semibold">Add New Item</h2>
      <p className="text-sm text-zinc-500 mb-5">Enter the details for the new inventory item.</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Item Name *</label>
            <input name="Product_Name" value={form.Product_Name} onChange={handleChange}
              placeholder="Enter item name" className={inputClass} required />
          </div>
          <div>
            <label className={labelClass}>Description</label>
            <input name="Category" value={form.Category} onChange={handleChange}
              placeholder="Optional" className={inputClass} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Amount *</label>
            <input name="Stock_Quantity" type="number" min="0" value={form.Stock_Quantity}
              onChange={handleChange} placeholder="0" className={inputClass} required />
          </div>
          <div>
            <label className={labelClass}>Unit Price</label>
            <input name="Unit_Price" type="number" step="0.01" min="0" value={form.Unit_Price}
              onChange={handleChange} placeholder="0.00" className={inputClass} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Date Received *</label>
            <input type="date" name="Date_Received" value={form.Date_Received}
              onChange={handleChange} className={inputClass} required />
          </div>
          <div>
            <label className={labelClass}>Expiration Date</label>
            <input type="date" name="Expiration_Date" value={form.Expiration_Date}
              onChange={handleChange} className={inputClass} />
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <button type="button" onClick={onClose}
            className="border border-zinc-200 px-4 py-2 rounded-lg text-sm font-medium cursor-pointer hover:bg-zinc-50">
            Cancel
          </button>
          <button type="submit"
            className="bg-zinc-950 hover:bg-zinc-800 text-white px-4 py-2 rounded-lg text-sm font-medium cursor-pointer">
            Add Item
          </button>
        </div>
      </form>
    </div>
  </div>
);
}