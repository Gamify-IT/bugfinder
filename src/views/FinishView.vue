<script setup lang="ts">
import { useStore } from 'vuex';
import { computed, onMounted } from 'vue';
import triumphSound from '/src/assets/trumpets.mp3';
import negativeSound from '/src/assets/negativeSound.mp3';
const store = useStore();

function closeGame() {
  window.parent.postMessage('CLOSE ME');
}

const message = computed(() => {
  const score = store.state.score;
  if (score >= 0 && score <= 40) {
    return "Don't give up! You've got this!";
  } else if (score >= 50 && score <= 70) {
    return "Good job, keep it up!!";
  } else if (score >= 80 && score <= 100) {
    return "Wooow, congratulations ! Really nice!";
  } else {
    return "";
  }
});

function playSound(pathToAudioFile: string, duration: number){
  const sound = new Audio(pathToAudioFile);
  sound.play();
  setTimeout(() => sound.pause(), duration);
}

onMounted(() => {
  const score = store.state.score;
  const soundFile = score >= 50 ? triumphSound : negativeSound;
  playSound(soundFile, 2000);
});

</script>


<template>
  <main class="background-image">
    <div class="text-center position-absolute top-50 start-50 translate-middle">
      <h2 class="score-coins">
        You finished the Game! You've gained
        <span class="gold-outlined-text">{{ store.state.score }}</span> <span class="gold-outlined-text">scores</span> and
        <span class="gold-outlined-text">{{ store.state.rewards }}</span> <span class="gold-outlined-text">coins</span> !!
      </h2>
      <p class="message">{{ message }}</p>
      <b-button variant="danger" id="close-button" v-on:click="closeGame"> Back to game </b-button>
    </div>
  </main>
</template>



<style scoped>
.background-image {
  background-image: url('@/assets/background.webp');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}

.score-coins {
  color: white;
  text-align: center;
  font-size: 60px;
}

.gold-outlined-text {
  color: gold;
  text-shadow:
    -1px -1px 0 gold,
    1px -1px 0 gold,
    -1px 1px 0 gold,
    1px 1px 0 gold;
}

.message {
  font-size: 53px;
  color: white;
  text-align: center;
}

.gold-outlined-text.message {
  color: gold;
  text-shadow:
    -1px -1px 0 gold,
    1px -1px 0 gold,
    -1px 1px 0 gold,
    1px 1px 0 gold;
}

#close-button {
  color: white;
  margin-top: 20px;
}
</style>
