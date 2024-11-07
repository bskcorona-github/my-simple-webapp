<template>
    <div>
      <p>{{ message }}</p>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue'
  
  const message = ref('')
  
  const fetchMessage = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/hello')
      const data = await response.json()
      message.value = data.message
    } catch (error) {
      console.error('メッセージの取得に失敗しました', error)
      message.value = 'データ取得に失敗しました'
    }
  }
  
  onMounted(() => {
    fetchMessage()
  })
  </script>
  