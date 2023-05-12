import { StatusBar } from 'expo-status-bar'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { CATEGORIES } from './data/dummy'
import { CategoriesScreen } from './screen/CategoriesScreen'

export default function App() {
  return <CategoriesScreen />
}
