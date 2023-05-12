import { useNavigation } from '@react-navigation/native'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import { AddShadow } from '../hooks/AddShadow'
import { MealItemDetail } from './MealItemDetail'

const shadow = AddShadow(['black', { width: 0, height: 2 }, 0.25, 8])

export const MealItem = ({
  title,
  id,
  category,
  imageUrl,
  duration,
  complexity,
  affordability,
}) => {
  const navigation = useNavigation()
  const onPress = () => {
    navigation.navigate('MealDetails', { id })
  }
  return (
    <View style={{ ...styles.mealItem, ...shadow }}>
      <Pressable
        android_ripple={{ color: '#ccc' }}
        style={({ pressed }) => (pressed ? styles.buttonPressed : null)}
        onPress={onPress}
      >
        <View style={{ borderRadius: 8, overflow: 'hidden' }}>
          <View>
            <Image source={{ uri: imageUrl }} style={styles.image} />
            <Text style={styles.title}>{title}</Text>
          </View>
          <MealItemDetail
            duration={duration}
            complexity={complexity}
            affordability={affordability}
          />
        </View>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  mealItem: {
    margin: 15,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: 'white',
  },
  image: {
    width: '100%',
    height: 200,
  },
  title: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18,
    margin: 8,
  },

  buttonPressed: {
    opacity: 0.8,
  },
})
