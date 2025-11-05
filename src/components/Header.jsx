import { Bell, LogOut, Search } from "lucide-react"
import { useDispatch } from "react-redux"
import { logout } from "../features/todoSlice"

const Header = () => {
    const dispatch = useDispatch()
    return (
        <header className="w-full bg-transparent fixed backdrop-blur-md shadow-lg border-b border-white/10 z-50">
            <div className="container mx-auto">
                <div className="flex flex-col sm:flex-row items-center sm:justify-between px-4 sm:px-6 py-3 sm:py-4 gap-3 sm:gap-0">

                    <div className="flex items-center gap-3 w-full sm:w-auto justify-center sm:justify-start">
                        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#7b4dff] to-[#b347ff] flex items-center justify-center text-white font-bold">
                            T
                        </div>
                        <h1 className="text-lg font-semibold text-white tracking-wide">Todo List</h1>
                    </div>

                    <div className="relative group w-full sm:w-auto flex justify-center sm:justify-center">
                        <div className="flex items-center justify-center w-full sm:w-auto text-sm text-slate-300 font-medium bg-[rgba(255,255,255,0.05)] border border-white/10 px-4 py-2 rounded-lg">
                            {new Date().toLocaleDateString("en-GB", {
                                weekday: "long",
                                month: "short",
                                day: "numeric",
                            })}{" "}
                            • {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </div>

                        <div className="absolute top-12 right-0 w-40 bg-[rgba(30,25,50,0.95)] border border-white/10 rounded-lg p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-lg">
                            <button className="w-full text-left text-sm text-gray-300 hover:text-white px-3 py-2 rounded-md hover:bg-white/5">Profile</button>
                            <button className="w-full text-left text-sm text-gray-300 hover:text-white px-3 py-2 rounded-md hover:bg-white/5">Settings</button>
                            <button
                                onClick={() => dispatch(logout())}
                                className="w-full text-left text-sm text-rose-400 hover:text-rose-300 px-3 py-2 rounded-md hover:bg-white/5"
                            >
                                Logout
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 text-gray-300 w-full sm:w-auto justify-center sm:justify-end">
                        <div className="group relative">
                            <button onClick={() => dispatch(logout())} className="hover:text-white transition">
                                <LogOut className="w-5 h-5" />
                            </button>
                            <span
                                className="absolute top-6 left-1/2 sm:left-14 -translate-x-1/2 -translate-y-full mb-2 
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
