import TokenService from "../common/apis/token.service";

/**
 * Hook support for translate access token to object
 * @returns user logged in app
 */
const useAuth = () => {
    let token = TokenService.getAccessToken();
    return {
        user: TokenService.getUserFromToken(token),
    };
};

export default useAuth;
