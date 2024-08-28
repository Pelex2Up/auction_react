import DefaultLink from '../../common/DefaultLink'
import { Input } from '../../common/Input'
import { Button } from '../../common/buttons'
import Checkbox from '../../common/checkbox'
import { PathE } from '../../../enum/index'
import { ChangeEvent, Dispatch, FC, FormEvent, SetStateAction, useState } from 'react'
import { generatePath, useNavigate } from 'react-router-dom'
import { useRegisterMutation } from '../../../api/loginService'
import { Loader } from '../../Loader'
import { toast } from 'react-toastify'
import { selectLangSettings, useAppSelector } from '../../../store/hooks'
import { validateEmail } from '../../../utility/validations'

interface IElement {
  changeAction: Dispatch<SetStateAction<number>>
  close: () => void
}

export const RegistrationElement: FC<IElement> = ({ changeAction, close }) => {
  const { language } = useAppSelector(selectLangSettings)
  const navigate = useNavigate()
  const [errors, setErrors] = useState<{ email: string; pass: string }>({
    email: '',
    pass: ''
  })
  const [register, { isLoading }] = useRegisterMutation()

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    event.preventDefault()
    setErrors((prevErrors) => ({
      ...prevErrors,
      email: ''
    }))
  }

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    event.preventDefault()
    setErrors((prevErrors) => ({
      ...prevErrors,
      pass: ''
    }))
  }

  const submitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const formdata = new FormData(form)
    const pass1 = formdata.get('password') as string
    const pass2 = formdata.get('password_confirmation') as string
    if (!validateEmail(String(formdata.get('email')))) {
      toast(language === 'RU' ? 'Проверьте правильность ввода электронной почты' : 'Email seems wrong', { type: 'error' })
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: language === 'RU' ? 'Неверный формат' : 'Wrong email'
      }))
    } else {
      if (formdata && pass1 === pass2 && pass1.length >= 8) {
        register(formdata)
          .unwrap()
          .then(() => {
            toast('Регистрация прошла успешно, письмо для подтверждения отправлено на электронную почту', { type: 'success' })
            navigate(generatePath(PathE.RegistrationConfirm, { email: String(formdata.get('email')) }))
            close()
          })
          .catch((err: any) => setErrors((prevErrors) => ({ ...prevErrors, email: err.email })))
      } else if (pass1 !== pass2) {
        setErrors({ ...errors, pass: 'Пароли не совпадают' })
      } else if (pass1.length < 8 || pass2.length < 8) {
        setErrors({ ...errors, pass: 'Пароль должен содержать минимум 8 символов' })
      }
    }
  }

  return (
    <form onSubmit={submitForm}>
      <div className="flex flex-col gap-[20px] justify-start w-full top-[159px] relative px-6 py-3 xl:px-[93px] xl:py-[30px]">
        <div className="w-full flex flex-col gap-1">
          <label className="text-zinc-900 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">
            {language === 'RU' ? 'Электронная почта' : 'Email'}
          </label>
          <Input
            multiline={false}
            placeholder={language === 'RU' ? 'Ваша электронная почта' : 'Enter email'}
            className="w-full"
            name="email"
            id="email"
            type="text"
            onChange={handleEmailChange}
            required
          />
        </div>
        <div className="w-full flex flex-col gap-1">
          <label className="text-zinc-900 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">
            {language === 'RU' ? 'Пароль' : 'Password'}
          </label>
          <Input
            multiline={false}
            placeholder={language === 'RU' ? 'Введите ваш пароль' : 'Enter password'}
            className="w-full"
            type="password"
            name="password"
            id="password"
            error={errors.pass.length > 0}
            onChange={handlePasswordChange}
            required
            secure
          />
          {errors.pass.length > 0 ? (
            <label className="text-red-600 text-xs font-normal leading-[16.80px] tracking-tight">{errors.pass}</label>
          ) : (
            <label className="text-zinc-500 text-xs font-normal leading-[16.80px] tracking-tight">
              {language === 'RU' ? 'Введите не менее 8 символов' : 'Enter at least 8 symbols'}
            </label>
          )}
        </div>
        <div className="w-full flex flex-col gap-1">
          <label className="text-zinc-900 text-sm font-normal leading-[16.80px] tracking-tight">
            {language === 'RU' ? 'Повторите пароль' : 'Confirm password'}
          </label>
          <Input
            multiline={false}
            name="password_confirmation"
            placeholder={language === 'RU' ? 'Введите ваш пароль' : 'Enter password'}
            className="w-full"
            error={errors.pass.length > 0}
            onChange={handlePasswordChange}
            type="password"
            required
            id="password_confirmation"
            secure
          />
          <label className="text-red-600 text-xs font-normal leading-[16.80px] tracking-tight">{errors.pass}</label>
        </div>
        <Checkbox
          required
          name="agreement_policy"
          label={
            <p className="max-w-[230px] text-sm text-[#808080] font-normal">
              {language === 'RU' ? 'Я принимаю условия ' : 'I accept '}{' '}
              <DefaultLink text={language === 'RU' ? 'Пользовательского соглашения' : 'User agreement rules'} style={{ color: '#008001' }} />
            </p>
          }
        />
        <Button type="submit" text={language === 'RU' ? 'Создать аккаунт' : 'Create account'} style={{ width: '100%' }}>
          {isLoading && <Loader />}
        </Button>
        <div className="w-full h-[22px] justify-center items-center gap-2 flex">
          <label className="text-zinc-500 text-base font-normal font-['SF Pro Text'] leading-snug">
            {language === 'RU' ? 'Уже есть аккаунт?' : 'Already have an account?'}
          </label>
          <DefaultLink className='h-full flex items-center' onClick={() => changeAction(1)} text={language === 'RU' ? "Войти" : 'Log in'} style={{ fontSize: '16px', color: '#008001' }} />
        </div>
      </div>
    </form>
  )
}

export default RegistrationElement
