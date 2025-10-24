import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
  Platform,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
import TaskItem from './components/TaskItem';

interface Task {
  id: string;
  text: string;
  completed: boolean;
}

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [text, setText] = useState('');

  const showToast = (type: 'success' | 'error', message: string) => {
    Toast.show({
      type,
      text1: message,
      position: 'bottom',
    });
  };

  const addTask = () => {
    if (!text.trim()) {
      showToast('error', 'Please enter a task!');
      return;
    }
    const newTask: Task = { id: Date.now().toString(), text, completed: false };
    setTasks([...tasks, newTask]);
    setText('');
    showToast('success', 'Task added!');
  };

  const toggleComplete = (id: string) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
    showToast('success', 'Task deleted!');
  };

  const { width } = Dimensions.get('window');

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { fontSize: width > 400 ? 28 : 22 }]}>
        Task Manager
      </Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add a new task..."
          value={text}
          onChangeText={setText}
        />
        <TouchableOpacity onPress={addTask} style={styles.addButton}>
          <Ionicons name="add-circle" size={36} color="#007AFF" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TaskItem
            task={item}
            onToggle={() => toggleComplete(item.id)}
            onDelete={() => deleteTask(item.id)}
          />
        )}
      />

      <Toast />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingHorizontal: 20,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#fff',
  },
  addButton: {
    marginLeft: 10,
  },
});
