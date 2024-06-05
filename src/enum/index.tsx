export enum PathE {
  Home = '/',
  RegistrationConfirm = '/registration-success/:email',
  AccessUserRegistration = '/registration-confirmation/:token',
  Profile = '/profile',
  TarriffPlans = '/tarrif-plans',
  Rules = '/usage-rules',
  ResetPasswordRequest = '/reset-password/:email',
  ResetPassword = '/url-front-change-password/:token',
  ResetPasswordSuccess = '/reset-password'
}

export enum LotPathE {
  LotDetail = '/lot/:id',
  CreateLot = '/create-lot'
}

export enum ProfilePathE {
  MyLots = '/profile/my-lots'
}
