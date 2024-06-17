import { IProfile, IProfileDetails } from './profile'

export interface IPhotoResponse {
  advertisement: number
  id: number
  image: string
  order: number
}

export type LotT = {
  ad_type: 'SELL' | 'BUY'
  article_number: number
  auction_end_date: string
  category: number
  city: string
  condition: 'USED' | 'NEW'
  created: string
  description: string
  id: number
  is_auction: boolean
  photos: IPhotoResponse[]
  price: string
  slug: string
  status: string
  step_bid: string
  title: string
  updated: string
  profile: IProfileDetails
  username: string | null
  count: number | null
  region: string
  unit: 'PIECE' | 'KG' | 'TON'
}
