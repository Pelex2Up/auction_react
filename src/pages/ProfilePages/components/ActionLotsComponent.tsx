import { FC } from 'react'
import { LotT } from '../../../types/lotTypes'
import styles from './buttonStyles.module.scss'
import DefaultLink from '../../../components/common/DefaultLink'
import { generatePath, useNavigate } from 'react-router-dom'
import { LotPathE } from '../../../enum'
import { padWithZeros } from '../../../utils/articleNumberConverter'

interface ILotComp {
  lot: LotT
}

export const ActionLotsComponent: FC<ILotComp> = ({ lot }) => {
  const createdDate = new Date(lot.created)
  const endDate = new Date(lot.auction_end_date || lot.expires_at)
  const navigate = useNavigate()
  const currentDate = new Date()

  return (
    <div className="w-full h-auto py-6 pl-0 pr-6 gap-6 flex shadow bg-white">
      <div
        className="w-full max-w-[150px] lg:max-w-[259px] h-full relative cursor-pointer"
        onClick={() => navigate(generatePath(LotPathE.LotDetail, { slug: lot.slug }))}
      >
        {lot.photos.length > 0 ? (
          <div className="relative h-[100px] lg:h-[187px]">
            {lot.status === 'MODERATION' && (
              <div className="absolute top-0 left-0 z-99 w-full h-full bg-[rgba(113,113,122,0.5)] text-white rounded font-sans text-lg font-bold flex items-center justify-center">
                на модерации
              </div>
            )}
            {lot.status === 'CLOSED' && (
              <div className="absolute top-0 left-0 z-99 w-full h-full bg-[rgba(113,113,122,0.5)] text-red-600 rounded font-sans text-lg font-bold flex items-center justify-center">
                завершен
              </div>
            )}
            <img className="w-full h-full rounded object-cover" src={lot.photos[0].image} />
          </div>
        ) : (
          <div className="w-full h-[187px] pl-[9px] pr-2 flex-col justify-center items-center gap-4 inline-flex relative">
            {lot.status === 'MODERATION' && (
              <div className="absolute top-0 left-0 z-99 w-full h-full bg-[rgba(113,113,122,0.5)] text-white rounded font-sans text-lg font-bold flex items-center justify-center">
                на модерации
              </div>
            )}
            {lot.status === 'CLOSED' && (
              <div className="absolute top-0 left-0 z-99 w-full h-full bg-[rgba(113,113,122,0.5)] text-red-600 rounded font-sans text-lg font-bold flex items-center justify-center">
                завершен
              </div>
            )}
            <div className="w-[65px] h-[65px] pl-[21px] pr-[23px] pt-[15px] pb-3.5 bg-green-800 rounded justify-center items-center inline-flex">
              <div className="w-auto h-9 text-white text-3xl font-medium font-['SF Pro Text'] leading-9 tracking-tight">
                {lot.profile.name[0].toUpperCase()}
              </div>
            </div>
            <div className="w-auto text-zinc-900 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">{`${
              lot.profile.type === 'person' ? 'ФЛ' : lot.profile.type === 'company' ? 'ЮЛ' : 'ИП'
            } ${lot.profile.name}`}</div>
          </div>
        )}
        {lot.is_auction && (
          <div className="w-32 h-10 ml-2 mt-2 flex-col justify-start items-start gap-1.5 inline-flex">
            <div className="text-zinc-900 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">Аукцион до:</div>
            <div className="flex-col justify-start items-start gap-1.5 flex">
              <div className="justify-start items-start gap-1.5 inline-flex">
                <div className="text-zinc-500 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">{endDate.toLocaleDateString()}</div>
                <div className="text-zinc-500 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">{endDate.toLocaleTimeString()}</div>
              </div>
            </div>
          </div>
        )}
        <div className="p-2 left-0 top-[10px] absolute bg-white rounded-tr rounded-br justify-start items-center gap-2.5 inline-flex">
          <div className="text-green-800 text-xs font-normal font-['SF Pro Text'] leading-[14.40px] tracking-tight">
            {lot.is_auction ? 'Аукцион' : 'Фиксированная цена'}
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col gap-2">
        <div className="w-full flex flex-col gap-1">
          <div className="w-full flex lg:flex-row flex-col-reverse justify-between gap-4">
            <DefaultLink text={lot.title} className={styles.link} href={generatePath(LotPathE.LotDetail, { slug: lot.slug })} />
            <div className="w-[84px] h-10 flex-col justify-start items-start gap-1.5 inline-flex">
              <div className="text-zinc-500 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">Статус:</div>
              {endDate > currentDate ? (
                <div className="justify-start items-center gap-1.5 inline-flex">
                  <div className="w-2.5 h-2.5 bg-green-700 rounded-full" />
                  <div className="text-zinc-500 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">Активный</div>
                </div>
              ) : (
                <div className="justify-start items-center gap-1.5 inline-flex">
                  <div className="w-2.5 h-2.5 bg-red-500 rounded-full" />
                  <div className="text-zinc-500 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">Завершен</div>
                </div>
              )}
            </div>
          </div>
          <div className="text-zinc-500 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">
            Код товара №{padWithZeros(String(lot.id))}
          </div>
          <div className="text-zinc-500 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">{lot.description}</div>
        </div>
        <div className="text-zinc-900 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">
          Состояние: {lot.condition === 'USED' ? 'Б/У' : 'новое'}
        </div>
        {lot.is_auction ? (
          <div className="flex flex-col gap-1">
            <div className="text-zinc-900 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">Текущая цена:</div>
            <div className="flex-col justify-start items-start inline-flex">
              <div className="text-right text-green-800 text-lg font-bold font-['SF Pro Text'] leading-snug tracking-tight">
                {lot.auction_current_price ? lot.auction_current_price.split('.')[0] : lot.price.split('.')[0]} BYN
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-1">
            <div className="text-zinc-900 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">Стоимость:</div>
            <div className="flex-col justify-start items-start inline-flex">
              <div className="text-right text-green-800 text-lg font-bold font-['SF Pro Text'] leading-snug tracking-tight">{lot.price.split('.')[0]} BYN</div>
            </div>
          </div>
        )}
        <div className="justify-start items-start gap-1.5 inline-flex">
          <div className=" text-zinc-500 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">
            {`Добавлено ${createdDate.toLocaleDateString()}, ${lot.city ? `${lot.city}` : ''}`}
          </div>
        </div>
      </div>
    </div>
  )
}
