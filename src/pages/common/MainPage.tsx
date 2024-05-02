import "./main-page.scss";
import { useState } from "react";
import { deleteTask, updateTaskStatus, useAddTask, useGetBoard, useGetTasks } from "../../api/useApi";
import { Loader } from "../../components/Loader";

export const MainPage = () => {
    const boardQuery = useGetBoard();
    const addTask = useAddTask();
    const boards = boardQuery.isSuccess ? boardQuery.data : [];
    const [newTask, setNewTask] = useState("");
    const [status, setStatus] = useState("todo");
    const tasksQuery = useGetTasks(boards[1]?.id);

    async function handleAddTask(boardId: string) {
        try {
            const response = await addTask.mutateAsync({
                boardId: boardId,
                task: {
                    name: newTask,
                    status: status,
                },
            });
            console.log(response);
            setNewTask("");
        } catch (error) {
            console.error("Error adding task:", error);
        }
    }

    const handleChangeTaskStatus = async (taskId: string, newStatus: string) => {
        try {
            const updatedTask = await updateTaskStatus(taskId, newStatus);
            console.log("Task status updated:", updatedTask);
        } catch (error) {
            console.error("Error updating task status:", error);
        }
    };

    return (
        <div className={"mainPage"}>
            <h2>Main Page</h2>
            {boardQuery.isLoading ? <Loader /> : null}
            {boards.length > 0 && (
                <div className={"boardView"}>
                    {boards[0] && (
                        <div key={boards[1].id} className={"block"}>
                            <h3>{boards[1].name}</h3>
                            <div className={"createTask"}>
                                <input
                                    type="text"
                                    value={newTask}
                                    onChange={(e) => setNewTask(e.target.value)}
                                    placeholder="Enter task name"
                                    className={"inputField"}
                                />
                                <select
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                    className={"taskStatus"}
                                >
                                    <option value="to do">Todo</option>
                                    <option value="in Progress">In Progress</option>
                                    <option value="done">Done</option>
                                </select>
                            </div>
                            <button className={"buttonAddTask"} onClick={() => handleAddTask(boards[1].id)}>
                                Add Task
                            </button>
                            <div>
                                {tasksQuery.isSuccess && (
                                    <ul className={"toDoList"}>
                                        {tasksQuery.data?.items?.map((task) => (
                                            <li key={task.id} className={"singleTasks"}>
                                                <div>{task.name}</div>
                                                <div className={`status ${task.status}`}>{task.status}</div>
                                                <div>
                                                    <button
                                                        type="button"
                                                        className={"changeStatusButton"}
                                                        onClick={() => {
                                                            handleChangeTaskStatus(task.id, "in progress").catch(
                                                                (error) => {
                                                                    console.log(error);
                                                                },
                                                            );
                                                            tasksQuery.refetch();
                                                        }}
                                                    >
                                                        Start Task
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className={"changeStatusButton"}
                                                        onClick={() => {
                                                            handleChangeTaskStatus(task.id, "done").catch((error) => {
                                                                console.log(error);
                                                            });
                                                            tasksQuery.refetch();
                                                        }}
                                                    >
                                                        Complete Task
                                                    </button>

                                                    <button
                                                        type="button"
                                                        className={"removeButton"}
                                                        onClick={() => {
                                                            deleteTask(task.id).catch((error) => {
                                                                console.log(error);
                                                            });
                                                            tasksQuery.refetch();
                                                        }}
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

//     return (
//         <div className={"mainPage"}>
//             <h2>Main Page</h2>
//             {boardQuery.isLoading ? <Loader /> : null}
//             <div className={"boardView"}>
//                 {boards.map((board) => (
//                     <div key={board.id} className={"block"}>
//                         <h3>{board.name}</h3>
//                         <input
//                             type="text"
//                             value={newTask}
//                             onChange={(e) => setNewTask(e.target.value)}
//                             placeholder="Enter task name"
//                         />
//                         <button className={"buttonAddTask"} onClick={() => handleAddTask(board.id)}>
//                             Add Task
//                         </button>
//                         {tasksQuery.isSuccess && board.id === 1 && (
//                             <ul>
//                                 {tasksQuery.data?.items?.map((task) => (
//                                     <li key={task.id}>
//                                         {task.name} - {task.status}
//                                     </li>
//                                 ))}
//                             </ul>
//                         )}
//                     </div>
//                 ))}
//
//             </div>
//         </div>
//     );
// };
