import { useLayoutEffect } from 'react'
import { FlatList, StyleSheet } from 'react-native'
import { Text, View } from 'react-native'
import { MealItem } from '../components/MealItem'
import { CATEGORIES, MEALS } from '../data/dummy'

export const MealsOverViewScreen = ({ route, navigation }) => {
  const { categoryId } = route.params

  const displayMeals = MEALS.filter((mealItem) => {
    return mealItem.categoryIds.indexOf(categoryId) >= 0
  })

  useLayoutEffect(() => {
    const title = CATEGORIES.find((category) => category.id === categoryId).title
    navigation.setOptions({ title })
  }, [navigation])

  const renderMealItem = ({ item }) => {
    const mealItemProps = {
      title: item.title,
      category: item.category,
      imageUrl: item.imageUrl,
      duration: item.duration,
      complexity: item.complexity,
      affordability: item.affordability,
      id: item.id,
    }
    return <MealItem {...mealItemProps} />
  }
  return (
    <View style={style.container}>
      <FlatList data={displayMeals} keyExtractor={(item) => item.id} renderItem={renderMealItem} />
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
})
