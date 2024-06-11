import { FC, useEffect, useState } from 'react'
import LotDetail from './LotDetail'
import LotDescription from './LotDescription'
import { useParams } from 'react-router-dom'
import { useFetchCategoriesQuery, useFetchLotDataMutation } from '../../api/lotService'
import { Loader } from '../../components/Loader'

export const LotPage: FC = () => {
  const { lotId } = useParams()
  const [fetchLot, { data: lotData, isLoading }] = useFetchLotDataMutation()
  const { data: categories, isSuccess, isFetching } = useFetchCategoriesQuery()
  const [mainCategory, setMainCategory] = useState<string>('')
  const [subCategory, setSubCategory] = useState<string>('')

  useEffect(() => {
    if (isSuccess && lotData && !isFetching && !mainCategory) {
      const catName = categories.find((cat) => cat.id === lotData.category)
      if (catName) {
        setMainCategory(catName.title)
      } else {
        const cat = categories.find((cat) => cat.children.find((subCat) => subCat.id === lotData.category)?.title)
        if (cat) {
          setMainCategory(cat.title)
          const subCat = cat.children.find((cat) => cat.id === lotData.category)
          if (subCat) {
            setSubCategory(subCat.title)
          }
        }
      }
    }
  }, [categories, isFetching, isSuccess, lotData, mainCategory])

  useEffect(() => {
    if (!lotData && lotId && !isLoading) {
      fetchLot(Number(lotId))
    }
  }, [fetchLot, isLoading, lotData, lotId])

  if (!lotData) {
    return (
      <div className="w-full h-full xl:px-[60px] flex items-center justify-center">
        <Loader />
      </div>
    )
  }

  return (
    <div className="w-full h-full flex flex-col gap-4 xl:px-[60px]">
      <LotDetail lotData={lotData} category={mainCategory} subCategory={subCategory} />
      <LotDescription lotData={lotData} category={mainCategory} subCategory={subCategory} />
    </div>
  )
}
