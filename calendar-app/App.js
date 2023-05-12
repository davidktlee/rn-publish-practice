import { StatusBar } from 'expo-status-bar'
import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import dayjs from 'dayjs'
import { getCalendarColumns, getDayColor, getDayText } from './src/GetCalendarDataUtil'
import { useEffect, useMemo, useState } from 'react'
import Margin from './src/Margin'
import { SimpleLineIcons } from '@expo/vector-icons'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import { useCalendar } from './src/hook/useCalendar'

const columnSize = 35

const Column = ({ text, color, opacity, disabled, onPress, isSelected }) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={{
        width: columnSize,
        height: columnSize,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: isSelected ? '#c2c2c2' : 'transparent',
        borderRadius: columnSize / 2,
      }}
    >
      <Text style={{ color, opacity }}>{text}</Text>
    </TouchableOpacity>
  )
}

const ArrowButton = ({ name, onPress }) => {
  return (
    <TouchableOpacity style={{ paddingHorizontal: 20, paddingVertical: 15 }}>
      <SimpleLineIcons name={name} size={15} color="#404040" onPress={onPress} />
    </TouchableOpacity>
  )
}

export default function App() {
  const now = dayjs()
  const {
    selectedDate,
    setSelectedDate,
    showDatePicker,
    hideDatePicker,
    confirmDatePicker,
    subtract1Month,
    add1Month,
    isDatePickerVisible,
  } = useCalendar(now)

  const columns = getCalendarColumns(selectedDate)

  const onPressLeftArrow = subtract1Month

  const onPressRightArrow = add1Month

  const ListHeaderComponent = () => {
    const currentDateText = dayjs(selectedDate).format('YYYY.MM.DD.')
    return (
      <View>
        {/* {날짜} */}

        <TouchableOpacity
          style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}
          onPress={showDatePicker}
        >
          <ArrowButton name="arrow-left" onPress={onPressLeftArrow} />
          <Text style={{ fontSize: 20, color: '#404040' }}>{currentDateText}</Text>
          <ArrowButton name="arrow-right" onPress={onPressRightArrow} />
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={confirmDatePicker}
          onCancel={hideDatePicker}
        />

        <View style={{ flexDirection: 'row' }}>
          {[0, 1, 2, 3, 4, 5, 6].map((day) => {
            const dateText = getDayText(day)
            const color = getDayColor(day)
            return (
              <Column
                key={`${day}-day`}
                text={dateText}
                color={color}
                opacity={1}
                disabled={true}
              />
            )
          })}
        </View>
      </View>
    )
  }

  const renderItem = ({ item: date }) => {
    const dateText = dayjs(date).get('date')
    const day = dayjs(date).get('day')
    const color = getDayColor(day)
    const isCurrentMonth = dayjs(date).isSame(selectedDate, 'month')

    const onPress = () => {
      setSelectedDate(date)
    }

    const isSelected = dayjs(date).isSame(selectedDate, 'date')
    return (
      <Column
        text={dateText}
        color={color}
        opacity={isCurrentMonth ? 1 : 0.4}
        onPress={onPress}
        isSelected={isSelected}
      />
    )
  }

  useEffect(() => {
    console.log(dayjs(selectedDate).format('YYYY.MM.DD'))
  }, [selectedDate])

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={columns}
        keyExtractor={(_, index) => `${index}-index`}
        renderItem={renderItem}
        numColumns={7}
        ListHeaderComponent={ListHeaderComponent}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
