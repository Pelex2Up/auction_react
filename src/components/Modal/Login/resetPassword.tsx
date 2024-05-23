import { Input } from '../../common/Input'
import { Button } from '../../common/buttons'
import styles from './LoginModal.module.scss'
import { FC } from 'react'

export const ResetPassword: FC = () => {
  return (
    <div className="flex flex-col gap-[20px] justify-start w-full top-[80px] relative px-6 py-3 xl:px-0 xl:py-[30px]">
      <div className="xl:px-[32px] text-zinc-900 text-lg font-normal font-['SF Pro Text'] leading-snug tracking-tight">Восстановление пароля</div>
      <div className="w-full xl:px-[32px] text-zinc-500 text-xs font-normal font-['SF Pro Text'] leading-[14.40px] tracking-tight">
        Введите вашу электронную почту, указаную при регистрации.
        <br />
        Мы отправим на нее ссылку для восстановления пароля
      </div>
      <div className="w-full h-[0px] border border-zinc-300"></div>
      <div className="w-full xl:w-[315px] mx-auto flex-col justify-center items-start xl:items-center gap-1.5 inline-flex">
        <div className="justify-start items-start gap-0.5 inline-flex w-[315px]">
          <label className="text-zinc-900 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">Электронная почта</label>
        </div>
        <Input multiline={false} placeholder="Ваша электронная почта" className="w-full" name="email" type="email" />
        <Button
          className={styles.button}
          style={{marginTop: '2rem'}}
          // className="xl:left-[94px] top-[302px] absolute"
          text="Сбросить текущий пароль"
        />
      </div>
    </div>
  )
}

export default ResetPassword
