import { IProfile, IProfileDetails } from './profile'

export interface IPhotoResponse {
  advertisement: number
  id: number
  image: string
  order: number
}

export type LotT = {
  ad_type: 'SELL' | 'BUY'
  auction_current_price: string
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
  old_price: string
  region: string
  expires_at: string
  last_bid: {
    amount: string
    created_at: string
    current_price: string
    id: number
    start_price: string
    user: number
  }
  cart: boolean
  purchase: boolean
  purchase_count: number
  unit: 'PIECE' | 'KG' | 'TON'
}
