import { FC } from 'react'
import Checkbox from '../../../../components/common/checkbox'

export const ConditionFilter: FC = () => {
  return (
    <li className="w-full flex-col justify-start items-start gap-3 inline-flex">
      <div className="text-zinc-900 text-base font-medium font-['SF Pro Text'] leading-[17px]">Состояние</div>
      <div className="flex-col justify-start items-start gap-2 flex">
        <Checkbox type='radio' label={'Новое'} />
        <Checkbox type='radio' label={'Бывшее в употреблении'} />
        <Checkbox type='radio' label={'Все'} />
      </div>
    </li>
  )
}
