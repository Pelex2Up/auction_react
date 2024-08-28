import { FC, useEffect, useState } from 'react'
import { EmptyLots } from './components/EmptyLots'
import { useDeleteUserLotMutation, useFetchUserLotsQuery } from '../../api/lotService'
import { Loader } from '../../components/Loader'
import { FixedPriceLotComponent } from './components/FixedPriceLotComponent'
import { toast } from 'react-toastify'
import { SortSVG } from '../../assets/svg/sortSVG'
import { RadioButton } from '../../components/common/RadioButton'
import { selectLangSettings, useAppSelector } from '../../store/hooks'

export const sortVariantsRu = [
  { label: 'Все', value: 'all' },
  { label: 'Покупка', value: 'buy' },
  { label: 'Продажа', value: 'sell' }
]

export const sortVariantsEng = [
  { label: 'All', value: 'all' },
  { label: 'Buy', value: 'buy' },
  { label: 'Sell', value: 'sell' }
]

export const MyLots: FC = () => {
  const { language } = useAppSelector(selectLangSettings)
  const [selectedFilter, setSelectedFilter] = useState<string>('all')
  const [order, setOrder] = useState<boolean>(false)
  const { data, refetch } = useFetchUserLotsQuery({ order: order ? 'asc' : 'desc', type: selectedFilter }, { refetchOnMountOrArgChange: true })
  const [deleteLot, { isSuccess: deletedSuccess, isLoading: isDeleting, isError }] = useDeleteUserLotMutation()

  useEffect(() => {
    if (deletedSuccess) {
      toast(language === 'RU' ? 'Объявление успешно удалено' : 'Advertisement has been deleted successfuly', { type: 'success' })
      refetch()
    }
  }, [deletedSuccess, refetch, language])

  const handleChangeOrder = async () => {
    setOrder((prevOrder) => !prevOrder)
    await refetch()
  }

  const handleChangeFilter = async (filter: string) => {
    setSelectedFilter(filter)
    await refetch()
  }

  useEffect(() => {
    if (isError) {
      toast(language === 'RU' ? 'Произошла непредвиденная ошибка' : 'Something went wrong', { type: 'error' })
    }
  }, [isError, language])

  if (!data) {
    return (
      <div className="w-full flex justify-center items-center">
        <Loader />
      </div>
    )
  }

  return (
    <div className="w-full flex flex-col gap-4 justify-start items-center">
      <div className="w-full lg:h-[60px] h-auto flex lg:flex-row flex-col items-center justify-center lg:justify-between bg-stone-50 shadow-xl px-4 lg:py-0 py-2 lg:gap-0 gap-6">
        <div className="h-full justify-start items-center lg:gap-[37px] gap-4 inline-flex lg:flex-row flex-col">
          <div className="text-green-800 text-base font-medium font-['SF Pro Text'] leading-tight tracking-tight">
            {language === 'RU' ? 'Сортировать по' : 'Sort by'}
          </div>
          <div className="justify-start items-start gap-6 flex">
            {language === 'RU'
              ? sortVariantsRu.map((el, index) => (
                <RadioButton
                  key={index + `_${el.value}`}
                  id={el.value}
                  value={el.value}
                  checked={el.value === selectedFilter}
                  onChange={(event) => handleChangeFilter(event.target.value)}
                  text={el.label}
                />
              ))
              : sortVariantsEng.map((el, index) => (
                <RadioButton
                  key={index + `_${el.value}`}
                  id={el.value}
                  value={el.value}
                  checked={el.value === selectedFilter}
                  onChange={(event) => handleChangeFilter(event.target.value)}
                  text={el.label}
                />
              ))}
          </div>
        </div>
        <div className="h-full justify-start items-center gap-4 inline-flex cursor-pointer" onClick={handleChangeOrder}>
          <div className="text-zinc-500 text-base font-normal font-['SF Pro Text'] leading-tight tracking-tight">
            {language === 'RU' ? 'Новые объявления' : 'New advertisements'}
          </div>
          <button className="w-6 h-6 justify-center items-center flex">
            <SortSVG />
          </button>
        </div>
      </div>
      {data.length && data.length > 0 ? (
        data.map((lot, index) => <FixedPriceLotComponent isDeleting={isDeleting} deleteLot={deleteLot} key={index + `_${lot.title}`} lot={lot} />)
      ) : (
        <EmptyLots />
      )}
    </div>
  )
}
