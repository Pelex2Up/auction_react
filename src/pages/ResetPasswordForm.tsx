import { FC, FormEvent, useState } from 'react'
import { generatePath, useNavigate, useParams } from 'react-router-dom'
import Input from '../components/common/Input'
import { Loader } from '../components/Loader'
import { Button } from '../components/common/buttons'
import { useGetNewPasswordMutation } from '../api/loginService'
import { toast } from 'react-toastify'
import { PathE } from '../enum'

export const ResetPasswordForm: FC = () => {
  const { token } = useParams()
  const [error, setError] = useState<string>('')
  const [sendNewPass, { isLoading }] = useGetNewPasswordMutation()
  const navigate = useNavigate()

  const handleSubmitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.target as HTMLFormElement
    const formdata = new FormData(form)
    const pass1 = formdata.get('new_password1') as string
    const pass2 = formdata.get('new_password2') as string

    if (pass1 && pass2 && pass1 === pass2 && pass1.length >= 8 && token) {
      formdata.append('token', token)
      sendNewPass(formdata)
        .unwrap()
        .then(() => navigate(generatePath(PathE.ResetPasswordSuccess)))
        .catch(() => toast('Неверный токен подтверждения электронной почты', { type: 'error' }))
    } else if (pass1 !== pass2) {
      setError('Пароли не совпадают')
    } else if (pass1.length < 8 || pass2.length < 8) {
      setError('Пароль должен содержать не менее 8 символов')
    } else {
      toast('Произошла ошибка при обработке запроса, попробуйте позже', { type: 'error' })
    }
  }

  return (
    <form onSubmit={handleSubmitForm} className="w-full px-4 xl:px-[60px]">
      <ul className="flex flex-col gap-4">
        <li className="text-zinc-900 text-2xl font-medium font-['SF Pro Text'] leading-[28.80px]">Придумайте новый пароль</li>
        <li className="flex-col justify-center items-start gap-1.5 inline-flex">
          <label htmlFor="new_password1" className="text-zinc-900 text-sm font-normal leading-[16.80px] tracking-tight">
            Пароль
          </label>
          <div className="w-full flex flex-col gap-[5px] max-w-[315px] xl:w-[315px]">
            <Input
              multiline={false}
              secure
              onChange={() => setError('')}
              error={error.length > 0}
              placeholder="Введите ваш пароль"
              className="w-full max-w-[315px] xl:w-[315px]"
              name="new_password1"
              id="new_password1"
            />
            <p className="text-zinc-300 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">Введите не менее 8 символов</p>
          </div>
        </li>
        <li className="flex-col justify-center items-start gap-1.5 inline-flex">
          <label htmlFor="new_password2" className="text-zinc-900 text-sm font-normal leading-[16.80px] tracking-tight">
            Повторите пароль
          </label>
          <div className="w-full max-w-[315px] xl:w-[315px]">
            <Input
              multiline={false}
              secure
              onChange={() => setError('')}
              error={error.length > 0}
              placeholder="Введите пароль повторно"
              className="w-full max-w-[315px] xl:w-[315px]"
              name="new_password2"
              id="new_password2"
            />
            <label className="text-red-600 text-xs font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">{error}</label>
          </div>
        </li>
        <div className="flex w-full max-w-[315px] justify-center mt-4 items-center">
          {isLoading ? <Loader /> : <Button className="w-full" type="submit" text="Сохранить новый пароль" />}
        </div>
      </ul>
    </form>
  )
}
