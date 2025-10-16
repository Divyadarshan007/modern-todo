import { onAuthStateChanged, signOut } from "firebase/auth"
import { useEffect, useState } from "react"
import { auth, db } from "../config/firebase"
import { useDispatch, useSelector } from "react-redux"
import { addTask, editTask, fetchTask } from "../features/todoSlice"
import { useNavigate, useParams } from "react-router-dom"
import { doc, getDoc } from "firebase/firestore"

const Home = () => {
    const [user, setUser] = useState(null);
    const [input, setInput] = useState({
        task: '', priority: ''
    })
    const tasks = useSelector((store) => store.todos.list)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { id } = useParams()
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (u) => {
            setUser(u);
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        console.log(user);
        dispatch(fetchTask(user?.uid))
    }, [user])

    useEffect(() => {
        dispatch(fetchTask(user?.uid))
    }, [])
    useEffect(() => {
        if (id) {
            fetchOne()
        }
    }, [id])

    const fetchOne = async () => {
        const docRef = await getDoc(doc(db, `${user.uid}`))
        setInput(docRef.data())
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(addTask({ uid: user.uid, value: input }))
        setInput({ task: '', priority: '' })
    }

    const handleEdit = (id) => {
        dispatch(editTask({ editId: id, value: input }))
        dispatch(fetchTask(user?.uid))
    }
    return (
        <section className="bg-gray-50 dark:bg-gray-900 py-10 h-screen sm:py-20">
            <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
                <div className="pb-5 flex justify-end">
                    <div className="flex items-center gap-4">
                        <svg className="w-10 h-10 border rounded-full text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="gray" viewBox="0 0 24 24">
                            <path fill-rule="evenodd" d="M12 20a7.966 7.966 0 0 1-5.002-1.756l.002.001v-.683c0-1.794 1.492-3.25 3.333-3.25h3.334c1.84 0 3.333 1.456 3.333 3.25v.683A7.966 7.966 0 0 1 12 20ZM2 12C2 6.477 6.477 2 12 2s10 4.477 10 10c0 5.5-4.44 9.963-9.932 10h-.138C6.438 21.962 2 17.5 2 12Zm10-5c-1.84 0-3.333 1.455-3.333 3.25S10.159 13.5 12 13.5c1.84 0 3.333-1.455 3.333-3.25S13.841 7 12 7Z" clip-rule="evenodd" />
                        </svg>


                        <button className="bg-rose-700 rounded-md px-7 py-1 text-white" onClick={() => {
                            signOut(auth)
                        }}>logout</button>
                    </div>
                </div>
                <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
                    <div className=" space-y-3 md:space-y-0 md:space-x-4 p-4">
                        <form className="flex justify-center items-center gap-5" onSubmit={handleSubmit}>
                            <div className="relative w-full">
                                <input type="text" id="task" value={input.task} onChange={(e) => setInput({ ...input, [e.target.id]: e.target.value })} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-5 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter task" required />
                            </div>
                            <div className="relative w-full">
                                <select id="priority" value={input.priority} onChange={(e) => setInput({ ...input, [e.target.id]: e.target.value })} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    <option value="">Choose a Priority</option>
                                    <option value="high">High</option>
                                    <option value="medium">medium</option>
                                    <option value="low">Low</option>
                                </select>
                            </div>
                            <div className="flex gap-4">
                                <button className="bg-green-700 rounded-md px-7 py-1 text-white">Add</button>
                            </div>
                        </form>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-4 py-3 text-center">No.</th>
                                    <th scope="col" className="px-4 py-3 text-center">Task</th>
                                    <th scope="col" className="px-4 py-3 text-center">Priority</th>
                                    <th scope="col" className="px-4 py-3 text-center">Status</th>
                                    <th scope="col" className="px-4 py-3 text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tasks.map((task, idx) => {
                                    return <tr key={task.id} className="border-b dark:border-gray-700">
                                        <th scope="row" className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap text-center dark:text-white">{idx + 1}</th>
                                        <td className="px-4 py-3 text-center">{task.task}</td>
                                        <td className="px-4 py-3 text-center">{task.priority}</td>
                                        <td className="px-4 py-3 text-center">{task.status}</td>
                                        <td className="px-4 py-3 flex justify-center">
                                            <div className="flex items-center gap-4">
                                                <button onClick={() => navigate(`/${task.id}`)}>Edit</button>
                                                <button>Delete</button>
                                            </div>
                                        </td>
                                    </tr>
                                })}
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </section>
    )
}

export default Home