import { FC } from 'react'
import { Button } from '../../../components/common/buttons'
import { ICategory } from '../../../types/commonTypes'
import { CatalogCategoriesSelector } from '../../../components/common/CatalogCategoriesSelector'
import { PriceFilter } from './filterComponents/price'
import { ConditionFilter } from './filterComponents/condition'
import { AdTypeFilter } from './filterComponents/adType'
import { LocationFilter } from './filterComponents/LocationFilter'
import { CatalogResponseT } from '../../../types/ResponseTypes'
import { LowerPriceFilter } from './filterComponents/lowerPriceFilter'

interface ISideBarCatalog {
  categories: ICategory[]
  currentCategory: string | null
  lotsData: CatalogResponseT
  searchParams: URLSearchParams
  updateUrl: (newParams: any) => void
}

export const SideBarCatalog: FC<ISideBarCatalog> = ({ categories, currentCategory, lotsData, searchParams, updateUrl }) => {
  return (
    <ul className="min-w-[312px] w-[312px] h-min hidden xl:flex flex-col gap-4 px-6 py-8 bg-[#F6F6F6] shadow-xl">
      {categories.map((cat, index) => (
        <CatalogCategoriesSelector key={index} category={cat} />
      ))}
      <li className="text-zinc-900 text-2xl font-medium font-['SF Pro Text'] leading-[28.80px] tracking-tight">Фильтр</li>
      <PriceFilter searchParams={searchParams} updateUrl={updateUrl} />
      <ConditionFilter searchParams={searchParams} updateUrl={updateUrl} />
      <AdTypeFilter searchParams={searchParams} updateUrl={updateUrl} />
      <LocationFilter searchParams={searchParams} updateUrl={updateUrl} />
      <LowerPriceFilter searchParams={searchParams} updateUrl={updateUrl} />
      <li className="text-zinc-500 text-sm font-normal font-['SF Pro Text'] leading-[17px]">Найдено {lotsData.count} товар(ов)</li>
      <Button
        text="Сбросить фильтры"
        className="w-full"
        variant="secondary"
        onClick={() => updateUrl({ ad_type: '', price_min: '', price_max: '', condition: '', is_auction: '', region: '', city: '', old_price_reduced: '' })}
      />
    </ul>
  )
}