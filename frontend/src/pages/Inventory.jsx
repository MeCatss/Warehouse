import { useState } from 'react'
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
    const refresh = () => setRefreshKey((k) => k + 1);
    console.log(activeModal, selected)
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
            <Kpicard refreshKey={refreshKey}/>
            <div className="space-y-2 mb-4">
                <AlertRow label="Out of stock" count={4} color="red"
                    items={["Name", "Hatari", "Oil", "Rice"]} />
                <AlertRow label="Expiring soon" count={79} color="amber"
                    items={["Milk", "Bread", "Eggs", "Butter"]} />
            </div>
            <Productlist refreshKey={refreshKey}  
                onEdit={(p) => { setSelected(p); setActiveModal("edit"); }}
                onDelete={(p) => { setSelected(p); setActiveModal("delete"); }}
                onRestock={(p) => { setSelected(p); setActiveModal("restock"); }}
                />
            <Historylog refreshKey={refreshKey}/>
        </div>
)}
export default Inventory