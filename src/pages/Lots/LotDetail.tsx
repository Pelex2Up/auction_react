import { FC } from 'react'

export type ContentWrapperType = {
  className?: string
}

const LotDetail: FC<ContentWrapperType> = ({ className = '' }) => {
  return (
    <div
      className={`w-[75.375rem] flex flex-row items-start justify-start gap-[8.5rem] max-w-full text-left text-[0.875rem] text-main-black font-text-2 mq825:gap-[2.125rem] mq450:gap-[1.063rem] mq1125:flex-wrap mq1400:gap-[4.25rem] ${className}`}
    >
      <div className="flex-1 flex flex-col items-start justify-start gap-[2rem] max-w-full mq825:gap-[1rem] mq825:min-w-full">
        <div className="w-[34.063rem] flex flex-row items-start justify-start gap-[0.75rem] max-w-full mq825:flex-wrap">
          <div className="relative tracking-[0.04em] leading-[1.063rem] inline-block min-w-[3.625rem]">Главная</div>
          <div className="relative tracking-[0.04em] leading-[1.063rem] inline-block min-w-[0.313rem] mq825:w-full mq825:h-[0.313rem]">/</div>
          <div className="w-[6.75rem] relative tracking-[0.04em] leading-[1.063rem] inline-block">Оборудование</div>
          <div className="relative tracking-[0.04em] leading-[1.063rem] inline-block min-w-[0.313rem] mq825:w-full mq825:h-[0.313rem]">/</div>
          <div className="relative tracking-[0.04em] leading-[1.063rem] inline-block min-w-[3.25rem]">Станки</div>
          <div className="relative tracking-[0.04em] leading-[1.063rem] inline-block min-w-[0.313rem] mq825:w-full mq825:h-[0.313rem]">/</div>
          <div className="flex-1 relative tracking-[0.04em] leading-[1.063rem] text-green inline-block min-w-[9.75rem]">Деревооброботывающий станок</div>
        </div>
        <div className="self-stretch flex flex-col items-start justify-start gap-[1rem]">
          <div className="self-stretch h-[22.25rem] flex flex-col items-start justify-start relative">
            <div className="w-[2.5rem] h-[2.5rem] absolute !m-[0] top-[9.563rem] right-[9rem] flex items-center justify-center z-[0]">
              <img className="w-full h-full object-contain absolute left-[0rem] top-[0.5rem] [transform:scale(1.8)]" loading="lazy" alt="" src="/icon.svg" />
            </div>
            <img className="w-[2.5rem] h-[2.5rem] absolute !m-[0] top-[9.563rem] left-[1.625rem] object-contain" loading="lazy" alt="" src="/icon-1.svg" />
            <button className="cursor-pointer [border:none] p-[0.5rem] bg-main-whte w-[8.938rem] !m-[0] absolute top-[2rem] left-[0rem] rounded-tl-none rounded-tr rounded-br rounded-bl-none overflow-hidden flex flex-row items-start justify-start box-border whitespace-nowrap hover:bg-gainsboro">
              <div className="flex-1 relative text-[0.75rem] tracking-[0.01em] leading-[120%] font-text-2 text-green text-left">Фиксированная цена</div>
            </button>
            <div className="self-stretch flex-1 flex flex-row items-start justify-start py-[2rem] px-[0rem] relative z-[1]">
              <img
                className="h-full w-full absolute !m-[0] top-[0rem] right-[0rem] bottom-[0rem] left-[0rem] rounded max-w-full overflow-hidden max-h-full object-cover"
                alt=""
                src="/product-preview-background@2x.png"
              />
              <button className="cursor-pointer [border:none] p-[0.5rem] bg-main-whte w-[8.938rem] rounded-tl-none rounded-tr rounded-br rounded-bl-none overflow-hidden shrink-0 flex flex-row items-start justify-start box-border whitespace-nowrap z-[1] hover:bg-gainsboro">
                <div className="flex-1 relative text-[0.75rem] tracking-[0.01em] leading-[120%] font-text-2 text-green text-left">Фиксированная цена</div>
              </button>
            </div>
          </div>
          <div className="self-stretch flex flex-row items-start justify-center gap-[1rem] mq825:flex-wrap">
            <img
              className="self-stretch flex-1 relative rounded max-w-[9.375rem] overflow-hidden max-h-full object-cover min-w-[8.625rem] min-h-[5.75rem]"
              loading="lazy"
              alt=""
              src="/rectangle-4050@2x.png"
            />
            <img
              className="self-stretch flex-1 relative rounded max-w-[9.375rem] overflow-hidden max-h-full object-cover min-w-[8.625rem] min-h-[5.75rem]"
              loading="lazy"
              alt=""
              src="/rectangle-4054@2x.png"
            />
            <img
              className="self-stretch flex-1 relative rounded max-w-[9.375rem] overflow-hidden max-h-full object-cover min-w-[8.625rem] min-h-[5.75rem]"
              loading="lazy"
              alt=""
              src="/rectangle-4055@2x.png"
            />
            <img
              className="self-stretch flex-1 relative rounded max-w-[9.375rem] overflow-hidden max-h-full object-cover min-w-[8.625rem] min-h-[5.75rem]"
              loading="lazy"
              alt=""
              src="/rectangle-4056@2x.png"
            />
          </div>
        </div>
      </div>
      <div className="w-[26.375rem] flex flex-col items-start justify-start pt-[3.062rem] px-[0rem] pb-[0rem] box-border min-w-[26.375rem] max-w-full text-[1.5rem] text-green mq825:min-w-full mq450:pt-[2rem] mq450:box-border mq1125:flex-1">
        <div className="self-stretch flex flex-col items-start justify-start gap-[2rem] max-w-full mq450:gap-[1rem]">
          <div className="w-[24.5rem] flex flex-col items-start justify-start gap-[0.375rem] max-w-full">
            <h2 className="m-0 self-stretch relative text-inherit tracking-[0.01em] leading-[1.813rem] font-normal font-inherit mq450:text-[1.188rem] mq450:leading-[1.438rem]">
              Деревооброботывающий станок
            </h2>
            <div className="flex flex-row items-start justify-start gap-[0.375rem] text-[0.875rem] text-dark-grey">
              <div className="relative tracking-[0.01em] leading-[1.063rem] inline-block min-w-[4.938rem]">Код товара</div>
              <div className="relative tracking-[0.01em] leading-[1.063rem] inline-block min-w-[4.188rem]">№000123</div>
            </div>
          </div>
          <div className="self-stretch flex flex-col items-start justify-start py-[1.5rem] px-[2rem] relative gap-[1.5rem] text-[0.875rem] text-dark-grey">
            <div className="w-full h-full absolute !m-[0] top-[0rem] right-[0rem] bottom-[0rem] left-[0rem] shadow-[0px_2px_1px_rgba(23,_23,_23,_0.04),_0px_8px_16px_rgba(23,_23,_23,_0.12)] rounded bg-whitesmoke-100" />
            <div className="self-stretch flex flex-row items-start justify-between gap-[1.25rem]">
              <div className="w-[15.375rem] flex flex-col items-start justify-start gap-[1.125rem]">
                <div className="w-[10.938rem] flex flex-col items-start justify-start gap-[0.125rem] z-[1]">
                  <div className="w-[7.438rem] relative tracking-[0.01em] leading-[1.063rem] inline-block">Цена за еденицу</div>
                  <b className="self-stretch relative text-[2rem] tracking-[0.01em] leading-[120%] text-green text-right mq825:text-[1.625rem] mq825:leading-[1.938rem] mq450:text-[1.188rem] mq450:leading-[1.438rem]">
                    2 000 BYN
                  </b>
                  <div className="relative text-[1.375rem] [text-decoration:line-through] tracking-[0.01em] leading-[120%] inline-block min-w-[7.188rem] mq450:text-[1.125rem] mq450:leading-[1.313rem]">
                    3 500 BYN
                  </div>
                </div>
                <div className="self-stretch flex flex-col items-start justify-start gap-[0.75rem]">
                  <div className="relative tracking-[0.01em] leading-[1.063rem] inline-block min-w-[5.125rem] z-[1]">Количество</div>
                  <div className="self-stretch flex flex-col items-start justify-start gap-[0.5rem] text-[1.125rem] text-main-black">
                    <div className="self-stretch flex flex-row items-start justify-start gap-[0.5rem] z-[1]">
                      <div className="flex-1 flex flex-row items-start justify-between py-[0rem] pr-[0.062rem] pl-[0rem] relative gap-[1.25rem]">
                        <div className="h-[2.5rem] w-[2.5rem] relative">
                          <div className="absolute top-[0rem] left-[0rem] rounded-lg bg-main-whte w-full h-full" />
                          <input className="m-0 absolute top-[0.5rem] left-[0.5rem] w-[1.5rem] h-[1.5rem] overflow-hidden z-[1]" type="checkbox" />
                        </div>
                        <div className="flex flex-col items-start justify-start pt-[0.625rem] px-[0rem] pb-[0rem]">
                          <div className="relative tracking-[0.01em] leading-[1.375rem] font-medium inline-block min-w-[0.75rem] z-[3]">2</div>
                        </div>
                        <div className="h-full w-full absolute !m-[0] top-[0rem] right-[0rem] bottom-[0rem] left-[0rem] rounded-lg box-border z-[2] border-[1px] border-solid border-grey" />
                        <div className="h-[2.5rem] w-[2.5rem] relative">
                          <div className="absolute top-[0rem] left-[0rem] rounded-lg bg-main-whte w-full h-full" />
                          <img className="absolute top-[0.5rem] left-[0.5rem] w-[1.5rem] h-[1.5rem] overflow-hidden z-[1]" alt="" src="/iconplus-1.svg" />
                        </div>
                      </div>
                      <div className="flex flex-col items-start justify-start pt-[0.718rem] px-[0rem] pb-[0rem] text-[0.875rem] text-dark-grey">
                        <div className="relative tracking-[0.01em] leading-[1.063rem] inline-block min-w-[4.25rem]">из 8 штук</div>
                      </div>
                    </div>
                    <div className="w-[7.313rem] relative text-[0.875rem] tracking-[0.01em] leading-[1.063rem] text-dark-grey inline-block z-[1]">
                      Подано 2 заявки
                    </div>
                  </div>
                </div>
              </div>
              <img className="h-[1.5rem] w-[1.5rem] relative overflow-hidden shrink-0 z-[1]" alt="" src="/iconcart2-1.svg" />
            </div>
            <div className="self-stretch flex flex-row items-start justify-start gap-[1.125rem] z-[1] mq450:flex-wrap">
              <button className="cursor-pointer py-[0.625rem] px-[0.937rem] bg-main-whte flex-1 rounded box-border overflow-hidden flex flex-row items-start justify-start min-w-[6.875rem] whitespace-nowrap border-[1px] border-solid border-green hover:bg-gainsboro hover:box-border hover:border-[1px] hover:border-solid hover:border-forestgreen">
                <div className="flex-1 relative text-[0.875rem] tracking-[0.01em] leading-[1.063rem] font-text-2 text-green text-left">Написать продавцу</div>
              </button>
              <button className="cursor-pointer [border:none] py-[0.718rem] px-[3.75rem] bg-green rounded overflow-hidden flex flex-row items-start justify-start hover:bg-forestgreen">
                <div className="relative text-[0.875rem] tracking-[0.01em] leading-[1.063rem] font-text-2 text-main-whte text-left inline-block min-w-[3.063rem]">
                  Купить
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LotDetail
