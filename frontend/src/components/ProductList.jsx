import axios from 'axios'
import {useState, useEffect} from 'react'
import { Trash2, Pencil, PackagePlus, PackageMinus } from "lucide-react";

const Productlist =  ({refreshKey, onDelete, onEdit, onRestock, onReduce, stockFilter }) =>{
    const [productlist, setproductlist] = useState([]);
    useEffect(() => {
        const getproduct = async () => {
        const res = await axios('0/products');
        setproductlist(res.data.products);
        console.log(res.data.products)
        };
        getproduct();
    }, [refreshKey]);

    const [search, setSearch] = useState("");

    const filtered = productlist.filter(
    (p) =>
        (!stockFilter || stockFilter.ids.includes(p._id)) &&
        `${p.Product_Name} ${p.Category}`.toLowerCase().includes(search.toLowerCase())
    );
    return (
    <div className="border border-zinc-200 rounded-xl bg-white p-5">
        <h2 className="font-semibold mb-4">Inventory Items</h2>
        <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or category..."
            className="bg-zinc-100 rounded-lg px-3 py-2 w-full mb-4 text-sm"
        />
        <div className="max-h-[60vh] overflow-y-auto">
            <table className="w-full text-sm">
                <thead className="top-0 bg-white text-left text-zinc-500 sticky z-30">
                    <tr className='border-b border-zinc-100'>
                        <th className="px-3 py-2">Item Name</th>
                        <th className="px-3 py-2">Description / Category</th>
                        <th className="px-3 py-2 text-center">Stock</th>
                        <th className="px-3 py-2 text-center">Date Received</th>
                        <th className="px-3 py-2 text-center">Expiration Date</th>
                        <th className="px-3 py-2 text-center">Price</th>
                        <th className="px-3 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filtered.map((product) => ( //////dont forget to remove slice
                    <tr key={product._id} className='border-b border-zinc-100'>
                        <td className="px-3 py-2">{product.Product_Name}</td>
                        <td className="px-3 py-2">{product.Category}</td>
                        <td className="px-3 py-2">
                            <div className="flex items-center justify-center gap-3">
                                <button
                                    onClick={() => onReduce(product)}
                                    disabled={product.Stock_Quantity === 0}
                                    className="cursor-pointer text-zinc-400 hover:text-zinc-900 disabled:opacity-30 disabled:cursor-not-allowed"
                                    >
                                    <PackageMinus size={16} />
                                </button>
                                <span className="w-8 text-center">{product.Stock_Quantity}</span>
                                <button
                                onClick={() => onRestock(product)}
                                className={`cursor-pointer ${product.Stock_Quantity === 0 ? "text-red-600" : "text-zinc-400 hover:text-zinc-900"}`}
                                >
                                <PackagePlus size={16} />
                                </button>
                                
                            </div>
                        </td >
                        <td className="px-3 py-2 text-center">{new Date(product.Date_Received).toLocaleDateString()}</td>
                        <td className="px-3 py-2 text-center">{new Date(product.Expiration_Date).toLocaleDateString()}</td>
                        <td className="px-3 py-2 text-center">{product.Unit_Price != 0
                            ? `$${Number(product.Unit_Price).toLocaleString("en-US", { minimumFractionDigits: 2 })}`
                            : "-"}</td>
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
    </div>
    )
}
export default Productlist





