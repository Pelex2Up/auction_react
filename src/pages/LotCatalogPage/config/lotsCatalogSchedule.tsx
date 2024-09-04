import { FC, useState } from 'react'
import { LotT } from '../../../types/lotTypes'
import Checkbox from '../../../components/common/checkbox'
import { ShopperSVG } from '../../../assets/svg/shopperSVG'
import placeholderImage from '../../../assets/images/imagePlaceholderTable.png'
import { generatePath, useNavigate } from 'react-router-dom'
import { LotPathE, PathE } from '../../../enum'
import cartImage from '../../../assets/images/cart.png'
import { selectLangSettings, selectUser, useAppSelector } from '../../../store/hooks'
import { Tooltip } from '@mui/material'
import { usdConverter } from '../../../utility/usdConverter'

interface ICatalogTable {
  lotsData: LotT[]
  addToCart: (arg: any) => void
  addManyToCart: (arg: any) => void
  isLoading: boolean
  isError: boolean
}

export const LotsCatalogSchedule: FC<ICatalogTable> = ({ lotsData, addToCart, addManyToCart, isError, isLoading }) => {
  const { language } = useAppSelector(selectLangSettings)
  const { user } = useAppSelector(selectUser)
  const { money } = useAppSelector(selectLangSettings)
  const [checkAll, setCheckAll] = useState<boolean>(false)
  const MAX_LENGTH = 60
  const navigate = useNavigate()

  const takeAllCheckedLots = async () => {
    const checkboxes = Array.from(document.querySelectorAll('input[type="checkbox"]')) as HTMLInputElement[]
    const checkedCheckboxes = checkboxes.filter((checkbox) => checkbox.checked)
    const checkedIds = checkedCheckboxes.filter((checkbox) => checkbox.id)
    if (checkedIds.length > 0) {
      // const formdata = new FormData()
      const dataToSend: number[] = []
      checkedIds.map((checkbox) => dataToSend.unshift(Number(checkbox.id)))
      await addManyToCart({ advertisement_ids: dataToSend })
    }
  }

  return (
    <div className="overflow-x-auto relative">
      {(isLoading || isError) && <div className="absolute flex w-full h-full items-center justify-center inset-0 backdrop-blur-sm z-50" />}
      <div className="flex flex-row items-center justify-start gap-6 py-4">
        <button className="flex flex-row items-center justify-start gap-2" onClick={() => setCheckAll(!checkAll)}>
          <span className="w-[24px]">
            <Checkbox checked={checkAll} onChange={() => setCheckAll(!checkAll)} />
          </span>
          <p className="text-zinc-500 text-sm font-normal font-['SF Pro Text'] leading-[17px]">{language === 'RU' ? 'Выбрать все' : 'Select all'}</p>
        </button>
        <button className="flex flex-row items-center justify-start gap-2" onClick={takeAllCheckedLots}>
          <ShopperSVG />
          <p className="text-zinc-500 text-sm font-normal font-['SF Pro Text'] leading-[17px]">
            {language === 'RU' ? 'Поместить выбранное в корзину' : 'Move selected to basket'}
          </p>
        </button>
      </div>
      <table className="w-full table-auto border-collapse border border-zinc-300">
        <thead>
          <tr className="bg-transparent text-center text-zinc-500 text-xs font-normal font-['SF Pro Text'] leading-[17px]">
            <th className="px-4 py-2 border border-zinc-300">№</th>
            <th className="px-4 py-2 border border-zinc-300"></th>
            <th className="px-4 py-2 border border-zinc-300">{language === 'RU' ? 'Название' : 'Title'}</th>
            <th className="px-4 py-2 border border-zinc-300">{language === 'RU' ? 'Описание' : 'Description'}</th>
            <th className="px-4 py-2 border border-zinc-300">{language === 'RU' ? 'Кол-во (ед. изм)' : 'Count'}</th>
            <th className="px-4 py-2 border border-zinc-300">{language === 'RU' ? 'Стоимость (1 ед.)' : 'Price (1pcs)'}</th>
            <th className="px-4 py-2 border border-zinc-300">{language === 'RU' ? 'Общая стоимость' : 'Total price'}</th>
            <th className="px-4 py-2 border border-zinc-300">{language === 'RU' ? 'Вид объявления' : 'Variant'}</th>
            <th className="px-4 py-2 border border-zinc-300">{language === 'RU' ? 'Тип продажи' : 'Type'}</th>
            <th className="px-4 py-2 border border-zinc-300">{language === 'RU' ? 'Фото' : 'Photo'}</th>
            <th className="px-4 py-2 border border-zinc-300"></th>
          </tr>
        </thead>
        <tbody>
          {lotsData.map((lot, index) => (
            <tr className="border-b text-center border-zinc-300" key={lot.id}>
              <td className="p-1 border border-zinc-300 text-zinc-500 text-xs font-normal font-['SF Pro Text'] leading-[14.40px] tracking-tight">
                {index + 1}
              </td>
              <td className="p-1 border border-zinc-300">
                {!(lot.profile.id === user?.profile.id) && !lot.cart && <Checkbox id={String(lot.id)} checked={!lot.cart && checkAll ? checkAll : undefined} />}
              </td>
              <td
                className="p-1 border border-zinc-300 text-green-700 text-xs font-normal font-['SF Pro Text'] leading-[14.40px] tracking-tight cursor-pointer"
                onClick={() => navigate(generatePath(LotPathE.LotDetail, { slug: lot.slug }))}
              >
                {lot.title}
              </td>
              <td
                className="p-1 border border-zinc-300 text-zinc-500 text-xs font-normal font-['SF Pro Text'] leading-[14.40px] tracking-tight cursor-pointer"
                onClick={() => navigate(generatePath(LotPathE.LotDetail, { slug: lot.slug }))}
              >
                {lot.description.length > MAX_LENGTH ? `${lot.description.slice(0, MAX_LENGTH)}...` : lot.description}
              </td>
              <td className="p-1 border border-zinc-300 text-zinc-500 text-xs font-normal font-['SF Pro Text'] leading-[14.40px] tracking-tight">{`${
                lot.count
              } ${lot.unit === 'PIECE' ? 'шт' : lot.unit === 'KG' ? 'кг' : 'тонн'}`}</td>
              <td className="p-1 border border-zinc-300 text-green-700 text-xs font-normal font-['SF Pro Text'] leading-[14.40px] tracking-tight">{`${usdConverter(
                lot.price
              )} ${money}`}</td>
              <td className="p-1 border border-zinc-300 text-green-700 text-xs font-normal font-['SF Pro Text'] leading-[14.40px] tracking-tight">{`${
                usdConverter(lot.price) * (lot.count ?? 1)
              } ${money}`}</td>
              <td className="p-1 border border-zinc-300 text-zinc-500 text-xs font-normal font-['SF Pro Text'] leading-[14.40px] tracking-tight">
                {lot.ad_type === 'BUY' ? 'Покупка' : 'Продажа'}
              </td>
              <td className="p-1 border border-zinc-300 text-zinc-500 text-xs font-normal font-['SF Pro Text'] leading-[14.40px] tracking-tight">
                {lot.is_auction ? 'Аукцион' : 'Фиксированная цена'}
              </td>
              <td
                className="p-1 border border-zinc-300 cursor-pointer"
                style={{ verticalAlign: 'middle' }}
                onClick={() => navigate(generatePath(LotPathE.LotDetail, { slug: lot.slug }))}
              >
                {lot.photos.length > 0 && lot.photos[0].image ? (
                  <img src={lot.photos[0].image} className="max-h-[49px] max-w-[79px] rounded-sm w-full h-full object-contain" alt="lot-image" />
                ) : (
                  <div className="max-h-[49px] max-w-[79px] flex items-center justify-center shadow-sm p-2 rounded-sm w-full h-full">
                    <img src={placeholderImage} className="w-[24px] h-[24px]" alt="lot-image-placeholder" />
                  </div>
                )}
              </td>
              {!(lot.profile.id === user?.profile.id) ? (
                <td className="p-1 border border-zinc-300">
                  {lot.cart ? (
                    <Tooltip title={language === 'RU' ? 'Товар уже в корзине. Перейти в корзину?' : 'Go to basket'}>
                      <img
                        src={cartImage}
                        className="min-w-[40px] w-[40px] h-[40px] cursor-pointer"
                        alt="in-cart"
                        onClick={() => navigate(generatePath(PathE.UserCart))}
                      />
                    </Tooltip>
                  ) : (
                    <Tooltip title={language === 'RU' ? 'Добавить в корзину' : 'Move to basket'}>
                      <button onClick={() => addToCart({ advertisement_ids: lot.id })}>
                        <ShopperSVG />
                      </button>
                    </Tooltip>
                  )}
                </td>
              ) : (
                <td className="p-1 border border-zinc-300"></td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
