import { FC } from 'react'
import { IAd } from '../../api/apiTypes'

interface IAdItem {
  ad: IAd
}

export const AdItem: FC<IAdItem> = ({ ad }) => {
  return (
    <a className="w-[424px] h-[301px] relative" href={ad.url} target="_blank" rel="noreferrer">
      <div className="left-[7px] top-[282px] absolute text-zinc-900 text-base font-normal font-['SF Pro Text'] leading-tight">{ad.title}</div>
      <img className="w-[424px] h-[266px] left-0 top-0 absolute rounded" src={ad.image} />
    </a>
  )
}
