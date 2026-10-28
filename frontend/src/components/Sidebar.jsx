
const Sidebar = ({setActiveModal}) => {
    
return(
   <div className='flex flex-col gap-4 w-30'>
        <button onClick={() => setActiveModal("add")}
        className='bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-white hover:border-white cursor-pointer text-center'>
            Add New
        </button>
        <button onClick={() => setActiveModal("restock")}
        className='bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-white hover:border-white cursor-pointer text-center'>
            Restock
        </button>
        <button onClick={() => setActiveModal("remove")}
        className='bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-white hover:border-white cursor-pointer text-center'>
            Remove
        </button>
        <button onClick={() => setActiveModal("edit")}
        className='bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-white hover:border-white cursor-pointer text-center'>
            Edit
        </button>
    </div>
)
}

export default Sidebar