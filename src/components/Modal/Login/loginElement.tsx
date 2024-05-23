import { useLoginMutation } from '../../../api/loginService'
import { useLazyFetchProfileQuery } from '../../../api/userService'
import { useAppDispatch } from '../../../store/hooks'
import { auth, updateUser } from '../../../store/redux/users/slice'
import { IProfile } from '../../../types/profile'
import { Loader } from '../../Loader'
import DefaultLink from '../../common/DefaultLink'
import { Input } from '../../common/Input'
import { Button } from '../../common/buttons'
import styles from './LoginModal.module.scss'
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
  const [getUser, { isFetching }] = useLazyFetchProfileQuery()

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
      <div className="flex flex-col gap-[20px] justify-start w-full top-[159px] relative px-6 xl:px-[93px] py-[30px]">
        <div className="w-full flex flex-col gap-1">
          <label className="text-zinc-900 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">Электронная почта</label>
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
        <div className="w-full flex flex-col gap-1">
          <label className="text-zinc-900 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">Пароль</label>
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
        <div className="w-full flex justify-end">
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
        <Button text={'Войти'} type="submit" className={styles.button}>
          {(isFetching || isLoading) && <Loader />}
        </Button>
        <div className="justify-center items-center gap-2 inline-flex">
          <div className="text-zinc-500 text-base font-normal font-['SF Pro Text'] leading-snug">Еще нет аккаунта?</div>
          <DefaultLink onClick={() => changeAction(2)} text="Регистрация" style={{ fontSize: '16px', color: '#008001' }} />
        </div>
      </div>
    </form>
  )
}

export default LoginElement
