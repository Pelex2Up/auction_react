import { FC, useCallback, useEffect, useRef, useState } from 'react'
import styles from '../header/header.module.scss'
import { Button } from '../common/buttons'
import { SelectInput } from '../common/SelectInput/SelectInput'
import { selectLangSettings, useAppDispatch, useAppSelector } from '../../store/hooks'
import { LangState, updateLangSettings } from '../../store/redux/languageSettings/slice'
import { toast } from 'react-toastify'
import { Tooltip } from '@mui/material'

const langList = [
  { label: 'English', value: 'ENG' },
  { label: 'Русский', value: 'RU' }
]

const cashList = [
  { label: 'USD - Доллар США', value: 'USD' },
  { label: 'BYN - Белорусский рубль', value: 'BYN' },
  { label: 'RUB - Российский рубль', value: 'RUB' }
]

export const LangChangeBlock: FC = () => {
  const langRef = useRef<HTMLUListElement>(null)
  const [show, setShow] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  const langState = useAppSelector(selectLangSettings)
  const [language, setLanguage] = useState<'RU' | 'ENG'>(langState.language)
  const [money, setMoney] = useState<'BYN' | 'USD' | 'RUB'>(langState.money)

  const handleOutsideClick = useCallback(
    (event: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(event.target as Node) && show) {
        setShow(false)
      }
    },
    [show]
  )

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick)
    return () => {
      document.removeEventListener('click', handleOutsideClick)
    }
  }, [handleOutsideClick])

  const handleSave = () => {
    if (language && money) {
      const updateData: LangState = {
        language: language,
        money: money
      }
      dispatch(updateLangSettings(updateData))
      setShow(false)
      toast(language === 'RU' ? 'Настройки языка и валюты успешно изменены' : 'Language and currency has been changed successfuly', {
        type: 'success'
      })
    }
  }

  return (
    <ul
      className={styles.lang}
      ref={langRef}
      style={{
        position: 'relative'
      }}
    >
      <Tooltip title={language === 'RU' ? 'Выбор языка и валюты' : 'Set language & currency'}>
        <div onClick={() => setShow(!show)} className="flex items-center gap-2">
          <div className="w-6 h-6 pl-[0.86px] pr-[0.85px] py-[0.86px] justify-center items-center flex">
            <div className="w-[22.29px] h-[22.29px] relative">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_3101_19283)">
                  <path
                    d="M12.0022 23.1431C18.1563 23.1431 23.1451 18.1543 23.1451 12.0003C23.1451 5.84625 18.1563 0.857422 12.0022 0.857422C5.8482 0.857422 0.859375 5.84625 0.859375 12.0003C0.859375 18.1543 5.8482 23.1431 12.0022 23.1431Z"
                    stroke="#1D1E22"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M0.859375 12.0003H23.1451M16.2879 12.0003C16.0774 16.0751 14.5765 19.9774 12.0022 23.1431C9.42792 19.9774 7.92703 16.0751 7.71652 12.0003C7.92703 7.92544 9.42792 4.02311 12.0022 0.857422C14.5765 4.02311 16.0774 7.92544 16.2879 12.0003Z"
                    stroke="#1D1E22"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_3101_19283">
                    <rect width="24" height="24" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
          </div>
          <div className="text-zinc-900 text-sm font-normal font-['SF Pro Text']">
            {langState.language === 'RU' ? 'Русский' : 'English'}-{langState.money}
          </div>
        </div>
      </Tooltip>
      {show && (
        <ul className={`absolute right-0 top-[200%] w-[432px] z-10 cursor-default rounded-lg`}>
          <div className="w-full bg-white flex flex-col p-6 justify-start items-start rounded shadow-xl relative gap-4">
            <p className="text-zinc-900 text-lg font-medium font-['SF Pro Text'] leading-[17px]">
              {langState.language === 'RU' ? 'Выбор языка и валюты' : 'Set language and currency'}
            </p>
            <p className="text-zinc-900 text-sm font-normal font-['SF Pro Text'] leading-[17px]">
              {langState.language === 'RU' ? 'Выберите предпочтительный язык и валюту.' : 'Select your preferred language and currency.'}
              <br />
              {langState.language === 'RU' ? 'Вы можете изменить настройки в любое время' : 'You can change your settings at any time'}
            </p>
            <div className="flex flex-col gap-2 w-full">
              <label className="text-zinc-900 text-sm font-normal font-['SF Pro Text'] leading-[17px]">
                {langState.language === 'RU' ? 'Язык' : 'Language'}
              </label>
              <SelectInput
                optionsList={langList}
                defaultOption="Выберите язык"
                selectedOption={langState.language}
                setSelectedValue={(event) => (event === 'RU' || event === 'ENG') && setLanguage(event)}
              />
            </div>
            <div className="flex flex-col gap-2 w-full">
              <label className="text-zinc-900 text-sm font-normal font-['SF Pro Text'] leading-[17px]">
                {langState.language === 'RU' ? 'Валюта' : 'Currency'}
              </label>
              <SelectInput
                optionsList={cashList}
                defaultOption="Выберите валюту"
                selectedOption={langState.money}
                setSelectedValue={(event) => (event === 'BYN' || event === 'USD' || event === 'RUB') && setMoney(event)}
              />
            </div>
            <div className="flex w-full justify-center">
              <Button text={langState.language === 'RU' ? 'Сохранить' : 'Save'} onClick={handleSave} />
            </div>
          </div>
        </ul>
      )}
    </ul>
  )
}
