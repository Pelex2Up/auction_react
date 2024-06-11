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
  LotDetail = '/advertisement/:lotId',
  CreateLot = '/create-lot',
  EditLot = '/advertisement/:id/editing'
}

export enum ProfilePathE {
  MyLots = '/profile/my-lots'
}
