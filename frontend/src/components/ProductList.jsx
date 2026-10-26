import axios from 'axios'
import {useState, useEffect} from 'react'

const Productlist =  () =>{
    const [productlist, setproductlist] = useState([]);
    useEffect(() => {
        const getproduct = async () => {
        const res = await axios('http://127.0.0.1:8000/products');
        setproductlist(res.data.products);
        console.log(res.data.products)
        };
        getproduct();
    }, []);
return (
    <div className="flex-1 p-6">
    <table className="w-full">
        <thead className="text-zinc-400 text-sm">
            <tr>
                <th>Product Name</th>
                <th>Category</th>
                <th>Stock</th>
                <th>Date Received</th>
                <th>Expiration Date</th>
                <th>Unit Price</th>
            </tr>
        </thead>
        <tbody >
            {productlist.slice(0, 5).map((product) => ( //////dont forget to remove slice
            <tr key={product._id}>
                <td>{product.Product_Name}</td>
                <td>{product.Category}</td>
                <td>{product.Stock_Quantity}</td>
                <td>{new Date(product.Date_Received).toLocaleDateString()}</td>
                <td>{new Date(product.Expiration_Date).toLocaleDateString()}</td>
                <td>{product.Unit_Price}</td>
            </tr>
            ))}
        </tbody>
    </table>
    </div>
)
}
export default Productlist