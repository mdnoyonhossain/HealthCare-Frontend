import { tagTypes } from "../tagTypes";
import baseApi from "./baseApi";

const metaApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getMetaData: build.query({
            query: () => ({
                url: "/meta",
                method: "GET"
            }),
            // transformResponse: (response: any) => ({ prescriptions: response }),
            providesTags: [tagTypes.meta]
        })
    })
});

export const { useGetMetaDataQuery } = metaApi;