import DefaultLink from '../../../components/common/DefaultLink'
import success from '../../../assets/images/success.png'
import { PathE } from '../../../enum'

export default function CreateLotSuccess() {
  return (
    <div className="w-full h-full py-[50px] px-[90px] flex flex-col justify-center items-center">
      <img src={success} width={99} height={99} alt="mail-success" />
      <div className="w-full flex-col justify-center items-center gap-1.5 inline-flex">
        <div className="text-zinc-900 text-center text-lg font-medium font-['SF Pro Text'] leading-snug">Ваше объявление на модерации</div>
        <div className="justify-start items-center gap-4 inline-flex">
          <div>
            <span className="text-zinc-900 text-sm font-normal font-['SF Pro Text'] leading-[16.80px]">
              После проверки и подтверждения оплаты оно появится на сайте. Перейти на{' '}
            </span>
            <DefaultLink
              text="Правила участия"
              href={PathE.Rules}
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
