import { FC, useEffect } from 'react'
import { LotT } from '../../../types/lotTypes'
import { padWithZeros } from '../../../utils/articleNumberConverter'
import { ShopperSVG } from '../../../assets/svg/shopperSVG'
import DefaultLink from '../../common/DefaultLink'
import { generatePath } from 'react-router-dom'
import { LotPathE } from '../../../enum'
import styles from './ButtonStyles.module.scss'
import { useAppendLotInCartMutation } from '../../../api/userService'
import { toast } from 'react-toastify'
import { selectLangSettings, selectUser, useAppSelector } from '../../../store/hooks'
import { Tooltip } from '@mui/material'
import { OldPriceDisplay, PriceDisplay } from '../../PriceDisplay'

export type ICard = {
  lot: LotT
  refetch: () => void
}

export const AuctionCard: FC<ICard> = ({ lot, refetch }) => {
  const [addToCart, { isSuccess: isSuccessCart, isError: isErrorCart, error }] = useAppendLotInCartMutation()
  const { user } = useAppSelector(selectUser)
  const { language, money } = useAppSelector(selectLangSettings)
  const createdDate = new Date(lot.created)
  const endDate = new Date(lot.auction_end_date)
  const MAX_LENGTH = 100
  const shortenedText = lot.description.length > MAX_LENGTH ? `${lot.description.slice(0, MAX_LENGTH)}...` : lot.description

  useEffect(() => {
    if (isSuccessCart) {
      toast(language === 'RU' ? 'Лот успешно добавлен в корзину' : 'Added to basket', { type: 'success' })
      refetch()
    }
  }, [isSuccessCart, language])

  return (
    <div className="w-[255px] h-[430px] flex flex-col justify-between pb-3 relative bg-white rounded shadow">
      <div className="flex flex-col gap-2">
        <div className="w-[255px] h-[197px] justify-center items-center inline-flex">
          {lot.photos.length > 0 ? (
            <div className="relative h-full">
              {lot.status === 'MODERATION' && (
                <div className="absolute top-0 left-0 z-99 w-full h-full bg-[rgba(113,113,122,0.5)] text-white rounded font-sans text-lg font-bold flex items-center justify-center">
                  {language === 'RU' ? 'на модерации' : 'moderation'}
                </div>
              )}
              {lot.status === 'CLOSED' && (
                <div className="absolute top-0 left-0 z-99 w-full h-full bg-[rgba(113,113,122,0.5)] text-red-600 rounded font-sans text-lg font-bold flex items-center justify-center">
                  {language === 'RU' ? 'завершен' : 'closed'}
                </div>
              )}
              <img className="w-full h-full rounded object-contain" src={lot.photos[0].image} />
            </div>
          ) : (
            <div className="w-full h-full pl-[9px] pr-2 flex-col justify-center items-center gap-4 inline-flex relative">
              {lot.status === 'MODERATION' && (
                <div className="absolute top-0 left-0 z-99 w-full h-full bg-[rgba(113,113,122,0.5)] text-white rounded font-sans text-lg font-bold flex items-center justify-center">
                  {language === 'RU' ? 'на модерации' : 'moderation'}
                </div>
              )}
              {lot.status === 'CLOSED' && (
                <div className="absolute top-0 left-0 z-99 w-full h-full bg-[rgba(113,113,122,0.5)] text-red-600 rounded font-sans text-lg font-bold flex items-center justify-center">
                  {language === 'RU' ? 'завершен' : 'closed'}
                </div>
              )}
              <div className="w-[65px] h-[65px] pl-[21px] pr-[23px] pt-[15px] pb-3.5 bg-green-800 rounded justify-center items-center inline-flex">
                <div className="w-auto h-9 text-white text-3xl font-medium font-['SF Pro Text'] leading-9 tracking-tight">
                  {lot.profile.name[0].toUpperCase()}
                </div>
              </div>
              <div className="w-auto text-zinc-900 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">{`${
                lot.profile.type === 'person' ? 'ФЛ' : lot.profile.type === 'company' ? 'ЮЛ' : 'ИП'
              } ${lot.profile.name.length > 15 ? lot.profile.name.slice(0, 15) + '...' : lot.profile.name}`}</div>
            </div>
          )}
          <div className="w-[243px] left-0 top-[9px] absolute justify-between items-center inline-flex">
            <div className="p-2 bg-white rounded-tr rounded-br justify-start items-center gap-2.5 flex">
              <div className="text-green-800 text-xs font-normal font-['SF Pro Text'] leading-[14.40px] tracking-tight">
                {lot.is_auction ? (language === 'RU' ? 'Аукцион' : 'Auction') : language === 'RU' ? 'Фиксированная цена' : 'Fixed price'}
              </div>
            </div>
            <div className="w-6 h-6 pl-[1.09px] pr-[1.08px] py-[0.86px] justify-center items-center flex"></div>
          </div>
          {!lot.cart && !(user?.profile.id === lot.profile.id) && (
            <Tooltip title={language === 'RU' ? 'Добавить в корзину' : 'Add to basket'}>
              <span className="absolute w-[24px] h-[24px] right-4 top-4 cursor-pointer" onClick={() => addToCart({ advertisement_ids: [lot.id] })}>
                <ShopperSVG />
              </span>
            </Tooltip>
          )}
        </div>
        <div className="w-full px-3 justify-between items-start inline-flex">
          <div className="flex-col justify-start items-start gap-1.5 inline-flex">
            <div className="text-zinc-500 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">
              {language === 'RU' ? 'Код товара' : 'Product code'}
            </div>
            <div className="text-zinc-500 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">№{padWithZeros(String(lot.id))}</div>
          </div>
          <div className="w-[93px] h-[39px] flex-col justify-start items-end inline-flex">
            <PriceDisplay money={money} lot={lot} />
            {/* <div className="text-right text-green-800 text-lg font-bold font-['SF Pro Text'] leading-snug tracking-tight">{lot.price.split('.')[0]} BYN</div> */}
            {lot.old_price && lot.old_price.length > 0 && <OldPriceDisplay money={money} lot={lot} />}
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
            <div className="text-zinc-900 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">
              {language === 'RU' ? 'Аукцион до' : 'Auction until'}:
            </div>
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
        <div className="px-3 self-end text-zinc-500 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">{lot.city}</div>
      </div>
    </div>
  )
}
