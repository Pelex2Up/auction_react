import { FC } from 'react'
import { LotT } from '../../../types/lotTypes'
import Checkbox from '../../../components/common/checkbox'
import { ShopperSVG } from '../../../assets/svg/shopperSVG'
import placeholderImage from '../../../assets/images/imagePlaceholderTable.png'
import { generatePath, useNavigate } from 'react-router-dom'
import { LotPathE } from '../../../enum'

interface ICatalogTable {
  lotsData: LotT[]
}

export const LotsCatalogSchedule: FC<ICatalogTable> = ({ lotsData }) => {
  const MAX_LENGTH = 60

  const navigate = useNavigate()

  return (
    <div className="overflow-x-auto">
      <table className="w-full table-auto border-collapse border border-zinc-300">
        <thead>
          <tr className="bg-transparent text-center text-zinc-500 text-xs font-normal font-['SF Pro Text'] leading-[17px]">
            <th className="px-4 py-2 border border-zinc-300">№</th>
            <th className="px-4 py-2 border border-zinc-300"></th>
            <th className="px-4 py-2 border border-zinc-300">Название</th>
            <th className="px-4 py-2 border border-zinc-300">Описание</th>
            <th className="px-4 py-2 border border-zinc-300">Кол-во (ед. изм)</th>
            <th className="px-4 py-2 border border-zinc-300">Стоимость (1 ед.)</th>
            <th className="px-4 py-2 border border-zinc-300">Общая стоимость</th>
            <th className="px-4 py-2 border border-zinc-300">Вид объявления</th>
            <th className="px-4 py-2 border border-zinc-300">Тип продажи</th>
            <th className="px-4 py-2 border border-zinc-300">Фото</th>
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
                <Checkbox />
              </td>
              <td
                className="p-1 border border-zinc-300 text-green-700 text-xs font-normal font-['SF Pro Text'] leading-[14.40px] tracking-tight cursor-pointer"
                onClick={() => navigate(generatePath(LotPathE.LotDetail, { lotId: String(lot.id) }))}
              >
                {lot.title}
              </td>
              <td
                className="p-1 border border-zinc-300 text-zinc-500 text-xs font-normal font-['SF Pro Text'] leading-[14.40px] tracking-tight cursor-pointer"
                onClick={() => navigate(generatePath(LotPathE.LotDetail, { lotId: String(lot.id) }))}
              >
                {lot.description.length > MAX_LENGTH ? `${lot.description.slice(0, MAX_LENGTH)}...` : lot.description}
              </td>
              <td className="p-1 border border-zinc-300 text-zinc-500 text-xs font-normal font-['SF Pro Text'] leading-[14.40px] tracking-tight">{`${
                lot.count
              } ${lot.unit === 'PIECE' ? 'шт' : lot.unit === 'KG' ? 'кг' : 'тонн'}`}</td>
              <td className="p-1 border border-zinc-300 text-green-700 text-xs font-normal font-['SF Pro Text'] leading-[14.40px] tracking-tight">{`${
                lot.price.split('.')[0]
              } BYN`}</td>
              <td className="p-1 border border-zinc-300 text-green-700 text-xs font-normal font-['SF Pro Text'] leading-[14.40px] tracking-tight">{`${
                parseInt(lot.price.split('.')[0]) * (lot.count ?? 1)
              } BYN`}</td>
              <td className="p-1 border border-zinc-300 text-zinc-500 text-xs font-normal font-['SF Pro Text'] leading-[14.40px] tracking-tight">
                {lot.ad_type === 'BUY' ? 'Покупка' : 'Продажа'}
              </td>
              <td className="p-1 border border-zinc-300 text-zinc-500 text-xs font-normal font-['SF Pro Text'] leading-[14.40px] tracking-tight">
                {lot.is_auction ? 'Аукцион' : 'Фиксированная цена'}
              </td>
              <td
                className="p-1 border border-zinc-300 cursor-pointer"
                style={{ verticalAlign: 'middle' }}
                onClick={() => navigate(generatePath(LotPathE.LotDetail, { lotId: String(lot.id) }))}
              >
                {lot.photos.length > 0 && lot.photos[0].image ? (
                  <img src={lot.photos[0].image} className="max-h-[49px] max-w-[79px] rounded-sm w-full h-full object-contain" alt="lot-image" />
                ) : (
                  <div className="max-h-[49px] max-w-[79px] flex items-center justify-center shadow-sm p-2 rounded-sm w-full h-full">
                    <img src={placeholderImage} className="w-[24px] h-[24px]" alt="lot-image-placeholder" />
                  </div>
                )}
              </td>
              <td className="p-1 border border-zinc-300">
                <button>
                  <ShopperSVG />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
