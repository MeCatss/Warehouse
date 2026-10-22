import {useNavigate} from 'react-router'
const Landing = () => {
    let navigate = useNavigate();
    return(
<div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
    <h1 className="text-4xl font-bold text-white mb-12">Inventory System</h1>
    <div className="flex gap-8">
        <div className="bg-zinc-900 rounded-2xl p-8 border border-zinc-800 cursor-pointer hover:border-white w-64 h-48 flex flex-col items-center justify-center"
        onClick={() => navigate(`/inventory`)}
        >
            <h2 className="text-xl font-semibold">Existing Database</h2>
            <p className="text-zinc-400 text-sm mt-2">with data</p>
        </div>
        <div className="bg-zinc-900 rounded-2xl p-8 border border-zinc-800 cursor-pointer hover:border-white w-64 h-48 flex flex-col items-center justify-center"
        onClick={() => navigate(`/inventory`)}
        >
            <h2 className="text-xl font-semibold">no Existing Database</h2>
            <p className="text-zinc-400 text-sm mt-2">with no data</p>
        </div>
    </div>
</div>
)}
export default Landing






