import { FC } from 'react'
import { EmptyLots } from './components/EmptyLots'
import { useFetchUserLotsQuery } from '../../api/lotService'

export const MyLots: FC = () => {
  const { data, isFetching, isSuccess } = useFetchUserLotsQuery()

  return (
    <div className="w-full flex justify-center items-center">
        
      <EmptyLots />
    </div>
  )
}
