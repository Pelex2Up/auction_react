import { FC, useEffect, useState } from 'react'
import Checkbox from '../../../../components/common/checkbox'
import { IFilter } from './price'

export const AdTypeFilter: FC<IFilter> = ({ searchParams, updateUrl }) => {
  const [checkedSell, setCheckedSell] = useState<boolean>(searchParams.get('ad_type') === 'SELL')
  const [checkedBuy, setCheckedBuy] = useState<boolean>(searchParams.get('ad_type') === 'BUY')

  useEffect(() => {
    if (!searchParams.get('ad_type')) {
      setCheckedBuy(false)
      setCheckedSell(false)
    }
  }, [searchParams])

  return (
    <li className="w-full flex-col justify-start items-start gap-3 inline-flex">
      <div className="text-zinc-900 text-base font-medium font-['SF Pro Text'] leading-[17px]">Тип покупки</div>
      <div className="flex-col justify-start items-start gap-2 flex">
        <Checkbox
          checked={searchParams.get('ad_type') === 'SELL'}
          onChange={() => {
            updateUrl({ ad_type: 'SELL', is_auction: '' })
            setCheckedBuy(false)
            setCheckedSell(true)
          }}
          label="Продажа"
        />
        {checkedSell && (
          <>
            <Checkbox
              label="Аукцион"
              style={{ marginLeft: '37px' }}
              checked={searchParams.get('is_auction') === 'true'}
              onChange={() => updateUrl({ is_auction: 'true' })}
            />
            <Checkbox
              label="Фиксированная цена"
              style={{ marginLeft: '37px' }}
              checked={searchParams.get('is_auction') === 'false'}
              onChange={() => updateUrl({ is_auction: 'false' })}
            />
          </>
        )}
        <Checkbox
          label="Покупка"
          checked={searchParams.get('ad_type') === 'BUY'}
          onChange={() => {
            updateUrl({ ad_type: 'BUY', is_auction: '' })
            setCheckedSell(false)
            setCheckedBuy(true)
          }}
        />
        {checkedBuy && (
          <>
            <Checkbox
              label="Аукцион"
              style={{ marginLeft: '37px' }}
              checked={searchParams.get('is_auction') === 'true'}
              onChange={() => updateUrl({ is_auction: 'true' })}
            />
            <Checkbox
              label="Фиксированная цена"
              style={{ marginLeft: '37px' }}
              checked={searchParams.get('is_auction') === 'false'}
              onChange={() => updateUrl({ is_auction: 'false' })}
            />
          </>
        )}
        <Checkbox
          label="Все"
          checked={(!checkedBuy && !checkedSell) || !searchParams.get('ad_type')}
          onChange={() => {
            updateUrl({ ad_type: '', is_auction: '' })
            setCheckedSell(false)
            setCheckedBuy(false)
          }}
        />
      </div>
    </li>
  )
}
