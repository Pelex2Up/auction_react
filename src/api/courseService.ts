import { createApi } from '@reduxjs/toolkit/query/react'
import { courseQuery } from './baseApi'

export const courseService = createApi({
  reducerPath: 'courseService',
  baseQuery: courseQuery(),
  tagTypes: ['course'],
  endpoints: (builder) => ({
    fetchUSD: builder.mutation<any, void>({
      query: () => ({
        url: '/rates/431',
        method: 'GET'
      })
    }),
    fetchEUR: builder.mutation<any, void>({
      query: () => ({
        url: '/rates/451',
        method: 'GET'
      })
    }),
    fetchRUB: builder.mutation<any, void>({
      query: () => ({
        url: '/rates/456',
        method: 'GET'
      })
    })
  })
})

export const { useFetchEURMutation, useFetchRUBMutation, useFetchUSDMutation } = courseService
