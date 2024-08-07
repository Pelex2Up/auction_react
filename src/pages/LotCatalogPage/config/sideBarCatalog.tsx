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
import { selectLangSettings, useAppSelector } from '../../../store/hooks'
import { Loader } from '../../../components/Loader'

interface ISideBarCatalog {
  categories: ICategory[]
  currentCategory: string | null
  lotsData: CatalogResponseT
  searchParams: URLSearchParams
  updateUrl: (newParams: any) => void
  catData: ICategory | undefined
  setCatData: (arg: ICategory | undefined) => void
}

export const SideBarCatalog: FC<ISideBarCatalog> = ({ categories, currentCategory, lotsData, searchParams, updateUrl, catData, setCatData }) => {
  const { language } = useAppSelector(selectLangSettings)
  const [getCategoryData, { data: categoryData, isSuccess, isLoading, isError }] = useGetCategoryMutation()
  const [previousCategory, setPreviousCategory] = useState<string | null>(null)

  useEffect(() => {
    if (categoryData && isSuccess) {
      setCatData(categoryData)
    }
  }, [isSuccess, categoryData])

  useEffect(() => {
    if ((currentCategory && currentCategory !== previousCategory) || (categoryData && !categoryData)) {
      getCategoryData(currentCategory as string)
      setPreviousCategory(currentCategory)
    }
  }, [isSuccess, currentCategory, previousCategory, getCategoryData])

  return (
    <ul className="w-full h-full xl:min-w-[312px] xl:w-[312px] xl:h-min flex flex-col gap-4 px-6 py-8 bg-[#F6F6F6] shadow-xl relative">
      {(isLoading || isError) && <div className="absolute flex w-full h-full items-center justify-center inset-0 backdrop-blur-sm z-50" />}
      <div className="w-full h-full">
        <SelectInputFilters
          className={styles.selectInputWrapper}
          optionsList={categories || []}
          selectedOption={searchParams.get('main_category') ? (searchParams.get('main_category') as string) : ''}
          setSelectedValue={(event) => updateUrl({ main_category: event, category: '', page: 1 })}
          defaultOption={language === 'RU' ? 'Выберите раздел' : 'Choose category'}
        />
      </div>
      {catData &&
        catData.children.map((cat, index) => <CatalogCategoriesSelector key={index} category={cat} searchParams={searchParams} updateUrl={updateUrl} />)}
      <li className="text-zinc-900 text-2xl font-medium font-['SF Pro Text'] leading-[28.80px] tracking-tight">{language === 'RU' ? 'Фильтр' : 'Filter'}</li>
      <PriceFilter searchParams={searchParams} updateUrl={updateUrl} />
      <ConditionFilter searchParams={searchParams} updateUrl={updateUrl} />
      <AdTypeFilter searchParams={searchParams} updateUrl={updateUrl} />
      <LocationFilter searchParams={searchParams} updateUrl={updateUrl} />
      <LowerPriceFilter searchParams={searchParams} updateUrl={updateUrl} />
      <li className="text-zinc-500 text-sm font-normal font-['SF Pro Text'] leading-[17px]">
        {language === 'RU' ? `Найдено ${lotsData.count} товар(ов)` : `Found ${lotsData.count} lot(s)`}
      </li>
      <Button
        text={language === 'RU' ? 'Сбросить фильтры' : 'Reset filters'}
        className="w-full"
        variant="secondary"
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
            category: '',
            page: 1
          })
        }}
      />
    </ul>
  )
}
