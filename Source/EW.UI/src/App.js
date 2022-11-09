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
function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="home" element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="recruiter-sign-up" element={<CreateRecruiter />} />
            <Route element={<RequireAuth allowedRoles={["Faculty"]} />}>
                <Route path="dashboard" element={<Dashboard />} />
                <Route
                    path="account-management"
                    element={<AccoutnManagement />}
                />
            </Route>
            <Route path="unauthorized" element={<Unauthorized />} />
            <Route path="*" element={<Missing />} />
        </Routes>
    );
}

export default App;
