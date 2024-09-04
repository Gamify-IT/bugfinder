<script setup lang="ts">
import { ChatColor, ChatParticipant } from '@/models/chat';
import { watch } from 'vue';
import { chatHistory } from '@/services/chat';
import notificationSoundSource from '@/assets/music/notification_sound.mp3';
import successSoundSource from '@/assets/music/success_sound.mp3';
import errorSoundSource from '@/assets/music/error_sound.mp3';
import { fetchAndChangeVolumeLevel } from '@/services/changeVolumeLevel';

const notificationSound = fetchAndChangeVolumeLevel(notificationSoundSource);
const successSound = fetchAndChangeVolumeLevel(successSoundSource);
const errorSound = fetchAndChangeVolumeLevel(errorSoundSource);



watch(
  () => chatHistory.value,
  (newChatHistory) => {
    const chatBox = document.getElementById('chat-box');
    if (chatBox) {
      chatBox.lastElementChild?.scrollIntoView();
    }
    
    const lastMessage = newChatHistory[newChatHistory.length - 1];
    if (lastMessage && lastMessage.from === ChatParticipant.OTHER) {
      if (lastMessage.color === ChatColor.LIGHT || lastMessage.color === ChatColor.PRIMARY) {
        notificationSound.play();
      } else if (lastMessage.color === ChatColor.WARNING) {
        errorSound.play();
      } else if (lastMessage.color === ChatColor.SUCCESS) {
        successSound.play();
      }
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
