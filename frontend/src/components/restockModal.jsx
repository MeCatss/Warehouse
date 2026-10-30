import axios from "axios";
import {useState} from "react"

export default function RestockModal({ product, onClose, onSuccess }) {
  const [amount, setAmount] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://127.0.0.1:8000/products/${product._id}/restock`,
        null,
        { params: { quantity: Number(amount) } }
      );
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
        <h2>Restock {product.Product_Name}</h2>
        <form onSubmit={handleSubmit} className="space-y-3 mt-4">
          <p className="text-sm text-zinc-500">Current stock: {product.Stock_Quantity}</p>
          <input
            type="number"
            min="1"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Amount to add"
            className="border p-2 w-full"
            required
          />
          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="border px-3 py-2 rounded-lg cursor-pointer">Cancel</button>
            <button type="submit" className="bg-zinc-950 text-white px-3 py-2 rounded-lg cursor-pointer">Restock</button>
          </div>
        </form>
      </div>
    </div>
  );
}