import { useSendTokenMutation } from '../../api/loginService'
import mail from '../../assets/images/success.png'
import warning from '../../assets/images/warning.png'
import { useEffect, useState } from 'react'
import DefaultLink from '../common/DefaultLink'
import { generatePath } from 'react-router-dom'
import { PathE } from '../../enum'

export const VerificationData = ({ token }: { token: string }) => {
  const [validationData, setValidationData] = useState<string>('Проверка токена регистрации...')
  const [sendToken] = useSendTokenMutation()
  useEffect(() => {
    if (token) {
      sendToken(token)
        .unwrap()
        .then(() => setValidationData('Email успешно подтвержден'))
        .catch(() => setValidationData('Ошибка валидации электронной почты. Неверный токен'))
    }
  }, [sendToken, token])

  return (
    <div className="w-full h-full py-[50px] px-[30px] xl:px-[90px] flex flex-col justify-center items-center transition-all duration-200 ease-in">
      {validationData && validationData !== 'Ошибка валидации электронной почты. Неверный токен' ? (
        <img src={mail} width={99} height={99} alt="mail-success" />
      ) : (
        <img src={warning} width={99} height={99} alt="mail-not-success" />
      )}
      <div className="w-full flex-col justify-start text-center items-center gap-1.5 inline-flex">
        <div className="text-zinc-900 text-lg font-medium font-['SF Pro Text'] leading-snug">{validationData}</div>
      </div>
      {validationData === 'Email успешно подтвержден' && (
        <span>
          Перейти на <DefaultLink style={{color: '#008001', borderBottom: '1px solid #008001'}} text="Главную страницу" href={generatePath(PathE.Home)} />
        </span>
      )}
    </div>
  )
}
