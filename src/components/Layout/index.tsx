import Header from '../header'
import Footer from '../footer'
import { FC, Suspense, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { DefaultModal } from '../Modal/DefaultModal'
import { Dialog, Modal } from '@mui/material'
import { AdminAssistanceModal } from '../Modal/AdminAssistanceModal'

export const RootLayout: FC = () => {
  const [openModal, setOpenModal] = useState(false)

  return (
    <section className="w-screen flex justify-center">
      <div className="w-full max-w-[1720px] min-h-screen h-full flex relative flex-col gap-[20px]">
        <Suspense fallback={<></>}>
          <Header />
        </Suspense>
        <Outlet />
        <ToastContainer position="bottom-right" hideProgressBar />
        <Footer openModal={() => setOpenModal(true)} />
        {openModal && (
          <Modal
            open={openModal}
            onClose={() => setOpenModal(false)}
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            sx={{ display: 'flex', overflowY: 'auto' }}
          >
            <AdminAssistanceModal close={() => setOpenModal(false)} />
          </Modal>
        )}
      </div>
    </section>
  )
}
