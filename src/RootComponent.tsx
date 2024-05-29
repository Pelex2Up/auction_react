import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Home } from './pages/HomePage'
import NotFoundPage from './pages/NotFoundPage'
import './styles/main.scss'
import { RootLayout } from './components/Layout'
import { LotPathE, PathE } from './enum'
import RegistrationSuccess from './pages/RegistrationSuccess'
import RegistrationToken from './pages/RegistrationToken'
import { ProfilePage } from './pages/Profile'
import { MainProfile } from './components/profile/MainProfile'
import ResetPasswordRequest from './pages/ResetPasswordRequest'
import { ResetPasswordForm } from './pages/ResetPasswordForm'
import ResetPasswordSuccess from './pages/ResetPasswordSuccess'
import { LotPage } from './pages/Lots'
import { CreateLotPage } from './pages/Lots/MakeLot'

const RootComponent: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path={PathE.Home} element={<RootLayout />}>
          <Route path="*" element={<NotFoundPage />} />
          <Route index element={<Home />} />
          <Route path={PathE.RegistrationConfirm} element={<RegistrationSuccess />} />
          <Route path={PathE.AccessUserRegistration} element={<RegistrationToken />} />
          <Route path={PathE.ResetPasswordRequest} element={<ResetPasswordRequest />} />
          <Route path={PathE.ResetPassword} element={<ResetPasswordForm />} />
          <Route path={PathE.ResetPasswordSuccess} element={<ResetPasswordSuccess />} />
          <Route path={LotPathE.CreateLot} element={<CreateLotPage />} />
          <Route path={PathE.Profile} element={<ProfilePage />}>
            <Route index element={<MainProfile />} />
          </Route>
          <Route path={LotPathE.LotDetail} element={<LotPage />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default RootComponent
