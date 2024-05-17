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
    })
  })
})

export const { useFetchProfileQuery, useLazyFetchProfileQuery } = userService
