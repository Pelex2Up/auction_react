import { FC } from 'react'
import { Modal } from './ModalTypes'
import Portal from '../Portal'
import { EmptyProfileModal } from '../EmptyProfileModal'
import { LoginModal } from '../Login'
import { AdminAssistanceModal } from '../AdminAssistanceModal'

export interface IModal {
  close: () => void
}

export type ModalPropsT = {
  variant: string
  onClose: () => void
  onToggle?: () => void
}

export const DefaultModal: FC<ModalPropsT> = ({ variant, onClose, onToggle }) => {
  const closeModal = () => {
    document.body.classList.remove('modal-open')
    onClose()
  }

  const renderModal = (type: string) => {
    switch (type) {
      case Modal.Login:
        return <LoginModal close={closeModal} />
      case Modal.Registration:
        return <LoginModal close={closeModal} selectedState={2} />
      case Modal.EmptyProfile:
        return <EmptyProfileModal close={closeModal} />
      case Modal.AdminAssistance:
        return <AdminAssistanceModal close={closeModal} />
    }
  }

  return <Portal close={closeModal}>{renderModal(variant)}</Portal>
}
