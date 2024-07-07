import { FC } from 'react'
import FeedBack from '../components/feedBack'
import { useFetchAdsQuery } from '../api/searchService'

export const AdsPage: FC = () => {
  const { data: adsData, isFetching } = useFetchAdsQuery('')
  return (
    <div className="flex flex-col gap-6">
      <div className="lg:px-[60px] px-4 flex-row flex-wrap gap-6"></div>
      <FeedBack />
    </div>
  )
}
