<script setup lang="ts">
import { BASE_URL } from '@/app';
import { ref } from 'vue';
import clickSoundSource from '@/assets/music/click_sound.mp3'
const clickSound = new Audio(clickSoundSource);
const emit = defineEmits<{
  (e: 'startGame'): void;
}>();

let volumeLevel: number|null = 0;

const configurationId = window.location.pathname.split('/').pop();
const configuration = ref<any>(undefined);
  fetch(`${BASE_URL}/configurations/${configurationId}/volume`)
.then((res) => {
  res
    .json()
    .then((json) => {
      configuration.value = json;
      volumeLevel = configuration.value.volumeLevel;
      if (volumeLevel == 2 || volumeLevel == 3)
            {
                volumeLevel = 1;
            } else if (volumeLevel == 1)
            {
                volumeLevel = 0.5;
            }
      clickSound.volume = volumeLevel !== null ? volumeLevel : 1;
    })
    .catch(() => {
      configuration.value = 'Invalid configuration id';
    });
})
.catch(() => {
  configuration.value = 'Server not reachable';
});

function playClickSound(){
  clickSound.play();
}
</script>

<template>
  <main class="position-absolute top-50 start-50 translate-middle">
    <div v-if="configurationId?.length !== 0">
      <div v-if="configuration === undefined">
        <div class="spinner-border text-primary" role="status"></div>
      </div>
      <div v-if="typeof configuration === 'string'">
        <div class="alert alert-danger">{{ configuration }}</div>
      </div>
      <div v-if="typeof configuration === 'object'">
        <button class="btn btn-primary" @click="playClickSound(); emit('startGame')">Start</button>
      </div>
    </div>
    <div v-if="configurationId?.length === 0">
      <div class="alert alert-danger">No configuration specified in the url</div>
    </div>
  </main>
</template>
