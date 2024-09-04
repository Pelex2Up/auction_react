import { FC } from 'react'
import { LotT } from '../../../types/lotTypes'
import styles from './buttonStyles.module.scss'
import DefaultLink from '../../../components/common/DefaultLink'
import { generatePath, useNavigate } from 'react-router-dom'
import { LotPathE } from '../../../enum'
import { padWithZeros } from '../../../utils/articleNumberConverter'
import { selectLangSettings, useAppSelector } from '../../../store/hooks'
import { PriceDisplay } from '../../../components/PriceDisplay'

interface ILotComp {
  lot: LotT
}

export const ActionLotsComponent: FC<ILotComp> = ({ lot }) => {
  const { language, money } = useAppSelector(selectLangSettings)
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
                {language === 'RU' ? 'на модерации' : 'moderation'}
              </div>
            )}
            {lot.status === 'CLOSED' && (
              <div className="absolute top-0 left-0 z-99 w-full h-full bg-[rgba(113,113,122,0.5)] text-red-600 rounded font-sans text-lg font-bold flex items-center justify-center">
                {language === 'RU' ? 'завершен' : 'closed'}
              </div>
            )}
            <img className="w-full h-full rounded object-cover" src={lot.photos[0].image} />
          </div>
        ) : (
          <div className="w-full h-[187px] pl-[9px] pr-2 flex-col justify-center items-center gap-4 inline-flex relative">
            {lot.status === 'MODERATION' && (
              <div className="absolute top-0 left-0 z-99 w-full h-full bg-[rgba(113,113,122,0.5)] text-white rounded font-sans text-lg font-bold flex items-center justify-center">
                {language === 'RU' ? 'на модерации' : 'moderation'}
              </div>
            )}
            {lot.status === 'CLOSED' && (
              <div className="absolute top-0 left-0 z-99 w-full h-full bg-[rgba(113,113,122,0.5)] text-red-600 rounded font-sans text-lg font-bold flex items-center justify-center">
                {language === 'RU' ? 'завершен' : 'closed'}
              </div>
            )}
            <div className="w-[65px] h-[65px] pl-[21px] pr-[23px] pt-[15px] pb-3.5 bg-green-800 rounded justify-center items-center inline-flex">
              <div className="w-auto h-9 text-white text-3xl font-medium font-['SF Pro Text'] leading-9 tracking-tight">
                {lot.profile.name[0].toUpperCase()}
              </div>
            </div>
            <div className="w-auto text-zinc-900 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">{`${
              lot.profile.type === 'person' ? 'ФЛ' : lot.profile.type === 'company' ? 'ЮЛ' : 'ИП'
            } ${lot.profile.name.length > 15 ? lot.profile.name.slice(0, 15) + '...' : lot.profile.name}`}</div>
          </div>
        )}
        {lot.is_auction && (
          <div className="w-32 h-10 ml-2 mt-2 flex-col justify-start items-start gap-1.5 inline-flex">
            <div className="text-zinc-900 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">
              {language == 'RU' ? 'Аукцион до:' : 'Auction until:'}
            </div>
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
            {lot.is_auction ? (language === 'RU' ? 'Аукцион' : 'Auction') : language === 'RU' ? 'Фиксированная цена' : 'Fixed price'}
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col gap-2">
        <div className="w-full flex flex-col gap-1">
          <div className="w-full flex lg:flex-row flex-col-reverse justify-between gap-4">
            <DefaultLink text={lot.title} className={styles.link} href={generatePath(LotPathE.LotDetail, { slug: lot.slug })} />
            <div className="w-[84px] h-10 flex-col justify-start items-start gap-1.5 inline-flex">
              <div className="text-zinc-500 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">
                {language === 'RU' ? 'Статус:' : 'Status:'}
              </div>
              {endDate > currentDate ? (
                <div className="justify-start items-center gap-1.5 inline-flex">
                  <div className="w-2.5 h-2.5 bg-green-700 rounded-full" />
                  <div className="text-zinc-500 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">
                    {language === 'RU' ? 'Активный' : 'Active'}
                  </div>
                </div>
              ) : (
                <div className="justify-start items-center gap-1.5 inline-flex">
                  <div className="w-2.5 h-2.5 bg-red-500 rounded-full" />
                  <div className="text-zinc-500 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">
                    {language === 'RU' ? 'Завершен' : 'Closed'}
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="text-zinc-500 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">
            {language === 'RU' ? 'Код товара' : 'Product code'} №{padWithZeros(String(lot.id))}
          </div>
          <div className="text-zinc-500 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">{lot.description}</div>
        </div>
        <div className="text-zinc-900 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">
          {language === 'RU' ? 'Состояние' : 'Condition'}:{' '}
          {lot.condition === 'USED' ? (language === 'RU' ? 'Б/У' : 'used') : language === 'RU' ? 'новое' : 'new'}
        </div>
        {lot.is_auction ? (
          <div className="flex flex-col gap-1">
            <div className="text-zinc-900 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">
              {language === 'RU' ? 'Текущая цена' : 'Current price'}:
            </div>
            <PriceDisplay money={money} lot={lot} />
          </div>
        ) : (
          <div className="flex flex-col gap-1">
            <div className="text-zinc-900 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">
              {language === 'RU' ? 'Стоимость:' : 'Price:'}
            </div>
            <PriceDisplay money={money} lot={lot} />
          </div>
        )}
        <div className="justify-start items-start gap-1.5 inline-flex">
          <div className=" text-zinc-500 text-sm font-normal font-['SF Pro Text'] leading-[16.80px] tracking-tight">
            {`${language === 'RU' ? `Добавлено` : 'Created'} ${createdDate.toLocaleDateString()}, ${lot.city ? `${lot.city}` : ''}`}
          </div>
        </div>
      </div>
    </div>
  )
}
