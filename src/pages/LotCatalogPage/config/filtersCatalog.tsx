import { FC, useState } from 'react'
import { SelectInputFilters } from '../../../components/common/SelectInputFilters/SelectInput'
import { ArrowDown } from '../../../assets/svg/arrowDown'
import { CatalogResponseT } from '../../../types/ResponseTypes'
import { CloseIconPath } from './assets/CloseIconPath'
import { selectLangSettings, useAppSelector } from '../../../store/hooks'
import { ICategory } from '../../../types/commonTypes'

interface IFilterCatalog {
  data: CatalogResponseT
  searchParams: URLSearchParams
  updateUrl: (newParams: any) => void
  catData: ICategory | undefined
  setCatData: (arg: ICategory | undefined) => void
}

export const FiltersCatalog: FC<IFilterCatalog> = ({ data, searchParams, updateUrl, catData, setCatData }) => {
  const { language } = useAppSelector(selectLangSettings)
  const sortList = [
    { label: language === 'RU' ? 'Без сортировки' : "Don't sort", value: '' },
    { label: language === 'RU' ? 'Цене (возрастание)' : 'Price (asc)', value: 'price' },
    { label: language === 'RU' ? 'Цене (убывание)' : 'Price (desc)', value: '-price' },
    { label: language === 'RU' ? 'Названию (А-Я)' : 'Title (A-Z)', value: 'title' },
    { label: language === 'RU' ? 'Названию (Я-А)' : 'Title (Z-A)', value: '-title' },
    { label: language === 'RU' ? 'Дате добавления (от нового)' : 'Date (from new)', value: '-start_date' },
    { label: language === 'RU' ? 'Дате добавления (от старого)' : 'Date (from old)', value: 'start_date' }
  ]
  const [selectedFilter, setSelectedFilter] = useState<string>('')

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="w-full lg:h-[60px] bg-[#F8F8F8] shadow flex flex-wrap justify-between items-center gap-4 px-6 lg:py-0 py-6">
        <div className="flex lg:flex-row flex-col items-start lg:items-center gap-2">
          <span className="text-green-700 text-base font-medium font-['SF Pro Text'] leading-tight tracking-tight">
            {language === 'RU' ? 'Сортировать по' : 'Sort by'}
          </span>
          <div className="w-[199px] h-[36px] flex items-center">
            <SelectInputFilters
              selectedOption={selectedFilter}
              optionsList={sortList}
              defaultOption={language === 'RU' ? 'Без сортировки' : "Don't sort"}
              setSelectedValue={(event) => {
                setSelectedFilter(event as string)
                updateUrl({ ordering: event as string })
              }}
            />
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
            <div className="text-zinc-500 text-sm font-normal font-['SF Pro Text'] leading-none">
              {language === 'RU' ? 'цена от' : 'price from'} {searchParams.get('price_min')}
            </div>
            <button onClick={() => updateUrl({ price_min: '', page: 1 })} className="cursor-pointer">
              <CloseIconPath height={4} width={4} />
            </button>
          </div>
        )}
        {searchParams.get('price_max') && (
          <div className="w-max h-7 px-[13px] py-[5px] rounded border border-zinc-300 justify-between items-center gap-1.5 inline-flex">
            <div className="text-zinc-500 text-sm font-normal font-['SF Pro Text'] leading-none">
              {language === 'RU' ? 'цена до' : 'price to'} {searchParams.get('price_max')}
            </div>
            <button onClick={() => updateUrl({ price_max: '', page: 1 })} className="cursor-pointer">
              <CloseIconPath height={4} width={4} />
            </button>
          </div>
        )}
        {searchParams.get('condition') && (
          <div className="w-max h-7 px-[13px] py-[5px] rounded border border-zinc-300 justify-between items-center gap-1.5 inline-flex">
            <div className="text-zinc-500 text-sm font-normal font-['SF Pro Text'] leading-none">
              {language === 'RU' ? 'состояние:' : 'condition:'}{' '}
              {searchParams.get('condition') === 'NEW' ? (language === 'RU' ? 'новое' : 'new') : language === 'RU' ? 'Б/У' : 'used'}
            </div>
            <button onClick={() => updateUrl({ condition: '', page: 1 })} className="cursor-pointer">
              <CloseIconPath height={4} width={4} />
            </button>
          </div>
        )}
        {searchParams.get('ad_type') && (
          <div className="w-max h-7 px-[13px] py-[5px] rounded border border-zinc-300 justify-between items-center gap-1.5 inline-flex">
            <div className="text-zinc-500 text-sm font-normal font-['SF Pro Text'] leading-none">
              {language === 'RU' ? 'тип объявления:' : 'variant:'}{' '}
              {searchParams.get('ad_type') === 'BUY' ? (language === 'RU' ? 'покупка' : 'buy') : language === 'RU' ? 'продажа' : 'sell'}
            </div>
            <button onClick={() => updateUrl({ ad_type: '', page: 1 })} className="cursor-pointer">
              <CloseIconPath height={4} width={4} />
            </button>
          </div>
        )}
        {searchParams.get('is_auction') && (
          <div className="w-max h-7 px-[13px] py-[5px] rounded border border-zinc-300 justify-between items-center gap-1.5 inline-flex">
            <div className="text-zinc-500 text-sm font-normal font-['SF Pro Text'] leading-none">
              {language === 'RU' ? 'тип покупки:' : 'purchase type:'}{' '}
              {searchParams.get('is_auction') === 'true'
                ? language === 'RU'
                  ? 'аукцион'
                  : 'auction'
                : language === 'RU'
                ? 'фиксированная цена'
                : 'fixed price'}
            </div>
            <button onClick={() => updateUrl({ is_auction: '', page: 1 })} className="cursor-pointer">
              <CloseIconPath height={4} width={4} />
            </button>
          </div>
        )}
        {searchParams.get('region') && (
          <div className="w-max h-7 px-[13px] py-[5px] rounded border border-zinc-300 justify-between items-center gap-1.5 inline-flex">
            <div className="text-zinc-500 text-sm font-normal font-['SF Pro Text'] leading-none">
              {language === 'RU' ? 'область:' : 'state:'} {searchParams.get('region')}
            </div>
            <button onClick={() => updateUrl({ region: '', page: 1 })} className="cursor-pointer">
              <CloseIconPath height={4} width={4} />
            </button>
          </div>
        )}
        {searchParams.get('city') && (
          <div className="w-max h-7 px-[13px] py-[5px] rounded border border-zinc-300 justify-between items-center gap-1.5 inline-flex">
            <div className="text-zinc-500 text-sm font-normal font-['SF Pro Text'] leading-none">
              {language === 'RU' ? 'город:' : 'city'} {searchParams.get('city')}
            </div>
            <button onClick={() => updateUrl({ city: '', page: 1 })} className="cursor-pointer">
              <CloseIconPath height={4} width={4} />
            </button>
          </div>
        )}
        {searchParams.get('old_price_reduced') && searchParams.get('old_price_reduced') === 'true' && (
          <div className="w-max h-7 px-[13px] py-[5px] rounded border border-zinc-300 justify-between items-center gap-1.5 inline-flex">
            <div className="text-zinc-500 text-sm font-normal font-['SF Pro Text'] leading-none">{language === 'RU' ? 'сниженная цена' : 'discount price'}</div>
            <button onClick={() => updateUrl({ old_price_reduced: 'false', page: 1 })} className="cursor-pointer">
              <CloseIconPath height={4} width={4} />
            </button>
          </div>
        )}
        {searchParams.size >= 2 && (
          <div className="w-max h-7 px-[13px] py-[5px] rounded border border-zinc-300 justify-between items-center gap-1.5 inline-flex">
            <div className="text-zinc-500 text-sm font-normal font-['SF Pro Text'] leading-none">
              {language === 'RU' ? 'сбросить фильтры' : 'reset filters'}
            </div>
            <button
              onClick={() => {
                setCatData(undefined)
                updateUrl({
                  ad_type: '',
                  price_min: '',
                  price_max: '',
                  condition: '',
                  is_auction: '',
                  region: '',
                  city: '',
                  old_price_reduced: '',
                  main_category: '',
                  category: '', page: 1
                })
              }}
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
