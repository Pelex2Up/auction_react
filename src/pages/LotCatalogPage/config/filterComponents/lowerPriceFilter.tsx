import { FormControlLabel } from '@mui/material'
import { FC } from 'react'
import { SwitchPicker } from '../../../../components/common/Switch'
import { IFilter } from './price'
import { selectLangSettings, useAppSelector } from '../../../../store/hooks'

export const LowerPriceFilter: FC<IFilter> = ({ searchParams, updateUrl }) => {
  const { language } = useAppSelector(selectLangSettings)
  // old_price_reduced
  return (
    <li className="w-full justify-between items-center inline-flex">
      <div className="text-zinc-900 text-base font-medium font-['SF Pro Text'] leading-[17px]">{language === 'RU' ? 'Сниженная цена' : 'Discount price'}</div>
      <FormControlLabel
        control={
          <SwitchPicker
            checked={searchParams.get('old_price_reduced') === 'true'}
            onChange={() => updateUrl({ old_price_reduced: searchParams.get('old_price_reduced') === 'true' ? 'false' : 'true', page: 1 })}
          />
        }
        label={''}
      />
    </li>
  )
}
