import { useEffect, useState, useContext } from "react";
import { createTaskData, fetchTaskData, deleteTaskData, updateTaskData } from "./tasksApi"
import Context from "../../store/context";

export function Tasks() {
    const ctx = useContext(Context)
    const [description, setDescription] = useState('Description')
    const [tasks, setTasks] = useState([])

    useEffect(() => {
        if (ctx.isLoggedIn) {
            function fetch() {
                return fetchTaskData()
            }
            fetch().then(data => {
                setTasks(data)
            })
        }
    }, [ctx.isLoggedIn])

    function handleClickForm() {
        createTaskData({ description })
        setDescription(' ')
    }
    function handleChangeCheckbox(e,task) {
        // console.log(e.target.checked);
        // console.log(_id);
        // console.log(task);
        updateTaskData(task._id, {description: task.description, completed: e.target.checked})
        window.location.reload()

    }
    function handleClickDelete(_id) {
        deleteTaskData(_id)
        window.location.reload()
    }

    return <>
        {!ctx.isLoggedIn && ctx.auth === '' && <h1 className="text-center pt-[200px] text-[100px] text-blue-700 ">Login to get started!</h1>}


        {ctx.isLoggedIn && <div className="relative overflow-x-auto shadow-md sm:rounded-lg mx-20 my-20">
            <form>
                <label htmlFor="search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                <div className="relative flex">
                    <input onChange={(e) => setDescription(e.target.value)} type="text" id="des" className="block w-[25%] p-4 mx-2 my-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={description} required />
                    <button onClick={handleClickForm} type="text" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-6 mx-2 my-5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">ADD</button>
                </div>
            </form>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Description
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Status
                        </th>
                        <th scope="col" className="px-0 py-3">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map((task, i) => (
                        <tr key={i} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {task.description}
                            </th>
                            <td className="px-6 py-4">
                                <input onChange={(e) => handleChangeCheckbox(e,task)} type="checkbox" checked={task.completed} id="stat" />
                            </td>
                            <td className="px-0 py-4">
                                <button onClick={() => handleClickDelete(task._id)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">❌</button>
                            </td>
                        </tr>
                    )
                    )}
                </tbody>
            </table>
        </div>}
    </>
}