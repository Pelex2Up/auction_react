import { FC, useEffect } from 'react'
import LotImage from '../../../assets/images/lot.png'
import { LotT } from '../../../types/lotTypes'
import { padWithZeros } from '../../../utils/articleNumberConverter'
import { ShopperSVG } from '../../../assets/svg/shopperSVG'
import DefaultLink from '../../common/DefaultLink'
import { generatePath } from 'react-router-dom'
import { LotPathE } from '../../../enum'
import styles from './ButtonStyles.module.scss'
import { useAppendLotInCartMutation } from '../../../api/userService'
import { toast } from 'react-toastify'
import { selectUser, useAppSelector } from '../../../store/hooks'
import { Tooltip } from '@mui/material'

export type ICard = {
  lot: LotT
  refetch: () => void
}

export const AuctionCard: FC<ICard> = ({ lot, refetch }) => {
  const [addToCart, { isSuccess: isSuccessCart, isError: isErrorCart, error }] = useAppendLotInCartMutation()
  const { user } = useAppSelector(selectUser)
  const createdDate = new Date(lot.created)
  const endDate = new Date(lot.auction_end_date)
  const MAX_LENGTH = 100
  const shortenedText = lot.description.length > MAX_LENGTH ? `${lot.description.slice(0, MAX_LENGTH)}...` : lot.description

  useEffect(() => {
    if (isSuccessCart) {
      toast('Лот успешно добавлен в корзину', { type: 'success' })
      refetch()
    }
  }, [isSuccessCart])

  return (
    <div className="w-[255px] h-[430px] flex flex-col justify-between pb-3 relative bg-white rounded shadow">
      <div className="flex flex-col gap-2">
        <div className="w-[255px] h-[197px] justify-center items-center inline-flex">
          <img width={255} height={197} className="w-[255px] h-[197px] rounded-tl rounded-tr" src={lot.photos[0].image} alt="lot-image" />
          <div className="w-[243px] left-0 top-[9px] absolute justify-between items-center inline-flex">
            <div className="p-2 bg-white rounded-tr rounded-br justify-start items-center gap-2.5 flex">
              <div className="text-green-800 text-xs font-normal font-['SF Pro Text'] leading-[14.40px] tracking-tight">
                {lot.is_auction ? 'Аукцион' : 'Фиксированная цена'}
              </div>
            </div>
            <div className="w-6 h-6 pl-[1.09px] pr-[1.08px] py-[0.86px] justify-center items-center flex"></div>
          </div>
          {!lot.cart && !(user?.profile.id === lot.profile.id) && (
            <Tooltip title="Добавить в корзину">
              <span className="absolute w-[24px] h-[24px] right-4 top-4 cursor-pointer" onClick={() => addToCart({ advertisement_id: lot.id })}>
                <ShopperSVG />
              </span>
            </Tooltip>
          )}
        </div>
        <div className="w-full px-3 justify-between items-start inline-flex">
          <div className="flex-col justify-start items-start gap-1.5 inline-flex">
            <div className="text-zinc-500 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">Код товара</div>
            <div className="text-zinc-500 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">№{padWithZeros(String(lot.id))}</div>
          </div>
          <div className="w-[93px] h-[39px] flex-col justify-start items-end inline-flex">
            <div className="text-right text-green-800 text-lg font-bold font-['SF Pro Text'] leading-snug tracking-tight">{lot.price.split('.')[0]} BYN</div>
            {lot.old_price && lot.old_price.length > 0 && (
              <div className="text-zinc-500 text-sm font-normal font-['SF Pro Text'] line-through leading-[16.80px] tracking-tight">
                {lot.old_price.split('.')[0]} BYN
              </div>
            )}
          </div>
        </div>
        <div className="flex-col justify-start items-start gap-1.5 px-3 inline-flex">
          <div className="text-green-800 text-base text-start font-normal font-['SF Pro Text'] leading-tight tracking-tight">
            <DefaultLink text={lot.title} className={styles.link} href={generatePath(LotPathE.LotDetail, { slug: lot.slug })} />
          </div>
          <div className="w-full text-start text-zinc-500 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">{shortenedText}</div>
        </div>
      </div>
      <div className="flex flex-row justify-between">
        {lot.is_auction ? (
          <div className="w-32 h-10 ml-2 mt-2 flex-col justify-start items-start gap-1.5 inline-flex">
            <div className="text-zinc-900 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">Аукцион до:</div>
            <div className="flex-col justify-start items-start gap-1.5 flex">
              <div className="justify-start items-start gap-1.5 inline-flex">
                <div className="text-zinc-500 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">{endDate.toLocaleDateString()}</div>
                <div className="text-zinc-500 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">{endDate.toLocaleTimeString()}</div>
              </div>
            </div>
          </div>
        ) : (
          <div></div>
        )}
        <div className="px-3 self-end text-zinc-500 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">г. Минск</div>
      </div>
    </div>
  )
}

export default AuctionCard
