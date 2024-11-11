<template>
  <div>
    <!-- 現在のページがログインページでない場合のみ Header を表示 -->
    <Header v-if="!isLoginPage" />
    <main class="main-content">
      <NuxtPage />
    </main>
  </div>
</template>

<script setup lang="ts">
import Header from '~/components/Header.vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const isLoginPage = route.path === '/login'; // ログインページかどうかを判定
</script>
