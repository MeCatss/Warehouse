import axios from 'axios'
import {useState, useEffect} from 'react'

const Historylog = () => {
    const [historylist, sethistorylist] = useState([]);
    useEffect(() => {
        const gethistory = async () => {
        const res = await axios('http://127.0.0.1:8000/history');
        sethistorylist(res.data.history);
        console.log(res.data.history)
        };
        gethistory();
    }, []);
    return(
    <div className="flex-1 p-6">
        <table className="w-full">
            <thead className="text-zinc-400 text-sm">
                <tr>
                    <th>Product Name</th>
                    <th>Action</th>
                    <th>Amount</th>
                    <th>Changes</th>
                    <th>Date</th>
                </tr>
            </thead>
            <tbody >
                {historylist.slice(0, 5).map((history, index) => ( //////dont forget to remove slice
                <tr key={index}>
                    <td>{history.product_name}</td>
                    <td>{history.action}</td>
                    <td>{history.amount}</td>
                    <td >{history.changes 
    ? Object.entries(history.changes).map(([key, value]) => `${key}: ${value}`).join(', ')
    : '-'}</td>
                    <td>{new Date(history.date).toLocaleDateString()}</td>
                </tr>
                ))}
            </tbody>
        </table>
    </div>
    )
}
export default Historylog