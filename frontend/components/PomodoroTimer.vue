<template>
    <div class="pomodoro-timer">
      <h2>ポモドーロタイマー</h2>
      <p>{{ isBreak ? '休憩中' : '作業中' }}</p>
      <p>{{ minutes }}:{{ seconds.toString().padStart(2, '0') }}</p>
      <button @click="toggleTimer">{{ isActive ? '一時停止' : 'スタート' }}</button>
      <button @click="resetTimer">リセット</button>
      <p>完了したサイクル数: {{ cycleCount }}</p>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed, onUnmounted } from 'vue'
  
  // 設定時間（秒）
  const workTime = 25*60    // 本番は25分 (25 * 60)
  const breakTime = 5 *60  // 本番は5分 (5 * 60)
  
  const isActive = ref(false);
  const isBreak = ref(false);
  const timeLeft = ref(workTime);
  const cycleCount = ref(0);
  
  const minutes = computed(() => Math.floor(timeLeft.value / 60));
  const seconds = computed(() => timeLeft.value % 60);
  
  let interval: ReturnType<typeof setInterval> | null = null;
  
  // タイマーを開始する関数
  function startTimer() {
    if (!interval) {
      interval = setInterval(() => {
        if (timeLeft.value > 0) {
          timeLeft.value -= 1;
        } else {
          // 作業から休憩または休憩から作業への切り替え
          isBreak.value = !isBreak.value;
          timeLeft.value = isBreak.value ? breakTime : workTime;
          
          // 作業が完了したらサイクルカウントを増やす
          if (!isBreak.value) {
            cycleCount.value += 1;
          }
        }
      }, 1000);
    }
  }
  
  // タイマーを停止する関数
  function stopTimer() {
    if (interval) {
      clearInterval(interval);
      interval = null;
    }
  }
  
  // タイマーの開始と停止を切り替える関数
  function toggleTimer() {
    isActive.value = !isActive.value;
    isActive.value ? startTimer() : stopTimer();
  }
  
  // タイマーをリセットする関数
  function resetTimer() {
    stopTimer();
    isBreak.value = false;
    timeLeft.value = workTime;
    isActive.value = false;
    cycleCount.value = 0; // サイクルカウントもリセット
  }
  
  onUnmounted(() => {
    stopTimer();
  });
  </script>
  
  <style>
  .pomodoro-timer {
    text-align: center;
    margin: 20px;
  }
  </style>
  