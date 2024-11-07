<template>
    <div>
      <p>現在のカウント: {{ count }}</p>
      <button @click="incrementCount">+1</button>
      <button @click="decrementCount">-1</button>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  
  const count = ref(0)
  const incrementCount = () => count.value++
  const decrementCount = () => count.value--
  </script>
  