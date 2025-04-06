import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/home/Home";
import MyProjects from "../pages/my_projects/MyProjects";

const DashboardRouter = () => {

    return (
        <>
            <Routes>
                <Route path="/home" element={<Home/>} />
                <Route path="/my_projects" element={<MyProjects/>} />
                <Route path="/*" element={<Navigate to={"/not_found"} replace/> } />
            </Routes>
        </>
    )
}

export default DashboardRouter