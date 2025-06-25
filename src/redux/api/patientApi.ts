import { TMeta } from "@/types";
import { tagTypes } from "../tagTypes";
import baseApi from "./baseApi";
import { TPatient } from "@/types/patient";

const patientApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getAllPatients: build.query({
            query: (arg: Record<string, any>) => ({
                url: "/patient",
                method: "GET",
                params: arg
            }),
            transformResponse: (response: TPatient[], meta: TMeta) => ({ patients: response, meta }),
            providesTags: [tagTypes.patient]
        }),
        getSinglePatient: build.query({
            query: (id) => ({
                url: `/patient/${id}`,
                method: "GET"
            }),
            providesTags: [tagTypes.patient]
        }),
        updatePatient: build.mutation({
            query: (data) => ({
                url: `/patient/${data.id}`,
                method: "PATCH",
                data: data.body
            }),
            invalidatesTags: [tagTypes.patient, tagTypes.user]
        }),
        deletePatient: build.mutation({
            query: (id) => ({
                url: `/patient/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: [tagTypes.patient]
        }),
        softDeletePatient: build.mutation({
            query: (id) => ({
                url: `/patient/soft/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: [tagTypes.patient]
        }),
    })
});

export const {
    useGetAllPatientsQuery,
    useGetSinglePatientQuery,
    useUpdatePatientMutation,
    useDeletePatientMutation,
    useSoftDeletePatientMutation
} = patientApi;