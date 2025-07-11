import { TMeta } from "@/types";
import { tagTypes } from "../tagTypes";
import baseApi from "./baseApi";

const reviewApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        createReview: build.mutation({
            query: (data) => ({
                url: "/review",
                method: "POST",
                data
            }),
            invalidatesTags: [tagTypes.review]
        }),
        getAllReviews: build.query({
            query: (arg: Record<string, any>) => ({
                url: "/review",
                method: "GET",
                params: arg
            }),
            transformResponse: (response: any, meta: TMeta) => ({ reviews: response, meta }),
            providesTags: [tagTypes.review]
        })
    })
});

export const {
    useCreateReviewMutation,
    useGetAllReviewsQuery
} = reviewApi;