import { selectCourse, selectLangSettings, useAppSelector } from '../store/hooks'

export function usdConverter(byr: string | number): number {
  const { course } = useAppSelector(selectCourse)
  const { money } = useAppSelector(selectLangSettings)
  const usdCourse = course && parseFloat(course.usd)
  const rubCourse = course && parseFloat(course.rub)
  if (money === 'USD' && usdCourse) {
    // Преобразуем строку в число
    const byrAmount = typeof byr === 'string' ? parseFloat(byr) : byr

    // Рассчитываем цену в долларах
    const usdAmount = byrAmount / usdCourse

    // Округляем результат до двух знаков после запятой
    return Math.round(usdAmount * 100) / 100
  } else if (money === 'RUB' && rubCourse) {
    const byrAmount = typeof byr === 'string' ? parseFloat(byr) : byr
    const rubAmount = byrAmount / (rubCourse / 100)
    return Math.round(rubAmount * 100) / 100
  } else return parseFloat(String(byr))
}
