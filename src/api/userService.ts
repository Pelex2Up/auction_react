import { LotT } from '../types/lotTypes'
import { IProfile, ISubscription, ITariff } from '../types/profile'
import { formDataConverter } from '../utils/formDataConverter'
import { CartT, IFeedBackForm, IFooter } from './apiTypes'
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
    }),
    fetchSubsctiption: builder.query<ISubscription, void>({
      query: () => '/subscription/subscriptions/'
    }),
    fetchUserCart: builder.query<CartT[], void>({
      query: () => '/auction/cart/for-user/'
    }),
    appendLotInCart: builder.mutation<any, { advertisement_ids: number[] }>({
      query: (advId) => {
        const data = formDataConverter(advId)
        return {
          url: `/auction/cart/`,
          method: 'POST',
          body: data
        }
      }
    }),
    appendManyLotsInCart: builder.mutation<any, { advertisements_ids: number[] }>({
      query: (advIds) => {
        return {
          url: `/auction/cart/`,
          method: 'POST',
          body: advIds
        }
      }
    }),
    deleteLotFromCart: builder.mutation<any, string | number>({
      query: (advId) => {
        return {
          url: `/auction/cart/delete/${advId}`,
          method: 'DELETE'
        }
      }
    }),
    fetchLastVisited: builder.mutation<any, { advertisement_ids: number[] }>({
      query: (advIds) => {
        return {
          url: `/auction/advertisements/by_ids/`,
          method: 'POST',
          body: advIds
        }
      }
    }),
    fetchSameLots: builder.mutation<any, string | number>({
      query: (advId) => {
        return {
          url: `/auction/advertisement/get-similar-ads/?ad_id=${advId}`,
          method: 'GET'
        }
      }
    }),
    fetchMyOrders: builder.query<LotT[], { type: string; order: string }>({
      query: (arg) => `/auction/advertisement/user-action/?type=${arg.type}&order=${arg.order}`
    }),
    fetchTariffs: builder.query<ITariff[], void>({
      query: () => '/subscription/tariffs/'
    }),
    fetchUserAdvertisements: builder.query<LotT[], string | number>({
      query: (userId) => `/auction/advertisements/${userId}/by-user/`
    }),
    sendFeedBack: builder.mutation<any, FormData>({
      query: (data) => {
        return {
          url: `/message/feedback/`,
          method: 'POST',
          body: data
        }
      }
    }),
    sendAdminMessage: builder.mutation<any, FormData>({
      query: (data) => {
        return {
          url: `/message/admin-mess/`,
          method: 'POST',
          body: data
        }
      }
    }),
    fetchFooterData: builder.query<IFooter, void>({
      query: () => '/site/content/footer/'
    })
  })
})

export const {
  useFetchFooterDataQuery,
  useSendAdminMessageMutation,
  useSendFeedBackMutation,
  useFetchUserAdvertisementsQuery,
  useFetchSameLotsMutation,
  useFetchTariffsQuery,
  useFetchMyOrdersQuery,
  useFetchLastVisitedMutation,
  useAppendManyLotsInCartMutation,
  useDeleteLotFromCartMutation,
  useAppendLotInCartMutation,
  useFetchUserCartQuery,
  useFetchProfileQuery,
  useLazyFetchProfileQuery,
  useChangePasswordMutation,
  useUpdateProfileDataMutation,
  useFetchSubsctiptionQuery
} = userService
