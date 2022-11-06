import TokenService from "../common/apis/token.service";

const useAuth = () => {
    let token = TokenService.getAccessToken();
    return {
        user: TokenService.getUserFromToken(token),
    };
};

export default useAuth;
