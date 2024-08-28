import { FC } from 'react'
import DefaultLink from '../../../components/common/DefaultLink'
import { PathE, ProfilePathE } from '../../../enum'
import bellIcon from '../../../assets/images/notification.png'
import { useLocation } from 'react-router-dom'
import { selectLangSettings, useAppSelector } from '../../../store/hooks'

export const EmptyLots: FC = () => {
  const { language } = useAppSelector(selectLangSettings)
  const { pathname } = useLocation()

  return (
    <div className="max-w-[499px] h-[168px] flex-col justify-start items-center gap-2 inline-flex">
      <img src={bellIcon} alt="notification" className="w-[99px] h-[99px]" />
      <div className="flex-col justify-start items-center gap-1.5 flex">
        <div className="text-zinc-900 text-lg font-medium font-['SF Pro Text'] leading-snug">
          {pathname === ProfilePathE.MyLots
            ? language === 'RU'
              ? 'Объявлений нет'
              : `Don't have any advertisements`
            : language === 'RU'
            ? 'Заказов нет'
            : `Don't have any orders`}
        </div>
        <div className="justify-start items-center gap-4 inline-flex">
          <div className="w-full text-center break-normal">
            <span className="text-zinc-900 text-sm font-normal font-['SF Pro Text'] leading-[16.80px]">
              {language === 'RU' ? 'Ознакомиться с правилами подачи объявления можно ' : 'You can view the rules for submitting an ad '}{' '}
            </span>
            <DefaultLink
              href={PathE.Rules}
              text={language === 'RU' ? 'Здесь' : 'Here'}
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
