import { handleRefreshToken } from "../../redux/auth.slice";
import { REFRESH_TOKEN_URL } from "../apiUrl";
import axiosInstance from "./httpClient";
import TokenService from "./token.service";

const setup = (store) => {
    axiosInstance.interceptors.request.use(
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
    const { dispatch } = store;
    axiosInstance.interceptors.response.use(
        function (response) {
            return response;
        },
        async function (error) {
            const originalConfig = error.config;
            if (error.response) {
                if (error.response.status === 400) {
                    // dispatch(authSlice.actions.handleLogout());
                }
                if (error.response.status === 401 && !originalConfig._retry) {
                    originalConfig._retry = true;
                    try {
                        await axiosInstance
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
                                dispatch(handleRefreshToken(res));
                            });
                        return axiosInstance(originalConfig);
                    } catch (_error) {
                        return Promise.reject(_error);
                    }
                }
            }
            return Promise.reject(error);
        }
    );
};

export default setup;
