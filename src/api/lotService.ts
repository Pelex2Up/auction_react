import { CatalogResponseT } from '../types/ResponseTypes'
import { ICategory } from '../types/commonTypes'
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
    updateLot: builder.mutation<LotT, { data: FormData; lotId: number }>({
      query: (arg) => ({
        url: `/auction/advertisement/${arg.lotId}`,
        method: 'PATCH',
        body: arg.data
      })
    }),
    fetchLotData: builder.mutation<LotT, string>({
      query: (slug) => ({
        url: `/auction/advertisement/slug/${slug}`,
        method: 'GET'
      })
    }),
    sendPhoto: builder.mutation<any, { id: number; lotData: FormData }>({
      query: (data) => ({
        url: `/auction/advertisements/${data.id}/upload-photo/`,
        method: 'POST',
        body: data.lotData
      })
    }),
    deletePhoto: builder.mutation<any, { advertisement: number; photoId: number }>({
      query: (args) => ({
        url: `/auction/advertisements/${args.advertisement}/delete-photo/${args.photoId}/`,
        method: 'DELETE'
      })
    }),
    fetchCategories: builder.query<ICategory[], void>({
      query: () => '/auction/categories/'
    }),
    getCategory: builder.mutation<ICategory, number | string>({
      query: (id) => ({ url: `/auction/categories/${id}`, method: 'GET' })
    }),
    searchAdvertisement: builder.mutation<CatalogResponseT, string>({
      query: (url) => ({
        url: `/auction/advert-search/${url}`,
        method: 'GET'
      })
    }),
    purchaseLot: builder.mutation<any, { body: FormData; id: number }>({
      query: (params) => ({
        url: `/auction/advertisements/${params.id}/purchase/`,
        method: 'POST',
        body: params.body
      })
    }),
    makeBid: builder.mutation<any, number>({
      query: (id) => {
        const formdata = new FormData()
        formdata.append('advertisement', String(id))
        return {
          url: '/auction/bid/simple-bid/',
          method: 'POST',
          body: formdata
        }
      }
    })
  })
})

export const {
  useMakeBidMutation,
  usePurchaseLotMutation,
  useCreateLotMutation,
  useUpdateLotMutation,
  useSendPhotoMutation,
  useFetchUserLotsQuery,
  useDeleteUserLotMutation,
  useFetchCategoriesQuery,
  useFetchLotDataMutation,
  useDeletePhotoMutation,
  useGetCategoryMutation,
  useSearchAdvertisementMutation
} = lotService
