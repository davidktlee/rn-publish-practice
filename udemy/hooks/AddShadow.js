import { Platform } from 'react-native'

export const AddShadow = (shadowStyle) => {
  return {
    overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
    elevation: 4,
    shadowColor: shadowStyle[0],
    shadowOffset: shadowStyle[1],
    shadowOpacity: shadowStyle[2],
    shadowRadius: shadowStyle[3],
  }
}
