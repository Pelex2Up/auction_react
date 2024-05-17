import mail from '../assets/images/mailSuccess.png'
import DefaultLink from '../components/common/DefaultLink'
import { useParams } from 'react-router-dom'

export default function RegistrationSuccess() {
  const { email } = useParams()
  return (
    <div className="w-full h-full py-[50px] px-[90px] flex flex-col justify-center items-center">
      <img src={mail} width={99} height={99} alt="mail-success" />
      <div className="w-full flex-col justify-center items-center gap-1.5 inline-flex">
        <div className="text-zinc-900 text-center text-lg font-medium font-['SF Pro Text'] leading-snug">
          Ссылка для подтверждения электронной почты отправлена
        </div>
        <div className="justify-start items-center gap-4 inline-flex">
          <div className="text-zinc-900 text-sm font-normal font-['SF Pro Text'] leading-[16.80px]">на {email}</div>
        </div>
        <div className="justify-start items-center gap-4 inline-flex">
          <div>
            <span className="text-zinc-900 text-sm font-normal font-['SF Pro Text'] leading-[16.80px]">Перейти на </span>
            <DefaultLink
              text="Почту"
              href={`https://www.${email?.split('@')[1]}`}
              rel="noreferrer"
              target="_blank"
              style={{
                color: '#008001',
                fontSize: 14,
                fontWeight: '400',
                borderBottom: '1px solid #008001'
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
