import { useSelector } from "react-redux";
import { Role } from "../common/constants";

/**
 * Hook support for translate access token to object
 * @returns {user, isFaculty, isBusiness, isStudent} user logged in app
 */
const useAuth = () => {
    let user = useSelector((state) => state.auth.user);
    return {
        user: user,
        isFaculty: user?.role === Role.Faculty,
        isBusiness: user?.role === Role.Business,
        isStudent: user?.role === Role.Student,
    };
};

export default useAuth;
