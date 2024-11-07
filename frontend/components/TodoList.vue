<template>
    <div>
      <h2>ToDoリスト</h2>
      <ul>
        <li v-for="todo in todos" :key="todo.id">
          {{ todo.text }}
          <button @click="deleteTodo(todo.id)">削除</button>
        </li>
      </ul>
      <input v-model="newTodoText" placeholder="新しいタスクを追加"
      @keyup.enter="addTodo" 
      />
      <button @click="addTodo">追加</button>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue'
  
  const todos = ref<{ id: number; text: string }[]>([])
  const newTodoText = ref('')
  
  const fetchTodos = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/todos')
      todos.value = await response.json()
    } catch (error) {
      console.error('タスクの取得に失敗しました:', error)
    }
  }
  
  const addTodo = async () => {
    if (!newTodoText.value.trim()) return
    try {
      const response = await fetch('http://localhost:3001/api/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: newTodoText.value }),
      })
      const newTodo = await response.json()
      todos.value.push(newTodo)
      newTodoText.value = ''
    } catch (error) {
      console.error('タスクの追加に失敗しました:', error)
    }
  }
  
  const deleteTodo = async (id: number) => {
    try {
      await fetch('http://localhost:3001/api/todos', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      })
      todos.value = todos.value.filter(todo => todo.id !== id)
    } catch (error) {
      console.error('タスクの削除に失敗しました:', error)
    }
  }
  
  onMounted(() => {
    fetchTodos()
  })
  </script>
  