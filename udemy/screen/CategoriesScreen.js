import { FlatList, View } from 'react-native'
import { CategoryGridTile } from '../components/CategoryGridTile'
import { CATEGORIES } from '../data/dummy'

export const CategoriesScreen = ({ navigation }) => {
  const renderItem = (itemData) => {
    const onPress = () => {
      navigation.navigate('MealsOverView', {
        categoryId: itemData.item.id,
      })
    }
    return (
      <CategoryGridTile title={itemData.item.title} color={itemData.item.color} onPress={onPress} />
    )
  }
  return (
    <View>
      <FlatList
        data={CATEGORIES}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        numColumns={2}
      />
    </View>
  )
}
