import { FC } from 'react'
import { oblastList } from '../../../Lots/MakeLot'
import { SelectInputFilters } from '../../../../components/common/SelectInputFilters/SelectInput'
import styles from './componentsStyles.module.scss'
import Input from '../../../../components/common/Input'

export const LocationFilter: FC = () => {
  return (
    <li className="w-full h-full flex-col justify-start items-start gap-3 inline-flex">
      <div className="text-zinc-900 text-base font-medium font-['SF Pro Text'] leading-[17px]">Местоположение</div>
      <div className="w-[59px] h-[17px] justify-start items-start gap-0.5 inline-flex">
        <div className="text-zinc-900 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">Область</div>
      </div>
      <SelectInputFilters optionsList={oblastList} defaultOption="Не выбрано" className={styles.selectInputWrapper} />
      <div className="w-full justify-start items-start gap-0.5 inline-flex">
        <div className="text-zinc-900 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">Город/район</div>
      </div>
      <Input multiline={false} placeholder="Введите город" className='w-full h-[40px]'/>
    </li>
  )
}
