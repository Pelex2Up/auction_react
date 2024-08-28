import { FC, useEffect, useRef } from 'react'
import { LotT } from '../../types/lotTypes'
import { generatePath, useNavigate } from 'react-router-dom'
import DefaultLink from '../common/DefaultLink'
import { LotPathE } from '../../enum'
import { Tooltip } from '@mui/material'
import { Loader } from '../Loader'
import { DeleteSVG } from '../../assets/svg/deleteSVG'
import styles from '../../pages/ProfilePages/components/buttonStyles.module.scss'
import { useDeleteLotFromCartMutation } from '../../api/userService'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import type { SwiperRef } from 'swiper/react'

import 'swiper/css'
import 'swiper/scss/pagination'
import { Button } from '../common/buttons'
import { padWithZeros } from '../../utils/articleNumberConverter'
import { selectLangSettings, useAppSelector } from '../../store/hooks'
import { PriceDisplay } from '../PriceDisplay'

type CartLotT = {
  lot: LotT
  refetch: () => void
}

export const CartLot: FC<CartLotT> = ({ lot, refetch }) => {
  const { language, money } = useAppSelector(selectLangSettings)
  const createdDate = new Date(lot.created)
  const endDate = new Date(lot.auction_end_date)
  const [deleteLot, { isSuccess, isLoading: isDeleting }] = useDeleteLotFromCartMutation()
  const swiperRef = useRef<SwiperRef>(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (isSuccess) {
      refetch()
    }
  }, [isSuccess])

  return (
    <div className="w-full h-auto py-6 pl-0 pr-6 gap-6 flex shadow bg-white">
      <div className="w-full max-w-[150px] lg:max-w-[259px] h-full relative cursor-pointer">
        {lot.photos.length > 0 ? (
          <div className="relative h-[100px] lg:h-[187px]">
            <div className="self-stretch h-full flex flex-col items-start justify-start relative">
              <Swiper
                ref={swiperRef}
                slidesPerView={1}
                modules={[Pagination]}
                pagination={{ clickable: true }}
                style={{ height: 'auto', alignItems: 'center', paddingBottom: '35px' }}
              >
                {lot.photos.map((photo, index) => (
                  <SwiperSlide style={{ display: 'flex', justifyContent: 'center', height: '150px' }} key={index}>
                    <img src={photo.image} alt={`lot-photo-preview-${photo.order}`} />
                  </SwiperSlide>
                ))}
              </Swiper>
              {lot.status === 'CLOSED' && (
                <div className="absolute top-0 left-0 bottom-[36px] right-0 z-[60] w-full bg-[rgba(113,113,122,0.5)] text-red-600 rounded font-sans text-lg font-bold flex items-center justify-center">
                  завершен
                </div>
              )}
              <button className="cursor-pointer [border:none] p-[0.5rem] bg-white w-max min-w-[4.925rem] !m-[0] absolute top-[1rem] left-[0rem] rounded-tl-none rounded-tr rounded-br rounded-bl-none overflow-hidden flex flex-row items-start justify-start box-border whitespace-nowrap text-green-600 z-50">
                <div className="relative text-[0.75rem] tracking-[0.01em] leading-[120%] font-text-2 text-green text-left">
                  {lot.is_auction ? (language === 'RU' ? 'Аукцион' : 'Auction') : language === 'RU' ? 'Фиксированная цена' : 'Fixed price'}
                </div>
              </button>
            </div>
          </div>
        ) : (
          <div className="w-full h-[187px] pl-[9px] pr-2 flex-col justify-center items-center gap-4 inline-flex relative">
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
            <div className="w-auto text-zinc-900 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">{`${lot.profile.type === 'person' ? 'ФЛ' : lot.profile.type === 'company' ? 'ЮЛ' : 'ИП'
              } ${lot.profile.name}`}</div>
          </div>
        )}
        <div className="p-2 left-0 top-[10px] absolute bg-white rounded-tr rounded-br justify-start items-center gap-2.5 inline-flex">
          <div className="text-green-800 text-xs font-normal font-['SF Pro Text'] leading-[14.40px] tracking-tight">
            {lot.is_auction ? (language === 'RU' ? 'Аукцион' : 'Auction') : language === 'RU' ? 'Фиксированная цена' : 'Fixed price'}
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col gap-2">
        <div className="w-full flex flex-col gap-1">
          <div className="w-full flex lg:flex-row flex-col-reverse justify-between gap-4">
            <DefaultLink text={lot.title} className={styles.link} href={generatePath(LotPathE.LotDetail, { slug: lot.slug })} />

            <div className="flex gap-2 self-end">
              {isDeleting ? (
                <div className="w-[22px] h-[24px] flex items-center justify-center">
                  <Loader />
                </div>
              ) : (
                <Tooltip title={language === 'RU' ? 'Удалить из корзины' : 'Remove from basket'}>
                  <button onClick={() => deleteLot(lot.id)}>
                    <DeleteSVG />
                  </button>
                </Tooltip>
              )}
            </div>
          </div>
          <div className="text-zinc-500 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">
            {language === 'RU' ? 'Код товара' : 'Product code'} №{padWithZeros(String(lot.id))}
          </div>
          <div className="text-zinc-500 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">{lot.description}</div>
        </div>
        <div className="text-zinc-900 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">
          {language === 'RU' ? 'Состояние' : 'Condition'}:{' '}
          {lot.condition === 'USED' ? (language === 'RU' ? 'Б/У' : 'used') : language === 'RU' ? 'новое' : 'new'}
        </div>
        {lot.is_auction ? (
          <div className="flex flex-col gap-1">
            <div className="text-zinc-900 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">
              {language === 'RU' ? 'Текущая цена' : 'Current price'}:
            </div>
            <PriceDisplay money={money} lot={lot} />
          </div>
        ) : (
          <div className="flex flex-col gap-1">
            <div className="text-zinc-900 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">
              {language === 'RU' ? 'Стоимость:' : 'Price:'}
            </div>
            <PriceDisplay money={money} lot={lot} />
          </div>
        )}

        <div className="justify-start items-start gap-1.5 inline-flex">
          <div className=" text-zinc-500 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">
            {`${language === 'RU' ? 'Добавлено' : 'Created'} ${createdDate.toLocaleDateString()}, ${lot.city ? `${lot.city}` : ''}`}
          </div>
        </div>
        {lot.is_auction ? (
          <div className="self-end">
            <Button text={language === 'RU' ? 'Сделать ставку' : 'Make bid'} onClick={() => navigate(generatePath(LotPathE.LotDetail, { slug: lot.slug }))} />
          </div>
        ) : (
          <div className="self-end">
            <Button text={language === 'RU' ? 'Купить' : 'Purchase'} onClick={() => navigate(generatePath(LotPathE.LotDetail, { slug: lot.slug }))} />
          </div>
        )}
      </div>
    </div>
  )
}
