import { useLayoutEffect } from 'react'
import { Button, Image, StyleSheet, Text, View } from 'react-native'
import { IconBtn } from '../components/IconBtn'
import { MealItemDetail } from '../components/MealItemDetail'
import { MEALS } from '../data/dummy'

export const MealItemDetailScreen = ({ navigation, route }) => {
  const { id } = route.params
  const mealsItem = MEALS.find((meal) => meal.id === id)

  const handleHeaderBtn = () => {
    console.log('pressed')
  }
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return <IconBtn icon="star" color="black" onPress={handleHeaderBtn} />
      },
    })
  }, [navigation.handleHeaderBtn])
  return (
    <View>
      <Image style={styles.image} source={{ uri: mealsItem.imageUrl }} />
      <Text>{mealsItem.title}</Text>
      <MealItemDetail
        duration={mealsItem.duration}
        complexity={mealsItem.complexity}
        affordability={mealsItem.affordability}
      />
      <Text>재료</Text>
      {mealsItem.ingredients.map((ingredient) => (
        <Text key={ingredient}>{ingredient}</Text>
      ))}
      <Text>만드는 방법</Text>
      {mealsItem.steps.map((step, idx) => (
        <Text key={step}>
          {idx + 1}.{step}
        </Text>
      ))}
    </View>
  )
}
const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 200,
  },
})
