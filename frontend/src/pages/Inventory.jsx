import { useState,useEffect } from 'react'
import axios from 'axios'
import Kpicard from '../components/Kpi.jsx'
import Productlist from '../components/ProductList.jsx'
import AlertRow from '../components/Alertrow.jsx'
import Historylog from '../components/LogHistory.jsx'
import AddModal from '../components/addModal.jsx'
import DeleteModal from '../components/deleteModal.jsx'
import EditModal from '../components/editModal.jsx'
import RestockModal from '../components/restockModal.jsx'


const Inventory = () => {
    const [activeModal, setActiveModal] = useState(null)
    const [refreshKey, setRefreshKey] = useState(0);
    const [selected, setSelected] = useState(null);
    const refresh = () =>{
        setRefreshKey((k) => k + 1);
        setStockFilter(null);
    } 
    const [outOfStock, setOutOfStock] = useState([]);
    const [expiring, setExpiring] = useState([]);
    const [stockFilter, setStockFilter] = useState(null);

    useEffect(() => {
    const getAlerts = async () => {
        const out = await axios.get("/out-stock");
        const exp = await axios.get("/expired-soon");
        setOutOfStock(out.data["out of stock"]);
        setExpiring(exp.data.expiring_soon);
    };
    getAlerts();
    }, [refreshKey]);
    console.log(stockFilter)
    return(
        <div className="min-h-screen bg-white text-zinc-900 p-6">
            <div className="flex items-start justify-between mb-6">
                <div>
                    <h1 className="text-3xl font-semibold">Inventory Management System</h1>
                    <p className="text-zinc-500">Kitchen Goods</p>
                </div>
                    <button
                    onClick={() => setActiveModal("add")}
                    className="bg-zinc-950 hover:bg-zinc-800 text-white cursor-pointer font-medium px-4 py-2 rounded-lg"
                    >
                    + Add New Item
                    </button>
            </div>
                {activeModal === "add" && <AddModal onClose={() => setActiveModal(null)} onSuccess={refresh} />}
                {activeModal === "delete" && <DeleteModal product={selected} onClose={() => setActiveModal(null)} onSuccess={refresh} />}
                {activeModal === "edit" && <EditModal product={selected} onClose={() => setActiveModal(null)} onSuccess={refresh} />}
                {activeModal === "restock" && <RestockModal product={selected} onClose={() => setActiveModal(null)} onSuccess={refresh} />}
                {activeModal === "reduce" && <RestockModal mode="reduce" product={selected} onClose={() => setActiveModal(null)} onSuccess={refresh} />}
            <Kpicard refreshKey={refreshKey}/>

            <div className="space-y-2 mb-4">
                <AlertRow label="Out of stock" count={outOfStock.length} color="red"
                items={outOfStock.map((p) => p.Product_Name)}
                onSelect={() => setStockFilter({ label: "Out of stock", ids: outOfStock.map((p) => p._id) })} />

                <AlertRow label="Expiring soon" count={expiring.length} color="amber"
                items={expiring.map((p) => p.Product_Name)}
                onSelect={() => setStockFilter({ label: "Expiring soon", ids: expiring.map((p) => p._id) })} />
                    {stockFilter && (
                    <button
                        onClick={() => setStockFilter(null)}
                        className="text-xs px-3 py-1 rounded-full bg-zinc-900 text-white cursor-pointer"
                    >
                        Showing: {stockFilter.label} · Clear filter ✕
                    </button>
                    )}
            </div>

            <Productlist refreshKey={refreshKey}  stockFilter={stockFilter}
                onEdit={(p) => { setSelected(p); setActiveModal("edit"); }}
                onDelete={(p) => { setSelected(p); setActiveModal("delete"); }}
                onRestock={(p) => { setSelected(p); setActiveModal("restock"); }}
                onReduce={(p) => { setSelected(p); setActiveModal("reduce"); }}
                />

            <Historylog refreshKey={refreshKey}/>

        </div>
)}
export default Inventory