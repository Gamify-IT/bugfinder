<script setup lang="ts">
import { chatParticipants, chatElement } from '@/model/models';

const props = defineProps<{
  chatHistory: chatElement[];
}>();
</script>

<template>
  <main>
    <div v-for="chatElement in chatHistory" :key="chatElement.message">
      <div v-if="chatElement.from == chatParticipants.ME" class="d-flex flex-row justify-content-start mb-4">
        <img src="../assets/avatar.svg" v-alt="chatElement.from" style="width: 45px; height: 100%" />
        <div class="p-3 ms-3" style="border-radius: 15px; background-color: rgba(57, 192, 237, 0.2)">
          <p class="small mb-0">{{ chatElement.message }}</p>
        </div>
      </div>

      <div v-else-if="chatElement.from == chatParticipants.OTHER" class="d-flex flex-row justify-content-end mb-4">
        <div class="p-3 me-3 border" style="border-radius: 15px; background-color: #fbfbfb">
          <p class="small mb-0">{{ chatElement.message }}</p>
        </div>
        <img src="../assets/avatar.svg" v-alt="chatElement.from" style="width: 45px; height: 100%" />
      </div>
    </div>
  </main>
</template>

<style scoped></style>
