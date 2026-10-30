import axios from 'axios'
import {useState, useEffect} from 'react'
import { Trash2, Pencil, PackagePlus } from "lucide-react";

const Productlist =  ({refreshKey, onDelete, onEdit, onRestock}) =>{
    const [productlist, setproductlist] = useState([]);
    useEffect(() => {
        const getproduct = async () => {
        const res = await axios('http://127.0.0.1:8000/products');
        setproductlist(res.data.products);
        console.log(res.data.products)
        };
        getproduct();
    }, [refreshKey]);
return (
    <div className="flex-1 p-6">
    <table className="w-full">
        <caption>Product List</caption>
        <thead className="text-zinc-400 text-sm">
            <tr>
                <th className="px-3 py-2">Product Name</th>
                <th className="px-3 py-2">Category</th>
                <th className="px-3 py-2">Stock</th>
                <th className="px-3 py-2">Date Received</th>
                <th className="px-3 py-2">Expiration Date</th>
                <th className="px-3 py-2">Unit Price</th>
                <th className="px-3 py-2">Actions</th>
            </tr>
        </thead>
        <tbody >
            {productlist.slice(-5).map((product) => ( //////dont forget to remove slice
            <tr key={product._id}>
                <td>{product.Product_Name}</td>
                <td>{product.Category}</td>
                <td>
                    <div className="flex items-center gap-3">
                        {product.Stock_Quantity}
                        <button
                        onClick={() => onRestock(product)}
                        className={`cursor-pointer ${product.Stock_Quantity === 0 ? "text-red-600" : "text-zinc-400 hover:text-zinc-900"}`}
                        >
                        <PackagePlus size={16} />
                        </button>
                    </div>
                </td>
                <td>{new Date(product.Date_Received).toLocaleDateString()}</td>
                <td>{new Date(product.Expiration_Date).toLocaleDateString()}</td>
                <td>{product.Unit_Price}</td>
                <td className="px-3 py-2 flex gap-3">
                    <button 
                    onClick={() => onEdit(product)}
                    className="text-zinc-500 hover:text-zinc-900 cursor-pointer"
                    >
                        <Pencil size={16} />
                    </button>
                    <button
                    onClick={() => onDelete(product)}
                    className="text-zinc-500 hover:text-red-600 cursor-pointer"
                    >
                        <Trash2 size={16} />
                    </button>
                    
                </td>
            </tr>
            ))}
        </tbody>
    </table>
    </div>
)
}
export default Productlist