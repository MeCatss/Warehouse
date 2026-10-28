import { useState } from 'react'
import Navbar from '../components/Navbar.jsx'
import Productlist from '../components/ProductList.jsx'
import Sidebar from'../components/Sidebar.jsx'
import Historylog from '../components/LogHistory.jsx'
import AddModal from '../components/addModal.jsx'


const Inventory = () => {
    const [activeModal, setActiveModal] = useState(null)


    return(
        <div >
            <Navbar />
                <div className="flex gap-2 px-10 mt-6">
                    <Sidebar setActiveModal={setActiveModal}/>
                    {activeModal === "add" && <AddModal onClose={() => setActiveModal(null)} />}
                    {activeModal === "restock" && <RestockModal onClose={() => setActiveModal(null)} />}
                    {activeModal === "remove" && <RemoveModal onClose={() => setActiveModal(null)} />}
                    {activeModal === "edit" && <EditModal onClose={() => setActiveModal(null)} />}

                    <Productlist />
                </div>
            <Historylog />
        </div>
)}
export default Inventory