import { FC } from 'react'
import { SelectInputFilters } from '../../../../components/common/SelectInputFilters/SelectInput'
import styles from './componentsStyles.module.scss'
import Input from '../../../../components/common/Input'
import { IFilter } from './price'
import { selectLangSettings, useAppSelector } from '../../../../store/hooks'

export const LocationFilter: FC<IFilter> = ({ searchParams, updateUrl }) => {
  const { language } = useAppSelector(selectLangSettings)

  const oblastList = [
    {
      value: 'Все',
      label: language === 'RU' ? 'Все' : 'All'
    },
    {
      value: 'г. Минск',
      label: language === 'RU' ? 'г. Минск' : 'Minsk'
    },
    {
      value: 'Брестская обл.',
      label: language === 'RU' ? 'Брестская' : 'Brestskaya'
    },
    {
      value: 'Гомельская обл.',
      label: language === 'RU' ? 'Гомельская' : 'Gomelskaya'
    },
    {
      value: 'Гродненская обл.',
      label: language === 'RU' ? 'Гродненская' : 'Grodnenskaya'
    },
    {
      value: 'Могилевская обл.',
      label: language === 'RU' ? 'Могилевская' : 'Mogilevskaya'
    },
    {
      value: 'Минская обл.',
      label: language === 'RU' ? 'Минская' : 'Minskaya'
    },
    {
      value: 'Витебская обл.',
      label: language === 'RU' ? 'Витебская' : 'Vitebskaya'
    }
  ]
  return (
    <li className="w-full h-full flex-col justify-start items-start gap-3 inline-flex">
      <div className="text-zinc-900 text-base font-medium font-['SF Pro Text'] leading-[17px]">{language === 'RU' ? 'Местоположение' : 'Location'}</div>
      <div className="w-[59px] h-[17px] justify-start items-start gap-0.5 inline-flex">
        <div className="text-zinc-900 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">{language === 'RU' ? 'Область' : 'State'}</div>
      </div>
      <SelectInputFilters
        optionsList={oblastList}
        defaultOption={language === 'RU' ? 'Не выбрано' : 'Not selected'}
        className={styles.selectInputWrapper}
        selectedOption={searchParams.get('region') ? (searchParams.get('region') as string) : ''}
        setSelectedValue={(event) => {
          if (event !== 'Все') {
            updateUrl({ region: event as string })
          } else {
            updateUrl({ region: '', page: 1 })
          }
        }}
      />
      <div className="w-full justify-start items-start gap-0.5 inline-flex">
        <div className="text-zinc-900 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">
          {language === 'RU' ? 'Город/район' : 'City/district'}
        </div>
      </div>
      <Input
        multiline={false}
        placeholder={language === 'RU' ? 'Введите город' : 'Enter city'}
        className="w-full h-[40px]"
        value={searchParams.get('city') ? (searchParams.get('city') as string) : ''}
        onChange={(event) => {
          updateUrl({ city: event.target.value, page: 1 })
        }}
      />
    </li>
  )
}
