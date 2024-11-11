<template>
  <div class="login-page">
    <h2>ログイン</h2>
    <form @submit.prevent="login">
      <input type="text" v-model="username" placeholder="ユーザー名" required />
      <input type="password" v-model="password" placeholder="パスワード" required />
      <button type="submit">ログイン</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useHead } from '#imports';

useHead({
  title: 'Login', 
});

const username = ref('');
const password = ref('');

onMounted(() => {
  if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark');
  }
});

const login = async () => {
  const response = await fetch('http://localhost:3001/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: username.value, password: password.value })
  });
  const data = await response.json();
  if (data.success) {
    localStorage.setItem('token', data.token);
    window.location.href = '/';
  } else {
    alert('ログイン失敗');
  }
};
</script>
