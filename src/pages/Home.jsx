import { useEffect, useState } from "react"
import { db } from "../config/firebase"
import { useDispatch, useSelector } from "react-redux"
import { addTask, deleteTask, editTask, fetchTask } from "../features/todoSlice"
import { useNavigate } from "react-router-dom"
import { doc, getDoc, updateDoc } from "firebase/firestore"
import Header from "../components/Header"
import toast from "react-hot-toast"

const Home = () => {
    const [input, setInput] = useState({
        task: '', priority: ''
    })
    const tasks = useSelector((store) => store.todos.list)
    const user = useSelector((store) => store.todos.currentUser)

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
        if (!handleErrors()) return
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

    const markComplete = async (taskId) => {
        await updateDoc(doc(db, `${user.uid}`, taskId), {
            status: "completed"
        })
        dispatch(fetchTask(user?.uid))
    }
    const handleErrors = () => {
        if (input.task.trim() === "" || input.priority.trim() === "") {
            toast.error('Please fill all inputs !')
            return false
        }
        return true
    }

    return (
        <>
            <Header />
            <section className="min-h-screen bg-gradient-to-b from-[#0f0b1a] to-[#1a1630] text-slate-100 pt-24 sm:pt-28 md:pt-36">
                <div className="mx-auto max-w-screen-xl px-4 lg:px-12">

                    <div className="flex flex-col lg:flex-row items-start gap-6">


                        <aside className="w-full lg:w-80 bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.03)] rounded-2xl p-6 shadow-lg relative">
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 rounded-full overflow-hidden ring-2 ring-[#bd66de]">
                                    <img alt="profile" src="/user_459122.png" className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <div className="text-lg font-semibold">{user.displayName ? user.displayName : "Anonymous"}</div>
                                    <div className="text-sm text-slate-300 break-all">{user.email}</div>
                                </div>
                            </div>

                            <div className="absolute -bottom-6 left-6 w-40 h-14 hidden sm:block">
                                <svg viewBox="0 0 200 100" className="w-full h-full opacity-60" preserveAspectRatio="none">
                                    <path d="M0,100 C30,40 120,0 200,40 L200,100 Z" fill="#bd66de" opacity="0.12" />
                                </svg>
                            </div>
                        </aside>
                        <main className="flex-1 w-full">
                            <div className="bg-[rgba(255,255,255,0.02)] rounded-2xl p-4 sm:p-6 shadow-lg">


                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                                    <div>

                                        <div className="mt-2 text-2xl font-bold">Today's Tasks</div>
                                    </div>
                                    <div className="w-full md:w-60">
                                        <div className="text-xs text-slate-300 mb-2 flex justify-between"></div>
                                        <div className="h-3 rounded-full bg-[rgba(255,255,255,0.04)] overflow-hidden">
                                            <div
                                                className="h-full rounded-full"
                                                style={{
                                                    width: '70%',
                                                    background: 'linear-gradient(90deg,#59e800,#9e3cd7)',
                                                }}
                                            ></div>
                                        </div>
                                    </div>
                                </div>


                                <div className="bg-[rgba(255,255,255,0.02)] p-4 rounded-xl mb-6">
                                    <form className="flex flex-col sm:flex-row gap-4" onSubmit={handleSubmit}>
                                        <input
                                            type="text"
                                            id="task"
                                            value={input?.task}
                                            onChange={(e) =>
                                                setInput({
                                                    ...input,
                                                    [e.target.id]: e.target.value,
                                                })
                                            }
                                            placeholder="Enter task"
                                            className="flex-1 rounded-lg px-4 py-2 bg-transparent border border-[rgba(255,255,255,0.04)] focus:outline-none"
                                        />
                                        <select
                                            id="priority"
                                            value={input?.priority}
                                            onChange={(e) =>
                                                setInput({
                                                    ...input,
                                                    [e.target.id]: e.target.value,
                                                })
                                            }
                                            className="rounded-lg px-3 py-2 bg-transparent border border-[rgba(255,255,255,0.04)]"
                                        >
                                            <option className="bg-[#191527]" value="">
                                                Priority
                                            </option>
                                            <option className="bg-[#191527]" value="high">
                                                High
                                            </option>
                                            <option className="bg-[#191527]" value="medium">
                                                Medium
                                            </option>
                                            <option className="bg-[#191527]" value="low">
                                                Low
                                            </option>
                                        </select>

                                        <button className="rounded-lg px-6 py-2 bg-gradient-to-r from-[#3b9dff] to-[#304ffe] font-semibold">
                                            Add
                                        </button>
                                    </form>
                                </div>


                                <div className="rounded-xl p-4 bg-[rgba(255,255,255,0.01)] overflow-y-auto max-h-[45vh] scrollbar">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-lg font-semibold">In Progress</h3>
                                        <div className="text-sm text-slate-400">Today</div>
                                    </div>

                                    {tasks.map((task) =>
                                        task.status == "pending" ? (
                                            <div key={task.id} className="space-y-4 pb-5 cursor-pointer">
                                                <div className="p-4 rounded-lg border border-[rgba(255,255,255,0.03)] bg-gradient-to-br from-[rgba(255,255,255,0.01)] to-transparent flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-3">
                                                            <div
                                                                className="w-4 h-4 relative rounded-full group border"
                                                                onClick={() => markComplete(task.id)}
                                                            >
                                                                <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full mb-2 bg-black text-white text-sm px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                                                                    Done
                                                                </span>
                                                            </div>
                                                            <div className="font-medium break-words">{task.task}</div>
                                                        </div>
                                                        <p className="text-sm text-slate-400 mt-2">{task.status}</p>
                                                    </div>
                                                    <div className="flex flex-col items-end gap-2">
                                                        <div className="flex items-center gap-2">
                                                            <button
                                                                className="text-sm px-3 py-1 rounded-md bg-[rgba(255,255,255,0.03)]"
                                                                onClick={() => setEditId(task.id)}
                                                            >
                                                                Edit
                                                            </button>
                                                            <button
                                                                className="text-sm px-3 py-1 rounded-md bg-[rgba(255,255,255,0.03)]"
                                                                onClick={() => {
                                                                    dispatch(deleteTask({ uid: user.uid, deleteId: task.id }));
                                                                    dispatch(fetchTask(user.uid));
                                                                }}
                                                            >
                                                                Delete
                                                            </button>
                                                        </div>
                                                        <div className="text-xs text-slate-400">{task.priority}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            ""
                                        )
                                    )}
                                </div>
                            </div>
                        </main>


                        <aside className="w-full lg:w-96 bg-[rgba(255,255,255,0.03)] rounded-2xl p-6 shadow-lg">
                            <div className="flex items-center justify-between mb-4">
                                <div className="text-lg font-bold">Completed Tasks</div>
                                <div className="text-sm text-slate-400">
                                    {tasks.filter((data) => data.status == "completed").length}
                                </div>
                            </div>

                            <div className="space-y-4 overflow-y-auto max-h-[35vh] scrollbar">
                                {tasks.map((task) =>
                                    task.status == "completed" ? (
                                        <div key={task.id} className="space-y-4 pb-5">
                                            <div className="p-4 rounded-lg border border-[rgba(255,255,255,0.03)] bg-gradient-to-br from-[rgba(255,255,255,0.01)] to-transparent flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-3 h-3 rounded-full bg-[#ff9300]"></div>
                                                        <div className="font-medium break-words">{task.task}</div>
                                                    </div>
                                                    <p className="text-sm text-slate-400 mt-2">{task.status}</p>
                                                </div>
                                                <div className="flex flex-col items-end gap-2">
                                                    <div className="flex items-center gap-2">
                                                        <button
                                                            className="text-sm px-3 py-1 rounded-md bg-[rgba(255,255,255,0.03)]"
                                                            onClick={() => {
                                                                dispatch(deleteTask({ uid: user.uid, deleteId: task.id }));
                                                                dispatch(fetchTask(user.uid));
                                                            }}
                                                        >
                                                            Delete
                                                        </button>
                                                    </div>
                                                    <div className="text-xs text-slate-400">{task.priority}</div>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        ""
                                    )
                                )}
                            </div>
                        </aside>
                    </div>
                </div>
            </section>

        </>
    )
}

export default Home