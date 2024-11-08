<template>
    <div class="register-form">
      <h2>ユーザー登録</h2>
      <form @submit.prevent="handleRegister">
        <label for="username">ユーザー名</label>
        <input type="text" id="username" v-model="username" required />
  
        <label for="password">パスワード</label>
        <input type="password" id="password" v-model="password" required />
  
        <button type="submit">登録</button>
      </form>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const username = ref('')
  const password = ref('')
  const errorMessage = ref('')
  
  async function handleRegister() {
    try {
      const response = await fetch('http://localhost:3000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: username.value, password: password.value })
      })
      const data = await response.json()
  
      if (data.error) {
        errorMessage.value = data.error
      } else {
        alert(data.message)  // 登録成功時のメッセージ表示
        username.value = ''
        password.value = ''
      }
    } catch (error) {
      console.error('登録中にエラーが発生しました:', error)
      errorMessage.value = '登録中にエラーが発生しました'
    }
  }
  </script>
  
  <style scoped>
  .error {
    color: red;
  }
  </style>
  