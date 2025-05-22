import baseApi from "./baseApi";

const specialtiesApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        createSpecialties: build.mutation({
            query: (data) => ({
                url: "/specialties",
                method: "POST",
                contentType: "multipart/form-data",
                data
            })
        }),
    }),
});

export const { useCreateSpecialtiesMutation } = specialtiesApi;