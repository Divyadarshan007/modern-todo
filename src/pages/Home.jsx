import { useEffect, useState } from "react"
import { db } from "../config/firebase"
import { useDispatch, useSelector } from "react-redux"
import { addTask, deleteTask, editTask, fetchTask } from "../features/todoSlice"
import { useNavigate } from "react-router-dom"
import { doc, getDoc } from "firebase/firestore"
import clsx from 'clsx'
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/react"
import { ChevronDownIcon, ChevronRight } from "lucide-react"
import Spline from '@splinetool/react-spline';




const Home = () => {
    const [input, setInput] = useState({
        task: '', priority: ''
    })
    const tasks = useSelector((store) => store.todos.list)
    const user = useSelector((store) => store.todos.currentUser)
    console.log(user);

    const [editId, setEditId] = useState(null)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [isEdit, setIsEdit] = useState(false)

    useEffect(() => {
        dispatch(fetchTask(user?.uid))
    }, [])
    useEffect(() => {
        if (editId) {
            const fetchOne = async () => {
                setIsEdit(true)
                const docRef = await getDoc(doc(db, `${user.uid}`, editId))
                setInput(docRef.data())
            }
            fetchOne()
        }
    }, [editId])

    const handleSubmit = (e) => {
        e.preventDefault()
        if (isEdit) {
            dispatch(editTask({ uid: user.uid, editId, value: input }))
            navigate('/')
            setIsEdit(false)
            setEditId(null)
        } else {
            dispatch(addTask({ uid: user.uid, value: input }))
        }
        dispatch(fetchTask(user.uid))
        setInput({ task: '', priority: '' })
    }

    return (
        <section className="min-h-screen bg-gradient-to-b from-[#0f0b1a] to-[#1a1630]  text-slate-100 pt-36">
            <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
                <div className="flex items-start gap-6">
                    {/* Sidebar */}
                    <aside className="w-80 bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.03)] rounded-2xl p-6 shadow-lg relative">
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-full overflow-hidden ring-2 ring-[#bd66de]">
                                <img alt="profile" src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=60" className="w-full h-full object-cover" />
                            </div>
                            <div>
                                <div className="text-lg font-semibold">{user.displayName ? user.displayName : "Anonymous"}</div>
                                <div className="text-sm text-slate-300">{user.email}</div>
                            </div>
                        </div>

                        
                        <div className="absolute -bottom-6 left-6 w-40 h-14">
                            <svg viewBox="0 0 200 100" className="w-full h-full opacity-60" preserveAspectRatio="none">
                                <path d="M0,100 C30,40 120,0 200,40 L200,100 Z" fill="#bd66de" opacity="0.12" />
                            </svg>
                        </div>
                    </aside>

                    {/* Main area */}
                    <main className="flex-1">
                        <div className="bg-[rgba(255,255,255,0.02)] rounded-2xl p-6 shadow-lg">
                            <div className="flex justify-between items-center mb-6">
                                <div>
                                    <div className="text-xs text-slate-400">25 JUN</div>
                                    <div className="mt-2 text-2xl font-bold">Today's Tasks</div>
                                </div>
                                <div className="w-80">
                                    <div className="text-xs text-slate-300 mb-2 flex justify-between">
                                        <span>Done: 12</span>
                                        <span>Must Do: 16</span>
                                    </div>
                                    <div className="h-3 rounded-full bg-[rgba(255,255,255,0.04)] overflow-hidden">
                                        <div className="h-full rounded-full" style={{ width: '70%', background: 'linear-gradient(90deg,#59e800,#9e3cd7)' }}></div>
                                    </div>
                                </div>
                            </div>

                            {/* Input form */}
                            <div className="bg-[rgba(255,255,255,0.02)] p-4 rounded-xl mb-6">
                                <form className="flex gap-4" onSubmit={handleSubmit}>
                                    <input
                                        type="text"
                                        id="task"
                                        value={input?.task} onChange={(e) => setInput({ ...input, [e.target.id]: e.target.value })}
                                        placeholder="Enter task"
                                        className="flex-1 rounded-lg px-4 py-2 bg-transparent border border-[rgba(255,255,255,0.04)] focus:outline-none"
                                    />
                                    {/* <select
                                        id="priority"
                                        value={input?.priority} onChange={(e) => setInput({ ...input, [e.target.id]: e.target.value })}
                                        className="rounded-lg px-3 py-2 bg-transparent border border-[rgba(255,255,255,0.04)]"
                                    >
                                        <option className="bg-[#191527] hover:bg-[#1c1828]" value="">Priority</option>
                                        <option className="bg-[#191527] hover:bg-[#1c1828]" value="high">High</option>
                                        <option className="bg-[#191527] hover:bg-[#1c1828]" value="medium">Medium</option>
                                        <option className="bg-[#191527] hover:bg-[#1c1828]" value="low">Low</option>
                                    </select> */}
                                    <div className="mx-auto border border-[rgba(255,255,255,0.04)] rounded-lg w-40 ">
                                        <Listbox value={input?.priority} onChange={(e) => setInput({ ...input, [e.target.id]: e.target.value })}>
                                            <ListboxButton
                                                className={clsx(
                                                    'relative block w-full rounded-lg bg-transparent py-2 pr-8 pl-3 text-left text-sm/6 text-white',
                                                    'focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25'
                                                )}
                                            >
                                                {"Priority"}
                                                <ChevronDownIcon
                                                    className="group pointer-events-none absolute top-3 right-2.5 size-4 fill-white/60"
                                                    aria-hidden="true"
                                                />
                                            </ListboxButton>
                                            <ListboxOptions
                                                anchor="bottom"
                                                transition
                                                className={clsx(
                                                    'w-(--button-width) rounded-xl border border-white/5 bg-white/5 p-1 [--anchor-gap:--spacing(1)] focus:outline-none',
                                                    'transition duration-100 ease-in data-leave:data-closed:opacity-0'
                                                )}
                                            >

                                                <ListboxOption


                                                    className="group flex cursor-pointer  hover:bg-[#1c1828] items-center gap-2 rounded-lg px-3 py-1.5 select-none data-focus:bg-white/10"
                                                >

                                                    <ChevronRight className="visible  fill-white text-[#191527]" />
                                                    <div className="text-sm/6 text-white">High</div>
                                                </ListboxOption>
                                                <ListboxOption


                                                    className="group flex cursor-pointer hover:bg-[#1c1828] items-center gap-2 rounded-lg px-3 py-1.5 select-none data-focus:bg-white/10"
                                                >

                                                    <ChevronRight className="visible fill-white text-[#191527]" />
                                                    <div className="text-sm/6 text-white">Medium</div>
                                                </ListboxOption>
                                                <ListboxOption


                                                    className="group flex cursor-pointer hover:bg-[#1c1828] items-center gap-2 rounded-lg px-3 py-1.5 select-none data-focus:bg-white/10"
                                                >

                                                    <ChevronRight className="visible fill-white text-[#191527]" />
                                                    <div className="text-sm/6 text-white">Low</div>
                                                </ListboxOption>

                                            </ListboxOptions>
                                        </Listbox>
                                    </div>
                                    <button className="rounded-lg px-6 py-2 bg-gradient-to-r from-[#3b9dff] to-[#304ffe] font-semibold">Add</button>
                                </form>
                            </div>

                            {/* In Progress list */}
                            <div className="rounded-xl p-4 bg-[rgba(255,255,255,0.01)]">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-semibold">In Progress</h3>
                                    <div className="text-sm text-slate-400">Today</div>
                                </div>

                                {
                                    tasks.map((task) => {
                                        return <div key={task.id} className="space-y-4 pb-5 ">
                                            <div className="p-4 rounded-lg border border-[rgba(255,255,255,0.03)] bg-gradient-to-br from-[rgba(255,255,255,0.01)] to-transparent flex items-start justify-between">
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-3 h-3 rounded-full bg-[#ff9300]"></div>
                                                        <div className="font-medium">{task.task}</div>
                                                    </div>
                                                    <p className="text-sm text-slate-400 mt-2">{task.status}</p>
                                                </div>
                                                <div className="flex flex-col items-end gap-2">
                                                    <div className="flex items-center gap-2">
                                                        <button className="text-sm px-3 py-1 rounded-md bg-[rgba(255,255,255,0.03)]" onClick={() => setEditId(task.id)}>Edit</button>
                                                        <button className="text-sm px-3 py-1 rounded-md bg-[rgba(255,255,255,0.03)]" onClick={() => {
                                                            dispatch(deleteTask({ uid: user.uid, deleteId: task.id }))
                                                            dispatch(fetchTask(user.uid))
                                                        }}>Delete</button>
                                                    </div>
                                                    <div className="text-xs text-slate-400">{task.priority}</div>
                                                </div>
                                            </div>
                                        </div>
                                    })
                                }
                            </div>
                        </div>
                    </main>

                    {/* Right Inbox panel */}
                    <aside className="w-96 bg-[rgba(255,255,255,0.03)] rounded-2xl p-6 shadow-lg">
                        <div className="flex items-center justify-between mb-4">
                            <div className="text-lg font-bold">Completed Task</div>
                            <div className="text-sm text-slate-400">8</div>
                        </div>

                        <div className="space-y-4 overflow-y-auto max-h-[70vh] pr-2">
                            <div className="p-3 rounded-lg bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.02)]">
                                <div className="flex items-start gap-3">
                                    <img src="https://images.unsplash.com/photo-1545996124-1b0d9a2f8a8f?w=200&q=60" className="w-10 h-10 rounded-full" alt="a" />
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between">
                                            <div className="font-medium">Lillian Norris</div>
                                            <div className="text-xs text-slate-400">20m ago</div>
                                        </div>
                                        <div className="text-sm text-slate-300 mt-1">Mei eu dicunt utamur graecis.</div>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </aside>
                </div >
            </div >


        </section >
    )
}

export default Home