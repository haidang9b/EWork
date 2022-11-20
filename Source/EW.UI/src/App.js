import "./App.css";
import Login from "./pages/Login";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import RequireAuth from "./components/RequireAuth";
import Missing from "./pages/Missing";
import Unauthorized from "./pages/Unauthorized";
import CreateRecruiter from "./pages/CreateRecruiter";
import AccoutnManagement from "./pages/AccountManagement";
import RecruiterManagement from "./pages/RecruiterManagement";
import Profile from "./pages/Profile";
import CVManagement from "./pages/CVManagement";
function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="home" element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="recruiter-sign-up" element={<CreateRecruiter />} />
            <Route path="profile" element={<Profile />} />
            <Route element={<RequireAuth allowedRoles={["Faculty"]} />}>
                <Route path="dashboard" element={<Dashboard />} />
                <Route
                    path="account-management"
                    element={<AccoutnManagement />}
                />
                <Route
                    path="recruiter-management"
                    element={<RecruiterManagement />}
                />
            </Route>
            <Route element={<RequireAuth allowedRoles={["Student"]} />}>
                <Route path="my-cv" element={<CVManagement />} />
            </Route>
            <Route path="unauthorized" element={<Unauthorized />} />
            <Route path="*" element={<Missing />} />
        </Routes>
    );
}

export default App;
