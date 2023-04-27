import dayjs from 'dayjs'

export const fillEmptyColumns = (columns, start, end) => {
  // console.log(start)
  const filledCols = columns.slice(0)
  // 첫날 이전 공백 채우기
  const startDay = dayjs(start).get('day')
  for (let i = 1; i <= startDay; i++) {
    const date = dayjs(start).subtract(i, 'day')

    filledCols.unshift(date)
  }

  // 마지막날 이후 공백 채우기
  const endDay = dayjs(end).get('day')

  for (let i = 1; i <= 6 - endDay; i++) {
    const date = dayjs(end).add(i, 'day')
    filledCols.push(date)
  }
  return filledCols
}
// 현재 캘린더 행 구하기
export const getCalendarColumns = (now) => {
  const start = dayjs(now).startOf('month')
  const end = dayjs(now).endOf('month')
  const endDay = dayjs(end).get('date')

  const columns = []
  for (let i = 0; i < endDay; i++) {
    const date = dayjs(start).add(i, 'day')
    columns.push(date)
  }

  const filledColumns = fillEmptyColumns(columns, start, end)
  return filledColumns
}
/**
 *
 * @param day  0 ~ 6
 * @return 일~월
 */

export const getDayText = (day) => {
  switch (day) {
    case 0:
      return '일'
    case 1:
      return '월'
    case 2:
      return '화'
    case 3:
      return '수'
    case 4:
      return '목'
    case 5:
      return '금'
    case 6:
      return '토'
    default:
      break
  }
}

export const getDayColor = (day) => {
  return day === 0 ? 'red' : day === 6 ? 'blue' : 'black'
}
