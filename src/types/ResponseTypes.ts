import { LotT } from './lotTypes'

export type CatalogResponseT = {
  count: number
  next: number
  previous: number
  results: LotT[]
}
