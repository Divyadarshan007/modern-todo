import { onAuthStateChanged, signOut } from "firebase/auth"
import { useEffect, useState } from "react"
import { auth } from "../config/firebase"
import { useDispatch, useSelector } from "react-redux"
import { addTask, fetchTask } from "../features/todoSlice"

const Home = () => {
    const [user, setUser] = useState(null);
    const [input, setInput] = useState({
        task: '', priority: ''
    })
    const tasks = useSelector((store) => store.todos.list)

    const dispatch = useDispatch()

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (u) => {
            setUser(u);
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        dispatch(fetchTask(user?.uid))
    }, [user])

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(addTask({ uid: user.uid, value: input }))
        setInput({ task: '', priority: '' })
    }
    return (
        <section className="bg-gray-50 dark:bg-gray-900 py-10 h-screen sm:py-20">
            <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
                <div className="pb-5 flex justify-end">
                    <div>
                        
                    </div>
                    <button className="bg-rose-700 rounded-md px-7 py-1 text-white" onClick={() => {
                        signOut(auth)
                        console.log('hello');

                    }}>logout</button>
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
                                    <th scope="col" className="px-4 py-3">No.</th>
                                    <th scope="col" className="px-4 py-3">Task</th>
                                    <th scope="col" className="px-4 py-3">Priority</th>
                                    <th scope="col" className="px-4 py-3">Action</th>

                                </tr>
                            </thead>
                            <tbody>
                                {tasks.map((task, idx) => {
                                    return <tr key={task.id} className="border-b dark:border-gray-700">
                                        <th scope="row" className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">{idx + 1}</th>
                                        <td className="px-4 py-3">{task.task}</td>
                                        <td className="px-4 py-3">{task.priority}</td>
                                        <td className="px-4 py-3">{task.status}</td>
                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-4">
                                                <button>Edit</button>
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