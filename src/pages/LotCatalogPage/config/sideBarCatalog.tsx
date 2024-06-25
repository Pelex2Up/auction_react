import { FC, useEffect, useState } from 'react'
import { Button } from '../../../components/common/buttons'
import { ICategory } from '../../../types/commonTypes'
import { CatalogCategoriesSelector } from '../../../components/common/CatalogCategoriesSelector'
import { PriceFilter } from './filterComponents/price'
import { ConditionFilter } from './filterComponents/condition'
import { AdTypeFilter } from './filterComponents/adType'
import { LocationFilter } from './filterComponents/LocationFilter'
import { CatalogResponseT } from '../../../types/ResponseTypes'
import { LowerPriceFilter } from './filterComponents/lowerPriceFilter'
import styles from './filterComponents/componentsStyles.module.scss'
import { useGetCategoryMutation } from '../../../api/lotService'
import { SelectInputFilters } from '../../../components/common/SelectInputFilters/SelectInput'

interface ISideBarCatalog {
  categories: ICategory[]
  currentCategory: string | null
  lotsData: CatalogResponseT
  searchParams: URLSearchParams
  updateUrl: (newParams: any) => void
}

export const SideBarCatalog: FC<ISideBarCatalog> = ({ categories, currentCategory, lotsData, searchParams, updateUrl }) => {
  const [getCategoryData, { data: categoryData, isSuccess }] = useGetCategoryMutation()
  const [previousCategory, setPreviousCategory] = useState<string | null>(null)

  useEffect(() => {
    if ((currentCategory && currentCategory !== previousCategory) || (categoryData && !categoryData)) {
      getCategoryData(currentCategory as string)
      setPreviousCategory(currentCategory)
    }
  }, [isSuccess, currentCategory, previousCategory, getCategoryData])

  return (
    <ul className="w-full h-full xl:min-w-[312px] xl:w-[312px] xl:h-min flex flex-col gap-4 px-6 py-8 bg-[#F6F6F6] shadow-xl">
      <div className="w-full h-full">
        <SelectInputFilters
          className={styles.selectInputWrapper}
          optionsList={categories || []}
          selectedOption={searchParams.get('main_category') ? (searchParams.get('main_category') as string) : ''}
          setSelectedValue={(event) => updateUrl({ main_category: event, category: '' })}
          defaultOption="Выберите раздел"
        />
      </div>
      {categoryData &&
        categoryData.children.map((cat, index) => <CatalogCategoriesSelector key={index} category={cat} searchParams={searchParams} updateUrl={updateUrl} />)}
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
      />
    </ul>
  )
}
