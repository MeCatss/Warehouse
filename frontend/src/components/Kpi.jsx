import axios from 'axios'
import {useState, useEffect} from 'react'

const Kpicard = ({refreshKey }) => {
    const cardClass = "border border-zinc-200 rounded-xl p-5 bg-white";
    const titleClass = "text-sm font-medium";
    const subClass = "text-xs text-zinc-500";
    const [productscount, setproductscount] = useState();
    useEffect(() => {
        const gettotalcount = async () => {
        const res = await axios('0/total-products');
        setproductscount(res.data.total_products);
        };
        gettotalcount();
    }, [refreshKey]);

    const [stockcount, setstockcount] = useState();
    useEffect(() => {
        const gettotalstock = async () => {
        const res = await axios('0/total-stock');
        setstockcount(res.data.total_stock_quantity);
        };
        gettotalstock();
    }, [refreshKey]);

    const [outstockcount, setoutstockcount] = useState();
    useEffect(() => {
        const getoutstock = async () => {
        const res = await axios('0/out-stock');
        setoutstockcount(res.data["Total 0 Stock"]);
        };
        getoutstock();
    }, [refreshKey]);

    const [expiredsoon, setexpiredsoon] = useState();
    useEffect(() => {
        const getexpiredsoon = async () => {
        const res = await axios('0/expired-soon');
        setexpiredsoon(res.data['count']);
        };
        getexpiredsoon();
    }, [refreshKey]);
    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className={cardClass}>
            <p className={titleClass}>Total Products</p>
            <p className="text-2xl font-semibold mt-4">{productscount}</p>
            <p className={subClass}>Unique items</p>
            </div>
            <div className={cardClass}>
            <p className={titleClass}>Total Stocks</p>
            <p className="text-2xl font-semibold mt-4">{stockcount}</p>
            <p className={subClass}>Units in inventory</p>
            </div>
            <div className={cardClass}>
            <p className={titleClass}>Out of Stock</p>
            <p className={`text-2xl font-semibold mt-4 ${outstockcount > 0 ? "text-red-600" : ""}`}>
                {outstockcount}
            </p>
            <p className={subClass}>Need restocking</p>
            </div>
            <div className={cardClass}>
            <p className={titleClass}>Expiring Soon</p>
            <p className={`text-2xl font-semibold mt-4 ${expiredsoon > 0 ? "text-amber-500" : ""}`}>
                {expiredsoon}
            </p>
            <p className={subClass}>Nearing expiry</p>
            </div>
        </div>
        );
}

export default Kpicard