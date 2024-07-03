import { FC } from 'react'
import { useFetchUserCartQuery } from '../api/userService'
import { Loader } from '../components/Loader'
import CartImage from '../assets/images/cart.png'
import { ShopperSVG } from '../assets/svg/shopperSVG'
import { CartLot } from '../components/CartLot'
import LotsBlock from '../components/LotsBlock'
import { SliderAds } from '../components/AdsBlock/SliderPreview'
import FeedBack from '../components/feedBack'
import { LastViewedLotsBlock } from '../components/LastViewedLots'

export const UserCartPage: FC = () => {
  const { data: userCart, isLoading, refetch } = useFetchUserCartQuery()

  if (isLoading || !userCart) {
    return (
      <div className="w-full lg:px-[60px] px-4 flex flex-col items-center justify-center gap-6">
        <Loader />
      </div>
    )
  }

  return (
    <>
      <div className="w-full lg:px-[60px] px-4 flex flex-col items-start justify-center gap-6">
        <div className="text-zinc-900 text-2xl font-medium font-['SF Pro Text'] leading-[28.80px]">Корзина</div>
        {userCart.length > 0 ? (
          userCart.map(({ advertisement: lot }, index) => <CartLot lot={lot} key={index} refetch={refetch} />)
        ) : (
          <div className="w-full lg:px-[60px] px-4 flex flex-col items-center justify-center gap-2">
            <img src={CartImage} className="w-[105px] h-[105px]" alt="cart" />
            <p className="text-zinc-900 text-lg font-medium font-['SF Pro Text'] leading-snug">В корзине пусто </p>
            <p className="text-zinc-900 flex items-center justify-center gap-1 text-sm font-normal font-['SF Pro Text'] leading-[16.80px]">
              Чтобы добавить товар в корзину нажмите{' '}
              <span className="cursor-pointer">
                <ShopperSVG />
              </span>
            </p>
          </div>
        )}
        <LotsBlock />
        <SliderAds />
        <LastViewedLotsBlock />
      </div>
      <FeedBack />
    </>
  )
}
