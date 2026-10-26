import Navbar from '../components/Navbar.jsx'
import Productlist from '../components/ProductList.jsx'
import Sidebar from'../components/Sidebar.jsx'
import Historylog from '../components/LogHistory.jsx'
const Inventory = () => {
    return(
        <div >
            <Navbar />
                <div className="flex gap-2 px-10 mt-6">
                    <Sidebar />
                    <Productlist />
                </div>
            <Historylog />
        </div>
)}
export default Inventory