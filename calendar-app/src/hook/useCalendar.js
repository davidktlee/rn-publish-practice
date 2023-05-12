import dayjs from 'dayjs'
import { useState } from 'react'

export const useCalendar = (now) => {
  const [selectedDate, setSelectedDate] = useState(now)
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false)
  const showDatePicker = () => {
    setIsDatePickerVisible(true)
  }
  const hideDatePicker = () => {
    setIsDatePickerVisible(false)
  }

  const confirmDatePicker = (date) => {
    setSelectedDate(date)
    console.log(date)
    hideDatePicker()
  }

  const subtract1Month = () => {
    const newSelectedDate = dayjs(selectedDate).subtract(1, 'month')
    setSelectedDate(newSelectedDate)
  }
  const add1Month = () => {
    const newSelectedDate = dayjs(selectedDate).add(1, 'month')
    setSelectedDate(newSelectedDate)
  }
  return {
    selectedDate,
    setSelectedDate,
    showDatePicker,
    hideDatePicker,
    confirmDatePicker,
    subtract1Month,
    add1Month,
    isDatePickerVisible,
  }
}
