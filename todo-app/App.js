import AsyncStorage from '@react-native-async-storage/async-storage'
import { StatusBar } from 'expo-status-bar'
import { useEffect, useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  ScrollView,
  Alert,
  Platform,
  Pressable,
  Modal,
  Button,
} from 'react-native'

const TITLE = ['WORK', 'TRAVEL']

export default function App() {
  const [work, setWork] = useState(true)
  const [text, setText] = useState('')
  const [title, setTitle] = useState('WORK')
  const [modalIsVisible, setModalIsVisible] = useState(false)
  const [modalValue, setModalValue] = useState({ id: '', text: '' })

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
  const changeModalText = (e) => {
    setModalValue({ ...modalValue, text: e })
  }

  const onSubmitText = async () => {
    if (text === '') return
    const newTodo = { ...todos, [Date.now()]: { work, text } }
    setText('')
    await saveTodo(newTodo)
    setTodos(newTodo)
  }

  const ModifyTodo = async () => {
    const { id, text: modalText } = modalValue
    if (modalValue === '') return
    const newTodo = { ...todos, [id]: { work, modalText } }
    console.log(newTodo)
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
      if (str) setTodos(JSON.parse(str))
    } catch (error) {
      console.error(error)
    }
  }

  const deleteTodo = async (id) => {
    if (Platform.OS === 'web') {
      const ok = confirm('삭제하시겠습니까')
      if (ok) {
        const newTodos = { ...todos }
        delete newTodos[id]
        setTodos(newTodos)
        await saveTodo(newTodos)
      }
    } else {
    }
    Alert.alert('삭제하시겠습니까?', '', [
      {
        text: '아니오',
        style: 'cancel',
      },
      {
        text: '삭제',
        style: 'destructive',
        onPress: async () => {
          const newTodos = { ...todos }
          delete newTodos[id]
          setTodos(newTodos)
          await saveTodo(newTodos)
        },
      },
    ])
  }

  const openModal = (clickedId) => {
    setModalIsVisible(true)
    setModalValue(
      Object.keys(todos).map((id, idx) => {
        if (clickedId === id) {
          return { id: id, text: todos[id].text }
        }
      })
    )
  }
  const closeModal = () => {
    setModalIsVisible(false)
  }
  useEffect(() => {
    loadTodo()
    // removeStorageItem()
  }, [])
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable>
          <Text
            style={{ fontSize: 36, fontWeight: 600, color: work ? '#3a3d40' : '#fff' }}
            onPress={onPressWork}
          >
            WORK
          </Text>
        </Pressable>
        <Pressable>
          <Text
            style={{ fontSize: 36, fontWeight: 600, color: work ? '#fff' : '#3a3d40' }}
            onPress={onPressTravel}
          >
            TRAVEL
          </Text>
        </Pressable>
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
          Object.keys(todos).map((id, idx) =>
            work === todos[id].work ? (
              <View style={styles.list} key={`${todos.name}-${idx}`}>
                <Pressable
                  hitSlop={{ top: 10, left: 0, right: 0, bottom: 10 }}
                  onPress={() => openModal(id)}
                  style={{ flex: 1 }}
                >
                  <Text style={styles.item}>{todos[id].text}</Text>
                </Pressable>
                <Pressable onPress={() => deleteTodo(id)}>
                  <Text>X</Text>
                </Pressable>
              </View>
            ) : null
          )}
        <Modal visible={modalIsVisible} animationType="fade">
          <SafeAreaView
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#999',
            }}
          >
            <TextInput style={styles.input} onChangeText={changeModalText}>
              {modalValue.text}
            </TextInput>
            <Button title="추가" onPress={ModifyTodo} />
            <Button title="취소" onPress={closeModal} />
          </SafeAreaView>
        </Modal>
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
  input: {
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 30,
    marginTop: 20,
    fontSize: 15,
  },
  list: {
    flexDirection: 'row',
    backgroundColor: '#999',
    marginTop: 10,
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  item: {
    color: '#fff',
  },
})
