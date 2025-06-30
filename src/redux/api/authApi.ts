import { tagTypes } from "../tagTypes";
import baseApi from "./baseApi";

const authApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        userLogin: build.mutation({
            query: (loginData) => ({
                url: '/auth/login',
                method: 'POST',
                contentType: 'application/json',
                data: loginData,
            }),
            invalidatesTags: [tagTypes.user],
        }),
        refreshToken: build.mutation({
            query: () => ({
                url: '/auth/refresh-token',
                method: 'POST',
                contentType: 'application/json',
            }),
            invalidatesTags: [tagTypes.user],
        }),
        changePassword: build.mutation({
            query: (data) => ({
                url: '/auth/change-password',
                method: 'POST',
                contentType: 'application/json',
                data: data,
            }),
            invalidatesTags: [tagTypes.user],
        }),
        forgotPassword: build.mutation({
            query: (data) => ({
                url: '/auth/forgot-password',
                method: 'POST',
                contentType: 'application/json',
                data: data,
            }),
            invalidatesTags: [tagTypes.user],
        }),
        resetPassword: build.mutation({
            query: (data) => ({
                url: '/auth/reset-password',
                method: 'POST',
                contentType: 'application/json',
                data: data,
            }),
            invalidatesTags: [tagTypes.user],
        }),
    }),
});

export const {
    useUserLoginMutation,
    useRefreshTokenMutation,
    useChangePasswordMutation,
    useForgotPasswordMutation,
    useResetPasswordMutation
} = authApi;