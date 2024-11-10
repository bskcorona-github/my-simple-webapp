<template>
  <div class="cat-image-container">
    <img :src="catImageUrl" alt="かわいい猫の画像" width="400" height="400" />
    <button @click="fetchNewCatImage">他のにゃんこも見る</button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

const catImageUrl = ref("");
const apiKey =
  "live_QdBgvFQqP2SDjajIo3REdkLBjxVCD3IvqRCMVg1TBUWfxVc4QqB27GbGDC6HHHZ5";

async function fetchNewCatImage() {
  try {
    const response = await fetch(`https://api.thecatapi.com/v1/images/search`, {
      headers: {
        "x-api-key": apiKey,
      },
    });
    const data = await response.json();
    catImageUrl.value = data[0].url;
  } catch (error) {
    console.error("猫の画像を取得できませんでした", error);
  }
}

onMounted(fetchNewCatImage);
</script>
