<template>
    <div class="login-form">
      <h2>ログイン</h2>
      <form @submit.prevent="handleLogin">
        <label for="username">ユーザー名</label>
        <input type="text" id="username" v-model="username" required />
  
        <label for="password">パスワード</label>
        <input type="password" id="password" v-model="password" required />
  
        <button type="submit">ログイン</button>
      </form>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  
  const username = ref('')
  const password = ref('')
  const errorMessage = ref('')
  const router = useRouter()
  
  async function handleLogin() {
    try {
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: username.value, password: password.value })
      })
      const data = await response.json()
  
      if (data.error) {
        errorMessage.value = data.error
      } else {
        alert(data.message)  // ログイン成功時のメッセージ表示
        router.push('/')      // ログイン成功後のリダイレクト
      }
    } catch (error) {
      console.error('ログイン中にエラーが発生しました:', error)
      errorMessage.value = 'ログイン中にエラーが発生しました'
    }
  }
  </script>
  
  <style scoped>
  .error {
    color: red;
  }
  </style>
  