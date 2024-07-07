import { LotT } from '../types/lotTypes'

export type CartT = {
  id: number
  added_at: string
  advertisement: LotT
}

export interface IAds {
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
