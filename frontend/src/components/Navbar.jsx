import axios from 'axios'
import {useState, useEffect} from 'react'

const Navbar = () => {
    const [productscount, setproductscount] = useState();
    useEffect(() => {
        const gettotalcount = async () => {
        const res = await axios('http://127.0.0.1:8000/total-products');
        setproductscount(res.data.total_products);
        };
        gettotalcount();
    }, []);

    const [stockcount, setstockcount] = useState();
    useEffect(() => {
        const gettotalstock = async () => {
        const res = await axios('http://127.0.0.1:8000/total-stock');
        setstockcount(res.data.total_stock_quantity);
        };
        gettotalstock();
    }, []);

    const [outstockcount, setoutstockcount] = useState();
    useEffect(() => {
        const getoutstock = async () => {
        const res = await axios('http://127.0.0.1:8000/out-stock');
        setoutstockcount(res.data["Total 0 Stock"]);
        };
        getoutstock();
    }, []);

    const [expiredsoon, setexpiredsoon] = useState();
    useEffect(() => {
        const getexpiredsoon = async () => {
        const res = await axios('http://127.0.0.1:8000/expired-soon');
        setexpiredsoon(res.data['count']);
        };
        getexpiredsoon();
    }, []);
    return(
        <nav className="bg-zinc-900 px-8 py-4 flex items-center justify-between">
            <h1 className='text-white font-bold text-xl'>Warehouse IMS</h1>
            <div className='flex gap-6'>
                <div>
                    <p className='text-zinc-400 text-xs'>Total Products</p>
                    <p className="text-white font-bold text-lg">{productscount}</p>
                </div>
                <div>
                    <p className='text-zinc-400 text-xs'>Total Stocks</p>
                    <p className="text-white font-bold text-lg">{stockcount}</p>
                </div>
                <div>
                    <p className='text-zinc-400 text-xs'>Out of Stock Products</p>
                    <p className="text-white font-bold text-lg">{outstockcount}</p>
                </div>
                <div>
                    <p className='text-zinc-400 text-xs'>Expiring Soon Product</p>
                    <p className="text-white font-bold text-lg">{expiredsoon}</p>
                </div>

            </div>
        </nav>
    )
}

export default Navbar