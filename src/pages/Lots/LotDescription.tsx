import { FunctionComponent } from 'react'
import { ArrowDown } from '../../assets/svg/arrowDown'

export type FrameComponent4Type = {
  className?: string
}

const LotDescription: FunctionComponent<FrameComponent4Type> = ({ className = '' }) => {
  return (
    <section
      className={`self-stretch flex flex-row items-start justify-end pt-[0rem] pb-[1.5rem] box-border max-w-full text-left text-[1.125rem] text-main-black font-text-2 mq825:pl-[1.938rem] mq825:pr-[1.875rem] mq825:box-border ${className}`}
    >
      <div className="flex-1 flex flex-col items-start justify-start pt-[2.5rem] px-[1.5rem] pb-[4.187rem] box-border relative gap-[2rem] max-w-full mq825:gap-[1rem] mq825:pt-[1.625rem] mq825:pb-[2.75rem] mq825:box-border">
        <div className="w-full h-full absolute !m-[0] top-[0rem] right-[0rem] bottom-[0rem] left-[0rem] shadow-[0px_2px_1px_rgba(23,_23,_23,_0.04),_0px_8px_16px_rgba(23,_23,_23,_0.12)] rounded bg-whitesmoke-100" />
        <div className="w-[73.438rem] flex flex-col items-start justify-start gap-[0.5rem] max-w-full z-[1]">
          <div className="w-[5.75rem] relative tracking-[0.01em] leading-[1.375rem] font-medium inline-block">Описание</div>
          <div className="self-stretch h-[4.75rem] relative text-[1rem] tracking-[0.01em] leading-[120%] text-dark-grey inline-block">{`Деревообрабатывающий комбинированный станок КСМ-1 б/у предназначен для выполнения различных операций по обработке заготовок из древесины:продольного строгания;продольного и поперечного пиления;Применяется в деревообрабатывающих цехах, столярных мастерских, на строительных и ремонтных площадках. Станок обеспечивает высокую производительность и качество обрабатываемых деталей. Технологические ... `}</div>
          <div className="w-[10.375rem] flex flex-row items-start justify-start gap-[0.75rem] text-[0.875rem] text-green">
            <div className="flex-1 relative tracking-[0.01em] leading-[1.063rem]">Раскрыть описание</div>
            <ArrowDown />
          </div>
        </div>
        <div className="w-[28rem] h-[1.438rem] relative hidden max-w-full z-[2]" />
        <div className="w-[28.313rem] flex flex-col items-start justify-start pt-[0rem] px-[0rem] pb-[0.5rem] box-border gap-[0.5rem] max-w-full z-[2]">
          <div className="w-[9.438rem] relative tracking-[0.01em] leading-[1.375rem] font-medium inline-block">Характеристики</div>
          <div className="self-stretch flex flex-col items-start justify-start gap-[0.75rem] max-w-full text-[1rem] text-dark-grey">
            <div className="self-stretch flex flex-col items-start justify-start gap-[0.5rem]">
              <div className="w-[19.188rem] flex flex-row items-start justify-start pt-[0.25rem] px-[0rem] pb-[0rem] box-border gap-[0.5rem]">
                <div className="flex-1 relative tracking-[0.01em] leading-[120%]">Тип оборудования</div>
                <div className="flex flex-col items-start justify-start pt-[0.812rem] px-[0rem] pb-[0rem]">
                  <div className="flex flex-row items-start justify-start gap-[0.125rem]">
                    <div className="h-[0.125rem] w-[0.125rem] relative rounded-[50%] bg-grey" />
                    <div className="h-[0.125rem] w-[0.125rem] relative rounded-[50%] bg-grey" />
                    <div className="h-[0.125rem] w-[0.125rem] relative rounded-[50%] bg-grey" />
                    <div className="h-[0.125rem] w-[0.125rem] relative rounded-[50%] bg-grey" />
                    <div className="h-[0.125rem] w-[0.125rem] relative rounded-[50%] bg-grey" />
                    <div className="h-[0.125rem] w-[0.125rem] relative rounded-[50%] bg-grey" />
                    <div className="h-[0.125rem] w-[0.125rem] relative rounded-[50%] bg-grey" />
                    <div className="h-[0.125rem] w-[0.125rem] relative rounded-[50%] bg-grey" />
                    <div className="h-[0.125rem] w-[0.125rem] relative rounded-[50%] bg-grey" />
                    <div className="h-[0.125rem] w-[0.125rem] relative rounded-[50%] bg-grey" />
                    <div className="h-[0.125rem] w-[0.125rem] relative rounded-[50%] bg-grey" />
                    <div className="h-[0.125rem] w-[0.125rem] relative rounded-[50%] bg-grey" />
                    <div className="h-[0.125rem] w-[0.125rem] relative rounded-[50%] bg-grey" />
                    <div className="h-[0.125rem] w-[0.125rem] relative rounded-[50%] bg-grey" />
                    <div className="h-[0.125rem] w-[0.125rem] relative rounded-[50%] bg-grey" />
                    <div className="h-[0.125rem] w-[0.125rem] relative rounded-[50%] bg-grey" />
                    <div className="h-[0.125rem] w-[0.125rem] relative rounded-[50%] bg-grey" />
                    <div className="h-[0.125rem] w-[0.125rem] relative rounded-[50%] bg-grey" />
                    <div className="h-[0.125rem] w-[0.125rem] relative rounded-[50%] bg-grey" />
                    <div className="h-[0.125rem] w-[0.125rem] relative rounded-[50%] bg-grey" />
                    <div className="h-[0.125rem] w-[0.125rem] relative rounded-[50%] bg-grey" />
                    <div className="h-[0.125rem] w-[0.125rem] relative rounded-[50%] bg-grey" />
                  </div>
                </div>
                <div className="relative tracking-[0.01em] leading-[120%] inline-block min-w-[3.563rem]">Станки</div>
              </div>
              <div className="self-stretch flex flex-row flex-wrap items-start justify-start pt-[0.25rem] px-[0rem] pb-[0rem] gap-[0.5rem]">
                <div className="relative tracking-[0.01em] leading-[120%] inline-block min-w-[5.563rem]">Вид станка</div>
                <div className="flex flex-col items-start justify-start pt-[0.812rem] px-[0rem] pb-[0rem]">
                  <div className="flex flex-row items-start justify-start gap-[0.125rem]">
                    <div className="h-[0.125rem] w-[0.125rem] relative rounded-[50%] bg-grey" />
                    <div className="h-[0.125rem] w-[0.125rem] relative rounded-[50%] bg-grey" />
                    <div className="h-[0.125rem] w-[0.125rem] relative rounded-[50%] bg-grey" />
                    <div className="h-[0.125rem] w-[0.125rem] relative rounded-[50%] bg-grey" />
                    <div className="h-[0.125rem] w-[0.125rem] relative rounded-[50%] bg-grey" />
                    <div className="h-[0.125rem] w-[0.125rem] relative rounded-[50%] bg-grey" />
                    <div className="h-[0.125rem] w-[0.125rem] relative rounded-[50%] bg-grey" />
                    <div className="h-[0.125rem] w-[0.125rem] relative rounded-[50%] bg-grey" />
                    <div className="h-[0.125rem] w-[0.125rem] relative rounded-[50%] bg-grey" />
                    <div className="h-[0.125rem] w-[0.125rem] relative rounded-[50%] bg-grey" />
                    <div className="h-[0.125rem] w-[0.125rem] relative rounded-[50%] bg-grey" />
                    <div className="h-[0.125rem] w-[0.125rem] relative rounded-[50%] bg-grey" />
                    <div className="h-[0.125rem] w-[0.125rem] relative rounded-[50%] bg-grey" />
                    <div className="h-[0.125rem] w-[0.125rem] relative rounded-[50%] bg-grey" />
                    <div className="h-[0.125rem] w-[0.125rem] relative rounded-[50%] bg-grey" />
                    <div className="h-[0.125rem] w-[0.125rem] relative rounded-[50%] bg-grey" />
                    <div className="h-[0.125rem] w-[0.125rem] relative rounded-[50%] bg-grey" />
                    <div className="h-[0.125rem] w-[0.125rem] relative rounded-[50%] bg-grey" />
                    <div className="h-[0.125rem] w-[0.125rem] relative rounded-[50%] bg-grey" />
                    <div className="h-[0.125rem] w-[0.125rem] relative rounded-[50%] bg-grey" />
                    <div className="h-[0.125rem] w-[0.125rem] relative rounded-[50%] bg-grey" />
                    <div className="h-[0.125rem] w-[0.125rem] relative rounded-[50%] bg-grey" />
                    <div className="h-[0.125rem] w-[0.125rem] relative rounded-[50%] bg-grey" />
                    <div className="h-[0.125rem] w-[0.125rem] relative rounded-[50%] bg-grey" />
                    <div className="h-[0.125rem] w-[0.125rem] relative rounded-[50%] bg-grey" />
                    <div className="h-[0.125rem] w-[0.125rem] relative rounded-[50%] bg-grey" />
                    <div className="h-[0.125rem] w-[0.125rem] relative rounded-[50%] bg-grey" />
                    <div className="h-[0.125rem] w-[0.125rem] relative rounded-[50%] bg-grey" />
                    <div className="h-[0.125rem] w-[0.125rem] relative rounded-[50%] bg-grey" />
                    <div className="h-[0.125rem] w-[0.125rem] relative rounded-[50%] bg-grey" />
                    <div className="h-[0.125rem] w-[0.125rem] relative rounded-[50%] bg-grey" />
                    <div className="h-[0.125rem] w-[0.125rem] relative rounded-[50%] bg-grey" />
                    <div className="h-[0.125rem] w-[0.125rem] relative rounded-[50%] bg-grey" />
                    <div className="h-[0.125rem] w-[0.125rem] relative rounded-[50%] bg-grey" />
                    <div className="h-[0.125rem] w-[0.125rem] relative rounded-[50%] bg-grey" />
                    <div className="h-[0.125rem] w-[0.125rem] relative rounded-[50%] bg-grey" />
                    <div className="h-[0.125rem] w-[0.125rem] relative rounded-[50%] bg-grey" />
                  </div>
                </div>
                <div className="flex-1 relative tracking-[0.01em] leading-[120%] inline-block min-w-[8.188rem]">Деревообрабатывающий</div>
              </div>
              <div className="self-stretch flex flex-row flex-wrap items-start justify-start pt-[0.25rem] px-[0rem] pb-[0rem] gap-[0.468rem]">
                <div className="relative tracking-[0.01em] leading-[120%] inline-block min-w-[5.375rem]">Состояние</div>
                <div className="flex flex-col items-start justify-start pt-[0.812rem] px-[0rem] pb-[0rem]">
                  <div className="flex flex-row items-start justify-start gap-[0.125rem]">
                    <div className="h-[0.125rem] w-[0.125rem] relative rounded-[50%] bg-grey" />
                    <div className="h-[0.125rem] w-[0.125rem] relative rounded-[50%] bg-grey" />
                    <div className="h-[0.125rem] w-[0.125rem] relative rounded-[50%] bg-grey" />
                    <div className="h-[0.125rem] w-[0.125rem] relative rounded-[50%] bg-grey" />
                    <div className="h-[0.125rem] w-[0.125rem] relative rounded-[50%] bg-grey" />
                    <div className="h-[0.125rem] w-[0.125rem] relative rounded-[50%] bg-grey" />
                    <div className="h-[0.125rem] w-[0.125rem] relative rounded-[50%] bg-grey" />
                    <div className="h-[0.125rem] w-[0.125rem] relative rounded-[50%] bg-grey" />
                    <div className="h-[0.125rem] w-[0.125rem] relative rounded-[50%] bg-grey" />
                    <div className="h-[0.125rem] w-[0.125rem] relative rounded-[50%] bg-grey" />
                    <div className="h-[0.125rem] w-[0.125rem] relative rounded-[50%] bg-grey" />
                    <div className="h-[0.125rem] w-[0.125rem] relative rounded-[50%] bg-grey" />
                    <div className="h-[0.125rem] w-[0.125rem] relative rounded-[50%] bg-grey" />
                    <div className="h-[0.125rem] w-[0.125rem] relative rounded-[50%] bg-grey" />
                    <div className="h-[0.125rem] w-[0.125rem] relative rounded-[50%] bg-grey" />
                    <div className="h-[0.125rem] w-[0.125rem] relative rounded-[50%] bg-grey" />
                    <div className="h-[0.125rem] w-[0.125rem] relative rounded-[50%] bg-grey" />
                    <div className="h-[0.125rem] w-[0.125rem] relative rounded-[50%] bg-grey" />
                    <div className="h-[0.125rem] w-[0.125rem] relative rounded-[50%] bg-grey" />
                    <div className="h-[0.125rem] w-[0.125rem] relative rounded-[50%] bg-grey" />
                    <div className="h-[0.125rem] w-[0.125rem] relative rounded-[50%] bg-grey" />
                    <div className="h-[0.125rem] w-[0.125rem] relative rounded-[50%] bg-grey" />
                    <div className="h-[0.125rem] w-[0.125rem] relative rounded-[50%] bg-grey" />
                    <div className="h-[0.125rem] w-[0.125rem] relative rounded-[50%] bg-grey" />
                    <div className="h-[0.125rem] w-[0.125rem] relative rounded-[50%] bg-grey" />
                    <div className="h-[0.125rem] w-[0.125rem] relative rounded-[50%] bg-grey" />
                    <div className="h-[0.125rem] w-[0.125rem] relative rounded-[50%] bg-grey" />
                    <div className="h-[0.125rem] w-[0.125rem] relative rounded-[50%] bg-grey" />
                    <div className="h-[0.125rem] w-[0.125rem] relative rounded-[50%] bg-grey" />
                    <div className="h-[0.125rem] w-[0.125rem] relative rounded-[50%] bg-grey" />
                    <div className="h-[0.125rem] w-[0.125rem] relative rounded-[50%] bg-grey" />
                    <div className="h-[0.125rem] w-[0.125rem] relative rounded-[50%] bg-grey" />
                    <div className="h-[0.125rem] w-[0.125rem] relative rounded-[50%] bg-grey" />
                    <div className="h-[0.125rem] w-[0.125rem] relative rounded-[50%] bg-grey" />
                    <div className="h-[0.125rem] w-[0.125rem] relative rounded-[50%] bg-grey" />
                    <div className="h-[0.125rem] w-[0.125rem] relative rounded-[50%] bg-grey" />
                    <div className="h-[0.125rem] w-[0.125rem] relative rounded-[50%] bg-grey" />
                    <div className="h-[0.125rem] w-[0.125rem] relative rounded-[50%] bg-grey" />
                  </div>
                </div>
                <div className="flex-1 relative tracking-[0.01em] leading-[120%] inline-block min-w-[7.938rem]">Бывший в употреблении</div>
              </div>
              <div className="self-stretch flex flex-row items-start justify-start pt-[0.25rem] px-[0rem] pb-[0rem] gap-[0.5rem] mq450:flex-wrap">
                <div className="w-[5.5rem] relative tracking-[0.01em] leading-[120%] inline-block">Добавлено</div>
                <div className="flex flex-col items-start justify-start pt-[0.812rem] px-[0rem] pb-[0rem]">
                  <div className="flex flex-row items-start justify-start gap-[0.125rem]">
                    <div className="h-[0.125rem] w-[0.125rem] relative rounded-[50%] bg-grey" />
                    <div className="h-[0.125rem] w-[0.125rem] relative rounded-[50%] bg-grey" />
                    <div className="h-[0.125rem] w-[0.125rem] relative rounded-[50%] bg-grey" />
                    <div className="h-[0.125rem] w-[0.125rem] relative rounded-[50%] bg-grey" />
                    <div className="h-[0.125rem] w-[0.125rem] relative rounded-[50%] bg-grey" />
                    <div className="h-[0.125rem] w-[0.125rem] relative rounded-[50%] bg-grey" />
                    <div className="h-[0.125rem] w-[0.125rem] relative rounded-[50%] bg-grey" />
                    <div className="h-[0.125rem] w-[0.125rem] relative rounded-[50%] bg-grey" />
                    <div className="h-[0.125rem] w-[0.125rem] relative rounded-[50%] bg-grey" />
                    <div className="h-[0.125rem] w-[0.125rem] relative rounded-[50%] bg-grey" />
                    <div className="h-[0.125rem] w-[0.125rem] relative rounded-[50%] bg-grey" />
                    <div className="h-[0.125rem] w-[0.125rem] relative rounded-[50%] bg-grey" />
                    <div className="h-[0.125rem] w-[0.125rem] relative rounded-[50%] bg-grey" />
                    <div className="h-[0.125rem] w-[0.125rem] relative rounded-[50%] bg-grey" />
                    <div className="h-[0.125rem] w-[0.125rem] relative rounded-[50%] bg-grey" />
                    <div className="h-[0.125rem] w-[0.125rem] relative rounded-[50%] bg-grey" />
                    <div className="h-[0.125rem] w-[0.125rem] relative rounded-[50%] bg-grey" />
                    <div className="h-[0.125rem] w-[0.125rem] relative rounded-[50%] bg-grey" />
                    <div className="h-[0.125rem] w-[0.125rem] relative rounded-[50%] bg-grey" />
                    <div className="h-[0.125rem] w-[0.125rem] relative rounded-[50%] bg-grey" />
                    <div className="h-[0.125rem] w-[0.125rem] relative rounded-[50%] bg-grey" />
                    <div className="h-[0.125rem] w-[0.125rem] relative rounded-[50%] bg-grey" />
                    <div className="h-[0.125rem] w-[0.125rem] relative rounded-[50%] bg-grey" />
                    <div className="h-[0.125rem] w-[0.125rem] relative rounded-[50%] bg-grey" />
                    <div className="h-[0.125rem] w-[0.125rem] relative rounded-[50%] bg-grey" />
                    <div className="h-[0.125rem] w-[0.125rem] relative rounded-[50%] bg-grey" />
                    <div className="h-[0.125rem] w-[0.125rem] relative rounded-[50%] bg-grey" />
                    <div className="h-[0.125rem] w-[0.125rem] relative rounded-[50%] bg-grey" />
                    <div className="h-[0.125rem] w-[0.125rem] relative rounded-[50%] bg-grey" />
                    <div className="h-[0.125rem] w-[0.125rem] relative rounded-[50%] bg-grey" />
                    <div className="h-[0.125rem] w-[0.125rem] relative rounded-[50%] bg-grey" />
                    <div className="h-[0.125rem] w-[0.125rem] relative rounded-[50%] bg-grey" />
                    <div className="h-[0.125rem] w-[0.125rem] relative rounded-[50%] bg-grey" />
                    <div className="h-[0.125rem] w-[0.125rem] relative rounded-[50%] bg-grey" />
                    <div className="h-[0.125rem] w-[0.125rem] relative rounded-[50%] bg-grey" />
                    <div className="h-[0.125rem] w-[0.125rem] relative rounded-[50%] bg-grey" />
                    <div className="h-[0.125rem] w-[0.125rem] relative rounded-[50%] bg-grey" />
                    <div className="h-[0.125rem] w-[0.125rem] relative rounded-[50%] bg-grey" />
                  </div>
                </div>
                <div className="w-[5.563rem] relative tracking-[0.01em] leading-[120%] inline-block">28.08.2023</div>
              </div>
            </div>
            <div className="w-[20.125rem] flex flex-row flex-wrap items-start justify-start gap-[0.5rem] max-w-full">
              <div className="flex-1 relative tracking-[0.01em] leading-[120%] inline-block min-w-[5.688rem]">Местоположение</div>
              <div className="flex flex-col items-start justify-start pt-[0.812rem] px-[0rem] pb-[0rem]">
                <div className="flex flex-row items-start justify-start gap-[0.125rem]">
                  <div className="h-[0.125rem] w-[0.125rem] relative rounded-[50%] bg-grey" />
                  <div className="h-[0.125rem] w-[0.125rem] relative rounded-[50%] bg-grey" />
                  <div className="h-[0.125rem] w-[0.125rem] relative rounded-[50%] bg-grey" />
                  <div className="h-[0.125rem] w-[0.125rem] relative rounded-[50%] bg-grey" />
                  <div className="h-[0.125rem] w-[0.125rem] relative rounded-[50%] bg-grey" />
                  <div className="h-[0.125rem] w-[0.125rem] relative rounded-[50%] bg-grey" />
                  <div className="h-[0.125rem] w-[0.125rem] relative rounded-[50%] bg-grey" />
                  <div className="h-[0.125rem] w-[0.125rem] relative rounded-[50%] bg-grey" />
                  <div className="h-[0.125rem] w-[0.125rem] relative rounded-[50%] bg-grey" />
                  <div className="h-[0.125rem] w-[0.125rem] relative rounded-[50%] bg-grey" />
                  <div className="h-[0.125rem] w-[0.125rem] relative rounded-[50%] bg-grey" />
                  <div className="h-[0.125rem] w-[0.125rem] relative rounded-[50%] bg-grey" />
                  <div className="h-[0.125rem] w-[0.125rem] relative rounded-[50%] bg-grey" />
                  <div className="h-[0.125rem] w-[0.125rem] relative rounded-[50%] bg-grey" />
                  <div className="h-[0.125rem] w-[0.125rem] relative rounded-[50%] bg-grey" />
                  <div className="h-[0.125rem] w-[0.125rem] relative rounded-[50%] bg-grey" />
                  <div className="h-[0.125rem] w-[0.125rem] relative rounded-[50%] bg-grey" />
                  <div className="h-[0.125rem] w-[0.125rem] relative rounded-[50%] bg-grey" />
                  <div className="h-[0.125rem] w-[0.125rem] relative rounded-[50%] bg-grey" />
                  <div className="h-[0.125rem] w-[0.125rem] relative rounded-[50%] bg-grey" />
                  <div className="h-[0.125rem] w-[0.125rem] relative rounded-[50%] bg-grey" />
                  <div className="h-[0.125rem] w-[0.125rem] relative rounded-[50%] bg-grey" />
                  <div className="h-[0.125rem] w-[0.125rem] relative rounded-[50%] bg-grey" />
                  <div className="h-[0.125rem] w-[0.125rem] relative rounded-[50%] bg-grey" />
                  <div className="h-[0.125rem] w-[0.125rem] relative rounded-[50%] bg-grey" />
                </div>
              </div>
              <div className="relative tracking-[0.01em] leading-[120%] inline-block min-w-[4.25rem]">г. Минск</div>
            </div>
          </div>
        </div>
        <div className="w-[24.188rem] h-[6.938rem] flex flex-col items-start justify-start pt-[0rem] px-[0rem] pb-[3.875rem] box-border gap-[1rem] max-w-full z-[1]">
          <div className="self-stretch flex flex-col items-start justify-start gap-[0.5rem] shrink-0 [debug_commit:bf4bc93]">
            <div className="w-[6.813rem] relative tracking-[0.01em] leading-[1.375rem] font-medium inline-block">О продавце</div>
            <div className="self-stretch relative text-[1rem] tracking-[0.01em] leading-[120%] text-dark-grey">ОАО “Завод деревообробатывающих продуктов”</div>
          </div>
          <div className="w-[17.75rem] flex flex-col items-start justify-start gap-[0.5rem] shrink-0 [debug_commit:bf4bc93] text-[1rem] text-dark-grey">
            <div className="relative tracking-[0.01em] leading-[120%] text-main-black inline-block min-w-[5rem]">Контакты:</div>
            <div className="self-stretch relative tracking-[0.01em] leading-[120%]">Электронная почта: derevo@mail.ru</div>
            <div className="w-[14.313rem] relative tracking-[0.01em] leading-[120%] inline-block">Телефон: +375(29)123 45 67</div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LotDescription
