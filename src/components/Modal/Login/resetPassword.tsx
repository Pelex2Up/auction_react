import { toast } from 'react-toastify'
import { useResetPasswordMutation } from '../../../api/loginService'
import { Input } from '../../common/Input'
import { Button } from '../../common/buttons'
import styles from './LoginModal.module.scss'
import { FC, FormEvent, useState } from 'react'
import { generatePath, useNavigate } from 'react-router-dom'
import { PathE } from '../../../enum'
import { Loader } from '../../Loader'

interface IReset {
  close: () => void
}

export const ResetPassword: FC<IReset> = ({ close }) => {
  const [resetPass, { isLoading }] = useResetPasswordMutation()
  const navigate = useNavigate()
  const [error, setError] = useState<string>('')

  const handleSubmitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.target as HTMLFormElement
    const formdata = new FormData(form)
    if (formdata.get('email')) {
      resetPass(formdata)
        .unwrap()
        .then(() => {
          close()
          navigate(generatePath(PathE.ResetPasswordRequest, { email: String(formdata.get('email')) }))
        })
        .catch(() => {
          setError('Данный email не зарегистрирован в системе')
          toast('Неверный email', { type: 'error' })
        })
    }
  }

  return (
    <form onSubmit={handleSubmitForm} className="flex flex-col gap-[20px] justify-start w-full top-[80px] relative px-6 py-3 xl:px-0 xl:py-[30px]">
      <div className="xl:px-[32px] text-zinc-900 text-lg font-normal font-['SF Pro Text'] leading-snug tracking-tight">Восстановление пароля</div>
      <div className="w-full xl:px-[32px] text-zinc-500 text-xs font-normal font-['SF Pro Text'] leading-[14.40px] tracking-tight">
        Введите вашу электронную почту, указаную при регистрации.
        <br />
        Мы отправим на нее ссылку для восстановления пароля
      </div>
      <div className="w-full h-[0px] border border-zinc-300"></div>
      <div className="w-full xl:w-[315px] mx-auto flex-col justify-center items-start gap-1.5 inline-flex">
        <div className="justify-start items-start gap-0.5 inline-flex w-[315px]">
          <label className="text-zinc-900 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">Электронная почта</label>
        </div>
        <Input
          multiline={false}
          error={error.length > 0}
          onChange={() => setError('')}
          placeholder="Ваша электронная почта"
          className="w-full"
          name="email"
          type="email"
        />
        <label className="text-red-600 text-xs font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">{error}</label>
        {isLoading ? (
          <Loader />
        ) : (
          <Button
            type="submit"
            className={styles.button}
            style={{ marginTop: '1.5rem' }}
            // className="xl:left-[94px] top-[302px] absolute"
            text="Сбросить текущий пароль"
          />
        )}
      </div>
    </form>
  )
}

export default ResetPassword
