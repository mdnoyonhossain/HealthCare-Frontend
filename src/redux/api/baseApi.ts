import { axiosBaseQuery } from '@/helpers/axios/axiosBaseQuery';
import { createApi } from '@reduxjs/toolkit/query/react'
import { tagTypesList } from '../tagTypes';

const baseApi = createApi({
    reducerPath: 'api',
    baseQuery: axiosBaseQuery({ baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_API_URL}` }),
    endpoints: () => ({}),
    tagTypes: tagTypesList
});

export default baseApi;