import { FC, useCallback, useEffect, useState } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'
import { SideBarCatalog } from './config/sideBarCatalog'
import { LotsCatalogSchedule } from './config/lotsCatalogSchedule'
import { FiltersCatalog } from './config/filtersCatalog'
import { useFetchCategoriesQuery, useSearchAdvertisementMutation } from '../../api/lotService'
import { Loader } from '../../components/Loader'
import { useDispatch } from 'react-redux'
import { debounce } from 'lodash'
import { CatalogResponseT } from '../../types/ResponseTypes'

export const LotCatalogPage: FC = () => {
  const location = useLocation()
  const dispatch = useDispatch()
  const { data: categories, isFetching } = useFetchCategoriesQuery()
  // const searchParams = new URLSearchParams(location.search)
  const [searchParams, setSearchParams] = useSearchParams(location.search)
  const [getPageData, { data, isSuccess, isLoading }] = useSearchAdvertisementMutation()
  const [catalogData, setCatalogData] = useState<CatalogResponseT>()
  const category = searchParams.get('category')

  const updateUrl = async (newParams: any) => {
    const currentParams = Object.fromEntries(searchParams)
    const updatedParams = { ...currentParams, ...newParams }
    await setSearchParams(updatedParams)
    const newUrl = new URLSearchParams(updatedParams)
    await debouncedUpdateData(`?${newUrl.toString()}`)
  }

  useEffect(() => {
    if (isSuccess && data) {
      setCatalogData(data)
    }
  }, [data, isSuccess])

  useEffect(() => {
    if (!isLoading && location && !catalogData) {
      getPageData(`?${searchParams}`)
        .unwrap()
        .then((data) => setCatalogData(data))
    }
  }, [catalogData, isLoading, getPageData, location.search])

  const debouncedUpdateData = useCallback(
    debounce((params) => getPageData(params), 500),
    [getPageData]
  )

  if (!catalogData || isFetching) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Loader />
      </div>
    )
  }

  return (
    <div className="flex-col xl:flex-row flex gap-8 px-4 xl:px-[60px]">
      <SideBarCatalog categories={categories ?? []} lotsData={catalogData} currentCategory={category} searchParams={searchParams} updateUrl={updateUrl} />
      <div className="w-full flex-col flex gap-4">
        <FiltersCatalog data={catalogData} searchParams={searchParams} updateUrl={updateUrl} />
        <LotsCatalogSchedule lotsData={catalogData.results} />
      </div>
    </div>
  )
}
