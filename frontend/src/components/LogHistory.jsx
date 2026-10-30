import axios from 'axios'
import {useState, useEffect} from 'react'

const Historylog = ({refreshKey }) => {
    const [historylist, sethistorylist] = useState([]);
    useEffect(() => {
        const gethistory = async () => {
        const res = await axios('http://127.0.0.1:8000/history');
        sethistorylist(res.data.history);
        console.log(res.data.history)
        };
        gethistory();
    }, [refreshKey ]);
    return(
    <div className="flex-1 p-6">
        <table className="table-fixed w-full">
            <caption>History Log</caption>
            <thead className="text-zinc-400 text-sm">
                <tr>
                    <th className="px-3 py-2">Product Name</th>
                    <th className="px-3 py-2">Action</th>
                    <th className="px-3 py-2">Amount</th>
                    <th className="px-3 py-2 w-2/5">Changed To</th>
                    <th className="px-3 py-2">Date</th>
                </tr>
            </thead>
            <tbody >
                {historylist.slice(-5).map((history, index) => ( //////dont forget to remove slice
                <tr key={index}>
                    <td className="px-3 py-2 text-center">{history.product_name}</td>
                    <td className="px-3 py-2 text-center">{history.action}</td>
                    <td className="px-3 py-2 text-center">{history.amount}</td>
                    <td className="px-3 py-2 text-center text-sm">
                    {history.changes
                        ? Object.entries(history.changes).map(([key, value]) => (
                            <div key={key}>
                            {key}: {String(value).replace(/T\d{2}:\d{2}:\d{2}\.?\d*/, "")}
                            </div>
                        ))
                        : "-"}
                    </td>
                    <td className="px-3 py-2 text-center">{new Date(history.date).toLocaleDateString()}</td>
                </tr>
                ))}
            </tbody>
        </table>
    </div>
    )
}
export default Historylog