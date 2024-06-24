import { FC } from 'react'
import { SelectInputFilters } from '../../../components/common/SelectInputFilters/SelectInput'
import { ArrowDown } from '../../../assets/svg/arrowDown'
import { CatalogResponseT } from '../../../types/ResponseTypes'

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
    </div>
  )
}
