<template>
  <div>
    <Clock />
    <ThemeToggle />
    <MessageDisplay/>
    <Counter />
    <TodoList />
  </div>
</template>

<script setup lang="ts">
import Clock from '~/components/Clock.vue'

import Counter from '~/components/Counter.vue'
import ThemeToggle from '~/components/ThemeToggle.vue'
import TodoList from '~/components/TodoList.vue'
import MessageDisplay from '~/components/MessageDisplay.vue'
</script>

