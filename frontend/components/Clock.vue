<template>
    <div class="clock">
      <span class="date">{{ formattedDate }}</span>
      <Weather />
      <span class="time">{{ currentTime }}</span>
      <VisitCount/>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import Weather from '~/components/Weather.vue'
  
  const currentTime = ref('')
  const formattedDate = ref('')
  
  const updateTime = () => {
    const now = new Date()
    const year = now.getFullYear()
    const month = String(now.getMonth() + 1).padStart(2, '0')
    const day = String(now.getDate()).padStart(2, '0')
    const daysOfWeek = ['日', '月', '火', '水', '木', '金', '土']
    const dayOfWeek = daysOfWeek[now.getDay()]
    
    formattedDate.value = `${year}/${month}/${day} (${dayOfWeek})`
    currentTime.value = now.toLocaleTimeString()
  }
  
  onMounted(() => {
    updateTime()
    setInterval(updateTime, 1000)
  })
  </script>
  