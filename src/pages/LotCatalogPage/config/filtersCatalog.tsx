import { FC } from 'react'
import { SelectInputFilters } from '../../../components/common/SelectInputFilters/SelectInput'
import { ArrowDown } from '../../../assets/svg/arrowDown'
import { CatalogResponseT } from '../../../types/ResponseTypes'
import { CloseIcon } from '../../../assets/svg/closeIcon'
import { CloseIconPath } from './assets/CloseIconPath'

const sortList = [
  { label: 'Без сортировки', value: '' },
  { label: 'Цене (возрастание)', value: 'price' },
  { label: 'Цене (убывание)', value: '-price' },
  { label: 'Названию (А-Я)', value: 'title' },
  { label: 'Названию (Я-А)', value: '-title' },
  { label: 'Дате добавления (от нового)', value: '-start_date' },
  { label: 'Дате добавления (от старого)', value: 'start_date' }
]

interface IFilterCatalog {
  data: CatalogResponseT
  searchParams: URLSearchParams
  updateUrl: (newParams: any) => void
}

export const FiltersCatalog: FC<IFilterCatalog> = ({ data, searchParams, updateUrl }) => {
  return (
    <div className="flex w-full flex-col gap-4">
      <div className="w-full h-[60px] bg-[#F8F8F8] shadow flex justify-between items-center gap-4 p-6">
        <div className="flex items-center gap-2">
          <span className="text-green-700 text-base font-medium font-['SF Pro Text'] leading-tight tracking-tight">Сортировать по</span>
          <div className="w-[199px] h-[36px] flex items-center">
            <SelectInputFilters optionsList={sortList} defaultOption="Без сортировки" setSelectedValue={(event) => updateUrl({ ordering: event as string })} />
          </div>
        </div>

        <div className="w-auto h-7 justify-start items-center gap-2 inline-flex">
          <button
            className="w-3.5 h-3.5 flex items-center relative rotate-90"
            disabled={parseInt(searchParams.get('page') as string) === 1}
            onClick={() => updateUrl({ page: parseInt(searchParams.get('page') as string) - 1 })}
          >
            <ArrowDown />
          </button>
          <div className="w-[33px] h-7 px-[13px] py-[5px] rounded border border-zinc-300 justify-center items-center flex">
            <div className="text-zinc-500 text-sm font-normal font-['SF Pro Text'] leading-none">{searchParams.get('page')}</div>
          </div>
          <div className="text-zinc-500 text-sm font-normal font-['SF Pro Text'] leading-none">из {Math.ceil(data.count / 22)}</div>
          <button
            className="flex items-center w-3.5 h-3.5 relative -rotate-90"
            disabled={parseInt(searchParams.get('page') as string) === Math.ceil(data.count / 22)}
            onClick={() => updateUrl({ page: parseInt(searchParams.get('page') as string) + 1 })}
          >
            <ArrowDown />
          </button>
        </div>
      </div>
      <div className="flex flex-wrap gap-4">
        {searchParams.get('price_min') && (
          <div className="w-max h-7 px-[13px] py-[5px] rounded border border-zinc-300 justify-between items-center gap-1.5 inline-flex">
            <div className="text-zinc-500 text-sm font-normal font-['SF Pro Text'] leading-none">цена от {searchParams.get('price_min')}</div>
            <button onClick={() => updateUrl({ price_min: '' })} className="cursor-pointer">
              <CloseIconPath height={4} width={4} />
            </button>
          </div>
        )}
        {searchParams.get('price_max') && (
          <div className="w-max h-7 px-[13px] py-[5px] rounded border border-zinc-300 justify-between items-center gap-1.5 inline-flex">
            <div className="text-zinc-500 text-sm font-normal font-['SF Pro Text'] leading-none">цена до {searchParams.get('price_max')}</div>
            <button onClick={() => updateUrl({ price_max: '' })} className="cursor-pointer">
              <CloseIconPath height={4} width={4} />
            </button>
          </div>
        )}
        {searchParams.get('condition') && (
          <div className="w-max h-7 px-[13px] py-[5px] rounded border border-zinc-300 justify-between items-center gap-1.5 inline-flex">
            <div className="text-zinc-500 text-sm font-normal font-['SF Pro Text'] leading-none">
              состояние: {searchParams.get('condition') === 'NEW' ? 'новое' : 'Б/У'}
            </div>
            <button onClick={() => updateUrl({ condition: '' })} className="cursor-pointer">
              <CloseIconPath height={4} width={4} />
            </button>
          </div>
        )}
        {searchParams.get('ad_type') && (
          <div className="w-max h-7 px-[13px] py-[5px] rounded border border-zinc-300 justify-between items-center gap-1.5 inline-flex">
            <div className="text-zinc-500 text-sm font-normal font-['SF Pro Text'] leading-none">
              тип объявления: {searchParams.get('ad_type') === 'BUY' ? 'покупка' : 'продажа'}
            </div>
            <button onClick={() => updateUrl({ ad_type: '' })} className="cursor-pointer">
              <CloseIconPath height={4} width={4} />
            </button>
          </div>
        )}
        {searchParams.get('is_auction') && (
          <div className="w-max h-7 px-[13px] py-[5px] rounded border border-zinc-300 justify-between items-center gap-1.5 inline-flex">
            <div className="text-zinc-500 text-sm font-normal font-['SF Pro Text'] leading-none">
              тип покупки: {searchParams.get('is_auction') === 'true' ? 'аукцион' : 'фиксированная цена'}
            </div>
            <button onClick={() => updateUrl({ is_auction: '' })} className="cursor-pointer">
              <CloseIconPath height={4} width={4} />
            </button>
          </div>
        )}
        {searchParams.get('region') && (
          <div className="w-max h-7 px-[13px] py-[5px] rounded border border-zinc-300 justify-between items-center gap-1.5 inline-flex">
            <div className="text-zinc-500 text-sm font-normal font-['SF Pro Text'] leading-none">область: {searchParams.get('region')}</div>
            <button onClick={() => updateUrl({ region: '' })} className="cursor-pointer">
              <CloseIconPath height={4} width={4} />
            </button>
          </div>
        )}
        {searchParams.get('city') && (
          <div className="w-max h-7 px-[13px] py-[5px] rounded border border-zinc-300 justify-between items-center gap-1.5 inline-flex">
            <div className="text-zinc-500 text-sm font-normal font-['SF Pro Text'] leading-none">город: {searchParams.get('city')}</div>
            <button onClick={() => updateUrl({ city: '' })} className="cursor-pointer">
              <CloseIconPath height={4} width={4} />
            </button>
          </div>
        )}
        {searchParams.get('old_price_reduced') && searchParams.get('old_price_reduced') === 'true' && (
          <div className="w-max h-7 px-[13px] py-[5px] rounded border border-zinc-300 justify-between items-center gap-1.5 inline-flex">
            <div className="text-zinc-500 text-sm font-normal font-['SF Pro Text'] leading-none">сниженная цена</div>
            <button onClick={() => updateUrl({ old_price_reduced: 'false' })} className="cursor-pointer">
              <CloseIconPath height={4} width={4} />
            </button>
          </div>
        )}
        {searchParams.size > 2 && (
          <div className="w-max h-7 px-[13px] py-[5px] rounded border border-zinc-300 justify-between items-center gap-1.5 inline-flex">
            <div className="text-zinc-500 text-sm font-normal font-['SF Pro Text'] leading-none">сбросить фильтр</div>
            <button
              onClick={() =>
                updateUrl({
                  ad_type: '',
                  price_min: '',
                  price_max: '',
                  condition: '',
                  is_auction: '',
                  region: '',
                  city: '',
                  old_price_reduced: '',
                  main_category: ''
                })
              }
              className="cursor-pointer"
            >
              <CloseIconPath height={4} width={4} />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
