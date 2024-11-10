<script setup lang="ts">
import { ref } from "vue";

// LikeButtonの定義
const count = ref(0);

const handleClick = () => {
  count.value += 1;
};
</script>

<template>
  <div class="App">
    <header class="App-header">
      <!-- LikeButtonの使用 -->
      <span class="likeButton" @click="handleClick"> ♥ {{ count }} </span>
    </header>
  </div>
</template>
