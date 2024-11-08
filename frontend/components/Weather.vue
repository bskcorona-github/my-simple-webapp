<template>
    <div class="weather">
      <img v-if="weatherIcon" :src="weatherIcon" alt="天気アイコン" class="weather-icon" />
      {{ weatherInfo }}
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue'
  
  const weatherInfo = ref('')
  const weatherIcon = ref('')
  
  const fetchWeather = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/weather?city=Naha`)
      const data = await response.json()
      weatherInfo.value = `${data.weather[0].description} ${data.main.temp}°C`
      weatherIcon.value = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
    } catch (error) {
      console.error('天気情報の取得に失敗しました:', error)
    }
  }
  
  onMounted(() => {
    fetchWeather()
  })
  </script>
  