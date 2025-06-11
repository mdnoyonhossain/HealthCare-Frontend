import { tagTypes } from "../tagTypes";
import baseApi from "./baseApi";

const userApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getAllUsers: build.query({
            query: () => ({
                url: "/user",
                method: "GET"
            }),
            providesTags: [tagTypes.user]
        }),
        getMyProfile: build.query({
            query: () => ({
                url: "/user/me",
                method: "GET"
            }),
            providesTags: [tagTypes.user]
        }),
        updateMyProfile: build.mutation({
            query: ({ id, data }) => ({
                url: "/user/update-my-profile",
                method: "PATCH",
                contentType: "multipart/form-data",
                data
            }),
            invalidatesTags: [tagTypes.user]
        }),
        updateUserStatus: build.mutation({
            query: ({ id, data }) => ({
                url: `/user/${id}/status`,
                method: "PATCH",
                data
            }),
            invalidatesTags: [tagTypes.user]
        })
    }),
});

export const {
    useGetAllUsersQuery,
    useGetMyProfileQuery,
    useUpdateMyProfileMutation,
    useUpdateUserStatusMutation
} = userApi;