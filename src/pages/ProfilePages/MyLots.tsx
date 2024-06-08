import { FC, useEffect, useState } from 'react'
import { EmptyLots } from './components/EmptyLots'
import { useDeleteUserLotMutation, useFetchUserLotsQuery } from '../../api/lotService'
import { Loader } from '../../components/Loader'
import { FixedPriceLotComponent } from './components/FixedPriceLotComponent'
import { toast } from 'react-toastify'
import { SortSVG } from '../../assets/svg/sortSVG'
import { RadioButton } from '../../components/common/RadioButton'

const sortVariants = [
  { label: 'Все', value: 'all' },
  { label: 'Покупка', value: 'buy' },
  { label: 'Продажа', value: 'sell' }
]

export const MyLots: FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all')
  const [order, setOrder] = useState<boolean>(false)
  const { data, refetch, isFetching } = useFetchUserLotsQuery({ order: order ? 'asc' : 'desc', type: selectedFilter })
  const [deleteLot, { isSuccess: deletedSuccess, isLoading: isDeleting, isError }] = useDeleteUserLotMutation()

  useEffect(() => {
    if (deletedSuccess) {
      toast('Объявление успешно удалено', { type: 'success' })
      refetch()
    }
  }, [deletedSuccess, refetch])

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
      toast('Произошла непредвиденная ошибка', { type: 'error' })
    }
  }, [isError])

  if (!data) {
    return (
      <div className="w-full flex justify-center items-center">
        <Loader />
      </div>
    )
  }

  return (
    <div className="w-full flex flex-col gap-4 justify-center items-center">
      <div className="w-full h-[60px] flex items-center justify-between bg-stone-50 shadow-xl px-4">
        <div className="h-full justify-start items-center gap-[37px] inline-flex">
          <div className="text-green-800 text-base font-medium font-['SF Pro Text'] leading-tight tracking-tight">Сортировать по</div>
          <div className="justify-start items-start gap-6 flex">
            {sortVariants.map((el, index) => (
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
        <div className="h-full justify-start items-center gap-4 inline-flex">
          <div className="text-zinc-500 text-base font-normal font-['SF Pro Text'] leading-tight tracking-tight">Новые объявления</div>
          <button className="w-6 h-6 justify-center items-center flex" onClick={handleChangeOrder}>
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
