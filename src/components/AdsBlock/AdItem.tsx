import { FC } from 'react'
import { IAd } from '../../api/apiTypes'

interface IAdItem {
  ad: IAd
}

export const AdItem: FC<IAdItem> = ({ ad }) => {
  return (
    <a className="w-full lg:w-[424px] h-[301px] flex flex-col items-center justify-center gap-2 hover:scale-105 transition-all duration-300 relative" href={ad.url} target="_blank" rel="noreferrer">
      <img className="w-[424px] max-h-[266px] rounded object-contain" src={ad.image} />
      <div className="text-zinc-900 text-base font-normal font-['SF Pro Text'] leading-tight">{ad.title}</div>
    </a>
  )
}
