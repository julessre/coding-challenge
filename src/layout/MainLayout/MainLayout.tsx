import { Outlet } from "react-router-dom";
import "./main-layout.scss";

export const MainLayout = () => {
    return (
        <div className={"main-layout"}>
            <Outlet />
        </div>
    );
};
