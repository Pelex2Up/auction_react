import { FC, useState } from 'react'
import Checkbox from '../../../../components/common/checkbox'

export const AdTypeFilter: FC = () => {
  const [checkedSell, setCheckedSell] = useState<boolean>(false)
  const [checkedBuy, setCheckedBuy] = useState<boolean>(false)

  return (
    <li className="w-full flex-col justify-start items-start gap-3 inline-flex">
      <div className="text-zinc-900 text-base font-medium font-['SF Pro Text'] leading-[17px]">Тип покупки</div>
      <div className="flex-col justify-start items-start gap-2 flex">
        <Checkbox type="radio" checked={checkedSell} onClick={() => setCheckedSell(!checkedSell)} label="Продажа" />
        {checkedSell && (
          <>
            <Checkbox label="Аукцион" style={{ marginLeft: '37px' }} />
            <Checkbox label="Фиксированная цена" style={{ marginLeft: '37px' }} />
          </>
        )}
        <Checkbox label="Покупка" checked={checkedBuy} onClick={() => setCheckedBuy(!checkedBuy)} type="radio" />
        {checkedBuy && (
          <>
            <Checkbox label="Аукцион" style={{ marginLeft: '37px' }} />
            <Checkbox label="Фиксированная цена" style={{ marginLeft: '37px' }} />
          </>
        )}
        <Checkbox label="Все" type="radio" />
      </div>
    </li>
  )
}
