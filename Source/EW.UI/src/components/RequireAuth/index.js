import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hook/useAuth";
import PropTypes from "prop-types";

/**
 * Check user can access to route if user login and user have allowed roles
 * @param allowedRoles list of role for accept access to route
 * @returns redirect or access to route
 */
const RequireAuth = ({ allowedRoles }) => {
    const { user } = useAuth();
    const location = useLocation();

    return allowedRoles?.includes(user?.role) ? (
        <Outlet />
    ) : user ? (
        <Navigate to="/unauthorized" state={{ from: location }} replace />
    ) : (
        <Navigate to="/login" state={{ from: location }} replace />
    );
};

RequireAuth.propTypes = {
    allowedRoles: PropTypes.array.isRequired,
};
export default RequireAuth;
