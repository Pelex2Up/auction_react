import { LotT } from '../types/lotTypes'

export type CartT = {
  id: number
  added_at: string
  advertisement: LotT
}

export interface IAd {
  id: number
  order: number
  active: boolean
  date_created: string
  date_public: string
  date_finish: string
  title: string
  description: string
  url: string
  image: string
}

export interface IAds {
  count: number
  next: string | null
  previous: string | null
  results: IAd[]
}

export interface IFeedBackForm {
  email: string
  phone_number: string
  message: string
  accept_privacy_policy: boolean
}

export interface IFooter {
  email: string
  phone_number: string
  privacy_policy: string
  requisites: string
  user_agreement: string
}