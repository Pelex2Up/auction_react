import { baseQuery } from './baseApi'
import { createApi } from '@reduxjs/toolkit/query/react'

export const lotService = createApi({
  reducerPath: 'lotService',
  baseQuery: baseQuery(),
  tagTypes: ['auction'],
  endpoints: (builder) => ({
    createLot: builder.mutation<any, FormData>({
      query: (lotData) => ({
        url: '/auction/advertisement/',
        method: 'POST',
        body: lotData
      })
    }),
    sendPhoto: builder.mutation<any, { id: number; lotData: FormData }>({
      query: (data) => ({
        url: `/auction/advertisements/${data.id}/add-photo/`,
        method: 'POST',
        body: data.lotData
      })
    })
  })
})

export const { useCreateLotMutation, useSendPhotoMutation } = lotService
