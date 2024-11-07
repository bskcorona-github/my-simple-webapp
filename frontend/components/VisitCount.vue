<template>
    <div class="visit">
     アクセス数: {{ visitCount }}
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue'
  
  const visitCount = ref(0)
  
  const fetchVisitCount = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/count')
      const data = await response.json()
      visitCount.value = data.count
    } catch (error) {
      console.error('アクセスカウントの取得に失敗しました', error)
    }
  }
  
  onMounted(() => {
    fetchVisitCount()
  })
  </script>
  