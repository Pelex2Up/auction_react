import FeedBack from '../components/feedBack'
import Logo from '../assets/logo/logo.svg'
import SearchBlock from '../components/SearchBlock'
import { SliderAds } from '../components/AdsBlock/SliderPreview'
import LotsBlock from '../components/LotsBlock'
import { FC } from 'react'

export const Home: FC = () => {
  return (
    <main className="w-full h-auto flex flex-col gap-8">
      <SearchBlock />
      <SliderAds />
      <LotsBlock />
      <FeedBack />
    </main>
  )
}
