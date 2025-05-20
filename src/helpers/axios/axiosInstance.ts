import { authKey } from "@/constants/authKey";
import { TGenericErrorResponse, TResponseSuccessData } from "@/types";
import { getFromLocalStorage } from "@/utils/localStorage";
import axios from "axios";

const axiosInstance = axios.create();
axiosInstance.defaults.headers.post["Content-Type"] = "application/json";
axiosInstance.defaults.headers["Accept"] = "application/json";
axiosInstance.defaults.timeout = 60000;

axiosInstance.interceptors.request.use(function (config) {
    const accessToken = getFromLocalStorage(authKey);
    if (accessToken) {
        config.headers.Authorization = accessToken;
    }

    return config;
}, function (error) {
    return Promise.reject(error);
});

axiosInstance.interceptors.response.use(
    // @ts-ignore
    function (response) {
        const responseObj: TResponseSuccessData = {
            data: response?.data?.data,
            meta: response?.data?.meta
        }

        return responseObj;
    }, function (error) {
        const responseObj: TGenericErrorResponse = {
            statusCode: error?.response?.data?.statusCode || 500,
            message: error?.response?.data?.message || "Something went wrong!",
            errorMessages: error?.response?.data?.message
        }

        return responseObj;
    });

export default axiosInstance;