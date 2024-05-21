import { IProfile } from '../types/profile'
import { baseQuery } from './baseApi'
import { createApi } from '@reduxjs/toolkit/query/react'

export const userService = createApi({
  reducerPath: 'userService',
  baseQuery: baseQuery(),
  tagTypes: ['profile'],
  endpoints: (builder) => ({
    fetchProfile: builder.query<IProfile, void>({
      query: () => '/me'
    }),
    changePassword: builder.mutation<any, FormData>({
      query: (passData) => ({
        url: '/change-password/',
        method: 'POST',
        body: passData
      })
    }),
    updateProfileData: builder.mutation<IProfile, FormData>({
      query: (newProfileData) => ({
        url: '/profile/',
        method: 'PATCH',
        body: newProfileData
      })
    })
  })
})

export const { useFetchProfileQuery, useLazyFetchProfileQuery, useChangePasswordMutation, useUpdateProfileDataMutation } = userService
