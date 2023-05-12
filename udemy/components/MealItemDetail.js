import { StyleSheet, Text, View } from 'react-native'

export const MealItemDetail = ({ duration, complexity, affordability }) => {
  return (
    <View style={styles.texts}>
      <Text>Duration {duration}M</Text>
      <Text>{complexity.toUpperCase()}</Text>
      <Text>{affordability.toUpperCase()}</Text>
    </View>
  )
}
const styles = StyleSheet.create({
  texts: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 8,
  },
})
