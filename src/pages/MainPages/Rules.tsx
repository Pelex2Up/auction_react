import { FC } from 'react'
import image1 from './config/rulesImage1.png'
import image2 from './config/rulesImage2.png'
import FeedBack from '../../components/feedBack'

export const UsageRules: FC = () => {
  return (
    <div className='flex flex-col w-full'>
      <div className="w-full lg:px-[60px] px-4 pb-[80px] flex flex-col gap-6">
        <h1 className="text-zinc-900 text-2xl font-medium font-['SF Pro Text'] leading-[28.80px]">Правила участия</h1>
        <div className="flex flex-col-reverse lg:flex-row w-full gap-6">
          <div className="w-full lg:w-[48%] flex flex-col gap-4">
            <div className="w-full text-zinc-500 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">
              Предлагаю широкий выбор проводов высокого качества для различных целей. Независимо от того, нужны Предлагаю широкий выбор проводов высокого
              качества для различных целей. Независимо от того, нужны Предлагаю широкий выбор проводов высокого качества для различных Предлагаю широкий выбор
              проводов высокого качества для различных целей. Независимо от того, н
            </div>
            <div className="w-full text-zinc-500 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">
              Предлагаю широкий выбор проводов высокого качества для различных целей. Независимо от того, нужны Предлагаю широкий выбор проводов высокого
              качества для различных целей. Независимо от того, нужны Предлагаю широкий выбор проводов высокого качества для различных Предлагаю широкий выбор
              проводов высокого качества для различных целей. Независимо от того, н
            </div>
            <div className="w-full text-zinc-500 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">
              Предлагаю широкий выбор проводов высокого качества для различных целей. Независимо от того, нужны Предлагаю широкий выбор проводов высокого
              качества для различных целей. Независимо от того, нужны Предлагаю широкий выбор проводов высокого качества для различных Предлагаю широкий выбор
              проводов высокого качества для различных целей. Независимо от того, н
            </div>
          </div>
          <img src={image1} alt="rules-1" className="w-full lg:w-[48%]" />
        </div>
        <div className="flex flex-col lg:flex-row w-full gap-6">
          <img src={image2} alt="rules-1" className="w-full lg:w-[48%]" />
          <div className="w-full lg:w-[48%] flex flex-col gap-4">
            <div className="w-full text-zinc-500 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">
              Предлагаю широкий выбор проводов высокого качества для различных целей. Независимо от того, нужны Предлагаю широкий выбор проводов высокого
              качества для различных целей. Независимо от того, нужны Предлагаю широкий выбор проводов высокого качества для различных Предлагаю широкий выбор
              проводов высокого качества для различных целей. Независимо от того, н
            </div>
            <div className="w-full text-zinc-500 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">
              Предлагаю широкий выбор проводов высокого качества для различных целей. Независимо от того, нужны Предлагаю широкий выбор проводов высокого
              качества для различных целей. Независимо от того, нужны Предлагаю широкий выбор проводов высокого качества для различных Предлагаю широкий выбор
              проводов высокого качества для различных целей. Независимо от того, н
            </div>
            <div className="w-full text-zinc-500 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">
              Предлагаю широкий выбор проводов высокого качества для различных целей. Независимо от того, нужны Предлагаю широкий выбор проводов высокого
              качества для различных целей. Независимо от того, нужны Предлагаю широкий выбор проводов высокого качества для различных Предлагаю широкий выбор
              проводов высокого качества для различных целей. Независимо от того, н
            </div>
          </div>
        </div>
      </div>
      <FeedBack />
    </div>
  )
}
