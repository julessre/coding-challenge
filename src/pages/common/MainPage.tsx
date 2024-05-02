import "./main-page.scss";
import { useState } from "react";
import { useAddTask, useGetBoard, useGetTask } from "../../api/useApi";
import { Loader } from "../../components/Loader";

export const MainPage = () => {
    const boardQuery = useGetBoard();
    const addTask = useAddTask();
    const taskQuery = useGetTask();

    const boards = boardQuery.isSuccess ? boardQuery.data : [];
    const tasks = taskQuery.isSuccess ? taskQuery.data : [];
    const [newTask, setNewTask] = useState("");

    async function handleAddTask(boardId: string) {
        try {
            const response = await addTask.mutateAsync({
                boardId: boardId,
                task: {
                    name: newTask,
                },
            });
            console.log(response);
            // Optionally, you can reset the input field after successful task addition
            setNewTask("");
        } catch (error) {
            console.error("Error adding task:", error);
        }
    }

    return (
        <div className={"mainPage"}>
            <h2>Main Page</h2>
            {boardQuery.isLoading ? <Loader /> : null}
            <div className={"boardView"}>
                {boards.map((board) => {
                    return (
                        <div key={board.id} className={"block"}>
                            <h3>{board.name}</h3>
                            <input
                                type="text"
                                value={newTask}
                                onChange={(e) => setNewTask(e.target.value)}
                                placeholder="Enter task name"
                            />
                            <button className={"buttonAddTask"} onClick={() => handleAddTask(board.id)}>
                                Add Task
                            </button>
                            <ul>
                                {tasks.map((task) => (
                                    <li key={task.id}>{task.name}</li>
                                ))}
                            </ul>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
