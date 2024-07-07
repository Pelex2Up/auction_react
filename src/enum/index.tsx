export enum PathE {
  Home = '/',
  RegistrationConfirm = '/registration-success/:email',
  AccessUserRegistration = '/registration-confirmation/:token',
  Profile = '/profile',
  TarriffPlans = '/tarrif-plans',
  Rules = '/usage-rules',
  ResetPasswordRequest = '/reset-password/:email',
  ResetPassword = '/url-front-change-password/:token',
  ResetPasswordSuccess = '/reset-password',
  UserCart = '/my-cart',
  AdsPage = '/commercial-promotions',
  NotFound = '/not-found-page-404',
}

export enum LotPathE {
  LotDetail = '/advertisement/:slug',
  CreateLot = '/create-lot',
  EditLot = '/advertisement/:slug/editing'
}

export enum ProfilePathE {
  MyLots = '/profile/my-lots',
  MyTariff = '/profile/my-tariff',
  MyPurchases = '/profile/my-purchases'
}

export enum CatalogPathE {
  Catalog = '/advertisements-catalog'
}
