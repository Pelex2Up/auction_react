import { FC } from 'react'
import Input from '../../../../components/common/Input'
import { handleKeyPress } from '../../../Lots/MakeLot'

export const PriceFilter: FC = () => {
  return (
    <li className="w-[251px] h-[57px] flex-col justify-start items-start gap-3 inline-flex">
      <div className="justify-start items-start gap-2 inline-flex">
        <div className="text-zinc-900 text-base font-medium font-['SF Pro Text'] leading-[17px]">Цена</div>
        <div className="text-zinc-900 text-base font-medium font-['SF Pro Text'] leading-[17px]">(BYN)</div>
      </div>
      <div className="justify-start items-center gap-1 inline-flex">
        <Input multiline={false} className="h-7 w-full" placeholder="от" onKeyDown={handleKeyPress} maxLength={8}/>
        <div className="text-zinc-500 text-sm font-normal font-['SF Pro Text'] leading-[17px]">-</div>
        <Input multiline={false} className="h-7 w-full" placeholder="до" onKeyDown={handleKeyPress} maxLength={8}/>
      </div>
    </li>
  )
}
