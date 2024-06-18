import { FunctionComponent, useEffect, useState } from 'react'
import { ArrowDown } from '../../assets/svg/arrowDown'
import { LotT } from '../../types/lotTypes'
import styles from './Lots.module.scss'
import { useFetchCategoriesQuery } from '../../api/lotService'
import { ICategory } from '../../types/commonTypes'

export type FrameComponent4Type = {
  className?: string
  lotData: LotT
  category: ICategory
  subCategory: ICategory | undefined
  lowerCat: ICategory | undefined
}

const LotDescription: FunctionComponent<FrameComponent4Type> = ({ className = '', lotData, category: mainCategory, subCategory, lowerCat }) => {
  const [showDescription, setShowDescription] = useState<boolean>(false)
  const date = new Date(lotData.created)
  const MAX_LENGTH = 200

  const shortenedText = lotData.description.length > MAX_LENGTH ? `${lotData.description.slice(0, MAX_LENGTH)}...` : lotData.description

  return (
    <section
      className={`self-stretch flex flex-row items-start justify-end pt-[0rem] pb-[1.5rem] box-border max-w-full text-left text-[1.125rem] text-main-black font-text-2 mq825:pl-[1.938rem] mq825:pr-[1.875rem] mq825:box-border ${className}`}
    >
      <div className="flex-1 flex flex-col items-start justify-start pt-[2.5rem] px-[1.5rem] pb-[4.187rem] box-border relative gap-[2rem] w-full max-w-full mq825:gap-[1rem] mq825:pt-[1.625rem] mq825:pb-[2.75rem] mq825:box-border">
        <div className="w-full h-full absolute !m-[0] top-[0rem] right-[0rem] bottom-[0rem] left-[0rem] shadow-[0px_2px_1px_rgba(23,_23,_23,_0.04),_0px_8px_16px_rgba(23,_23,_23,_0.12)] rounded bg-whitesmoke-100" />
        <div className="w-full flex flex-col items-start justify-start gap-[0.5rem] max-w-full z-[1]">
          <div className="w-full relative tracking-[0.01em] leading-[1.375rem] font-medium inline-block">Описание</div>
          <div className="self-stretch w-full text-zinc-500 relative text-[1rem] tracking-[0.01em] leading-[120%] text-dark-grey inline-block">
            {showDescription ? lotData.description : shortenedText}
          </div>
          <button
            onClick={() => setShowDescription(!showDescription)}
            className="flex flex-row items-center justify-start gap-3 text-green-800 text-[0.875rem] tracking-[0.01em] leading-[1.063rem]"
          >
            {!showDescription ? 'Раскрыть описание' : 'Скрыть описание'}
            <ArrowDown
              className={styles.arrow}
              style={{
                transform: `${showDescription ? 'rotate(180deg)' : ''}`,
                transition: 'all ease-in-out 100ms'
              }}
            />
          </button>
        </div>
        <div className="w-[28rem] h-[1.438rem] relative hidden max-w-full z-[2]" />
        <div className="w-full lg:w-[28.313rem] flex flex-col items-start justify-start pt-[0rem] px-[0rem] pb-[0.5rem] box-border gap-[0.5rem] max-w-full z-[2]">
          <div className="relative tracking-[0.01em] leading-[1.375rem] font-medium inline-block">Характеристики</div>
          <div className="self-stretch flex flex-col items-start justify-start gap-[0.75rem] max-w-full text-[1rem] text-dark-grey">
            <div className="self-stretch flex flex-col items-start justify-start gap-[0.5rem]">
              <ul className={styles.details}>
                <li>
                  Тип
                  <span className={styles.value}>{mainCategory.title}</span>
                </li>
                {subCategory && (
                  <li>
                    Вид
                    <span className={styles.value}>{subCategory.title}</span>
                  </li>
                )}
                <li>
                  Состояние
                  <span className={styles.value}>Бывший в употреблении</span>
                </li>
                <li>
                  Добавлено
                  <span className={styles.value}>{date.toLocaleDateString()}</span>
                </li>
                <li>
                  Местоположение
                  <span className={styles.value}>{lotData.city}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="w-full h-auto flex flex-col items-start justify-start pt-[0rem] px-[0rem] box-border gap-[1rem] max-w-full z-[1]">
          <div className="self-stretch flex flex-col items-start justify-start gap-[0.5rem] shrink-0 [debug_commit:bf4bc93]">
            <div className="relative tracking-[0.01em] leading-[1.375rem] font-medium inline-block">О продавце</div>
            <div className="self-stretch relative text-[1rem] tracking-[0.01em] leading-[120%] text-dark-grey">{lotData.profile.name}</div>
          </div>
          <div className="w-full flex flex-col items-start justify-start gap-[0.5rem] shrink-0 [debug_commit:bf4bc93] text-[1rem] text-dark-grey">
            <div className="relative tracking-[0.01em] leading-[120%] text-main-black inline-block min-w-[5rem] font-medium">Контакты:</div>
            <div className="self-stretch relative tracking-[0.01em] leading-[120%]">
              Электронная почта: <a href={`mailto:${lotData.profile.email}?subject=Вопрос`}>{lotData.profile.email}</a>
            </div>
            <div className="relative tracking-[0.01em] leading-[120%] inline-block">
              Телефон:{' '}
              <a href={`tel:${lotData.profile.phone_number}`} type="tel">
                {lotData.profile.phone_number}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LotDescription
