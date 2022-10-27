import "./App.css";
import Navbar from "./layouts/Navbar";
import Login from "./pages/Login";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import RequireAuth from "./components/RequireAuth";
import Missing from "./pages/Missing";
import Unauthorized from "./pages/Unauthorized";
function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="home" element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route element={<RequireAuth allowedRoles={["Student"]} />}>
                <Route path="dashboard" element={<Dashboard />} />
            </Route>
            <Route path="unauthorized" element={<Unauthorized />} />
            <Route path="*" element={<Missing />} />
        </Routes>
    );
}

export default App;
