import FeedBack from '../components/feedBack'
import SearchBlock from '../components/SearchBlock'
import { SliderAds } from '../components/AdsBlock/SliderPreview'
import LotsBlock from '../components/LotsBlock'
import { FC } from 'react'
import { LastViewedLotsBlock } from '../components/LastViewedLots'

export const Home: FC = () => {
  return (
    <main className="w-full h-auto flex flex-col gap-8">
      <SearchBlock />
      <div className="lg:px-[60px] px-5">
        <SliderAds />
      </div>
      <div className="xl:px-[60px] px-5">
        <LotsBlock />
      </div>
      <div className="lg:px-[60px] px-5">
        <LastViewedLotsBlock />
      </div>
      <FeedBack />
    </main>
  )
}
