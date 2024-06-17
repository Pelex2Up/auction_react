export interface IProfile {
  profile: IProfileDetails
  last_login: string
  date_joined: string
  email: string
  username: string
  is_superuser: boolean
  is_staff: boolean
  is_verified: boolean
  is_active: boolean
  is_blocked: boolean
  groups: []
  user_permissions: []
  subscription: ISubscription
}

export interface IProfileDetails {
  id: number
  type: string
  avatar: string
  name: string
  unp: string
  phone_number: string
  is_completed: boolean
  email?: string
}

export interface ISubscription {
  end_date: string
  id: number
  start_date: string
  tariff: ITariff
  user: number
}

export interface ITariff {
  active: boolean
  ad_count: number
  duration_days: number
  id: number
  name: string
  price: string
  unlim_ad_count: number
  unlim_date_expiries: string
  unlim_tariff: boolean
  visible: boolean
}
