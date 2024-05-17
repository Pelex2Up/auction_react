import { baseQuery } from './baseApi'
import { createApi } from '@reduxjs/toolkit/query/react'

export const userLoginService = createApi({
  reducerPath: 'userLoginService',
  baseQuery: baseQuery(),
  tagTypes: ['login', 'logout', 'userInfo'],
  endpoints: (builder) => ({
    login: builder.mutation<any, FormData>({
      query: (credentials: FormData) => {
        return {
          url: '/login/',
          method: 'POST',
          body: credentials
        }
      },
      invalidatesTags: ['login']
    }),
    register: builder.mutation<any, FormData>({
      query: (credentials: FormData) => {
        return {
          url: '/signup/',
          method: 'POST',
          body: credentials
        }
      },
      invalidatesTags: ['login']
    }),
    sendToken: builder.mutation<void, string>({
      query: (token: string) => {
        return {
          url: `/email-verify/?token=${token}`,
          method: 'GET'
        }
      },
      invalidatesTags: ['login']
    }),
    logout: builder.query<void, void>({
      query: () => {
        return {
          url: `/logout/`,
          method: 'POST'
        }
      },
      providesTags: ['logout']
    })
  })
})

export const { useLoginMutation, useLazyLogoutQuery, useRegisterMutation, useSendTokenMutation } = userLoginService
