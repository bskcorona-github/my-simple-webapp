<template>
    <div class="calendar">
      <h2>{{ currentYear }}年{{ currentMonth + 1 }}月</h2>
      <div class="calendar-grid">
        <div class="day-name" v-for="day in dayNames" :key="day">{{ day }}</div>
        <div
          v-for="(date, index) in daysInMonth"
          :key="index"
          class="day"
          :class="{ today: isToday(date) }"
        >
          {{ date.getDate() }}
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed } from 'vue'
  
  const today = new Date()
  const currentYear = ref(today.getFullYear())
  const currentMonth = ref(today.getMonth())
  
  // 曜日
  const dayNames = ['日', '月', '火', '水', '木', '金', '土']
  
  // カレンダーの日付リストを作成
  const daysInMonth = computed(() => {
    const dates = []
    const firstDay = new Date(currentYear.value, currentMonth.value, 1)
    const lastDay = new Date(currentYear.value, currentMonth.value + 1, 0)
  
    // 前月の残りの曜日を表示
    for (let i = firstDay.getDay(); i > 0; i--) {
      const date = new Date(currentYear.value, currentMonth.value, 1 - i)
      dates.push(date)
    }
  
    // 当月の日付
    for (let day = 1; day <= lastDay.getDate(); day++) {
      const date = new Date(currentYear.value, currentMonth.value, day)
      dates.push(date)
    }
  
    // 翌月の最初の曜日を表示
    for (let i = 1; dates.length % 7 !== 0; i++) {
      const date = new Date(currentYear.value, currentMonth.value + 1, i)
      dates.push(date)
    }
  
    return dates
  })
  
  // 今日の日付を強調表示
  const isToday = (date: Date) => {
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    )
  }
  </script>
