import { Pressable, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

export const IconBtn = ({ icon, color, onPress }) => {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => pressed && styles.pressedBtn}>
      <Ionicons name={icon} size={24} color={color} />
    </Pressable>
  )
}

const styles = StyleSheet.create({
  pressedBtn: { opacity: 0.7 },
})
