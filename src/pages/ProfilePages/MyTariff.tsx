import { FC } from 'react'
import { Loader } from '../../components/Loader'
import notify from '../../assets/images/notification.png'
import DefaultLink from '../../components/common/DefaultLink'
import { PathE } from '../../enum'
import { useFetchProfileQuery } from '../../api/userService'

export const MyTariffPage: FC = () => {
  const { data: user, isFetching, isSuccess } = useFetchProfileQuery()

  if (!user || isFetching || !isSuccess) {
    return (
      <div className="w-full lg:px-[60px] px-4 flex flex-col items-center justify-center gap-6">
        <Loader />
      </div>
    )
  }

  return (
    <div className="w-full px-4 flex flex-col gap-6">
      {user.subscription.tariff ? (
        <>
          <div className="text-zinc-900 text-2xl font-medium font-['SF Pro Text'] leading-[28.80px] tracking-tight">Мой тариф</div>
          <div className="w-full max-w-[379px] h-[150px] relative bg-[#EFF6F3] shadow">
            <div className="w-[331px] h-[102px] left-[24px] top-[24px] absolute">
              <div className="left-0 top-[32px] absolute text-zinc-900 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">
                Разовый платеж
              </div>
              <div className="left-0 top-0 absolute">
                <span className="text-green-700 text-xl font-medium font-['SF Pro Text'] leading-normal mr-2 tracking-tight">
                  {user.subscription.tariff.name}
                </span>
                <span className="text-zinc-500 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">
                  ({user.subscription.tariff.unlim_ad_count} объявлений)
                </span>
              </div>
              <div className="left-0 top-[53px] absolute text-zinc-900 text-xl font-normal font-['SF Pro Text'] leading-normal tracking-tight">
                {user.subscription.tariff.price} BYN
              </div>
              <div className="left-[200px] lg:left-[247px] top-[53px] lg:top-0 absolute flex-col justify-start items-start gap-1.5 inline-flex">
                <div className="text-zinc-500 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">Статус:</div>
                <div className="justify-start items-center gap-1.5 inline-flex">
                  {user.subscription.tariff.active ? (
                    <div className="w-2.5 h-2.5 bg-green-700 rounded-full" />
                  ) : (
                    <div className="w-2.5 h-2.5 bg-red-600 rounded-full" />
                  )}
                  <div className="text-zinc-500 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">
                    {user.subscription.tariff.active ? 'Активный' : 'Не активен'}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="text-zinc-900 text-2xl font-medium font-['SF Pro Text'] leading-[28.80px] tracking-tight">Другие тарифы</div>
          <div className="w-full max-w-[379px] h-[150px] relative bg-yellow-100 shadow">
            <div className="w-[331px] h-[102px] left-[24px] top-[24px] absolute">
              <div className="left-0 top-[32px] absolute text-zinc-900 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">
                Разовый платеж
              </div>
              <div className="left-[1px] top-[85px] absolute text-zinc-500 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">
                Период действия 1 месяц
              </div>
              <div className="left-0 top-0 absolute">
                <span className="text-green-800 text-xl font-medium font-['SF Pro Text'] leading-normal tracking-tight">Стандартный </span>
                <span className="text-zinc-500 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">(3 объявления)</span>
              </div>
              <div className="left-0 top-[53px] absolute text-zinc-900 text-xl font-normal font-['SF Pro Text'] leading-normal tracking-tight">30 BYN</div>
            </div>
          </div>
          <div className="w-full max-w-[379px] h-[150px] relative bg-green-200 shadow">
            <div className="w-[331px] h-[102px] left-[24px] top-[24px] absolute">
              <div className="left-0 top-[32px] absolute text-zinc-900 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">
                Разовый платеж
              </div>
              <div className="left-[1px] top-[85px] absolute text-zinc-500 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">
                Период действия 1 месяц
              </div>
              <div className="left-0 top-0 absolute">
                <span className="text-green-800 text-xl font-medium font-['SF Pro Text'] leading-normal tracking-tight">Премиум </span>
                <span className="text-zinc-500 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">(5 объявлений)</span>
              </div>
              <div className="left-0 top-[53px] absolute text-zinc-900 text-xl font-normal font-['SF Pro Text'] leading-normal tracking-tight">50 BYN</div>
            </div>
          </div>
        </>
      ) : (
        <div className="w-full h-full py-[50px] px-[90px] flex flex-col justify-center items-center">
          <img src={notify} width={99} height={99} alt="mail-success" />
          <div className="w-full flex-col justify-center items-center gap-1.5 inline-flex">
            <div className="text-zinc-900 text-center text-lg font-medium font-['SF Pro Text'] leading-snug">Тариф не выбран</div>
            <div className="justify-start items-center gap-4 inline-flex">
              <div className="text-zinc-900 text-sm font-normal font-['SF Pro Text'] leading-[16.80px]">
                Для подачи объявления необходимо выбрать и оплатить тариф.
              </div>
            </div>
            <div className="justify-start items-center gap-4 inline-flex">
              <div>
                <span className="text-zinc-900 text-sm font-normal font-['SF Pro Text'] leading-[16.80px]">Ознакомиться с тарифами можно </span>
                <DefaultLink
                  text="Здесь"
                  href={PathE.TarriffPlans}
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
      )}
    </div>
  )
}
