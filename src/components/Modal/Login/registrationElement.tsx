import DefaultLink from '../../common/DefaultLink'
import { Input } from '../../common/Input'
import { Button } from '../../common/buttons'
import Checkbox from '../../common/checkbox'
import { PathE } from '../../../enum/index'
import { ChangeEvent, Dispatch, FC, FormEvent, SetStateAction, useState } from 'react'
import { generatePath, useNavigate } from 'react-router-dom'
import { useRegisterMutation } from '../../../api/loginService'

interface IElement {
  changeAction: Dispatch<SetStateAction<number>>
  close: () => void
}

export const RegistrationElement: FC<IElement> = ({ changeAction, close }) => {
  const navigate = useNavigate()
  const [step, setStep] = useState<number>(1)
  const [errors, setErrors] = useState<{ email: string; pass: string }>({
    email: '',
    pass: ''
  })
  const [register, { data, isLoading }] = useRegisterMutation()

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      email: ''
    }))
  }

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      pass: ''
    }))
  }

  const submitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const formdata = new FormData(form)
    if (formdata) {
      register(formdata)
        .unwrap()
        .then((data) => {
          navigate(generatePath(PathE.RegistrationConfirm, { email: String(formdata.get('email')) }))
          close()
        })
        .catch((err) => setErrors((prevErrors) => ({ ...prevErrors, email: err.email })))
    }
  }

  return step === 1 ? (
    <form onSubmit={submitForm}>
      <div className="flex flex-col gap-[20px] justify-start w-full top-[159px] relative px-[93px] py-[30px]">
        <div className="w-full flex flex-col gap-1">
          <label className="text-zinc-900 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">Электронная почта</label>
          <Input
            multiline={false}
            placeholder="Ваша электронная почта"
            className="w-full"
            name="email"
            id="email"
            type="text"
            onChange={handleEmailChange}
            required
          />
        </div>
        <div className="w-full flex flex-col gap-1">
          <label className="text-zinc-900 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">Пароль</label>
          <Input
            multiline={false}
            placeholder="Введите ваш пароль"
            className="w-full"
            type="password"
            name="password"
            id="password"
            onChange={handlePasswordChange}
            required
            secure
          />
          <label className="text-zinc-500 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">Введите не менее 8 символов</label>
        </div>
        <div className="w-full flex flex-col gap-1">
          <label className="text-zinc-900 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">Повторите пароль</label>
          <Input
            multiline={false}
            name="password_confirmation"
            placeholder="Введите ваш пароль"
            className="w-full"
            onChange={handlePasswordChange}
            type="password"
            required
            id="password_confirmation"
            secure
          />
        </div>
        <Checkbox
          required
          label={
            <p className="max-w-[230px] text-sm text-[#808080] font-normal">
              Я принимаю условия <DefaultLink text="Пользовательского соглашения" style={{ color: '#008001' }} />
            </p>
          }
        />
        <Button type="submit" text="Создать аккаунт" style={{ width: '100%' }} />
        <div className="w-full h-[22px] justify-center items-center gap-2 flex">
          <label className="text-zinc-500 text-base font-normal font-['SF Pro Text'] leading-snug">Уже есть аккаунт?</label>
          <DefaultLink onClick={() => changeAction(1)} text="Войти" style={{ fontSize: '16px', color: '#008001' }} />
        </div>
      </div>
    </form>
  ) : (
    <></>
  )
}

export default RegistrationElement
