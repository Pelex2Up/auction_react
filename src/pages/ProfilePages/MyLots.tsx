import { FC, useEffect } from 'react'
import { EmptyLots } from './components/EmptyLots'
import { useDeleteUserLotMutation, useFetchUserLotsQuery } from '../../api/lotService'
import { Loader } from '../../components/Loader'
import { FixedPriceLotComponent } from './components/FixedPriceLotComponent'
import { toast } from 'react-toastify'

export const MyLots: FC = () => {
  const { data, isFetching, isSuccess, refetch } = useFetchUserLotsQuery()
  const [deleteLot, { isSuccess: deletedSuccess, isError }] = useDeleteUserLotMutation()

  useEffect(() => {
    if (deletedSuccess) {
      toast('Объявление успешно удалено', { type: 'success' })
      refetch()
    }
  }, [deletedSuccess, refetch])

  useEffect(() => {
    if (isError) {
      toast('Произошла непредвиденная ошибка', { type: 'error' })
    }
  }, [isError])

  if (!data || isFetching) {
    return (
      <div className="w-full flex justify-center items-center">
        <Loader />
      </div>
    )
  }

  return (
    <div className="w-full flex flex-col gap-4 justify-center items-center">
      {data.length && data.length > 0 ? (
        data.map((lot, index) => <FixedPriceLotComponent deleteLot={deleteLot} key={index + `_${lot.title}`} lot={lot} />)
      ) : (
        <EmptyLots />
      )}
    </div>
  )
}
