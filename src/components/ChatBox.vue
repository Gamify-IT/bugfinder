<script setup lang="ts">
import { ChatParticipant } from '@/models/chat';
import { watch } from 'vue';
import { chatHistory } from '@/services/chat';

watch(
  () => chatHistory,
  () => {
    const chatBox = document.getElementById('chat-box');
    if (chatBox) {
      chatBox.lastElementChild?.scrollIntoView();
    }
  },
  { deep: true }
);
</script>

<template>
  <div id="chat-box" ref="chat-box" class="overflow-auto">
    <div v-for="chatElement in chatHistory" :key="chatElement.message">
      <div v-if="chatElement.from == ChatParticipant.ME" class="d-flex flex-row justify-content-start mb-4">
        <img src="../assets/avatar.svg" alt="Me" style="width: 45px; height: 100%" />
        <div class="p-3 ms-3" :class="chatElement.color" style="border-radius: 15px">
          <p class="small mb-0">{{ chatElement.message }}</p>
        </div>
      </div>

      <div v-else-if="chatElement.from == ChatParticipant.OTHER" class="d-flex flex-row justify-content-end mb-4">
        <div class="p-3 me-3 border" :class="chatElement.color" style="border-radius: 15px">
          <p class="small mb-0">{{ chatElement.message }}</p>
        </div>
        <img src="../assets/avatar.svg" alt="Other" style="width: 45px; height: 100%" />
      </div>
    </div>
  </div>
</template>

<style scoped>
#chat-box {
  height: 80vh;
  scroll-behavior: auto;
}
</style>
