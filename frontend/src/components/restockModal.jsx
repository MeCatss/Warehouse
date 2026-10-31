import axios from "axios";
import {useState} from "react"
import { X } from "lucide-react";

export default function RestockModal({ product, mode = "restock", onClose, onSuccess }) {
  const inputClass = "bg-zinc-100 rounded-lg px-3 py-2 w-full text-sm outline-none focus:ring-2 focus:ring-zinc-400";
  const labelClass = "block text-sm font-medium mb-1.5";
  const [amount, setAmount] = useState("");
  const isReduce = mode === "reduce";
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/products/${product._id}/restock`,{
        quantity: isReduce ? -Number(amount) : Number(amount),
    });
      onSuccess();  
      onClose();
    } catch (err) {
      console.log("failed", err.message, err.response?.data);
    }
  };

  return (
  <div onClick={onClose} className="fixed z-50 inset-0 bg-black/50 flex items-center justify-center p-4">
    <div onClick={(e) => e.stopPropagation()} className="relative bg-white rounded-xl p-6 w-full max-w-md">
      <button type="button" onClick={onClose} className="absolute top-4 right-4 text-zinc-500 hover:text-zinc-900 cursor-pointer">
        <X size={18} />
      </button>
      <h2 className="text-lg font-semibold">{isReduce ? "Reduce" : "Restock"} Item</h2>
      <p className="text-sm text-zinc-500 mb-5">
        {product.Product_Name} · Current stock: {product.Stock_Quantity}
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className={labelClass}>
            {isReduce ? "Amount to Remove *" : "Amount to Add *"}
          </label>
          <input
            type="number"
            min="1"
            max={isReduce ? product.Stock_Quantity : undefined}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0"
            className={inputClass}
            required
          />
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <button type="button" onClick={onClose}
            className="border border-zinc-200 px-4 py-2 rounded-lg text-sm font-medium cursor-pointer hover:bg-zinc-50">
            Cancel
          </button>
          <button type="submit"
            className="bg-zinc-950 hover:bg-zinc-800 text-white px-4 py-2 rounded-lg text-sm font-medium cursor-pointer">
            {isReduce ? "Reduce" : "Restock"}
          </button>
        </div>
      </form>
    </div>
  </div>
);
}