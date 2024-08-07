import { FC } from 'react'
import Input from '../../../../components/common/Input'
import { handleKeyPress } from '../../../Lots/MakeLot'
import { selectLangSettings, useAppSelector } from '../../../../store/hooks'

export interface IFilter {
  searchParams: URLSearchParams
  updateUrl: (newParams: any) => void
}

export const PriceFilter: FC<IFilter> = ({ updateUrl, searchParams }) => {
  const { language } = useAppSelector(selectLangSettings)
  const priceMin = searchParams.get('price_min') ?? ''
  const priceMax = searchParams.get('price_max') ?? ''

  return (
    <li className="w-[251px] h-[57px] flex-col justify-start items-start gap-3 inline-flex">
      <div className="justify-start items-start gap-2 inline-flex">
        <div className="text-zinc-900 text-base font-medium font-['SF Pro Text'] leading-[17px]">{language === 'RU' ? 'Цена' : 'Price'}</div>
        <div className="text-zinc-900 text-base font-medium font-['SF Pro Text'] leading-[17px]">(BYN)</div>
      </div>
      <div className="justify-start items-center gap-1 inline-flex">
        <Input
          multiline={false}
          value={priceMin}
          onChange={(event) => updateUrl({ price_min: event.target.value, page: 1 })}
          className="h-7 w-full"
          placeholder={language === 'RU' ? 'от' : 'from'}
          onKeyDown={handleKeyPress}
          maxLength={8}
        />
        <div className="text-zinc-500 text-sm font-normal font-['SF Pro Text'] leading-[17px]">-</div>
        <Input
          multiline={false}
          value={priceMax}
          onChange={(event) => updateUrl({ price_max: event.target.value, page: 1 })}
          className="h-7 w-full"
          placeholder={language === 'RU' ? 'до' : 'to'}
          onKeyDown={handleKeyPress}
          maxLength={8}
        />
      </div>
    </li>
  )
}
