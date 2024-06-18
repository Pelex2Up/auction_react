import { FC, useState } from 'react'
import { LotT } from '../../types/lotTypes'
import { PathE } from '../../enum'
import { LotPhotoSlider } from '../../components/LotPhotoSlider'
import { padWithZeros } from '../../utils/articleNumberConverter'
import { Button } from '../../components/common/buttons'
import { ShopperSVG } from '../../assets/svg/shopperSVG'
import { PlusIconSVG } from '../../assets/svg/plusIconSVG'
import { MinusIconSVG } from '../../assets/svg/minusIconSVG'
import { ICategory } from '../../types/commonTypes'

export type ContentWrapperType = {
  className?: string
  lotData: LotT
  category: ICategory
  subCategory: ICategory | undefined
  lowerCat: ICategory | undefined
}

const LotDetail: FC<ContentWrapperType> = ({ className = '', lotData, category, subCategory, lowerCat }) => {
  const [count, setCount] = useState<number>(1)

  return (
    <div
      className={`w-[75.375rem] flex flex-col lg:flex-row items-start justify-start gap-4 lg:gap-[8.5rem] max-w-full text-left text-[0.875rem] text-main-black font-text-2 mq825:gap-[2.125rem] mq450:gap-[1.063rem] mq1125:flex-wrap mq1400:gap-[4.25rem] ${className}`}
    >
      <div className="flex-1 flex flex-col items-start justify-start gap-[2rem] max-w-full mq825:gap-[1rem] mq825:min-w-full">
        <div className="w-[34.063rem] flex flex-row items-start justify-start gap-[0.75rem] max-w-full mq825:flex-wrap">
          <a className="relative tracking-[0.04em] leading-[1.063rem] inline-block" href={PathE.Home}>
            Главная
          </a>
          <span className="relative tracking-[0.04em] leading-[1.063rem] inline-block mq825:w-full mq825:h-[0.313rem]">/</span>
          <a href="#" className={`${!subCategory && 'text-green-600'} relative tracking-[0.04em] leading-[1.063rem] inline-block`}>
            {category.title}
          </a>
          {subCategory && (
            <>
              <span className="relative tracking-[0.04em] leading-[1.063rem] inline-block mq825:w-full mq825:h-[0.313rem]">/</span>
              <a href="#" className={`${!lowerCat && 'text-green-600'} relative tracking-[0.04em] leading-[1.063rem] inline-block`}>
                {subCategory.title}
              </a>
            </>
          )}
          {lowerCat && (
            <>
              <span className="relative tracking-[0.04em] leading-[1.063rem] inline-block mq825:w-full mq825:h-[0.313rem]">/</span>
              <a href="#" className="text-green-600 relative tracking-[0.04em] leading-[1.063rem] inline-block">
                {lowerCat.title}
              </a>
            </>
          )}
        </div>
        <div className="self-stretch max-w-[648px] h-[360px] lg:h-[468px] flex flex-col items-start justify-start gap-[1rem]">
          <div className="self-stretch h-full flex flex-col items-start justify-start relative">
            <LotPhotoSlider images={lotData.photos} />
            <button className="cursor-pointer [border:none] p-[0.5rem] bg-white w-max min-w-[6.925rem] !m-[0] absolute top-[2rem] left-[0rem] rounded-tl-none rounded-tr rounded-br rounded-bl-none overflow-hidden flex flex-row items-start justify-start box-border whitespace-nowrap text-green-600 z-50">
              <div className="relative text-[0.75rem] tracking-[0.01em] leading-[120%] font-text-2 text-green text-left">
                {lotData.is_auction ? 'Аукцион' : 'Фиксированная цена'}
              </div>
            </button>
          </div>
        </div>
      </div>
      <div className="xl:w-[26.375rem] flex flex-col items-start justify-start lg:pt-[3.062rem] px-[0rem] pb-[0rem] box-border xl:min-w-[26.375rem] max-w-full text-[1.5rem] text-green mq825:min-w-full mq450:pt-[2rem] mq450:box-border mq1125:flex-1">
        <div className="self-stretch flex flex-col items-start justify-start gap-4 lg:gap-[2rem] max-w-full mq450:gap-[1rem]">
          <div className="w-[24.5rem] flex flex-col items-start justify-start gap-[0.375rem] max-w-full">
            <h2 className="m-0 self-stretch relative text-green-600 tracking-[0.01em] leading-[1.813rem] font-normal font-inherit mq450:text-[1.188rem] mq450:leading-[1.438rem]">
              {lotData.title}
            </h2>
            <div className="flex flex-row items-start justify-start gap-[0.375rem] text-[0.875rem] text-dark-grey">
              <div className="relative tracking-[0.01em] leading-[1.063rem] inline-block">Код товара</div>
              <div className="relative tracking-[0.01em] leading-[1.063rem] inline-block">№{padWithZeros(String(lotData.id))}</div>
            </div>
          </div>
          <div className="self-stretch bg-stone-50 flex flex-col items-start justify-start py-[1.5rem] px-[2rem] relative gap-[1.5rem] text-[0.875rem] text-dark-grey">
            <div className="w-full h-full absolute !m-[0] top-[0rem] right-[0rem] bottom-[0rem] left-[0rem] shadow-[0px_2px_1px_rgba(23,_23,_23,_0.04),_0px_8px_16px_rgba(23,_23,_23,_0.12)] rounded bg-whitesmoke-100" />
            <div className="self-stretch flex flex-row items-start justify-between gap-[1.25rem]">
              <div className="w-[15.375rem] flex flex-col items-start justify-start gap-[1.125rem]">
                <div className="w-[10.938rem] flex flex-col items-start justify-start gap-[0.125rem] z-[1]">
                  <div className="w-[7.438rem] relative tracking-[0.01em] leading-[1.063rem] inline-block">
                    Цена за {lotData.unit === 'PIECE' ? 'единицу' : lotData.unit === 'KG' ? 'кг' : 'тонну'}
                  </div>
                  <b className="self-stretch relative text-[2rem] tracking-[0.01em] leading-[120%] text-green-600 mq825:text-[1.625rem] mq825:leading-[1.938rem] mq450:text-[1.188rem] mq450:leading-[1.438rem]">
                    {lotData.price.split('.')[0]} BYN
                  </b>
                  <div className="relative text-[1.375rem] [text-decoration:line-through] tracking-[0.01em] leading-[120%] inline-block min-w-[7.188rem] text-zinc-500 mq450:text-[1.125rem] mq450:leading-[1.313rem]">
                    3 500 BYN
                  </div>
                </div>
                {lotData.count && (
                  <div className="self-stretch flex flex-col items-start justify-start gap-[0.75rem]">
                    <div className="relative text-zinc-500 tracking-[0.01em] leading-[1.063rem] inline-block min-w-[5.125rem] z-[1]">Количество</div>
                    <div className="self-stretch flex flex-col items-start justify-start gap-[0.5rem] text-[1.125rem] text-main-black">
                      <div className="self-stretch flex flex-row items-start justify-start gap-[0.5rem] z-[1]">
                        <div className="flex-1 flex flex-row items-start justify-between rounded-lg border-[1px] border-solid border-grey box-border py-[0rem] pr-[0.062rem] pl-[0rem] relative gap-[1.25rem]">
                          <button
                            onClick={() => count > 1 && setCount(count - 1)}
                            className="h-[2.5rem] w-[2.5rem] flex items-center justify-center rounded-lg bg-white relative cursor-pointer"
                          >
                            <MinusIconSVG />
                          </button>
                          <div className="flex flex-col items-start justify-start pt-[0.625rem] px-[0rem] pb-[0rem]">
                            <div className="relative tracking-[0.01em] leading-[1.375rem] font-medium inline-block min-w-[0.75rem] z-[3]">{count}</div>
                          </div>
                          <button
                            onClick={() => lotData.count && count < lotData.count && setCount(count + 1)}
                            className="h-[2.5rem] w-[2.5rem] flex items-center justify-center rounded-lg bg-white relative cursor-pointer"
                          >
                            <PlusIconSVG />
                          </button>
                        </div>
                        <div className="flex flex-col items-start justify-start pt-[0.718rem] px-[0rem] pb-[0rem] text-[0.875rem] text-dark-grey">
                          <div className="relative text-zinc-500 tracking-[0.01em] leading-[1.063rem] inline-block min-w-[4.25rem]">
                            из {lotData.count} штук
                          </div>
                        </div>
                      </div>

                      <div className="w-[7.313rem] text-zinc-500 relative text-[0.875rem] tracking-[0.01em] leading-[1.063rem] text-dark-grey inline-block z-[1]">
                        Подано 2 заявки
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <button className="h-[1.5rem] w-[1.5rem] relative overflow-hidden shrink-0 z-[1]">
                <ShopperSVG />
              </button>
            </div>
            <div className="self-stretch w-full flex flex-row items-start justify-start gap-[1.125rem] z-[1] mq450:flex-wrap">
              <a href={`mailto:${lotData.profile.email}?subject=Вопрос`} type="email" className="w-full">
                <Button variant="secondary" className="w-full" text="Написать продавцу" />
              </a>
              <Button variant="primary" className="w-full" text="Купить" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LotDetail
