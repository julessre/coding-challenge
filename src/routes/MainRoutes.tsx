import { MainLayout } from "../layout/MainLayout/MainLayout";
import { MainPage } from "../pages/common/MainPage";

export const MainRoutes = {
    path: "/",
    children: [
        {
            path: "/",
            element: <MainLayout />,
            children: [
                {
                    path: "",
                    element: <MainPage />,
                },
                {
                    path: "main",
                    element: <MainPage />,
                },
            ],
        },
    ],
};
