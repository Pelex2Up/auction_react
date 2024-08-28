import { FunctionComponent, useState } from 'react'
import { ArrowDown } from '../../assets/svg/arrowDown'
import { LotT } from '../../types/lotTypes'
import styles from './Lots.module.scss'
import { ICategory } from '../../types/commonTypes'
import { selectLangSettings, useAppSelector } from '../../store/hooks'

export type FrameComponent4Type = {
  className?: string
  lotData: LotT
  category: ICategory
  subCategory: ICategory | undefined
  lowerCat: ICategory | undefined
}

const LotDescription: FunctionComponent<FrameComponent4Type> = ({ className = '', lotData, category: mainCategory, subCategory, lowerCat }) => {
  const { language } = useAppSelector(selectLangSettings)
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
          <div className="w-full relative tracking-[0.01em] leading-[1.375rem] font-medium inline-block">{language === 'RU' ? 'Описание' : 'Description'}</div>
          <div className="self-stretch w-full text-zinc-500 relative text-[1rem] tracking-[0.01em] leading-[120%] text-dark-grey inline-block">
            {showDescription ? lotData.description : shortenedText}
          </div>
          <button
            onClick={() => setShowDescription(!showDescription)}
            className="flex flex-row items-center justify-start gap-3 text-green-800 text-[0.875rem] tracking-[0.01em] leading-[1.063rem]"
          >
            {!showDescription ? (language === 'RU' ? 'Раскрыть описание' : 'Show description') : language === 'RU' ? 'Скрыть описание' : 'Hide description'}
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
          <div className="relative tracking-[0.01em] leading-[1.375rem] font-medium inline-block">{language === 'RU' ? 'Характеристики' : 'Specification'}</div>
          <div className="self-stretch flex flex-col items-start justify-start gap-[0.75rem] max-w-full text-[1rem] text-dark-grey">
            <div className="self-stretch flex flex-col items-start justify-start gap-[0.5rem]">
              <ul className={styles.details}>
                <li>
                  {language === 'RU' ? 'Тип' : 'Type'}
                  <span className={styles.value}>{mainCategory.title}</span>
                </li>
                {subCategory && (
                  <li>
                    {language === 'RU' ? 'Вид' : 'Kind'}
                    <span className={styles.value}>{subCategory.title}</span>
                  </li>
                )}
                <li>
                  {language === 'RU' ? 'Состояние' : 'Condition'}
                  <span className={styles.value}>
                    {language === 'RU' ? (lotData.condition === 'NEW' ? 'новый' : 'бывший в употреблении') : lotData.condition}
                  </span>
                </li>
                <li>
                  {language === 'RU' ? 'Добавлено' : 'Created'}
                  <span className={styles.value}>{date.toLocaleDateString()}</span>
                </li>
                <li>
                  {language === 'RU' ? 'Местоположение' : 'Location'}
                  <span className={styles.value}>{lotData.city}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="w-full h-auto flex flex-col items-start justify-start pt-[0rem] px-[0rem] box-border gap-[1rem] max-w-full z-[1]">
          <div className="self-stretch flex flex-col items-start justify-start gap-[0.5rem] shrink-0 [debug_commit:bf4bc93]">
            <div className="relative tracking-[0.01em] leading-[1.375rem] font-medium inline-block">
              {lotData.ad_type === 'SELL' ? (language === 'RU' ? 'О продавце' : 'About seller') : language === 'RU' ? 'О покупателе' : 'About buyer'}
            </div>
            <div className="self-stretch break-all relative text-[1rem] tracking-[0.01em] leading-[120%] text-dark-grey">{lotData.profile.name}</div>
          </div>
          <div className="w-full flex flex-col items-start justify-start gap-[0.5rem] shrink-0 [debug_commit:bf4bc93] text-[1rem] text-dark-grey">
            <div className="relative tracking-[0.01em] leading-[120%] text-main-black inline-block min-w-[5rem] font-medium">
              {language === 'RU' ? 'Контакты' : 'Contacts'}:
            </div>
            <div className="self-stretch relative tracking-[0.01em] leading-[120%]">
              {language === 'RU' ? 'Электронная почта' : 'Email'}: <a href={`mailto:${lotData.profile.email}?subject=Вопрос`}>{lotData.profile.email}</a>
            </div>
            <div className="relative tracking-[0.01em] leading-[120%] inline-block">
              {language === 'RU' ? 'Телефон' : 'Phone number'}:{' '}
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
