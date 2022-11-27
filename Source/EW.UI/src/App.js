import "./App.css";
import { Routes, Route } from "react-router-dom";
import { NonAuth, RequireAuth } from "./components";
import {
    Login,
    Home,
    Dashboard,
    Missing,
    Unauthorized,
    CreateRecruiter,
    AccountManagement,
    RecruiterManagement,
    Profile,
    CVManagement,
    CompanyManagement,
} from "./pages";
function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="home" element={<Home />} />
            <Route element={<NonAuth />}>
                <Route path="login" element={<Login />} />
                <Route path="recruiter-sign-up" element={<CreateRecruiter />} />
            </Route>
            <Route path="profile" element={<Profile />} />
            <Route element={<RequireAuth allowedRoles={["Faculty"]} />}>
                <Route path="dashboard" element={<Dashboard />} />
                <Route
                    path="account-management"
                    element={<AccountManagement />}
                />
                <Route
                    path="recruiter-management"
                    element={<RecruiterManagement />}
                />
                <Route
                    path="company-management"
                    element={<CompanyManagement />}
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
