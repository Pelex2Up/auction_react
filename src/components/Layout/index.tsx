import Header from '../header'
import Footer from '../footer'
import { FC, Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export const RootLayout: FC = () => {
  return (
    <div className="w-screen min-h-screen flex relative flex-col gap-[20px]">
      <Suspense fallback={<></>}>
        <Header />
      </Suspense>
      <Outlet />
      <ToastContainer position="bottom-right" hideProgressBar/>
      <Footer />
    </div>
  )
}
