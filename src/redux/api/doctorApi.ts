import { TDoctor } from "@/types/doctor";
import { tagTypes } from "../tagTypes";
import baseApi from "./baseApi";
import { TMeta } from "@/types";

const doctorApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        createDoctor: build.mutation({
            query: (data) => ({
                url: "/user/create-doctor",
                method: "POST",
                contentType: "multipart/form-data",
                data
            }),
            invalidatesTags: [tagTypes.doctor]
        }),
        getAllDoctors: build.query({
            query: (arg: Record<string, any>) => ({
                url: "/doctor",
                method: "GET",
                params: arg
            }),
            transformResponse: (response: TDoctor[], meta: TMeta) => ({ doctors: response, meta }),
            providesTags: [tagTypes.doctor]
        }),
        getSingleDoctor: build.query({
            query: (id) => ({
                url: `/doctor/${id}`,
                method: "GET"
            }),
            providesTags: [tagTypes.doctor]
        }),
        updateDoctor: build.mutation({
            query: (data) => ({
                url: `/doctor/${data.id}`,
                method: "PATCH",
                data: data.body
            }),
            invalidatesTags: [tagTypes.doctor, tagTypes.user]
        }),
        deleteDoctor: build.mutation({
            query: (id) => ({
                url: `/doctor/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: [tagTypes.doctor]
        }),
        softDeleteDoctor: build.mutation({
            query: (id) => ({
                url: `/doctor/soft/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: [tagTypes.doctor]
        }),
    })
});

export const {
    useCreateDoctorMutation,
    useGetAllDoctorsQuery,
    useGetSingleDoctorQuery,
    useUpdateDoctorMutation,
    useDeleteDoctorMutation,
    useSoftDeleteDoctorMutation
} = doctorApi;