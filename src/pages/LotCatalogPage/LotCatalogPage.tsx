import { FC, useCallback, useEffect, useState } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'
import { SideBarCatalog } from './config/sideBarCatalog'
import { LotsCatalogSchedule } from './config/lotsCatalogSchedule'
import { FiltersCatalog } from './config/filtersCatalog'
import { useFetchCategoriesQuery, useSearchAdvertisementMutation } from '../../api/lotService'
import { Loader } from '../../components/Loader'
import { Button } from '../../components/common/buttons'
import Input from '../../components/common/Input'
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
  const ordering = searchParams.get('ordering')
  const ad_type = searchParams.get('ad_type')
  const price_min = searchParams.get('price_min')
  const price_max = searchParams.get('price_max')
  const page = searchParams.get('page')
  const old_price_reduced = searchParams.get('old_price_reduced')
  const region = searchParams.get('region')
  const condition = searchParams.get('condition')
  const is_auction = searchParams.get('is_auction')

  const updateUrl = (newParams: any) => {
    const currentParams = Object.fromEntries(searchParams)
    const updatedParams = { ...currentParams, ...newParams }
    setSearchParams(updatedParams)
    debouncedUpdateData(location.search)
  }

  useEffect(() => {
    if (!isLoading && location && !catalogData) {
      getPageData(location.search ?? '')
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
      <SideBarCatalog categories={categories ?? []} lotsData={catalogData} currentCategory={category}/>
      <div className="w-full flex-col flex gap-4">
        <FiltersCatalog data={catalogData} />
        <LotsCatalogSchedule lotsData={catalogData.results} />
      </div>
    </div>
  )
}
