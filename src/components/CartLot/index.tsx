import { FC, useEffect, useRef } from 'react'
import { LotT } from '../../types/lotTypes'
import { generatePath } from 'react-router-dom'
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

type CartLotT = {
  lot: LotT
  refetch: () => void
}

export const CartLot: FC<CartLotT> = ({ lot, refetch }) => {
  const createdDate = new Date(lot.created)
  const endDate = new Date(lot.auction_end_date)
  const [deleteLot, { isSuccess, isLoading: isDeleting }] = useDeleteLotFromCartMutation()
  const swiperRef = useRef<SwiperRef>(null)

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
            {lot.status === 'CLOSED' && (
              <div className="absolute top-0 left-0 z-99 w-full h-full bg-[rgba(113,113,122,0.5)] text-red-600 rounded font-sans text-lg font-bold flex items-center justify-center">
                завершен
              </div>
            )}
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
              <button className="cursor-pointer [border:none] p-[0.5rem] bg-white w-max min-w-[4.925rem] !m-[0] absolute top-[1rem] left-[0rem] rounded-tl-none rounded-tr rounded-br rounded-bl-none overflow-hidden flex flex-row items-start justify-start box-border whitespace-nowrap text-green-600 z-50">
                <div className="relative text-[0.75rem] tracking-[0.01em] leading-[120%] font-text-2 text-green text-left">
                  {lot.is_auction ? 'Аукцион' : 'Фиксированная цена'}
                </div>
              </button>
            </div>
          </div>
        ) : (
          <div className="w-full h-[187px] pl-[9px] pr-2 flex-col justify-center items-center gap-4 inline-flex relative">
            {lot.status === 'CLOSED' && (
              <div className="absolute top-0 left-0 z-99 w-full h-full bg-[rgba(113,113,122,0.5)] text-red-600 rounded font-sans text-lg font-bold flex items-center justify-center">
                завершен
              </div>
            )}
            <div className="w-[65px] h-[65px] pl-[21px] pr-[23px] pt-[15px] pb-3.5 bg-green-800 rounded justify-center items-center inline-flex">
              <div className="w-auto h-9 text-white text-3xl font-medium font-['SF Pro Text'] leading-9 tracking-tight">
                {lot.profile.name[0].toUpperCase()}
              </div>
            </div>
            <div className="w-auto text-zinc-900 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">{`${
              lot.profile.type === 'person' ? 'ФЛ' : lot.profile.type === 'company' ? 'ЮЛ' : 'ИП'
            } ${lot.profile.name}`}</div>
          </div>
        )}
        <div className="p-2 left-0 top-[10px] absolute bg-white rounded-tr rounded-br justify-start items-center gap-2.5 inline-flex">
          <div className="text-green-800 text-xs font-normal font-['SF Pro Text'] leading-[14.40px] tracking-tight">
            {lot.is_auction ? 'Аукцион' : 'Фиксированная цена'}
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
                <Tooltip title="Удалить из корзины">
                  <button onClick={() => deleteLot(lot.id)}>
                    <DeleteSVG />
                  </button>
                </Tooltip>
              )}
            </div>
          </div>
          <div className="text-zinc-500 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">
            Код товара №{padWithZeros(String(lot.id))}
          </div>
          <div className="text-zinc-500 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">{lot.description}</div>
        </div>
        <div className="text-zinc-900 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">
          Состояние: {lot.condition === 'USED' ? 'Б/У' : 'новое'}
        </div>
        <div className="text-zinc-900 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">Стоимость:</div>
        <div className="flex-col justify-start items-start inline-flex">
          <div className="text-right text-green-800 text-lg font-bold font-['SF Pro Text'] leading-snug tracking-tight">{lot.price.split('.')[0]} BYN</div>
        </div>

        <div className="justify-start items-start gap-1.5 inline-flex">
          <div className=" text-zinc-500 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">
            {`Добавлено ${createdDate.toLocaleDateString()}, ${lot.city ? `${lot.city}` : ''}`}
          </div>
        </div>
        {lot.is_auction ? (
          <div className="self-end">
            <Button text="Сделать ставку" />
          </div>
        ) : (
          <div className="self-end">
            <Button text="Купить" />
          </div>
        )}
      </div>
    </div>
  )
}
