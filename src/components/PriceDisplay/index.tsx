import { useUsdConverter } from '../../utility/usdConverter'
import { LotT } from '../../types/lotTypes'

function getPriceInByn(lot: any) {
  if (lot.auction_current_price) {
    return lot.auction_current_price.split('.')[0]
  } else {
    return lot.price?.split('.')[0] || '0'
  }
}

function getPriceInUsd(lot: any) {
  if (lot.auction_current_price) {
    return useUsdConverter(lot.auction_current_price.split('.')[0])
  } else if (lot.price) {
    return useUsdConverter(lot.price.split('.')[0])
  } else {
    return '0'
  }
}

function getOldPriceInByn(lot: any) {
  if (lot.old_price) {
    return lot.old_price.split('.')[0]
  } else {
    return '0'
  }
}

function getOldPriceInUsd(lot: any) {
  if (lot.old_price) {
    return useUsdConverter(lot.old_price.split('.')[0])
  } else {
    return '0'
  }
}

export const PriceDisplay = ({ money, lot }: { money: string; lot: LotT }) => {
  const priceInByn = getPriceInByn(lot)
  const priceInUsd = getPriceInUsd(lot)

  return (
    <div className="flex-col justify-start items-start inline-flex">
      <div className="text-right text-green-800 text-lg font-bold font-['SF Pro Text'] leading-snug tracking-tight">
        {`${money === 'BYN' ? priceInByn : priceInUsd} ${money}`}
      </div>
    </div>
  )
}

export const LotDetailPrice = ({ money, lot }: { money: string; lot: LotT }) => {
  const priceInByn = getPriceInByn(lot)
  const priceInUsd = getPriceInUsd(lot)

  return (
    <div className="text-right text-green-700 text-[30px] font-bold font-['SF Pro Text'] leading-[38.40px] tracking-tight">
      {`${money === 'BYN' ? priceInByn : priceInUsd} ${money}`}
    </div>
  )
}

export const OldPriceDisplay = ({ money, lot }: { money: string; lot: LotT }) => {
  const priceInByn = getOldPriceInByn(lot)
  const priceInUsd = getOldPriceInUsd(lot)

  return (
    <div className="text-zinc-500 text-sm font-normal font-['SF Pro Text'] line-through leading-[16.80px] tracking-tight">
      {`${money === 'BYN' ? priceInByn : priceInUsd} ${money}`}
    </div>
  )
}

export const LotDetailOldPrice = ({ money, lot }: { money: string; lot: LotT }) => {
  const priceInByn = getOldPriceInByn(lot)
  const priceInUsd = getOldPriceInUsd(lot)

  return (
    <div className="relative text-[1.375rem] [text-decoration:line-through] tracking-[0.01em] leading-[120%] inline-block min-w-[7.188rem] text-zinc-500 mq450:text-[1.125rem] mq450:leading-[1.313rem]">
      {`${money === 'BYN' ? priceInByn : priceInUsd} ${money}`}
    </div>
  )
}
