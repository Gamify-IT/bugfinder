<script setup lang="ts">
import { BASE_URL } from '@/app';
import { ref } from 'vue';

const emit = defineEmits<{
  (e: 'startGame'): void;
}>();

const configurationId = window.location.pathname.split('/').pop();
const configuration = ref<any>(undefined);
fetch(`${BASE_URL}/configurations/${configurationId}`).then((res) =>
  res
    .json()
    .then((json) => {
      configuration.value = json;
    })
    .catch((err) => {
      configuration.value = null;
    })
);
</script>

<template>
  <main class="position-absolute top-50 start-50 translate-middle">
    <div v-if="configurationId?.length !== 0">
      <div v-if="configuration === undefined">
        <div class="spinner-border text-primary" role="status"></div>
      </div>
      <div v-if="configuration === null">
        <div class="alert alert-danger">Invalid configuration id</div>
      </div>
      <div v-if="configuration != null">
        <button class="btn btn-primary" @click="emit('startGame')">Start</button>
      </div>
    </div>
    <div v-if="configurationId?.length === 0">
      <div class="alert alert-danger">No configuration specified in the url</div>
    </div>
  </main>
</template>
