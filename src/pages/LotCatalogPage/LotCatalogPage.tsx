import { FC, useCallback, useEffect, useRef, useState } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'
import { SideBarCatalog } from './config/sideBarCatalog'
import { LotsCatalogSchedule } from './config/lotsCatalogSchedule'
import { FiltersCatalog } from './config/filtersCatalog'
import { useFetchCategoriesQuery, useSearchAdvertisementMutation } from '../../api/lotService'
import { Loader } from '../../components/Loader'
import { debounce } from 'lodash'
import { CatalogResponseT } from '../../types/ResponseTypes'
import { Pagination } from '@mui/material'

export const LotCatalogPage: FC = () => {
  const location = useLocation()
  const { data: categories, isFetching } = useFetchCategoriesQuery()
  const [searchParams, setSearchParams] = useSearchParams(location.search)
  const [getPageData, { data, isSuccess, isLoading, isError }] = useSearchAdvertisementMutation()
  const [catalogData, setCatalogData] = useState<CatalogResponseT>()
  const category = searchParams.get('main_category')

  function filterObjectByValues(obj: Record<string, any>): Record<string, any> {
    return Object.fromEntries(Object.entries(obj).filter(([_, value]) => String(value).length > 0))
  }

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
    }
  }, [catalogData, isLoading, getPageDataMemo, searchParams])

  useEffect(() => {
    if (isSuccess && data) {
      setCatalogData(data)
    }
  }, [data, isSuccess])

  const debouncedUpdateData = useCallback(
    debounce((params) => getPageData(params), 500),
    [getPageData]
  )

  if (!catalogData || isFetching || isError) {
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
