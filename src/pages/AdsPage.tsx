import { FC, useState } from 'react'
import FeedBack from '../components/feedBack'
import { useFetchAdsQuery } from '../api/searchService'
import { Pagination } from '@mui/material'
import { Loader } from '../components/Loader'
import { AdItem } from '../components/AdsBlock/AdItem'

export const AdsPage: FC = () => {
  const [page, setPage] = useState<number>(1)
  const { data: adsData, isFetching } = useFetchAdsQuery(`?page=${page}`)

  if (!adsData || isFetching) {
    return (
      <div className="w-full h-full xl:px-[60px] flex items-center justify-center">
        <Loader />
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="lg:px-[60px] px-4 flex-col gap-6">
        <h1 className="text-zinc-900 text-2xl font-medium font-['SF Pro Text'] leading-[28.80px]">Реклама</h1>
        {adsData.results && adsData.results.length > 0 ? (
          <div className="w-full flex-col flex gap-[60px]">
            <div className="w-full flex flex-row flex-wrap gap-4 justify-center">
              {adsData.results.map((el, index) => (
                <AdItem key={index} ad={el} />
              ))}
            </div>
            <div className="w-full flex items-center justify-center">
              <Pagination count={Math.ceil(adsData.count / 6)} size="small" page={page} onChange={(event, value) => setPage(value)} />
            </div>
          </div>
        ) : (
          <div className="w-full flex justify-center py-[100px]">
            <p className="text-zinc-500 text-2xl font-medium font-['SF Pro Text'] leading-[28.80px]">Нет доступной рекламы :(</p>
          </div>
        )}
      </div>
      <FeedBack />
    </div>
  )
}
