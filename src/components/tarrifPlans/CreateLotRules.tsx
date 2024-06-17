import { FC } from 'react'
import { BookWithPencilSVG } from './config/book'
import { ArcArrowSVG } from './config/arrow'
import { SearchListSVG } from './config/searchList'
import { ArcArrowBottomSVG } from './config/arrowBot'
import { CashoutSVG } from './config/cashout'
import { AdminSuccessSVG } from './config/success'

export const CreateLotRules: FC = () => {
  return (
    <div className="w-full lg:h-[180px] h-full flex items-center flex-col mb-10 lg:inline-flex lg:flex-row justify-center gap-0">
      <div className="h-full lg:w-auto w-full flex flex-col gap-2 justify-start items-center">
        <BookWithPencilSVG />
        <div className="w-[200px] lg:w-[252px] h-[100px] flex-col justify-start items-center gap-2 inline-flex">
          <div className="w-full text-center">
            <span className="text-green-800 text-base font-medium">Правила участия</span>
          </div>
          <div className="w-full text-center text-stone-700 text-sm font-normal leading-tight">Ознакомиться с правилами участия</div>
        </div>
      </div>
      <div className="w-[130%] h-full lg:block flex justify-end items-end">
        <div className="lg:ml-[-40px] lg:rotate-0 rotate-90">
          <ArcArrowSVG />
        </div>
      </div>
      <div className="flex flex-col gap-2 justify-start items-center lg:ml-[-40px]">
        <SearchListSVG />
        <div className="w-[200px] lg:w-[252px]  h-[100px] flex-col justify-start items-center gap-2 inline-flex">
          <div className="w-full text-center text-green-800 text-base font-medium font-['SF Pro Text']">Выбрать тариф и подать объявление</div>
          <div className="w-full text-center text-stone-700 text-sm font-normal leading-tight">При подаче объявления выбрать подходящий тариф</div>
        </div>
      </div>
      <div className="w-[130%] h-full lg:block flex justify-start items-end">
        <div className="lg:ml-[-40px] h-[80%] lg:rotate-0 rotate-90 flex items-center">
          <ArcArrowBottomSVG />
        </div>
      </div>
      <div className="h-full flex flex-col gap-2 justify-start items-center lg:ml-[-40px]">
        <CashoutSVG />
        <div className="w-[200px] lg:w-[252px] h-[100px] flex-col justify-start items-center gap-2 inline-flex">
          <div className="text-center">
            <span className="text-green-800 text-base font-medium">Оплатить</span>
          </div>
          <div className="w-full text-center text-stone-700 text-sm font-normal leading-tight">
            После подачи объявления необходимо произвести оплату согласно выбранному тарифу
          </div>
        </div>
      </div>
      <div className="w-[130%] h-full lg:block flex justify-end items-end">
        <div className="lg:ml-[-40px] lg:rotate-0 rotate-90">
          <ArcArrowSVG />
        </div>
      </div>
      <div className="h-full flex flex-col gap-2 justify-start items-center lg:ml-[-40px]">
        <AdminSuccessSVG />
        <div className="w-[200px] lg:w-[252px]  h-[100px] flex-col justify-start items-center gap-2 inline-flex">
          <div className="text-center">
            <span className="text-green-800 text-base font-medium">Подтверждение модератора</span>
          </div>
          <div className="w-full text-center text-stone-700 text-sm font-normal leading-tight">
            После проверки оплаты модератором ваше объявление будет опубликовано на сайте
          </div>
        </div>
      </div>
    </div>
  )
}
