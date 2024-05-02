import "./main-page.scss";
import { useAddTask, useGetBoard } from "../../api/useApi";
import { Loader } from "../../components/Loader";

export const MainPage = () => {
    const boardQuery = useGetBoard();
    const addTask = useAddTask();
    const boards = boardQuery.isSuccess ? boardQuery.data : [];

    return (
        <div className={"main-page"}>
            <h2>Main Page</h2>
            {boardQuery.isLoading ? <Loader /> : null}
            {boards.map((board) => {
                return (
                    <div key={board.id}>
                        {board.name}
                        <button
                            onClick={async () => {
                                //TODO: example to create a hardcoded task
                                const response = await addTask.mutateAsync({
                                    boardId: board.id,
                                    task: {
                                        name: "test",
                                        // TODO: status can be omitted
                                        // status: "in progress"
                                    },
                                });
                                console.log(response);
                            }}
                        >
                            Add Task
                        </button>
                    </div>
                );
            })}
        </div>
    );
};
