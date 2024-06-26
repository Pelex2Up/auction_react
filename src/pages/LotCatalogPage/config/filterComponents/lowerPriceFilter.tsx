import { FormControlLabel } from '@mui/material'
import { FC } from 'react'
import { SwitchPicker } from '../../../../components/common/Switch'
import { IFilter } from './price'

export const LowerPriceFilter: FC<IFilter> = ({ searchParams, updateUrl }) => {
  // old_price_reduced
  return (
    <li className="w-full justify-between items-center inline-flex">
      <div className="text-zinc-900 text-base font-medium font-['SF Pro Text'] leading-[17px]">Сниженная цена</div>
      <FormControlLabel
        control={
          <SwitchPicker
            checked={searchParams.get('old_price_reduced') === 'true'}
            onChange={() => updateUrl({ old_price_reduced: searchParams.get('old_price_reduced') === 'true' ? 'false' : 'true' })}
          />
        }
        label
      />
    </li>
  )
}
