import { useState } from "react"
import axios from "axios"

export default function EditModal({ product, onClose, onSuccess }) {
  const [form, setForm] = useState({
    Product_Name: product.Product_Name ?? "",
    Category: product.Category ?? "",
    Expiration_Date: product.Expiration_Date?.split("T")[0] ?? "",
    Unit_Price: product.Unit_Price ?? "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const payload = {
        Product_Name: form.Product_Name,
        Category: form.Category,
        Expiration_Date: form.Expiration_Date || null,
        Unit_Price: form.Unit_Price ? Number(form.Unit_Price) : null,
        };
        await axios.put(`http://127.0.0.1:8000/products/${product._id}`, payload);
        onSuccess();
        onClose();
    } catch (err) {
        console.log("failed", err.message, err.response?.data);
    }
    };
  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg p-6 w-96"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="font-semibold mb-4">Edit Product</h2>
        <form className="space-y-3" onSubmit={handleSubmit}>
          <input name="Product_Name" value={form.Product_Name} onChange={handleChange}
            placeholder="Product name" className="border p-2 w-full" />
          <input name="Category" value={form.Category} onChange={handleChange}
            placeholder="Category" className="border p-2 w-full" />
          <input name="Expiration_Date" type="date" value={form.Expiration_Date}
            onChange={handleChange} className="border p-2 w-full" />
          <input name="Unit_Price" type="number" value={form.Unit_Price}
            onChange={handleChange} placeholder="Unit price" className="border p-2 w-full" />
          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose}
              className="cursor-pointer border px-3 py-2 rounded-lg cursor-pointer">Cancel</button>
            <button type="submit"
              className="cursor-pointer bg-zinc-950 text-white px-3 py-2 rounded-lg cursor-pointer">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}