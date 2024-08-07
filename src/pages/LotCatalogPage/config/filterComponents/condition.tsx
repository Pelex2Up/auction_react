import { FC } from 'react'
import Checkbox from '../../../../components/common/checkbox'
import { IFilter } from './price'
import { selectLangSettings, useAppSelector } from '../../../../store/hooks'

export const ConditionFilter: FC<IFilter> = ({ searchParams, updateUrl }) => {
  const { language } = useAppSelector(selectLangSettings)
  return (
    <li className="w-full flex-col justify-start items-start gap-3 inline-flex">
      <div className="text-zinc-900 text-base font-medium font-['SF Pro Text'] leading-[17px]">{language === 'RU' ? 'Состояние' : 'Condition'}</div>
      <div className="flex-col justify-start items-start gap-2 flex">
        <Checkbox
          type="radio"
          label={language === 'RU' ? 'Новое' : 'New'}
          checked={searchParams.get('condition') === 'NEW'}
          onChange={() => updateUrl({ condition: 'NEW', page: 1 })}
        />
        <Checkbox
          type="radio"
          label={language === 'RU' ? 'Бывшее в употреблении' : 'Used'}
          checked={searchParams.get('condition') === 'USED'}
          onChange={() => updateUrl({ condition: 'USED', page: 1 })}
        />
        <Checkbox
          type="radio"
          label={language === 'RU' ? 'Все' : 'All'}
          checked={searchParams.get('condition') !== 'NEW' && searchParams.get('condition') !== 'USED'}
          onChange={() => updateUrl({ condition: '', page: 1 })}
        />
      </div>
    </li>
  )
}
