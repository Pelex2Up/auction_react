import { FC, useState } from 'react'
import { IModal } from '../DefaultModal'
import Person from '../../../assets/images/personModal.png'
import { Button } from '../../common/buttons'
import { generatePath, useNavigate } from 'react-router-dom'
import { PathE } from '../../../enum'
import { CloseIcon } from '../../../assets/svg/closeIcon'
import { selectUser, useAppSelector } from '../../../store/hooks'
import { LoginModal } from '../Login'

export const EmptyProfileModal: FC<IModal> = ({ close }) => {
  const [showReg, setShowReg] = useState<boolean>(false)

  const navigate = useNavigate()
  const { auth } = useAppSelector(selectUser)

  const locateProfile = () => {
    close()
    navigate(generatePath(PathE.Profile))
  }

  return showReg ? (
    <LoginModal selectedState={2} close={close} />
  ) : (
    <div className="w-full md:w-[718px] xl:h-auto bg-white rounded shadow relative z-30">
      {auth ? (
        <div className="w-full h-full p-8 flex flex-col gap-8 justify-center items-center">
          <div className="w-6 h-6 absolute top-[32px] right-[32px] justify-center items-center inline-flex cursor-pointer">
            <button className="w-6 h-6 relative flex-col justify-start items-start flex" onClick={close}>
              <CloseIcon />
            </button>
          </div>
          <div className="flex-col justify-start items-center gap-4 inline-flex">
            <img src={Person} className="w-[99px] h-[99px]" />
            <div className="text-zinc-900 text-lg text-center font-medium font-['SF Pro Text'] leading-snug">Заполните ваш профиль в аккаунте</div>
            <div className="text-center text-zinc-500 text-sm font-normal font-['SF Pro Text'] leading-[16.80px]">
              Для подачи объявления необходимо заполнить вашу контактную информацию
            </div>
          </div>
          <div className="justify-start items-start gap-6 inline-flex sm:flex-row flex-col">
            <Button text="Закрыть" variant="secondary" className="w-[249px]" onClick={close} />
            <Button className="w-[249px]" text="Перейти в профиль" onClick={locateProfile} />
          </div>
        </div>
      ) : (
        <div className="w-full h-full p-8 flex flex-col gap-8 justify-center items-center">
          <div className="w-6 h-6 absolute top-[32px] right-[32px] justify-center items-center inline-flex cursor-pointer">
            <button className="w-6 h-6 relative flex-col justify-start items-start flex" onClick={close}>
              <CloseIcon />
            </button>
          </div>
          <div className="flex-col justify-start items-center gap-4 inline-flex">
            <img src={Person} className="w-[99px] h-[99px]" />
            <div className="text-zinc-900 text-lg text-center font-medium font-['SF Pro Text'] leading-snug">
              Для подачи объявления необходимо пройти регистрацию
            </div>
          </div>
          <div className="justify-start items-start gap-6 inline-flex sm:flex-row flex-col">
            <Button text="Закрыть" variant="secondary" className="w-[249px]" onClick={close} />
            <Button className="w-[249px]" text="Регистрация" onClick={() => setShowReg(true)} />
          </div>
        </div>
      )}
    </div>
  )
}
