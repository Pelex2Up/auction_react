import { selectCourse, useAppSelector } from '../store/hooks'

export function usdConverter(byr: string): number {
  const { course } = useAppSelector(selectCourse)
  const usdCourse = Number(course?.usd)
  if (usdCourse) {
    // Удаляем все символы, кроме цифр
    const numericByr = byr.replace(/\D/g, '')

    // Преобразуем строку в число
    const byrAmount = parseFloat(numericByr)

    // Рассчитываем цену в долларах
    const usdAmount = byrAmount / usdCourse

    // Округляем результат до двух знаков после запятой
    return Math.round(usdAmount * 100) / 100
  } else return Number(byr)
}
