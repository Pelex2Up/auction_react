import { usdConverter } from '../../utility/usdConverter'
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
    return usdConverter(lot.auction_current_price.split('.')[0])
  } else if (lot.price) {
    return usdConverter(lot.price.split('.')[0])
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
