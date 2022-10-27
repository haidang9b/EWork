import axios from "axios";
import { BASE_URL, REFRESH_TOKEN_URL } from "../apiUrl";

const httpClient = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});
// // set token in header
// httpClient.interceptors.request.use(
//     (config) => {
//         let accessToken = localStorage.get("accessToken");
//         if (accessToken) {
//             config.headers.Authorization = `Bearer ${accessToken}`;
//         }
//         return config;
//     },
//     (error) => {
//         return Promise.reject(error);
//     }
// );

// // handle refresh token when error
// httpClient.interceptors.response.use(
//     (response) => {
//         return response;
//     },
//     async (error) => {
//         const originalConfig = error.config;

//         if (error?.response?.status === 403 && !originalConfig._retry) {
//             originalConfig._retry = true;
//             await refreshToken();
//             let accessToken = localStorage.get("accessToken");

//             if (originalConfig.headers.Authorization) {
//                 originalConfig.headers.Authorization = `Bearer ${accessToken}`;
//             }
//             return await httpClient(originalConfig);
//         }
//         return Promise.reject(error);
//     }
// );

// // function execute refresh token
// const refreshToken = async () => {
//     try {
//         let accessToken = localStorage.get("accessToken");
//         let refreshToken = localStorage.get("refreshToken");
//         if (accessToken && refreshToken) {
//             const response = await httpClient.post(REFRESH_TOKEN_URL, {
//                 refreshToken: refreshToken,
//             });
//             if (response === 200) {
//                 // set local storage
//                 return true;
//             }
//         }
//         return false;
//     } catch (error) {
//         return false;
//     }
// };

export default httpClient;
