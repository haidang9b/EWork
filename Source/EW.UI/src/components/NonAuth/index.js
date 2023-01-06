import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hook/useAuth";
/**
 * Check user can access to route if user is not login
 * @returns redirect or access to route
 * @example
 * <NonAuth/>
 */
const NonAuth = () => {
    const { user } = useAuth();
    const location = useLocation();

    return user ? (
        <Navigate to="/unauthorized" state={{ from: location }} replace />
    ) : (
        <Outlet />
    );
};
NonAuth.displayName = "NonAuth";
export default NonAuth;
