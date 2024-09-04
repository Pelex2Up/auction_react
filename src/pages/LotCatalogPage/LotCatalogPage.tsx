import { FC, useCallback, useEffect, useRef, useState } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'
import { SideBarCatalog } from './config/sideBarCatalog'
import { LotsCatalogSchedule } from './config/lotsCatalogSchedule'
import { FiltersCatalog } from './config/filtersCatalog'
import { useFetchCategoriesQuery, useGetCategoryMutation, useSearchAdvertisementMutation } from '../../api/lotService'
import { Loader } from '../../components/Loader'
import { debounce } from 'lodash'
import { CatalogResponseT } from '../../types/ResponseTypes'
import { Pagination } from '@mui/material'
import { useAppendLotInCartMutation, useAppendManyLotsInCartMutation } from '../../api/userService'
import { toast } from 'react-toastify'
import { ICategory } from '../../types/commonTypes'

export const LotCatalogPage: FC = () => {
  const location = useLocation()
  const { data: categories, isFetching, isError: errorCategories } = useFetchCategoriesQuery()
  const [searchParams, setSearchParams] = useSearchParams(location.search)
  const [getPageData, { data, isSuccess, isLoading, isError }] = useSearchAdvertisementMutation()
  const [catalogData, setCatalogData] = useState<CatalogResponseT>()
  const category = searchParams.get('main_category')
  const subCat = searchParams.get('category')
  const [addToCart, { isSuccess: isSuccessCart, isError: isErrorCart, error }] = useAppendLotInCartMutation()
  const [addManyToCart, { isSuccess: isSuccessCartMany }] = useAppendManyLotsInCartMutation()
  const [catData, setCatData] = useState<ICategory | undefined>()

  function filterObjectByValues(obj: Record<string, any>): Record<string, any> {
    return Object.fromEntries(Object.entries(obj).filter(([_, value]) => String(value).length > 0))
  }

  const findTopCategory = (categories: ICategory[], currentId: number): ICategory => {
    const findCat: ICategory = categories[0]
    const inSecondCat = categories.find((cat) => cat.children.find((subCat) => subCat.id === currentId))
    const inThirdCat = categories.find((cat) => cat.children.find((subCat) => subCat.children.find((child) => child.id === currentId)))

    if (inSecondCat) {
      return inSecondCat
    } else if (inThirdCat) {
      return inThirdCat
    } else {
      return findCat
    }
  }

  useEffect(() => {
    if (!category && subCat && categories) {
      const parent = findTopCategory(categories, Number(subCat))
      if (parent) {
        updateUrl({ main_category: parent.id })
      }
    }
  }, [category, subCat, categories])

  const updateUrl = async (newParams: any) => {
    const currentParams = Object.fromEntries(searchParams)
    const updatedParams = { ...currentParams, ...newParams }
    await setSearchParams(updatedParams)
    const filteredParams = filterObjectByValues(updatedParams)
    const newUrl = new URLSearchParams(filteredParams)
    await setSearchParams(filteredParams)
    await debouncedUpdateData(`?${newUrl.toString()}`)
  }

  const getPageDataMemo = useCallback((params: string) => getPageData(params).unwrap(), [getPageData])

  useEffect(() => {
    if (!isLoading && location && !catalogData && !isError) {
      getPageDataMemo(`?${searchParams}`).then((data) => setCatalogData(data))
      updateUrl({ page: 1 })
    }
  }, [catalogData, isLoading, getPageDataMemo, searchParams])

  useEffect(() => {
    if (isSuccessCartMany) {
      toast('Лоты успешно добавлены в корзину', { type: 'success' })
      getPageDataMemo(`?${searchParams}`).then((data) => setCatalogData(data))
    }
  }, [isSuccessCartMany])

  useEffect(() => {
    if (isSuccessCart) {
      toast('Лот успешно добавлен в корзину', { type: 'success' })
      getPageDataMemo(`?${searchParams}`).then((data) => setCatalogData(data))
    }
  }, [isSuccessCart])

  useEffect(() => {
    if (error && 'status' in error && isErrorCart && error.status === 400) {
      toast('Вы не можете добавить своё собственное объявление в корзину', { type: 'warning' })
    }
  }, [isErrorCart, error])

  useEffect(() => {
    if (isSuccess && data) {
      setCatalogData(data)
    }
  }, [data, isSuccess])

  const debouncedUpdateData = useCallback(
    debounce((params) => getPageData(params), 500),
    [getPageData]
  )

  if (!catalogData || isFetching || isError || errorCategories) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Loader />
      </div>
    )
  }

  return (
    <div className="flex-col xl:flex-row flex gap-8 px-4 xl:px-[60px]">
      <SideBarCatalog
        catData={catData}
        setCatData={setCatData}
        categories={categories ?? []}
        lotsData={catalogData}
        currentCategory={category}
        searchParams={searchParams}
        updateUrl={updateUrl}
      />
      <div className="w-full flex-col flex gap-4">
        <FiltersCatalog catData={catData} setCatData={setCatData} data={catalogData} searchParams={searchParams} updateUrl={updateUrl} />
        <LotsCatalogSchedule lotsData={catalogData.results} addToCart={addToCart} addManyToCart={addManyToCart} isLoading={isLoading} isError={isError} />
        {/* {parseInt(searchParams.get('page') as string) > 1 && ( */}
        <div className="w-full flex items-center justify-center mt-6">
          <Pagination
            count={Math.ceil(catalogData.count / 22)}
            size="small"
            page={parseInt(searchParams.get('page') as string)}
            onChange={(event, value) => updateUrl({ page: value })}
          />
        </div>
        {/* )} */}
      </div>
    </div>
  )
}
