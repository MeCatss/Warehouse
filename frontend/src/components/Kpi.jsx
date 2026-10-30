import axios from 'axios'
import {useState, useEffect} from 'react'

const Kpicard = ({refreshKey }) => {
    const [productscount, setproductscount] = useState();
    useEffect(() => {
        const gettotalcount = async () => {
        const res = await axios('http://127.0.0.1:8000/total-products');
        setproductscount(res.data.total_products);
        };
        gettotalcount();
    }, [refreshKey]);

    const [stockcount, setstockcount] = useState();
    useEffect(() => {
        const gettotalstock = async () => {
        const res = await axios('http://127.0.0.1:8000/total-stock');
        setstockcount(res.data.total_stock_quantity);
        };
        gettotalstock();
    }, [refreshKey]);

    const [outstockcount, setoutstockcount] = useState();
    useEffect(() => {
        const getoutstock = async () => {
        const res = await axios('http://127.0.0.1:8000/out-stock');
        setoutstockcount(res.data["Total 0 Stock"]);
        };
        getoutstock();
    }, [refreshKey]);

    const [expiredsoon, setexpiredsoon] = useState();
    useEffect(() => {
        const getexpiredsoon = async () => {
        const res = await axios('http://127.0.0.1:8000/expired-soon');
        setexpiredsoon(res.data['count']);
        };
        getexpiredsoon();
    }, [refreshKey]);
    return(
        <div className="w-full flex items-center justify-between gap-12 bg-white border-b border-zinc-200 px-6 py-4">
            <h2 className="text-lg font-semibold shrink-0">inventoryName</h2>
            <div className='flex gap-8'>
                <div>
                    <p className='text-xs text-zinc-500'>Total Products</p>
                    <p className="text-xl font-semibold">{productscount}</p>
                </div>
                <div>
                    <p className='text-xs text-zinc-500'>Total Stocks</p>
                    <p className="text-xl font-semibold">{stockcount}</p>
                </div>
                <div>
                    <p className='text-xs text-zinc-500'>Out of Stock Products</p>
                    <p className={`text-xl font-semibold ${outstockcount > 0 ? "text-red-600" : ""}`}>
                        {outstockcount}
                    </p>
                </div>
                <div>
                    <p className='text-xs text-zinc-500'>Expiring Soon Product</p>
                    <p className={`text-xl font-semibold ${expiredsoon > 0 ? "text-amber-500" : ""}`}>
                    {expiredsoon}
                    </p>
                </div>

            </div>
        </div>
    )
}

export default Kpicard