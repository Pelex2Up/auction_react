import { LotT } from '../types/lotTypes'
import { baseQuery } from './baseApi'
import { createApi } from '@reduxjs/toolkit/query/react'

export const lotService = createApi({
  reducerPath: 'lotService',
  baseQuery: baseQuery(),
  tagTypes: ['auction'],
  endpoints: (builder) => ({
    fetchUserLots: builder.query<LotT[], { type: string; order: string }>({
      query: (arg) => `/auction/advertisement/my-ad/?type=${arg.type}&order=${arg.order}`
    }),
    deleteUserLot: builder.mutation<void, number>({
      query: (id) => ({
        url: `/auction/advertisement/${id}/`,
        method: 'DELETE'
      })
    }),
    createLot: builder.mutation<LotT, FormData>({
      query: (lotData) => ({
        url: '/auction/advertisement/',
        method: 'POST',
        body: lotData
      })
    }),
    fetchLotData: builder.mutation<LotT, number>({
      query: (id) => ({
        url: `/auction/advertisement/${id}`,
        method: 'GET'
      })
    }),
    sendPhoto: builder.mutation<any, { id: number; lotData: FormData }>({
      query: (data) => ({
        url: `/auction/advertisements/${data.id}/add-photo/`,
        method: 'POST',
        body: data.lotData
      })
    }),
    fetchCategories: builder.query<any, void>({
      query: () => '/auction/categories/'
    })
  })
})

export const { useCreateLotMutation, useSendPhotoMutation, useFetchUserLotsQuery, useDeleteUserLotMutation, useFetchCategoriesQuery, useFetchLotDataMutation } =
  lotService
