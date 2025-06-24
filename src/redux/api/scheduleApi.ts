import { TDoctor } from "@/types/doctor";
import { tagTypes } from "../tagTypes";
import baseApi from "./baseApi";
import { TMeta } from "@/types";
import { TGetAllSchedulesResponse, TGetSchedule, TScheduleFrom } from "@/types/schedule";

const scheduleApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        createSchedule: build.mutation({
            query: (data) => ({
                url: "/schedule",
                method: "POST",
                data
            }),
            invalidatesTags: [tagTypes.schedule]
        }),
        getAllSchedules: build.query({
            query: (arg: Record<string, any>) => ({
                url: "/schedule",
                method: "GET",
                params: arg
            }),
            transformResponse: (response: { data: TGetAllSchedulesResponse[], meta: TMeta }, meta: TMeta) => ({ schedules: response, meta }),
            providesTags: [tagTypes.schedule]
        }),
        getSingleSchedule: build.query({
            query: (id) => ({
                url: `/schedule/${id}`,
                method: "GET"
            }),
            providesTags: [tagTypes.schedule]
        }),
        deleteSchedule: build.mutation({
            query: (id) => ({
                url: `/schedule/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: [tagTypes.schedule]
        })
    })
});

export const {
    useCreateScheduleMutation,
    useGetAllSchedulesQuery,
    useGetSingleScheduleQuery,
    useDeleteScheduleMutation
} = scheduleApi;