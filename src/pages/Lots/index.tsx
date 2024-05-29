import { FC } from 'react'
import LotDetail from './LotDetail'
import LotDescription from './LotDescription'

export const LotPage: FC = () => {
  return (
    <div className="w-full h-full xl:px-[60px]">
      <LotDetail />
      <LotDescription />
    </div>
  )
}
