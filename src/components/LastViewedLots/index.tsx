import { FC, useEffect, useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import type { SwiperRef } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import 'swiper/scss'
import 'swiper/scss/pagination'
import { AuctionCard } from '../cards/auction'
import './styles.css'
import { LotT } from '../../types/lotTypes'
import { selectHistory, selectLangSettings, useAppSelector } from '../../store/hooks'
import { useFetchLastVisitedMutation } from '../../api/userService'

export const LastViewedLotsBlock: FC = () => {
  const { language } = useAppSelector(selectLangSettings)
  const { lots: lotsHistory } = useAppSelector(selectHistory)
  const [getLots, { data, isSuccess, isLoading, isError }] = useFetchLastVisitedMutation()
  const lotsListSwiperRef = useRef<SwiperRef>(null)
  const [lotsData, setLotsData] = useState<LotT[]>()

  useEffect(() => {
    if (!lotsData && !isLoading && !isError && lotsHistory && lotsHistory.length > 0) {
      getLots({ advertisement_ids: lotsHistory })
    }
  }, [lotsData, isLoading, isError])

  useEffect(() => {
    if (isSuccess && data) {
      setLotsData(data)
    }
  }, [data, isSuccess])

  const nextElementSwiper = () => {
    if (!lotsListSwiperRef.current) return false

    lotsListSwiperRef.current?.swiper?.slideNext()
  }

  const prevElementSwiper = () => {
    if (!lotsListSwiperRef.current) return false

    lotsListSwiperRef.current?.swiper?.slidePrev()
  }

  if (!lotsData || lotsData.length === 0) {
    return <></>
  }

  return (
    <div className="w-full h-full flex-col justify-center items-start gap-8 inline-flex">
      <div className="self-stretch justify-between items-center inline-flex">
        <div className="w-[372px] h-[29px] pr-[7px] justify-start items-center flex">
          <div className="text-zinc-900 text-2xl font-medium font-['SF Pro Text'] leading-[28.80px] tracking-tight">
            {language === 'RU' ? 'Недавно просмотренные' : 'Last viewed advertisements'}
          </div>
        </div>
        <div className="justify-start items-start gap-6 flex">
          <div onClick={prevElementSwiper} className="w-10 h-10 relative origin-top-left cursor-pointer">
            <div className="w-10 h-10 left-0 top-0 absolute bg-white rounded-full shadow" />
            <div className="w-[18px] h-[18px] px-[4.95px] py-[0.64px] left-[29px] top-[29px] absolute origin-top-left -rotate-180 justify-center items-center inline-flex">
              <svg width="10" height="18" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M0.952736 17.3569L8.85988 9.44979C8.92137 9.39207 8.97039 9.32237 9.0039 9.24497C9.0374 9.16757 9.05469 9.08413 9.05469 8.99979C9.05469 8.91545 9.0374 8.83201 9.0039 8.75461C8.97039 8.67721 8.92137 8.60751 8.85988 8.54979L0.952736 0.642647"
                  stroke="#1D1E22"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
          <div onClick={nextElementSwiper} className="w-10 h-10 relative cursor-pointer">
            <div className="w-10 h-10 left-0 top-0 absolute bg-white rounded-full shadow" />
            <div className="w-[18px] h-[18px] px-[4.95px] py-[0.64px] left-[29px] top-[29px] absolute origin-top-left -rotate-180 justify-center items-center inline-flex">
              <svg width="10" height="18" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M9.04726 17.3569L1.14012 9.44979C1.07863 9.39207 1.02961 9.32237 0.996105 9.24497C0.962599 9.16757 0.945312 9.08413 0.945312 8.99979C0.945312 8.91545 0.962599 8.83201 0.996105 8.75461C1.02961 8.67721 1.07863 8.60751 1.14012 8.54979L9.04726 0.642647"
                  stroke="#1D1E22"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-full justify-start items-start xl:gap-6 gap-[270px] flex overflow-hidden">
        <Swiper
          ref={lotsListSwiperRef}
          slidesPerView={'auto'}
          modules={[Pagination]}
          pagination={{ clickable: true }}
          style={{ height: 'auto', alignItems: 'center', paddingBottom: '40px' }}
          breakpoints={{
            300: {
              slidesPerView: 1,
              spaceBetween: 10
            },
            668: {
              slidesPerView: 2,
              spaceBetween: 10
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 20
            },
            1300: {
              slidesPerView: 4,
              spaceBetween: 20
            },
            1520: {
              slidesPerView: 5,
              spaceBetween: 20
            }
          }}
        >
          {lotsData?.map((lot, index) => (
            <SwiperSlide style={{ display: 'flex', justifyContent: 'center' }} key={index}>
              <AuctionCard lot={lot} refetch={() => getLots({ advertisement_ids: lotsHistory })} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}
