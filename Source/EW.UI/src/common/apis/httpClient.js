import axios from "axios";
import { BASE_URL, REFRESH_TOKEN_URL } from "../apiUrl";
import TokenService from "./token.service";
const httpClient = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});
httpClient.interceptors.request.use(
    (config) => {
        let token = TokenService.getAccessToken();
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
httpClient.interceptors.response.use(
    function (response) {
        return response;
    },
    async function (error) {
        const originalConfig = error.config;
        if (error.response) {
            if (error.response.status === 403) {
                TokenService.clearToken();
            }
            if (error.response.status === 401 && !originalConfig._retry) {
                originalConfig._retry = true;
                try {
                    await httpClient
                        .post(REFRESH_TOKEN_URL, {
                            RefreshToken: TokenService.getRefreshToken(),
                        })
                        .then((res) => {
                            originalConfig.headers["Authorization"] =
                                res.data.data.accessToken;
                            TokenService.setAccessToken(
                                res.data.data.accessToken
                            );
                            TokenService.setRefreshToken(
                                res.data?.data?.refreshToken
                            );
                        });
                    return httpClient.request({
                        ...originalConfig,
                        headers: {},
                    });
                } catch (_error) {
                    return Promise.reject(_error);
                }
            }
        }
        return Promise.reject(error);
    }
);
export default httpClient;
