import { FC } from 'react'
import { LotT } from '../../../types/lotTypes'
import { EditSVG } from '../../../assets/svg/editSVG'
import { DeleteSVG } from '../../../assets/svg/deleteSVG'
import styles from './buttonStyles.module.scss'
import { Tooltip } from '@mui/material'
import DefaultLink from '../../../components/common/DefaultLink'
import { Loader } from '../../../components/Loader'
import { generatePath, useNavigate } from 'react-router-dom'
import { LotPathE } from '../../../enum'

interface ILotComp {
  lot: LotT
  deleteLot: (id: number) => void
  isDeleting: boolean
}

export const FixedPriceLotComponent: FC<ILotComp> = ({ lot, deleteLot, isDeleting }) => {
  const createdDate = new Date(lot.created)
  const endDate = new Date(lot.auction_end_date)
  const navigate = useNavigate()

  return (
    <div className="w-full h-auto py-6 pl-0 pr-6 gap-6 flex shadow bg-white">
      <div className="w-full max-w-[259px] h-full relative cursor-pointer">
        {lot.photos.length > 0 ? (
          <img className="w-full h-[187px] rounded object-cover" src={lot.photos[0].image} />
        ) : (
          <div className="w-full h-[187px] pl-[9px] pr-2 flex-col justify-center items-center gap-4 inline-flex">
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
        <div className="w-32 h-10 ml-2 mt-2 flex-col justify-start items-start gap-1.5 inline-flex">
          <div className="text-zinc-900 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">Аукцион до:</div>
          <div className="flex-col justify-start items-start gap-1.5 flex">
            <div className="justify-start items-start gap-1.5 inline-flex">
              <div className="text-zinc-500 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">{endDate.toLocaleDateString()}</div>
              <div className="text-zinc-500 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">{endDate.toLocaleTimeString()}</div>
            </div>
          </div>
        </div>
        <div className="p-2 left-0 top-[10px] absolute bg-white rounded-tr rounded-br justify-start items-center gap-2.5 inline-flex">
          <div className="text-green-800 text-xs font-normal font-['SF Pro Text'] leading-[14.40px] tracking-tight">
            {lot.is_auction ? 'Аукцион' : 'Фиксированная цена'}
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col gap-2">
        <div className="w-full flex flex-col gap-1">
          <div className="w-full flex justify-between">
            <DefaultLink text={lot.title} className={styles.link} />

            <div className="flex gap-2">
              <Tooltip title="Редактировать">
                <button className={styles.buttons} onClick={() => navigate(generatePath(LotPathE.EditLot, { id: String(lot.id) }))}>
                  <EditSVG />
                </button>
              </Tooltip>
              {isDeleting ? (
                <div className="w-[22px] h-[24px] flex items-center justify-center">
                  <Loader />
                </div>
              ) : (
                <Tooltip title="Удалить">
                  <button onClick={() => deleteLot(lot.id)}>
                    <DeleteSVG />
                  </button>
                </Tooltip>
              )}
            </div>
          </div>
          <div className="text-zinc-500 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">
            Код товара №{lot.article_number ? `0000${lot.article_number}` : '000000'}
          </div>
          <div className="text-zinc-500 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">{lot.description}</div>
        </div>
        <div className="text-zinc-900 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">
          Состояние: {lot.condition === 'USED' ? 'Б/У' : 'новое'}
        </div>
        <div className="text-zinc-900 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">Стоимость:</div>
        <div className="flex-col justify-start items-start inline-flex">
          <div className="text-right text-green-800 text-lg font-bold font-['SF Pro Text'] leading-snug tracking-tight">{lot.price.split('.')[0]} BYN</div>
        </div>

        <div className="justify-start items-start gap-1.5 inline-flex">
          <div className=" text-zinc-500 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">
            {`Добавлено ${createdDate.toLocaleDateString()}, ${lot.city ? `${lot.city}` : ''}`}
          </div>
        </div>
      </div>
    </div>
  )
}
