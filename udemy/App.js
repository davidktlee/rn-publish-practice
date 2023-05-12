import { StatusBar } from 'expo-status-bar'
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { CategoriesScreen } from './screen/CategoriesScreen'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { MealsOverViewScreen } from './screen/MealsOverViewScreen'
import { MealItemDetailScreen } from './screen/MealItemDetailScreen'

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <SafeAreaView></SafeAreaView>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="MealsCategories " // 화면 간 이동시 고유한 식별자
            component={CategoriesScreen} // 컴포넌트 이름만 등록
            options={{ headerShown: false, rheaderStyle: {} }}
          />
          <Stack.Screen name="MealsOverView" component={MealsOverViewScreen} />
          <Stack.Screen name="MealDetails" component={MealItemDetailScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  )
}
