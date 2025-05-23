import { TMeta } from '@/types'
import type { BaseQueryFn } from '@reduxjs/toolkit/query'
import type { AxiosRequestConfig, AxiosError } from 'axios'
import axiosInstance from './axiosInstance'

type TBaseQueryFn = {
    url: string
    method?: AxiosRequestConfig['method']
    data?: AxiosRequestConfig['data']
    params?: AxiosRequestConfig['params']
    headers?: AxiosRequestConfig['headers']
    meta?: TMeta
    contentType?: string
}

export const axiosBaseQuery = ({ baseUrl }: { baseUrl: string } = { baseUrl: '' }): BaseQueryFn<TBaseQueryFn, unknown, unknown> => async ({ url, method, data, params, headers, contentType }) => {
    try {
        const result = await axiosInstance({
            url: baseUrl + url,
            method,
            data,
            params,
            headers: {
                "Content-Type": contentType || "application/json"
            },
        })

        return result;
    }
    catch (axiosError) {
        const err = axiosError as AxiosError
        return {
            error: {
                status: err.response?.status,
                data: err.response?.data || err.message,
            },
        }
    }
}