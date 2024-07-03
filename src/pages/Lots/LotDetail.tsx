import { FC, useEffect, useState } from 'react'
import { LotT } from '../../types/lotTypes'
import { CatalogPathE, PathE, ProfilePathE } from '../../enum'
import { LotPhotoSlider } from '../../components/LotPhotoSlider'
import { padWithZeros } from '../../utils/articleNumberConverter'
import { Button } from '../../components/common/buttons'
import { ShopperSVG } from '../../assets/svg/shopperSVG'
import { PlusIconSVG } from '../../assets/svg/plusIconSVG'
import { MinusIconSVG } from '../../assets/svg/minusIconSVG'
import { ICategory } from '../../types/commonTypes'
import { generatePath, useNavigate } from 'react-router-dom'
import { useAppendLotInCartMutation } from '../../api/userService'
import { toast } from 'react-toastify'
import { useMakeBidMutation, usePurchaseLotMutation } from '../../api/lotService'
import { changeWordByNumber } from '../../utility/wordChangerByCount'
import DefaultLink from '../../components/common/DefaultLink'
import { Loader } from '../../components/Loader'
import { selectUser, useAppSelector } from '../../store/hooks'

export type ContentWrapperType = {
  className?: string
  lotData: LotT
  category: ICategory
  subCategory: ICategory | undefined
  lowerCat: ICategory | undefined
  refetch: (arg: string) => void
}

const LotDetail: FC<ContentWrapperType> = ({ className = '', lotData, category, subCategory, lowerCat, refetch }) => {
  const navigate = useNavigate()
  const { user } = useAppSelector(selectUser)
  const [makeBid, { isLoading, isSuccess: bigSuccess }] = useMakeBidMutation()
  const [count, setCount] = useState<number>(1)
  const [addToCart, { isSuccess, isError, error }] = useAppendLotInCartMutation()
  const [purchaseLot, { isSuccess: purchasedSuccess }] = usePurchaseLotMutation()
  const endDate = new Date(lotData.auction_end_date)

  useEffect(() => {
    if (error && 'data' in error && error.data && 'status' in error && isError && error.status === 400) {
      toast('Вы не можете добавить своё собственное объявление в корзину', { type: 'warning' })
    }
  }, [isError, error])

  useEffect(() => {
    if (isSuccess) {
      refetch(lotData.slug)
      toast('Лот успешно добавлен в корзину', { type: 'success' })
    }
  }, [isSuccess])

  const handlePurchaseLot = () => {
    if (count && lotData) {
      const formdata = new FormData()
      formdata.append('quantity', String(count))
      purchaseLot({ body: formdata, id: lotData.id })
        .unwrap()
        .catch((err) => toast('Невозможно купить свое объявление', { type: 'error' }))
    }
  }

  useEffect(() => {
    if (bigSuccess) {
      toast('Ваша ставка принята', { type: 'success' })
      refetch(lotData.slug)
    }
  }, [bigSuccess])

  useEffect(() => {
    if (purchasedSuccess) {
      refetch(lotData.slug)
    }
  }, [purchasedSuccess])

  return (
    <div
      className={`w-[75.375rem] flex flex-col lg:flex-row items-start justify-start gap-4 lg:gap-[8.5rem] max-w-full text-left text-[0.875rem] text-main-black font-text-2 mq825:gap-[2.125rem] mq450:gap-[1.063rem] mq1125:flex-wrap mq1400:gap-[4.25rem] ${className}`}
    >
      <div className="flex-1 flex flex-col items-start justify-start gap-[2rem] max-w-full mq825:gap-[1rem] mq825:min-w-full">
        <div className="w-[34.063rem] flex flex-row items-start justify-start gap-[0.75rem] max-w-full mq825:flex-wrap">
          <a className="relative tracking-[0.04em] leading-[1.063rem] inline-block" href={PathE.Home}>
            Главная
          </a>
          <span className="relative tracking-[0.04em] leading-[1.063rem] inline-block mq825:w-full mq825:h-[0.313rem]">/</span>
          <a
            href={generatePath(CatalogPathE.Catalog + `/?page=1&main_category=${category.id}`)}
            className={`${!subCategory && 'text-green-600'} relative tracking-[0.04em] leading-[1.063rem] inline-block`}
          >
            {category.title}
          </a>
          {subCategory && (
            <>
              <span className="relative tracking-[0.04em] leading-[1.063rem] inline-block mq825:w-full mq825:h-[0.313rem]">/</span>
              <a
                href={generatePath(CatalogPathE.Catalog + `/?page=1&main_category=${category.id}&category=${subCategory.id}`)}
                className={`${!lowerCat && 'text-green-600'} relative tracking-[0.04em] leading-[1.063rem] inline-block`}
              >
                {subCategory.title}
              </a>
            </>
          )}
          {lowerCat && (
            <>
              <span className="relative tracking-[0.04em] leading-[1.063rem] inline-block mq825:w-full mq825:h-[0.313rem]">/</span>
              <a
                href={generatePath(CatalogPathE.Catalog + `/?page=1&main_category=${category.id}&category=${lowerCat.id}`)}
                className="text-green-600 relative tracking-[0.04em] leading-[1.063rem] inline-block"
              >
                {lowerCat.title}
              </a>
            </>
          )}
        </div>
        <div className="self-stretch max-w-[648px] h-[360px] lg:h-[468px] flex flex-col items-start justify-start gap-[1rem]">
          <div className="self-stretch h-full flex flex-col items-start justify-start relative">
            <LotPhotoSlider images={lotData.photos} />
            <button className="cursor-pointer [border:none] p-[0.5rem] bg-white w-max min-w-[6.925rem] !m-[0] absolute top-[2rem] left-[0rem] rounded-tl-none rounded-tr rounded-br rounded-bl-none overflow-hidden flex flex-row items-start justify-start box-border whitespace-nowrap text-green-600 z-50">
              <div className="relative text-[0.75rem] tracking-[0.01em] leading-[120%] font-text-2 text-green text-left">
                {lotData.is_auction ? 'Аукцион' : 'Фиксированная цена'}
              </div>
            </button>
          </div>
        </div>
      </div>
      <div className="xl:w-[26.375rem] flex flex-col items-start justify-start lg:pt-[3.062rem] px-[0rem] pb-[0rem] box-border xl:min-w-[26.375rem] max-w-full text-[1.5rem] text-green mq825:min-w-full mq450:pt-[2rem] mq450:box-border mq1125:flex-1">
        <div className="self-stretch flex flex-col items-start justify-start gap-4 lg:gap-[2rem] max-w-full mq450:gap-[1rem]">
          <div className="w-[24.5rem] flex flex-col items-start justify-start gap-[0.375rem] max-w-full">
            <h2 className="m-0 self-stretch relative text-green-600 tracking-[0.01em] leading-[1.813rem] font-normal font-inherit mq450:text-[1.188rem] mq450:leading-[1.438rem]">
              {lotData.title}
            </h2>
            <div className="flex flex-row items-start justify-start gap-[0.375rem] text-[0.875rem] text-dark-grey">
              <div className="relative tracking-[0.01em] leading-[1.063rem] inline-block">Код товара</div>
              <div className="relative tracking-[0.01em] leading-[1.063rem] inline-block">№{padWithZeros(String(lotData.id))}</div>
            </div>
          </div>
          <div className="self-stretch bg-stone-50 flex flex-col items-start justify-start py-[1.5rem] px-[2rem] relative gap-[1.5rem] text-[0.875rem] text-dark-grey">
            <div className="w-full h-full absolute !m-[0] top-[0rem] right-[0rem] bottom-[0rem] left-[0rem] shadow-[0px_2px_1px_rgba(23,_23,_23,_0.04),_0px_8px_16px_rgba(23,_23,_23,_0.12)] rounded bg-whitesmoke-100" />
            <div className="self-stretch flex flex-row items-start justify-between gap-[1.25rem]">
              <div className="w-full flex flex-col items-start justify-start gap-[1.125rem]">
                {lotData.is_auction ? (
                  <div className="w-full flex flex-col items-start justify-start gap-[0.25rem] z-[1]">
                    <div className="text-zinc-500 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">Текущая цена</div>
                    <div className="flex flex-row w-full items-center gap-2">
                      <div className="text-right text-green-700 text-[32px] font-bold font-['SF Pro Text'] leading-[38.40px] tracking-tight">
                        {lotData.auction_current_price ? lotData.auction_current_price.split('.')[0] : lotData.price.split('.')[0]} BYN{' '}
                      </div>
                      <p className="text-right text-zinc-500 text-lg font-normal font-['SF Pro Text'] leading-snug tracking-tight">{`/ ${lotData.count} ${
                        lotData.unit === 'PIECE' ? 'шт' : lotData.unit === 'KG' ? 'кг' : changeWordByNumber(Number(lotData.count), 'тонну', 'тонны', 'тонн')
                      }
                      `}</p>
                    </div>
                    <div className="flex w-full flex-row justify-between gap-3 items-center">
                      <div className="w-[170px] h-12 relative">
                        <div className="w-[170px] h-10 p-3 left-0 top-[8px] absolute rounded border border-zinc-300 justify-between items-center inline-flex">
                          <input
                            className="bg-transparent border-none w-full text-zinc-500"
                            maxLength={12}
                            disabled
                            type="number"
                            value={
                              lotData.auction_current_price
                                ? Number(lotData.auction_current_price.split('.')[0]) + Number(lotData.step_bid.split('.')[0])
                                : Number(lotData.price.split('.')[0]) + Number(lotData.step_bid.split('.')[0])
                            }
                          />
                          <div className="text-zinc-500 text-sm font-normal font-['SF Pro Text'] leading-[17px]">BYN</div>
                        </div>
                        <div className="px-1 left-[8px] top-0.5 absolute bg-stone-50 justify-start items-start gap-2.5 inline-flex">
                          <div className="text-zinc-500 text-xs font-normal font-['SF Pro Text'] leading-none">Ваша ставка</div>
                        </div>
                      </div>
                      <div className="w-[152px] h-10 flex-col justify-start items-start gap-1.5 inline-flex">
                        <div className="text-zinc-900 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">Окончание аукциона:</div>
                        <div className="flex-col justify-start items-start gap-1.5 flex">
                          <div className="justify-start items-start gap-1.5 inline-flex">
                            <div className="text-zinc-500 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">
                              {endDate.toLocaleDateString()}
                            </div>
                            <div className="text-zinc-500 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">
                              {endDate.toLocaleTimeString()}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="w-[167px] text-zinc-500 text-xs font-normal font-['SF Pro Text'] leading-[14.40px] tracking-tight">
                      Мин.ставка{' '}
                      {lotData.auction_current_price
                        ? Number(lotData.auction_current_price.split('.')[0]) + Number(lotData.step_bid.split('.')[0])
                        : Number(lotData.price.split('.')[0]) + Number(lotData.step_bid.split('.')[0])}{' '}
                      BYN, <br />
                      шаг ставки {lotData.step_bid.split('.')[0]} BYN
                    </div>
                  </div>
                ) : (
                  <div className="w-full flex flex-col items-start justify-start gap-[0.125rem] z-[1]">
                    <div className="w-[7.438rem] relative tracking-[0.01em] leading-[1.063rem] inline-block">
                      Цена за {lotData.unit === 'PIECE' ? 'единицу' : lotData.unit === 'KG' ? 'кг' : 'тонну'}
                    </div>
                    <b className="self-stretch relative text-[2rem] tracking-[0.01em] leading-[120%] text-green-600 mq825:text-[1.625rem] mq825:leading-[1.938rem] mq450:text-[1.188rem] mq450:leading-[1.438rem]">
                      {lotData.price.split('.')[0]} BYN
                    </b>
                    {lotData.old_price && (
                      <div className="relative text-[1.375rem] [text-decoration:line-through] tracking-[0.01em] leading-[120%] inline-block min-w-[7.188rem] text-zinc-500 mq450:text-[1.125rem] mq450:leading-[1.313rem]">
                        {lotData.old_price} BYN
                      </div>
                    )}
                  </div>
                )}
                {!lotData.is_auction && lotData.count && (
                  <div className="self-stretch flex flex-col items-start justify-start gap-[0.75rem]">
                    <div className="relative text-zinc-500 tracking-[0.01em] leading-[1.063rem] inline-block min-w-[5.125rem] z-[1]">Количество</div>
                    <div className="self-stretch flex flex-col items-start justify-start gap-[0.5rem] text-[1.125rem] text-main-black">
                      <div className="self-stretch flex flex-row items-start justify-start gap-[0.5rem] z-[1]">
                        <div className="flex-1 flex flex-row items-start justify-between rounded-lg border-[1px] border-solid border-grey box-border py-[0rem] pr-[0.062rem] pl-[0rem] relative gap-[1.25rem]">
                          <button
                            onClick={() => count > 1 && setCount(count - 1)}
                            className="h-[2.5rem] w-[2.5rem] flex items-center justify-center rounded-lg bg-white relative cursor-pointer"
                          >
                            <MinusIconSVG />
                          </button>
                          <div className="flex flex-col items-start justify-start pt-[0.625rem] px-[0rem] pb-[0rem]">
                            <div className="relative tracking-[0.01em] leading-[1.375rem] font-medium inline-block min-w-[0.75rem] z-[3]">{count}</div>
                          </div>
                          <button
                            onClick={() => lotData.count && count < lotData.count && setCount(count + 1)}
                            className="h-[2.5rem] w-[2.5rem] flex items-center justify-center rounded-lg bg-white relative cursor-pointer"
                          >
                            <PlusIconSVG />
                          </button>
                        </div>
                        <div className="flex flex-col items-start justify-start pt-[0.718rem] px-[0rem] pb-[0rem] text-[0.875rem] text-dark-grey">
                          <div className="relative text-zinc-500 tracking-[0.01em] leading-[1.063rem] inline-block min-w-[4.25rem]">
                            из {lotData.count} штук
                          </div>
                        </div>
                      </div>

                      {lotData.purchase_count > 0 && (
                        <div className="w-full text-zinc-500 relative text-[0.875rem] tracking-[0.01em] leading-[1.063rem] text-dark-grey inline-block z-[1]">
                          {`${changeWordByNumber(lotData.purchase_count, 'Подана', 'Подано', 'Подано')} ${lotData.purchase_count} ${changeWordByNumber(
                            lotData.purchase_count,
                            'заявка',
                            'заявки',
                            'заявок'
                          )}`}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
              <button
                className="h-[1.5rem] w-[1.5rem] relative overflow-hidden shrink-0 z-[1]"
                onClick={() => {
                  if (!lotData.cart) {
                    addToCart({ advertisement_id: lotData.id })
                  } else toast('Лот уже добавлен в корзину', { type: 'warning' })
                }}
              >
                <ShopperSVG />
              </button>
            </div>
            <div className="self-stretch w-full flex flex-row items-start justify-start gap-[1.125rem] z-[1] mq450:flex-wrap">
              <a href={`mailto:${lotData.profile.email}?subject=Вопрос`} type="email" className="w-full">
                <Button variant="secondary" className="w-full" text="Написать продавцу" />
              </a>
              {lotData.is_auction ? (
                <Button
                  className="w-full"
                  variant={
                    lotData.profile.id !== user?.profile.id
                      ? lotData.last_bid && lotData.last_bid.user !== user?.profile.id
                        ? 'primary'
                        : 'disabled'
                      : 'disabled'
                  }
                  disabled={lotData.profile.id !== user?.profile.id && lotData.last_bid && lotData.last_bid.user === user?.profile.id}
                  text="Сделать ставку"
                  onClick={() => makeBid(lotData.id)}
                >
                  {isLoading && <Loader />}
                </Button>
              ) : lotData.purchase ? (
                <Button variant="disabled" className="w-full" text="Куплено" disabled />
              ) : (
                <Button variant="primary" className="w-full" text="Купить" onClick={handlePurchaseLot} />
              )}
            </div>
            <div className="w-full flex-col justify-start items-center gap-[18px] inline-flex z-[2]">
              <div className="w-[422px] h-[0px] border border-zinc-300"></div>
              {lotData.profile.id !== user?.profile.id || (lotData.last_bid && lotData.last_bid.user === user?.profile.id) ? (
                <div className="w-[358px]">
                  <span className="text-zinc-500 text-xs font-normal font-['SF Pro Text'] leading-[14.40px] tracking-tight">
                    Ваша ставка последняя, повторно сделать ставку станет возможным после поднятия ее на шаг.
                    <br />
                    Следите за заказом в Личном кабинете/{' '}
                  </span>
                  <DefaultLink
                    text="Мои заказы"
                    className="text-green-700 text-xs font-normal font-['SF Pro Text'] leading-[14.40px] tracking-tight cursor-pointer"
                    href={ProfilePathE.MyPurchases}
                  />
                </div>
              ) : (
                <span className="text-zinc-500 w-full text-xs font-normal text-start font-['SF Pro Text'] leading-[14.40px] tracking-tight">
                  Вы не можете принимать участие в собственном аукционе.
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LotDetail
