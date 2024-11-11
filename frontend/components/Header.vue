<template>
    <header class="header">
      <div class="header-content">
        <Clock />
        <ThemeToggle />
        <Navbar/>
      </div>
    </header>
  </template>
  
  <script setup lang="ts">
  import Clock from '~/components/Clock.vue'
  import ThemeToggle from '~/components/ThemeToggle.vue'
  </script>
  
