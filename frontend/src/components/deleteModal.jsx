import axios from "axios";

export default function DeleteModal({ product, onClose, onSuccess }) {
  const handleDelete = async () => {
    try {
      await axios.delete(`http://127.0.0.1:8000/products/${product._id}`);
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
        <h2 className="font-semibold">Delete product?</h2>
        <p className="text-sm text-zinc-500 mt-1">
          {product.Product_Name} will be removed permanently.
        </p>
        <div className="flex justify-end gap-2 mt-4">
          <button onClick={onClose} className="cursor-pointer border px-3 py-2 rounded-lg">
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="cursor-pointer bg-red-600 text-white px-3 py-2 rounded-lg"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}