import { FC } from 'react'
import { CreateLotRules } from '../../components/tarrifPlans/CreateLotRules'
import { TarriffPlanCard } from '../../components/tarrifPlans/TarriffPlanCard'
import FeedBack from '../../components/feedBack'

export const TarriffPlans: FC = () => {
  return (
    <div className='w-full flex flex-col gap-[30px]'>
      <div className="w-full lg:px-[60px] px-4 flex flex-col gap-16">
        <h1 className="text-zinc-900 text-2xl font-medium font-['SF Pro Text'] leading-[28.80px]">Тарифы</h1>
        <div className="w-full flex justify-center">
          <TarriffPlanCard />
        </div>
        <h2 className="text-zinc-900 text-2xl font-medium font-['SF Pro Text'] leading-[28.80px]">Процесс подачи объявления</h2>
        <CreateLotRules />
      </div>
      <FeedBack />
    </div>
  )
}
