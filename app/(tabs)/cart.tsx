import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  SafeAreaView
} from 'react-native';
import { generateClient } from 'aws-amplify/api';
import { createTodo } from '../../src/graphql/mutations';
import { listTodos } from '../../src/graphql/queries';
import { Amplify } from 'aws-amplify';
import {
    withAuthenticator,
    useAuthenticator
  } from '@aws-amplify/ui-react-native';
import config from '../../src/amplifyconfiguration.json';
Amplify.configure(config);

interface Todo {
  id?: string;
  name: string;
  description: string;
}

interface FormState {
  name: string;
  description: string;
}


const initialState: FormState = { name: '', description: '' };
const client = generateClient();

const Cart: React.FC = () => {
  const [formState, setFormState] = useState<FormState>(initialState);
  const [todos, setTodos] = useState<Todo[]>([]);

  function setInput(key: keyof FormState, value: string) {
    setFormState({ ...formState, [key]: value });
  }

  async function fetchTodos() {
    try {
      const todoData = await client.graphql({
        query: listTodos
      });
      const todos: Todo[] = todoData.data.listTodos.items.map((todo: any) => ({
        id: todo.id,
        name: todo.name,
        description: todo.description ?? "",
      }));
      setTodos(todos);
    } catch (err) {
      console.log('Error fetching todos', err);
    }
  }

  async function addTodo() {
    try {
      if (!formState.name || !formState.description) return;
      const todo: Todo = { ...formState };
      setTodos([...todos, todo]);
      setFormState(initialState);
      await client.graphql({
        query: createTodo,
        variables: {
          input: todo
        }
      });
    } catch (err) {
      console.log('Error creating todo:', err);
    }
  }

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.container}>
        <TextInput
          onChangeText={(value) => setInput('name', value)}
          style={styles.input}
          value={formState.name}
          placeholder="Name"
        />
        <TextInput
          onChangeText={(value) => setInput('description', value)}
          style={styles.input}
          value={formState.description}
          placeholder="Description"
        />
        <Pressable onPress={addTodo} style={styles.buttonContainer}>
          <Text style={styles.buttonText}>Create Todo</Text>
        </Pressable>
        {todos.map((todo, index) => (
          <View key={todo.id ? todo.id : index} style={styles.todo}>
            <Text style={styles.todoName}>{todo.name}</Text>
            <Text style={styles.todoDescription}>{todo.description}</Text>
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
};

export default withAuthenticator (Cart);

const styles = StyleSheet.create({
    container: { width: 400, flex: 1, padding: 20, alignSelf: 'center' },
    todo: { marginBottom: 15 },
    input: {
      backgroundColor: '#ddd',
      marginBottom: 10,
      padding: 8,
      fontSize: 18
    },
    todoName: { fontSize: 20, fontWeight: 'bold' },
    todoDescription: {
      fontSize: 16,
      color: '#555',
      marginTop: 5,
      lineHeight: 22,
    },
    buttonContainer: {
      alignSelf: 'center',
      backgroundColor: 'black',
      paddingHorizontal: 8
    },
    buttonText: { color: 'white', padding: 16, fontSize: 18 }
});
