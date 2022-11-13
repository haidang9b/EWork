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
        console.log("ddax clean");
        localStorage.removeItem(REFRESH_TOKEN_NAME);
        localStorage.removeItem(ACCESS_TOKEN_NAME);
    }

    getUserFromToken(token) {
        try {
            var base64Url = token.split(".")[1];
            var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
            var jsonPayload = decodeURIComponent(
                atob(base64)
                    .split("")
                    .map(function (c) {
                        return (
                            "%" +
                            ("00" + c.charCodeAt(0).toString(16)).slice(-2)
                        );
                    })
                    .join("")
            );

            return JSON.parse(jsonPayload);
        } catch (e) {
            return null;
        }
    }
}
export default new TokenService();
