import { Platform, StyleSheet } from 'react-native'
import { Pressable, Text, View, Dimensions } from 'react-native'
import { useNavigation } from '@react-navigation/native'

const devicewidth = Dimensions.get('window').width
export const CategoryGridTile = ({ title, color, onPress }) => {
  const navigation = useNavigation()
  return (
    <View style={style.container}>
      <Pressable
        style={({ pressed }) => [style.button, pressed && style.buttonPressed]}
        android_ripple={{ color: '#ccc' }}
        onPress={onPress}
      >
        <View style={{ ...style.innerContainer, backgroundColor: color }}>
          <Text style={style.title}>{title}</Text>
        </View>
      </Pressable>
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    margin: 16,
    height: devicewidth > 350 ? 180 : 150,
    borderRadius: 15,
    elevation: 4,
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    overflow: Platform.OS === 'android' && 'hidden',
  },
  button: {
    flex: 1,
  },
  buttonPressed: {
    opacity: 0.5,
  },
  innerContainer: {
    flex: 1,
    padding: 16,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
})
