// see https://bewerber-test.bitperfect-software.com/docs for the API Swagger documentation

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { BACKEND_TOKEN, BACKEND_URL } from "../config";

export type Board = {
    id: string;
    name: string;
    tasks: TaskOut[];
};

export type TaskOut = {
    id: string;
    name: string;
    status: "todo" | "in progress" | "done";
};

export type TaskInput = {
    name: string;
    status?: "todo" | "in progress" | "done";
};

const getBoard = (url: string) => {
    return axios.request({
        url: url,
        headers: {},
        method: "GET",
    });
};

export const useGetBoard = () => {
    const url = `${BACKEND_URL}/api/v1/boards/${BACKEND_TOKEN}`;

    return useQuery<Array<Board>>({
        queryKey: [url],
        queryFn: async () => {
            const response = await getBoard(url);
            if (response.status === 200) {
                return response.data;
            } else {
                throw Error;
            }
        },
        enabled: BACKEND_TOKEN !== "",
    });
};

const addTask = (boardId: string, task: TaskInput) => {
    const url = `${BACKEND_URL}/api/v1/boards/${boardId}/tasks`;
    return axios.request({
        url: url,
        headers: {},
        params: {
            name: task.name,
            status: task.status ?? undefined,
            body: JSON.stringify(task),
        },
        method: "POST",
    });
};

export const useAddTask = () => {
    const queryClient = useQueryClient();

    return useMutation<TaskOut, unknown, { boardId: string; task: TaskInput }>({
        mutationKey: [addTask],
        mutationFn: async ({ boardId, task }) => {
            const response = await addTask(boardId, task);
            if (response.status === 200) {
                return response.data;
            } else {
                throw Error;
            }
        },
        onSuccess: async () => {
            // TODO: invalidate query keys to refresh tasks
            await queryClient.invalidateQueries({ queryKey: [] });
        },
    });
};

export const getTask = (boardId: string, task: TaskOut) => {
    const url = `${BACKEND_URL}/api/v1/boards/${boardId}/tasks`;
    return axios.request({
        url: url,
        headers: {},
        params: {
            name: task.name,
            status: task.status ?? undefined,
        },
        method: "GET",
    });
};

export const useGetTasks = (boardId: string) => {
    const url = `${BACKEND_URL}/api/v1/boards/${boardId}/tasks`;

    return useQuery<TaskOut[]>({
        queryKey: ["tasks", boardId],
        queryFn: async () => {
            const response = await axios.get<TaskOut[]>(url);
            return response.data;
        },
    });
};

export const deleteTask = (taskId: string) => {
    return axios.delete(`${BACKEND_URL}/api/v1/tasks/${taskId}`);
};

export const updateTaskStatus = async (taskId: string, newStatus: string) => {
    const url = `${BACKEND_URL}/api/v1/tasks/${taskId}`;
    try {
        const response = await axios.put(url, {}, { params: { status: newStatus } });
        console.log(response.data);
        return response.data;
    } catch (error) {
        throw new Error("Failed to update task status");
    }
};
