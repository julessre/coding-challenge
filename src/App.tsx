import "./app.scss";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes } from "./routes/Routes";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {},
    },
});

export const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <Routes />
        </QueryClientProvider>
    );
};
