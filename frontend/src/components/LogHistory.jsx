import axios from 'axios'
import {useState, useEffect} from 'react'

const Historylog = ({refreshKey }) => {
    const [historylist, sethistorylist] = useState([]);
    useEffect(() => {
        const gethistory = async () => {
        const res = await axios('/history');
        sethistorylist(res.data.history);
        console.log(res.data.history)
        };
        gethistory();
    }, [refreshKey ]);
    const actionStyle = (action = "") => {
    const a = action.toLowerCase();
    if (a.includes("add")) return "bg-emerald-100 text-emerald-700";
    if (a.includes("restock")) return "bg-blue-100 text-blue-700";
    if (a.includes("reduc")) return "bg-amber-100 text-amber-800";
    if (a.includes("delet") || a.includes("remov")) return "bg-red-100 text-red-700";
    return "bg-zinc-100 text-zinc-600";
    };

    const signedAmount = (h) => {
    if (h.amount == null) return { text: "-", style: "text-zinc-400" };
    const down = (h.action || "").toLowerCase().includes("reduc");
    return down
        ? { text: `−${h.amount}`, style: "text-amber-600" }
        : { text: `+${h.amount}`, style: "text-emerald-600" };
    };

    return (
    <div className="border border-zinc-200 rounded-xl bg-white p-4 mt-6 max-w-4xl">
        <h2 className="text-sm font-semibold mb-3">History Log</h2>
        <div className="max-h-[30vh] overflow-y-auto">
        <table className="w-full text-xs">
            <thead className="sticky top-0 bg-white text-left uppercase tracking-wide text-zinc-400">
            <tr className="border-b border-zinc-200">
                <th className="px-2 py-1.5 font-medium">Action</th>
                <th className="px-2 py-1.5 font-medium">Product</th>
                <th className="px-2 py-1.5 font-medium">Amount</th>
                <th className="px-2 py-1.5 font-medium">Changes</th>
            </tr>
            </thead>
            <tbody>
            {historylist.map((history, index) => {
                const amt = signedAmount(history);
                return (
                <tr key={index} className="align-top border-b border-zinc-100">
                    <td className="px-2 py-2">
                    <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full capitalize ${actionStyle(history.action)}`}>
                        {history.action}
                    </span>
                    </td>
                    <td className="px-2 py-2">
                    <p className="font-medium">{history.product_name || "Unnamed"}</p>
                    <p className="text-[11px] text-zinc-400">
                        {new Date(history.date).toLocaleDateString()}
                    </p>
                    </td>
                    <td className={`px-2 py-2 font-semibold ${amt.style}`}>{amt.text}</td>
                    <td className="px-2 py-2">
                    {history.changes ? (
                        <div className="flex flex-wrap gap-1">
                        {Object.entries(history.changes).map(([key, value]) => (
                            <span key={key} className="text-[11px] border border-zinc-200 rounded px-1.5 py-0.5">
                            {key}: {String(value).replace(/T\d{2}:\d{2}:\d{2}\.?\d*/, "")}
                            </span>
                        ))}
                        </div>
                    ) : (
                        <span className="text-zinc-300">-</span>
                    )}
                    </td>
                </tr>
                );
            })}
            </tbody>
        </table>
        </div>
    </div>
    );
}
export default Historylog