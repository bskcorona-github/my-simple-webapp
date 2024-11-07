<template>
    <button class="toggle-button" @click="toggleColorMode">
      <img v-if="isDarkMode" src="~/assets/images/sun.svg" width="20" height="20" alt="ライトモード">
      <img v-else src="~/assets/images/moon.svg" width="20" height="20" alt="ダークモード">
    </button>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted, watch } from 'vue'
  
  const isDarkMode = ref(false)
  
  const toggleColorMode = () => {
    isDarkMode.value = !isDarkMode.value
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode.value))
  }
  
  onMounted(() => {
    const savedMode = localStorage.getItem('darkMode')
    if (savedMode !== null) isDarkMode.value = JSON.parse(savedMode)
  })
  
  watch(isDarkMode, (newValue) => {
    document.body.classList.toggle('dark', newValue)
  })
  </script>
  
  <style scoped>
  .toggle-button {
    position: fixed;
    top: 10px;
    right: 10px;
    padding: 8px 12px;
    z-index: 1000;
  }
  
  </style>
  