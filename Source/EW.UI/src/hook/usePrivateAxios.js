import axios from "axios";
import { useEffect } from "react";
import httpClient, { axiosPrivate } from "../common/apis/httpClient";
import tokenService from "../common/apis/token.service";
import { REFRESH_TOKEN_URL } from "../common/apiUrl";
import useAuth from "./useAuth";

export const useAxiosPrivate = () => {
    const { user } = useAuth();
    const accessToken = tokenService.getAccessToken();
    useEffect(() => {
        const requestIntercept = axiosPrivate.interceptors.request.use(
            (config) => {
                let token = tokenService.getAccessToken();
                if (token) {
                    config.headers["Authorization"] = `Bearer ${token}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );
        const responseIntercept = axiosPrivate.interceptors.response.use(
            (response) => response,
            async (error) => {
                const prevRequest = error?.config;
                if (
                    error?.response?.status === 401 &&
                    prevRequest?.sent == false
                ) {
                    prevRequest.sent = true;
                    const res = await httpClient.post(
                        REFRESH_TOKEN_URL,
                        tokenService.getRefreshToken()
                    );
                    const { accessToken, refreshToken } = res.data.data;
                    prevRequest.headers[
                        "Authorization"
                    ] = `Bearer ${accessToken}`;
                    tokenService.setAccessToken(accessToken);
                    tokenService.setRefreshToken(refreshToken);
                    return axiosPrivate(prevRequest);
                }
                return Promise.reject(error);
            }
        );
        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept);
            axiosPrivate.interceptors.response.eject(responseIntercept);
        };
    });
    return axiosPrivate;
};
