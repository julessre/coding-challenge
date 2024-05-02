import { useRoutes } from "react-router-dom";
import { MainRoutes } from "./MainRoutes";

export const Routes = () => {
    return useRoutes([MainRoutes]);
};
