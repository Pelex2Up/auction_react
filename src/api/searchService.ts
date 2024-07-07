import { ICategory } from '../types/commonTypes'
import { IAds } from './apiTypes'
import { baseQuery } from './baseApi'
import { createApi } from '@reduxjs/toolkit/query/react'

export interface ISearchCategory {
  id: number
  level: number
  parent: number | null
  title: string
}

export const searchService = createApi({
  reducerPath: 'searchService',
  baseQuery: baseQuery(),
  tagTypes: ['search'],
  endpoints: (builder) => ({
    getSearchBlockData: builder.query<ICategory[], string | undefined>({
      query: (letter) => `/auction/categories/search${letter ? `/?initialLetter=${letter}` : '/'}`
    }),
    searchInputData: builder.mutation<ISearchCategory[], string>({
      query: (arg) => `/auction/categories/f-text-search/?search=${arg}`
    }),
    fetchAds: builder.query<IAds, string>({
      query: (params) => `/ad/ad${params && params !== 'undefined' ? `/${params}` : ''}`
    })
  })
})

export const { useGetSearchBlockDataQuery, useSearchInputDataMutation, useFetchAdsQuery } = searchService
