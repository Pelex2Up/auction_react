import { FC } from 'react'
import { CheckSuccessSVG } from './config/checkSuccess'

export const TarriffPlanCard: FC = () => {
  return (
    <div className="lg:w-[933px] lg:h-[261px] h-full w-full lg:justify-start lg:items-start lg:flex-row justify-center items-center gap-[54px] flex flex-col lg:inline-flex">
      <div className="w-[275px] pb-8 bg-white rounded-lg shadow flex-col justify-center items-center gap-8 inline-flex">
        <div className="self-stretch h-[21px] bg-gray-100 rounded-tl-lg rounded-tr-lg" />
        <div className="self-stretch h-44 px-8 flex-col justify-start items-center gap-[118px] flex">
          <div className="self-stretch h-44 flex-col justify-center items-start gap-8 flex">
            <div className="self-stretch h-16 flex-col justify-center items-center gap-4 flex">
              <div className="self-stretch text-zinc-900 text-base font-semibold font-['SF Pro Display']">РАЗОВЫЙ</div>
              <div className="self-stretch justify-start items-center inline-flex">
                <div className="text-zinc-900 text-2xl font-semibold font-['SF Pro Text']">15 BYN</div>
              </div>
            </div>
            <div className="w-[211px] h-20 flex-col justify-start items-start gap-3 flex">
              <div className="self-stretch justify-start items-center gap-2 inline-flex">
                <CheckSuccessSVG />
                <div className="grow shrink basis-0 text-zinc-900 text-base font-normal font-['SF Pro Text'] leading-snug">1 объявление</div>
              </div>
              <div className="self-stretch justify-start items-center gap-2 inline-flex">
                <CheckSuccessSVG />
                <div className="grow shrink basis-0 text-zinc-900 text-base font-normal font-['SF Pro Text'] leading-snug">Разовая подача</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-[275px] pb-8 bg-white rounded-lg shadow flex-col justify-center items-center gap-8 inline-flex">
        <div className="self-stretch h-[21px] bg-yellow-100 rounded-tl-lg rounded-tr-lg" />
        <div className="self-stretch h-44 px-8 flex-col justify-start items-center gap-[68px] flex">
          <div className="self-stretch h-44 flex-col justify-center items-start gap-8 flex">
            <div className="self-stretch h-16 flex-col justify-center items-center gap-4 flex">
              <div className="self-stretch text-zinc-900 text-base font-semibold font-['SF Pro Text']">СТАНДАРТНЫЙ</div>
              <div className="self-stretch justify-start items-center inline-flex">
                <div className="text-zinc-900 text-2xl font-semibold font-['SF Pro Text']">30 BYN</div>
              </div>
            </div>
            <div className="self-stretch h-20 flex-col justify-start items-start gap-3 flex">
              <div className="self-stretch justify-start items-center gap-2 inline-flex">
                <CheckSuccessSVG />
                <div className="grow shrink basis-0 text-zinc-900 text-base font-normal font-['SF Pro Text'] leading-snug">3 объявления</div>
              </div>
              <div className="self-stretch justify-start items-center gap-2 inline-flex">
                <CheckSuccessSVG />
                <div className="grow shrink basis-0 text-zinc-900 text-base font-normal font-['SF Pro Text'] leading-snug">
                  Период дейcтвия <br />1 месяц
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-[275px] pb-8 bg-white rounded-lg shadow flex-col justify-center items-center gap-8 inline-flex">
        <div className="self-stretch h-[21px] bg-green-200 rounded-tl-lg rounded-tr-lg" />
        <div className="self-stretch h-44 px-8 flex-col justify-start items-center gap-8 flex">
          <div className="self-stretch h-44 flex-col justify-center items-start gap-8 flex">
            <div className="self-stretch h-16 flex-col justify-center items-center gap-4 flex">
              <div className="self-stretch text-zinc-900 text-base font-semibold font-['SF Pro Text']">ПРЕМИУМ</div>
              <div className="self-stretch justify-start items-center inline-flex">
                <div className="text-zinc-900 text-2xl font-semibold font-['SF Pro Text']">50 BYN</div>
              </div>
            </div>
            <div className="self-stretch h-20 flex-col justify-start items-start gap-3 flex">
              <div className="self-stretch justify-start items-center gap-2 inline-flex">
                <CheckSuccessSVG />
                <div className="grow shrink basis-0 text-zinc-900 text-base font-normal font-['SF Pro Text'] leading-snug">5 объявлений</div>
              </div>
              <div className="self-stretch justify-start items-center gap-2 inline-flex">
                <CheckSuccessSVG />
                <div className="grow shrink basis-0 text-zinc-900 text-base font-normal font-['SF Pro Text'] leading-snug">
                  Период дейcтвия <br />1 месяц
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
