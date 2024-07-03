import { FC, useEffect, useState } from 'react'
import { EmptyLots } from './components/EmptyLots'
import { useFetchMyOrdersQuery } from '../../api/userService'
import { Loader } from '../../components/Loader'
import { ActionLotsComponent } from './components/ActionLotsComponent'
import { sortVariants } from './MyLots'
import { RadioButton } from '../../components/common/RadioButton'
import { SortSVG } from '../../assets/svg/sortSVG'

export const MyPurchasesPage: FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all')
  const [order, setOrder] = useState<boolean>(false)
  const { data: myOrders, isFetching, isError, refetch } = useFetchMyOrdersQuery({ order: order ? 'asc' : 'desc', type: selectedFilter })

  const handleChangeOrder = async () => {
    setOrder((prevOrder) => !prevOrder)
  }

  const handleChangeFilter = async (filter: string) => {
    setSelectedFilter(filter)
  }

  useEffect(() => {
    if (order || selectedFilter) {
      refetch()
    }
  }, [order, selectedFilter])

  if (!myOrders || isFetching || isError) {
    return (
      <div className="flex w-full items-center justify-center">
        <Loader />
      </div>
    )
  }
  return (
    <div className="flex flex-col gap-4 w-full items-center justify-center">
      <div className="w-full lg:h-[60px] h-auto flex lg:flex-row flex-col items-center justify-center lg:justify-between bg-stone-50 shadow-xl px-4 lg:py-0 py-2 lg:gap-0 gap-6">
        <div className="h-full justify-start items-center lg:gap-[37px] gap-4 inline-flex lg:flex-row flex-col">
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
        <div className="h-full justify-start items-center gap-4 inline-flex cursor-pointer" onClick={handleChangeOrder}>
          <div className="text-zinc-500 text-base font-normal font-['SF Pro Text'] leading-tight tracking-tight">Новые объявления</div>
          <button className="w-6 h-6 justify-center items-center flex">
            <SortSVG />
          </button>
        </div>
      </div>
      {myOrders.length > 0 ? myOrders.map((lot, index) => <ActionLotsComponent lot={lot} key={index} />) : <EmptyLots />}
    </div>
  )
}
