import { FC } from 'react'
import DefaultLink from '../../../components/common/DefaultLink'
import { PathE, ProfilePathE } from '../../../enum'
import bellIcon from '../../../assets/images/notification.png'
import { useLocation } from 'react-router-dom'

export const EmptyLots: FC = () => {
  const { pathname } = useLocation()

  return (
    <div className="w-[499px] h-[168px] flex-col justify-start items-center gap-2 inline-flex">
      <img src={bellIcon} alt="notification" className="w-[99px] h-[99px]" />
      <div className="flex-col justify-start items-center gap-1.5 flex">
        <div className="text-zinc-900 text-lg font-medium font-['SF Pro Text'] leading-snug">
          {pathname === ProfilePathE.MyLots ? 'Объявлений нет' : 'Заказов нет'}
        </div>
        <div className="justify-start items-center gap-4 inline-flex">
          <div className="w-[499px] text-center">
            <span className="text-zinc-900 text-sm font-normal font-['SF Pro Text'] leading-[16.80px]">Ознакомиться с правилами подачи объявления можно </span>
            <DefaultLink
              href={PathE.Rules}
              text="Здесь"
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
