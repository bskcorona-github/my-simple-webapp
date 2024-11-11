<template>
    <nav>
      <button @click="logout">ログアウト</button>
    </nav>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    setup() {
      const logout = () => {
        // ローカルストレージからトークンを削除
        localStorage.removeItem('token');
        // ログインページにリダイレクト
        window.location.href = '/login';
      };
  
      return { logout };
    },
  });
  </script>
  