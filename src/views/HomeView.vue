<script setup lang="ts">
const emit = defineEmits<{
  (e: 'startGame'): void;
}>();
</script>

<template>
  <main>
    <div>
      <button class="btn btn-primary position-absolute top-50 start-50 translate-middle" @click="emit('startGame')">Start</button>
    </div>
  </main>
</template>
