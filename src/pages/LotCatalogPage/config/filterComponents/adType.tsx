import { FC, useEffect, useState } from 'react'
import Checkbox from '../../../../components/common/checkbox'
import { IFilter } from './price'
import { selectLangSettings, useAppSelector } from '../../../../store/hooks'

export const AdTypeFilter: FC<IFilter> = ({ searchParams, updateUrl }) => {
  const { language } = useAppSelector(selectLangSettings)
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
      <div className="text-zinc-900 text-base font-medium font-['SF Pro Text'] leading-[17px]">{language === 'RU' ? 'Тип покупки' : 'Variant'}</div>
      <div className="flex-col justify-start items-start gap-2 flex">
        <Checkbox
          checked={searchParams.get('ad_type') === 'SELL'}
          onChange={() => {
            updateUrl({ ad_type: 'SELL', is_auction: '', page: 1 })
            setCheckedBuy(false)
            setCheckedSell(true)
          }}
          label={language === 'RU' ? 'Продажа' : 'Sell'}
        />
        {checkedSell && (
          <>
            <Checkbox
              label={language === 'RU' ? 'Аукцион' : 'Auction'}
              style={{ marginLeft: '37px' }}
              checked={searchParams.get('is_auction') === 'true'}
              onChange={() => updateUrl({ is_auction: 'true', page: 1 })}
            />
            <Checkbox
              label={language === 'RU' ? 'Фиксированная цена' : 'Fixed price'}
              style={{ marginLeft: '37px' }}
              checked={searchParams.get('is_auction') === 'false'}
              onChange={() => updateUrl({ is_auction: 'false', page: 1 })}
            />
          </>
        )}
        <Checkbox
          label={language === 'RU' ? 'Покупка' : 'Buy'}
          checked={searchParams.get('ad_type') === 'BUY'}
          onChange={() => {
            updateUrl({ ad_type: 'BUY', is_auction: '', page: 1 })
            setCheckedSell(false)
            setCheckedBuy(true)
          }}
        />
        {/* {checkedBuy && (
          <>
            <Checkbox
              label={language === 'RU' ? 'Аукцион' : 'Auction'}
              style={{ marginLeft: '37px' }}
              checked={searchParams.get('is_auction') === 'true'}
              onChange={() => updateUrl({ is_auction: 'true' })}
            />
            <Checkbox
              label={language === 'RU' ? 'Фиксированная цена' : 'Fixed price'}
              style={{ marginLeft: '37px' }}
              checked={searchParams.get('is_auction') === 'false'}
              onChange={() => updateUrl({ is_auction: 'false' })}
            />
          </>
        )} */}
        <Checkbox
          label={language === 'RU' ? 'Все' : 'All'}
          checked={(!checkedBuy && !checkedSell) || !searchParams.get('ad_type')}
          onChange={() => {
            updateUrl({ ad_type: '', is_auction: '', page: 1 })
            setCheckedSell(false)
            setCheckedBuy(false)
          }}
        />
      </div>
    </li>
  )
}
