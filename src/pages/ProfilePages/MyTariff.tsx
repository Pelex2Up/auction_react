import { FC } from 'react'
import { Loader } from '../../components/Loader'
import notify from '../../assets/images/notification.png'
import DefaultLink from '../../components/common/DefaultLink'
import { PathE } from '../../enum'
import { useFetchProfileQuery, useFetchTariffsQuery } from '../../api/userService'
import { selectLangSettings, useAppSelector } from '../../store/hooks'
import { changeWordByNumber } from '../../utility/wordChangerByCount'

export const MyTariffPage: FC = () => {
  const { language } = useAppSelector(selectLangSettings)
  const { data: user, isFetching, isSuccess } = useFetchProfileQuery()
  const { data: tariffs, isFetching: isTariffsFetch, isSuccess: isTariffSuccess } = useFetchTariffsQuery()

  if (!user || isFetching || !isSuccess || isTariffsFetch || !isTariffSuccess || !tariffs) {
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
          <div className="text-zinc-900 text-2xl font-medium font-['SF Pro Text'] leading-[28.80px] tracking-tight">
            {language === 'RU' ? 'Мой тариф' : 'My tariff'}
          </div>
          <div className="w-full max-w-[379px] h-[150px] relative bg-[#EFF6F3] shadow">
            <div className="w-full h-full p-[24px] absolute flex flex-col">
              <div className="flex gap-[5px] flex-wrap items-center">
                <span className="text-green-700 text-xl font-medium font-['SF Pro Text'] leading-normal mr-2 tracking-tight">
                  {user.subscription.tariff.name}
                </span>
                <span className="text-zinc-500 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">
                  {`(${user.subscription.tariff.unlim_ad_count} ${
                    language === 'RU'
                      ? changeWordByNumber(user.subscription.tariff.unlim_ad_count, 'объявление', 'объявления', 'объявлений')
                      : changeWordByNumber(user.subscription.tariff.unlim_ad_count, 'advertisemet', 'advertisemets', 'advertisemets')
                  })`}
                </span>
              </div>
              <div className="text-zinc-900 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">
                {language === 'RU' ? 'Разовый платеж' : 'One-time payment'}
              </div>
              <div className="text-zinc-900 text-xl font-normal font-['SF Pro Text'] leading-normal tracking-tight">{user.subscription.tariff.price} BYN</div>
              <div className="bottom-[30px] right-[30px] lg:top-[24px] absolute flex-col justify-start items-start gap-1.5 inline-flex">
                <div className="text-zinc-500 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">
                  {language === 'RU' ? 'Статус:' : 'Status:'}
                </div>
                <div className="justify-start items-center gap-1.5 inline-flex">
                  {user.subscription.tariff.active ? (
                    <div className="w-2.5 h-2.5 bg-green-700 rounded-full" />
                  ) : (
                    <div className="w-2.5 h-2.5 bg-red-600 rounded-full" />
                  )}
                  <div className="text-zinc-500 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">
                    {user.subscription.tariff.active ? (language === 'RU' ? 'Активный' : 'Active') : language === 'RU' ? 'Не активен' : 'Not active'}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="text-zinc-900 text-2xl font-medium font-['SF Pro Text'] leading-[28.80px] tracking-tight">
            {language === 'RU' ? 'Другие тарифы' : 'Other tariffs'}
          </div>
          {tariffs.map((tariff, index) => {
            if (tariff.name !== user.subscription.tariff.name)
              return (
                <div className={`w-full max-w-[379px] h-[150px] p-[24px] relative shadow ${index % 2 === 0 ? 'bg-yellow-100' : 'bg-green-200'}`} key={index}>
                  <div className="w-full h-full">
                    <div className="flex flex-wrap items-center gap-[5px]">
                      <span className="text-green-800 text-xl font-medium font-['SF Pro Text'] leading-normal tracking-tight">{tariff.name}</span>
                      <span className="text-zinc-500 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">{` (${tariff.ad_count} ${
                        language === 'RU'
                          ? changeWordByNumber(tariff.ad_count, 'объявление', 'объявления', 'объявлений')
                          : changeWordByNumber(tariff.ad_count, 'advertisemet', 'advertisemets', 'advertisemets')
                      })`}</span>
                    </div>
                    <div className="text-zinc-900 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">
                      {language === 'RU' ? 'Разовый платеж' : 'One-time payment'}
                    </div>
                    <div className="text-zinc-500 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">
                      {language === 'RU' ? `Период действия ${tariff.duration_days} дней` : `Validity period ${tariff.duration_days} days`}
                    </div>

                    <div className="text-zinc-900 text-xl font-normal font-['SF Pro Text'] leading-normal tracking-tight">{tariff.price} BYN</div>
                  </div>
                </div>
              )
          })}
        </>
      ) : (
        <div className="w-full h-full py-[50px] px-[90px] flex flex-col justify-center items-center">
          <img src={notify} width={99} height={99} alt="mail-success" />
          <div className="w-full flex-col justify-center items-center gap-1.5 inline-flex">
            <div className="text-zinc-900 text-center text-lg font-medium font-['SF Pro Text'] leading-snug">
              {language === 'RU' ? 'Тариф не выбран' : 'Tariff not selected'}
            </div>
            <div className="justify-start items-center gap-4 inline-flex">
              <div className="text-zinc-900 text-sm font-normal font-['SF Pro Text'] leading-[16.80px]">
                {language === 'RU' ? 'Для подачи объявления необходимо выбрать и оплатить тариф.' : 'To submit an ad, you must select and pay a tariff.'}
              </div>
            </div>
            <div className="justify-start items-center gap-4 inline-flex">
              <div>
                <span className="text-zinc-900 text-sm font-normal font-['SF Pro Text'] leading-[16.80px]">
                  {language === 'RU' ? 'Ознакомиться с тарифами можно ' : 'You can view the tariffs '}
                </span>
                <DefaultLink
                  text={language === 'RU' ? 'Здесь' : 'Here'}
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
