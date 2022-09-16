<script setup lang="ts">
const emit = defineEmits<{
  (e: 'startGame'): void;
}>();

const configuration = window.location.pathname.split('/').pop();
</script>

<template>
  <main>
    <h1>test</h1>
    <h2>{{ configuration }}</h2>
    <div v-if="configuration?.length !== 0">
      <button class="btn btn-primary position-absolute top-50 start-50 translate-middle" @click="emit('startGame')">Start</button>
    </div>
    <div v-if="configuration?.length === 0">
      <div class="position-absolute top-50 start-50 translate-middle alert alert-danger">
        No configuration specified in the url
      </div>
    </div>
  </main>
</template>
