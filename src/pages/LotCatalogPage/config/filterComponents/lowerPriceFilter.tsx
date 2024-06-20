import { FormControlLabel } from '@mui/material'
import { FC } from 'react'
import { SwitchPicker } from '../../../../components/common/Switch'

export const LowerPriceFilter: FC = () => {
  return (
    <li className="w-full justify-between items-center inline-flex">
      <div className="text-zinc-900 text-base font-medium font-['SF Pro Text'] leading-[17px]">Сниженная цена</div>
      <FormControlLabel control={<SwitchPicker />} label />
    </li>
  )
}
