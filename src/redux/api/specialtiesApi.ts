import { tagTypes } from "../tagTypes";
import baseApi from "./baseApi";

const specialtiesApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        createSpecialties: build.mutation({
            query: (data) => ({
                url: "/specialties",
                method: "POST",
                contentType: "multipart/form-data",
                data
            }),
            invalidatesTags: [tagTypes.specialties]
        }),
        getAllSpecialties: build.query({
            query: () => ({
                url: "/specialties",
                method: "GET"
            }),
            providesTags: [tagTypes.specialties]
        }),
        getSingleSpecialties: build.query({
            query: (id) => ({
                url: `/specialties/${id}`,
                method: "GET"
            }),
            providesTags: [tagTypes.specialties]
        }),
        updateSpecialties: build.mutation({
            query: ({ id, data }) => ({
                url: `/specialties/${id}`,
                method: "PATCH",
                contentType: "multipart/form-data",
                data
            }),
            invalidatesTags: [tagTypes.specialties]
        }),
        deleteSpecialist: build.mutation({
            query: (id) => ({
                url: `/specialties/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: [tagTypes.specialties]
        }),
    }),
});

export const {
    useCreateSpecialtiesMutation,
    useGetAllSpecialtiesQuery,
    useGetSingleSpecialtiesQuery,
    useUpdateSpecialtiesMutation,
    useDeleteSpecialistMutation
} = specialtiesApi;