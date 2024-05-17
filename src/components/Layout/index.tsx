import Header from '../header'
import Footer from '../footer'
import { FC, Suspense } from 'react'
import { Outlet } from 'react-router-dom'

export const RootLayout: FC = () => {
  return (
    <div className="w-screen min-h-screen flex relative flex-col gap-[20px]">
      <Suspense fallback={<></>}>
        <Header />
      </Suspense>
      <Outlet />
      <Footer />
    </div>
  )
}
