import { FC, useEffect, useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import type { SwiperRef } from 'swiper/react'
import { Pagination as PaginatorSwiper } from 'swiper/modules'
import 'swiper/scss'
import 'swiper/scss/pagination'
import { selectLangSettings, useAppSelector } from '../../../store/hooks'
import { useFetchAdsQuery } from '../../../api/searchService'
import { Loader } from '../../Loader'
import { Pagination, useMediaQuery } from '@mui/material'

export const SliderAds: FC = () => {
  const { language } = useAppSelector(selectLangSettings)
  const adsListSwiperRef = useRef<SwiperRef>(null)
  const [page, setPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(4)
  const { data: adsData, isFetching, refetch } = useFetchAdsQuery(`?page=${page}&page_size=${pageSize}`)
  const laptopDisplay = useMediaQuery('(min-width:1300px)', { noSsr: true })
  const mediumDisplay = useMediaQuery('(min-width:1024px)', { noSsr: true })

  useEffect(() => {
    if (laptopDisplay) {
      setPageSize(4)
    } else if (mediumDisplay) {
      setPageSize(2)
    } else {
      setPageSize(1)
    }
  }, [laptopDisplay, mediumDisplay])

  useEffect(() => {
    if (pageSize) {
      refetch()
    }
  }, [pageSize])

  const nextElementSwiper = () => {
    if (!adsListSwiperRef.current) return false

    adsListSwiperRef.current?.swiper?.slideNext()
  }

  if (!adsData) {
    return <></>
  }

  return (
    <div className="w-full h-[527px] flex-col justify-center items-start gap-8 inline-flex">
      <div className="w-full grow shrink basis-0 flex-col justify-center items-start gap-8 inline-flex">
        <div className="w-32 h-[29px] pr-[23px] justify-start items-center inline-flex">
          <div className="text-zinc-900 text-2xl font-medium font-['SF Pro Text'] leading-[28.80px] tracking-tight">
            {language === 'RU' ? 'Реклама' : 'Ads'}
          </div>
        </div>
        <div className="w-full self-stretch justify-center items-start overflow-hidden">
          <Swiper
            ref={adsListSwiperRef}
            slidesPerView={'auto'}
            style={{ paddingBottom: '10px', paddingTop: '10px' }}
            breakpoints={{
              668: {
                slidesPerView: 1,
                spaceBetween: 20
              },
              1024: {
                slidesPerView: 2,
                spaceBetween: 20
              },
              1300: {
                slidesPerView: 4,
                spaceBetween: 20
              }
            }}
          >
            {!isFetching ? (
              adsData.results.map((el, index) => (
                <SwiperSlide key={el.id}>
                  <a className="w-full" href={el.url} target="_blank" rel="noreferrer">
                    <img style={{objectFit: 'contain'}} className="w-[424px] max-h-[266px] rounded object-contain hover:scale-105 transition-all duration-200" src={el.image} alt={el.title} />
                    {/* <img className="w-[312px] h-[418px] rounded hover:scale-105 transition-all duration-200 shadow" src={el.image} alt={el.title} /> */}
                  </a>
                </SwiperSlide>
              ))
            ) : (
              <div className="w-full h-full xl:px-[60px] flex items-center justify-center">
                <Loader />
              </div>
            )}
          </Swiper>
        </div>
        <div className="w-full flex items-center justify-center">
          <Pagination count={Math.ceil(adsData.count / pageSize)} size="small" page={page} onChange={(event, value) => setPage(value)} />
        </div>
      </div>
    </div>
  )
}
