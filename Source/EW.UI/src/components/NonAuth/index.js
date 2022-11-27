import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hook/useAuth";

const NonAuth = () => {
    const { user } = useAuth();
    const location = useLocation();

    return user ? (
        <Navigate to="/unauthorized" state={{ from: location }} replace />
    ) : (
        <Outlet />
    );
};

export default NonAuth;
