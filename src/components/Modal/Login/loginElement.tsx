import { useLoginMutation } from '../../../api/loginService'
import { useLazyFetchProfileQuery } from '../../../api/userService'
import { useAppDispatch } from '../../../store/hooks'
import { auth, updateUser } from '../../../store/redux/users/slice'
import { IProfile } from '../../../types/profile'
import { Loader } from '../../Loader'
import DefaultLink from '../../common/DefaultLink'
import { Input } from '../../common/Input'
import { Button } from '../../common/buttons'
import Checkbox from '../../common/checkbox'
import { ChangeEvent, Dispatch, FC, FormEvent, SetStateAction, useEffect, useState } from 'react'

interface IElement {
  changeAction: Dispatch<SetStateAction<number>>
  close: () => void
}

export const LoginElement: FC<IElement> = ({ changeAction, close }) => {
  const dispatch = useAppDispatch()
  const [errors, setErrors] = useState<{ email: string; pass: string }>({
    email: '',
    pass: ''
  })
  const [loginUser, { isLoading, isSuccess }] = useLoginMutation()
  const [getUser, { data, isFetching }] = useLazyFetchProfileQuery()

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
    await loginUser(formdata)
      .unwrap()
      .catch((err) => {
        if (err.email && err.email.length > 0) {
          setErrors((prevErrors) => ({ ...prevErrors, email: err.email }))
        } else if (err.password && err.password.length > 0) {
          setErrors((prevErrors) => ({ ...prevErrors, pass: err.password }))
        } else if (err.message && err.message === 'Для начала подтвердите свой email.') {
          setErrors({ email: err.message, pass: '' })
        } else {
          setErrors({
            email: 'Неверный email или пароль',
            pass: 'Неверный email или пароль'
          })
        }
      })
  }

  useEffect(() => {
    if (isSuccess) {
      getUser()
        .unwrap()
        .then((data: IProfile) => {
          dispatch(auth(true))
          dispatch(updateUser(data))
          close()
        })
    }
  }, [close, dispatch, getUser, isSuccess])

  return (
    <form onSubmit={submitForm}>
      <div className="w-[315px] h-[63px] left-[93px] top-[189px] absolute flex-col justify-center items-start gap-1.5 inline-flex">
        <div className="justify-start items-start gap-0.5 inline-flex">
          <label className="text-zinc-900 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">Электронная почта</label>
        </div>
        <Input
          multiline={false}
          required
          error={errors.email.length > 0}
          onChange={handleEmailChange}
          placeholder="Ваша электронная почта"
          className="w-full"
          name="email"
          type="email"
          id="email"
        />
        <label className="text-red-600 text-xs font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">{errors.email}</label>
      </div>
      <div className="w-[315px] h-[63px] left-[93px] top-[290px] absolute flex-col justify-center items-start gap-1.5 inline-flex">
        <div className="justify-start items-start gap-0.5 inline-flex">
          <label className="text-zinc-900 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">Пароль</label>
        </div>
        <Input
          multiline={false}
          secure={true}
          required
          onChange={handlePasswordChange}
          error={errors.pass.length > 0}
          placeholder="Ваш пароль"
          className="w-full"
          name="password"
          id="password"
        />
        <label className="text-red-600 text-xs font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">{errors.pass}</label>
      </div>
      <div className="left-[-93px] top-[377px] absolute justify-between w-full items-center gap-[93px] inline-flex">
        <div className="justify-start items-center gap-[11px] flex">
          {/* <Checkbox />
          <span className="text-zinc-500 text-xs font-normal font-['SF Pro Text'] leading-[17px]">
            Запомнить меня
          </span> */}
        </div>
        <DefaultLink
          onClick={() => changeAction(3)}
          text="Забыли пароль?"
          style={{
            color: '#008001',
            fontSize: '12px',
            letterSpacing: '1%',
            lineHeight: '14.4px',
            borderBottom: '1px solid #008001',
            cursor: 'pointer'
          }}
        />
      </div>
      <Button text={'Войти'} type="submit" style={{ width: '315px' }} className="left-[93px] top-[424px] absolute">
        {isFetching || (isLoading && <Loader />)}
      </Button>
      <div className="left-[129px] top-[478px] absolute justify-start items-center gap-2 inline-flex">
        <div className="text-zinc-500 text-base font-normal font-['SF Pro Text'] leading-snug">Еще нет аккаунта?</div>
        <DefaultLink onClick={() => changeAction(2)} text="Регистрация" style={{ fontSize: '16px', color: '#008001' }} />
      </div>
    </form>
  )
}

export default LoginElement
