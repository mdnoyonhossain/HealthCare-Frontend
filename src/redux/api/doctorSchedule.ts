import { TMeta } from "@/types";
import { tagTypes } from "../tagTypes";
import baseApi from "./baseApi";

export const doctorScheduleApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        createDoctorSchedule: build.mutation({
            query: (data) => ({
                url: '/doctor-schedule',
                method: 'POST',
                data,
            }),
            invalidatesTags: [tagTypes.doctorSchedule],
        }),
        getAllDoctorSchedules: build.query({
            query: (arg: Record<string, any>) => {
                return {
                    url: '/doctor-schedule',
                    method: 'GET',
                    params: arg,
                };
            },
            transformResponse: (response: any, meta: TMeta) => ({ doctorSchedules: response, meta }),
            providesTags: [tagTypes.doctorSchedule],
        }),
        getSingleDoctorSchedule: build.query({
            query: (id: string | string[] | undefined) => ({
                url: `/doctor-schedule/${id}`,
                method: 'GET',
            }),
            providesTags: [tagTypes.doctorSchedule],
        }),
        getMySchedule: build.query({
            query: () => ({
                url: '/doctor-schedule/my-schedules',
                method: 'GET',
            }),
            providesTags: [tagTypes.doctorSchedule],
        }),
        deleteDoctorSchedule: build.mutation({
            query: (id: string) => ({
                url: `/doctor-schedule/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: [tagTypes.doctorSchedule],
        }),
    }),
});

export const {
    useCreateDoctorScheduleMutation,
    useGetAllDoctorSchedulesQuery,
    useGetSingleDoctorScheduleQuery,
    useGetMyScheduleQuery,
    useDeleteDoctorScheduleMutation
} = doctorScheduleApi;