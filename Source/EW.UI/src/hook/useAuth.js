import TokenService from "../common/apis/token.service";
import { Role } from "../common/constants";

/**
 * Hook support for translate access token to object
 * @returns user logged in app
 */
const useAuth = () => {
    let token = TokenService.getAccessToken();
    let user = TokenService.getUserFromToken(token);
    return {
        user: user,
        isFaculty: user?.role === Role.Faculty,
        isBusiness: user?.role === Role.Business,
        isStudent: user?.role === Role.Student,
    };
};

export default useAuth;
