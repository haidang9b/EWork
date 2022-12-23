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
    Profile,
    CVManagement,
    CompanyManagement,
    RecoveryAccount,
    ConfirmRecover,
    RecruitmentPost,
    CompanyInformation,
    HRManagement,
    CompanyDetail,
} from "./pages";
function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="home" element={<Home />} />
            <Route path="company-detail/:id" element={<CompanyDetail />} />
            <Route element={<NonAuth />}>
                <Route path="login" element={<Login />} />
                <Route path="recruiter-sign-up" element={<CreateRecruiter />} />
                <Route path="recover" element={<RecoveryAccount />} />
                <Route path="confirm-recover" element={<ConfirmRecover />} />
            </Route>
            <Route path="profile" element={<Profile />} />
            <Route element={<RequireAuth allowedRoles={["Faculty"]} />}>
                <Route path="dashboard" element={<Dashboard />} />
                <Route
                    path="account-management"
                    element={<AccountManagement />}
                />
                <Route
                    path="company-management"
                    element={<CompanyManagement />}
                />
            </Route>
            <Route
                element={<RequireAuth allowedRoles={["Business", "Faculty"]} />}
            >
                <Route path="recruitment-posts" element={<RecruitmentPost />} />
            </Route>
            <Route element={<RequireAuth allowedRoles={["Business"]} />}>
                <Route
                    path="company-information"
                    element={<CompanyInformation />}
                />
                <Route path="hr-management" element={<HRManagement />} />
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
