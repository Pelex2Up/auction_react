/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useEffect } from 'react'
import usaDollar from '../../../assets/icons/usa.svg'
import euro from '../../../assets/icons/euro.svg'
import rub from '../../../assets/icons/russia.svg'
import { selectCourse, selectLangSettings, useAppDispatch, useAppSelector } from '../../../store/hooks'
import { updateCourse, updateExpiration } from '../../../store/redux/moneyCourse/slice'
import { useFetchEURMutation, useFetchRUBMutation, useFetchUSDMutation } from '../../../api/courseService'

export const CourseInfo: FC = () => {
  const { language } = useAppSelector(selectLangSettings)
  const dispatch = useAppDispatch()
  const courses = useAppSelector(selectCourse)
  const [fetchUSD, { data: usdCourse, isLoading: isUSDLoad }] = useFetchUSDMutation()
  const [fetchEUR, { data: euroCourse, isLoading: isEURLoad }] = useFetchEURMutation()
  const [fetchRUB, { data: rubCourse, isLoading: isRUBLoad }] = useFetchRUBMutation()
  const today = new Date()

  useEffect(() => {
    if (courses) {
      if (
        (!courses.expires || Number(courses.expires.split('.')[0]) < Number(today.toLocaleDateString().split('.')[0])) &&
        !isUSDLoad &&
        !isRUBLoad &&
        !isEURLoad
      ) {
        fetchUSD().unwrap()
        fetchEUR()
        fetchRUB()
      }
    }
  }, [courses, dispatch, fetchEUR, fetchRUB, fetchUSD, isEURLoad, isRUBLoad, isUSDLoad, today])

  useEffect(() => {
    if (
      usdCourse &&
      euroCourse &&
      rubCourse &&
      (!courses.expires || Number(courses.expires.split('.')[0]) < Number(today.toLocaleDateString().split('.')[0]))
    ) {
      dispatch(updateCourse({ usd: usdCourse.Cur_OfficialRate, euro: euroCourse.Cur_OfficialRate, rub: rubCourse.Cur_OfficialRate }))
      dispatch(updateExpiration(`${String(today.getDate() + 1).padStart(2, '0')}.${String(today.getMonth() + 1).padStart(2, '0')}.${today.getFullYear()}`))
    }
  }, [courses.expires, dispatch, euroCourse, rubCourse, today, usdCourse])

  // const date = () => {
  //   const array = today.toLocaleDateString().split('/')
  //   const formated = array.length === 3 && `${array[1].padStart(2, '0')}.${array[0].padStart(2, '0')}.${array[2]}`
  //   return formated
  // }

  return (
    <div className="flex flex-row gap-8 text-sm items-center">
      <p>
        {`${language === 'RU' ? 'Курс валют НБРБ на ' : 'NBRB exchange rate on '}`} {today.toLocaleDateString()}:
      </p>
      <div className="flex gap-2 items-center">
        <img src={usaDollar} alt="us-dollar" />
        <p>USD</p>
        {courses.course?.usd}
      </div>
      <div className="flex gap-2 items-center">
        <img src={euro} alt="euro" />
        <p>EUR</p>
        {courses.course?.euro}
      </div>
      <div className="flex gap-2 items-center">
        <img src={rub} alt="euro" />
        <p className="flex gap-1">
          RUB <span className="font-medium text-xs ">100</span>
        </p>
        {courses.course?.rub}
      </div>
    </div>
  )
}

export default CourseInfo
