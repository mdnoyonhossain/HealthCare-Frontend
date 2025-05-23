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
    }),
});

export const { useCreateSpecialtiesMutation, useGetAllSpecialtiesQuery } = specialtiesApi;