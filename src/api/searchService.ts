import { ICategory } from '../types/commonTypes'
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
    })
  })
})

export const { useGetSearchBlockDataQuery, useSearchInputDataMutation } = searchService
