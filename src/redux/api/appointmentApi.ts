import { TMeta } from "@/types";
import { tagTypes } from "../tagTypes";
import baseApi from "./baseApi";

const appointmentApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        createAppointment: build.mutation({
            query: (data) => ({
                url: "/appointment",
                method: "POST",
                data,
            }),
            invalidatesTags: [tagTypes.appointment],
        }),
        getAllAppointments: build.query({
            query: (arg: Record<string, any>) => {
                return {
                    url: "/appointment",
                    method: "GET",
                    params: arg,
                };
            },
            transformResponse: (response: [], meta: TMeta) => ({ appointments: response, meta, }),
            providesTags: [tagTypes.appointment],
        }),
        getMyAppointments: build.query({
            query: (arg: Record<string, any>) => {
                return {
                    url: "/appointment/my-appointment",
                    method: "GET",
                    params: arg,
                };
            },
            transformResponse: (response: any, meta: TMeta) => ({ appointments: response, meta, }),
            providesTags: [tagTypes.appointment, tagTypes.prescription],
        }),
        appointmentStatusChange: build.mutation({
            query: (data) => ({
                url: `/appointment/status/${data.id}`,
                method: "PATCH",
                data: data.body,
            }),
            invalidatesTags: [tagTypes.appointment],
        }),
    }),
});

export const {
    useCreateAppointmentMutation,
    useGetAllAppointmentsQuery,
    useGetMyAppointmentsQuery,
    useAppointmentStatusChangeMutation
} = appointmentApi;