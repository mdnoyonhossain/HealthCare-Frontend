import { TMeta } from "@/types";
import { tagTypes } from "../tagTypes";
import baseApi from "./baseApi";

const prescriptionApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        createPrescription: build.mutation({
            query: (data) => ({
                url: "/prescription",
                method: "POST",
                data
            }),
            invalidatesTags: [tagTypes.prescription]
        }),
        getAllPrescriptions: build.query({
            query: (arg: Record<string, any>) => ({
                url: "/prescription",
                method: "GET",
                params: arg
            }),
            transformResponse: (response: any, meta: TMeta) => ({ prescriptions: response, meta }),
            providesTags: [tagTypes.prescription]
        }),
        getMyPrescriptions: build.query({
            query: (arg: Record<string, any>) => {
                return {
                    url: "/prescription/my-prescription",
                    method: "GET",
                    params: arg,
                };
            },
            transformResponse: (response: any, meta: TMeta) => ({ prescriptions: response, meta }),
            providesTags: [tagTypes.prescription],
        }),
    })
});

export const {
    useCreatePrescriptionMutation,
    useGetAllPrescriptionsQuery,
    useGetMyPrescriptionsQuery
} = prescriptionApi;