import AsyncStorage from '@react-native-async-storage/async-storage'
import { StatusBar } from 'expo-status-bar'
import { useEffect, useState } from 'react'
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  TextInput,
  ScrollView,
} from 'react-native'

const TITLE = ['WORK', 'TRAVEL']

export default function App() {
  const [work, setWork] = useState(true)
  const [text, setText] = useState('')
  const [title, setTitle] = useState('WORK')

  const [todos, setTodos] = useState({})

  const onPressWork = () => {
    setText('')
    setWork(false)
  }

  const onPressTravel = () => {
    setText('')
    setWork(true)
  }

  const changeText = (e) => {
    setText(e)
  }

  const onSubmitText = async () => {
    alert(text)
    if (text === '') return
    const newTodo = { ...todos, [Date.now()]: { work, text } }
    setText('')
    await saveTodo(newTodo)
    setTodos(newTodo)
  }

  const saveTodo = async (todo) => {
    try {
      const str = JSON.stringify(todo)
      await AsyncStorage.setItem('@todos', str)
    } catch (error) {
      console.error(error)
    }
  }

  const loadTodo = async () => {
    try {
      const str = await AsyncStorage.getItem('@todos')
      console.log(str)
      setTodos(JSON.parse(str))
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    loadTodo()
  }, [])
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Text
            style={{ ...styles.buttonText, color: work ? '#3a3d40' : '#fff' }}
            onPress={onPressWork}
          >
            WORK
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text
            style={{ ...styles.buttonText, color: work ? '#fff' : '#3a3d40' }}
            onPress={onPressTravel}
          >
            TRAVEL
          </Text>
        </TouchableOpacity>
      </View>
      <TextInput
        style={{ ...styles.input }}
        placeholder={work ? '어디 가고 싶어?' : '뭐 해야 할까?'}
        onChangeText={changeText}
        onSubmitEditing={onSubmitText}
        value={text}
        returnKeyType="send"
      ></TextInput>
      <ScrollView>
        {todos &&
          Object.keys(todos).map((id) => (
            <View>
              {work === todos[id].work ? (
                <Text style={{ color: '#fff' }}>{todos[id].text}</Text>
              ) : null}
            </View>
          ))}
        <Text></Text>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 50,
  },
  buttonText: {
    // color: `${work ? '#fff' : '#3a3d40'}`,
    color: '#fff',
    fontSize: 36,
    fontWeight: 600,
  },
  input: {
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 30,
    marginTop: 20,
    fontSize: 15,
  },
})
