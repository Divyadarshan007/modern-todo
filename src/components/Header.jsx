import { Bell, LogOut, Search } from "lucide-react"
import { useDispatch } from "react-redux"
import { logout } from "../features/todoSlice"

const Header = () => {
    const dispatch = useDispatch()
    return (
        <header className="w-full bg-transparent  fixed backdrop-blur-md shadow-lg border-b border-white/10">
            <div className="container mx-auto">
                <div className="flex items-center justify-between px-6 py-4">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#7b4dff] to-[#b347ff] flex items-center justify-center text-white font-bold">
                            T
                        </div>
                        <h1 className="text-lg font-semibold text-white tracking-wide">Todo List</h1>
                    </div>
                    <div className="flex items-center bg-transparent rounded-lg px-4 py-2 w-1/2 shadow-inner border border-[#ffffff1a]">
                        <Search className="text-gray-300 w-5 h-5 mr-2" />
                        <input
                            type="text"
                            placeholder="Quick Find..."
                            className="bg-transparent text-sm text-gray-200 placeholder-gray-400 outline-none w-full"
                        />
                    </div>
                    <div className="flex items-center gap-4 text-gray-300">
                      
                        <div className="group relative">
                            <button onClick={() => dispatch(logout())} className="hover:text-white transition">
                                <LogOut className="w-5 h-5" />
                            </button>
                            <span
                                className="absolute top-6 left-14 -translate-x-1/2 -translate-y-full mb-2 
                                           bg-rose-500 text-white text-sm px-3 py-1 rounded opacity-0 
                                           group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                                Logout
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header
