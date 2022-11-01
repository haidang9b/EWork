const ACCESS_TOKEN_NAME = "accessToken";
const REFRESH_TOKEN_NAME = "refreshToken";

class TokenService {
    getRefreshToken() {
        return localStorage.getItem(REFRESH_TOKEN_NAME);
    }

    getAccessToken() {
        return localStorage.getItem(ACCESS_TOKEN_NAME);
    }

    setAccessToken(token) {
        localStorage.setItem(ACCESS_TOKEN_NAME, token);
    }

    setRefreshToken(token) {
        localStorage.setItem(REFRESH_TOKEN_NAME, token);
    }
    clearToken() {
        localStorage.removeItem(REFRESH_TOKEN_NAME);
        localStorage.removeItem(ACCESS_TOKEN_NAME);
    }
}
export default new TokenService();
