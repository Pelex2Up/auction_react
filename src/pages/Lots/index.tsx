import { FC, useEffect, useState } from 'react'
import LotDetail from './LotDetail'
import LotDescription from './LotDescription'
import { generatePath, useNavigate, useParams } from 'react-router-dom'
import { useFetchCategoriesQuery, useFetchLotDataMutation, useGetCategoryMutation } from '../../api/lotService'
import { Loader } from '../../components/Loader'
import { ICategory } from '../../types/commonTypes'
import { selectHistory, useAppDispatch, useAppSelector } from '../../store/hooks'
import { updateHistory } from '../../store/redux/lastViewedLots/slice'
import { PathE } from '../../enum'
import { SameLotsBlock } from '../../components/SimilarAds'
import FeedBack from '../../components/feedBack'
import { LastViewedLotsBlock } from '../../components/LastViewedLots'
import { OtherSellerAdsSlider } from '../../components/OtherSellerAdsSlider'

export const LotPage: FC = () => {
  const navigate = useNavigate()
  const { slug } = useParams()
  const dispatch = useAppDispatch()
  const [fetchLot, { data: lotData, isLoading, isError }] = useFetchLotDataMutation()
  const { data: categories, isSuccess, isFetching } = useFetchCategoriesQuery()
  const [mainCategory, setMainCategory] = useState<ICategory>()
  const [subCategory, setSubCategory] = useState<ICategory>()
  const [lowerCat, setLowerCat] = useState<ICategory>()
  const [getCatData] = useGetCategoryMutation()

  useEffect(() => {
    if (isSuccess && lotData && !isFetching && !mainCategory) {
      const catName = categories.find((cat) => cat.id === lotData.category)
      if (catName) {
        setMainCategory(catName)
      } else {
        const cat = categories.find((cat) => cat.children.find((subCat) => subCat.id === lotData.category)?.title)
        if (cat) {
          setMainCategory(cat)
          const subCat = cat.children.find((cat) => cat.id === lotData.category)
          if (subCat) {
            setSubCategory(subCat)
          }
        } else {
          getCatData(lotData.category)
            .unwrap()
            .then((data) => setLowerCat(data))
        }
      }
    }
  }, [categories, getCatData, isFetching, isSuccess, lotData, mainCategory])

  useEffect(() => {
    if (lowerCat && !subCategory) {
      getCatData(lowerCat.parent)
        .unwrap()
        .then((data) => setSubCategory(data))
    }
  }, [getCatData, lowerCat, subCategory])

  useEffect(() => {
    if (subCategory) {
      getCatData(subCategory.parent)
        .unwrap()
        .then((data) => setMainCategory(data))
    }
  }, [getCatData, subCategory])

  useEffect(() => {
    if (!lotData && slug && !isLoading && !isError) {
      fetchLot(slug)
        .unwrap()
        .then((data) => dispatch(updateHistory(data.id)))
    }
  }, [fetchLot, isLoading, lotData, slug, dispatch, isError])

  useEffect(() => {
    if (isError) {
      navigate(generatePath(PathE.NotFound))
    }
  }, [isError, navigate])

  if (!lotData || !mainCategory) {
    return (
      <div className="w-full h-full xl:px-[60px] flex items-center justify-center">
        <Loader />
      </div>
    )
  }

  return (
    <>
      <div className="w-full h-full flex flex-col gap-4 xl:px-[60px] px-4">
        <LotDetail lotData={lotData} category={mainCategory} subCategory={subCategory} lowerCat={lowerCat} refetch={fetchLot} />
        <LotDescription lotData={lotData} category={mainCategory} subCategory={subCategory} lowerCat={lowerCat} />
        <OtherSellerAdsSlider userId={lotData.profile.id} />
        <SameLotsBlock id={lotData.id} />
        <LastViewedLotsBlock />
      </div>
      <FeedBack />
    </>
  )
}
