import { FC } from 'react'
import Checkbox from '../../../../components/common/checkbox'
import { IFilter } from './price'

export const ConditionFilter: FC<IFilter> = ({ searchParams, updateUrl }) => {
  return (
    <li className="w-full flex-col justify-start items-start gap-3 inline-flex">
      <div className="text-zinc-900 text-base font-medium font-['SF Pro Text'] leading-[17px]">Состояние</div>
      <div className="flex-col justify-start items-start gap-2 flex">
        <Checkbox type="radio" label={'Новое'} checked={searchParams.get('condition') === 'NEW'} onChange={() => updateUrl({ condition: 'NEW' })} />
        <Checkbox
          type="radio"
          label={'Бывшее в употреблении'}
          checked={searchParams.get('condition') === 'USED'}
          onChange={() => updateUrl({ condition: 'USED' })}
        />
        <Checkbox
          type="radio"
          label={'Все'}
          checked={searchParams.get('condition') !== 'NEW' && searchParams.get('condition') !== 'USED'}
          onChange={() => updateUrl({ condition: '' })}
        />
      </div>
    </li>
  )
}
