import { TMeta } from "@/types";
import { tagTypes } from "../tagTypes";
import baseApi from "./baseApi";
import { TAdmin } from "@/types/admin";

const adminApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        createAdmin: build.mutation({
            query: (data) => ({
                url: "/user/create-admin",
                method: "POST",
                contentType: "multipart/form-data",
                data
            }),
            invalidatesTags: [tagTypes.admin]
        }),
        getAllAdmins: build.query({
            query: (arg: Record<string, any>) => ({
                url: "/admin",
                method: "GET",
                params: arg
            }),
            transformResponse: (response: TAdmin[], meta: TMeta) => ({ admins: response, meta }),
            providesTags: [tagTypes.admin]
        }),
        getSingleAdmin: build.query({
            query: (id) => ({
                url: `/admin/${id}`,
                method: "GET"
            }),
            providesTags: [tagTypes.admin]
        }),
        updateAdmin: build.mutation({
            query: (data) => ({
                url: `/admin/${data.id}`,
                method: "PATCH",
                data: data.body
            }),
            invalidatesTags: [tagTypes.admin, tagTypes.user]
        }),
        deleteAdmin: build.mutation({
            query: (id) => ({
                url: `/admin/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: [tagTypes.admin]
        }),
        softDeleteAdmin: build.mutation({
            query: (id) => ({
                url: `/admin/soft/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: [tagTypes.admin]
        }),
    })
});

export const {
    useCreateAdminMutation,
    useGetAllAdminsQuery,
    useGetSingleAdminQuery,
    useUpdateAdminMutation,
    useDeleteAdminMutation,
    useSoftDeleteAdminMutation
} = adminApi;