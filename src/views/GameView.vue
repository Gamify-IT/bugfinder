<script setup lang="ts">
/**
 * Manages the logic of the BugFinder game, including fetching and progressing through codes,
 * submitting solutions, providing feedback, and handling sound effects and chat messages.
 */

import ChatBox from '@/components/ChatBox.vue';
import CodeBox from '@/components/CodeBox.vue';
import { BugFinderGame } from '@/services/bugfindergame';
import { ICode, ISolution } from '@/models/code';
import * as chat from '@/services/chat';
import { CodeFeedback } from '@/services/code-feedback';
import { Ref, ref } from 'vue';
import { useStore } from 'vuex';
import clickSoundSource from '@/assets/music/click_sound.mp3';
import { fetchAndChangeVolumeLevel } from '@/services/changeVolumeLevel';

const store = useStore();

const clickSound = fetchAndChangeVolumeLevel(clickSoundSource);

const emit = defineEmits<{
  (e: 'endGame'): void;
}>();

const configuration = window.location.pathname.split('/').pop();
if (configuration == null) {
  throw Error('No configuration selected!');
}

const game = new BugFinderGame(configuration);
let currentCode = ref(null) as Ref<ICode | null>;

game.getCurrentCode().then((res) => {
  currentCode.value = res;
  game.hasNextCode().then((hasNextCode_) => (hasNextCode.value = hasNextCode_));
});

const hasNextCode = ref(false);
const codeFeedback = ref(new CodeFeedback([]));
const showNextButton = ref(false);

chat.sendStartMessgae();

/**
 * Handles the logic to proceed to the next code in the game.
 * Plays a click sound, checks if there's a next code, and updates the game state.
 * If there are no more codes, it sends the results and ends the game.
 */
async function nextCode() {
  playClickSound();
  if (await game.hasNextCode()) {
    await chat.sendNextCode();
    await game.nextCode();
    currentCode.value = await game.getCurrentCode();
    showNextButton.value = false;
    hasNextCode.value = await game.hasNextCode();
    codeFeedback.value = new CodeFeedback([]);
  } else {
    game.sendResults().then(() =>{
      store.state.score =  game.getScore();
      store.state.rewards = game.getRewards();
      console.log(store.state);
      emit('endGame');
    });
  }
}

/**
 * Submits the selected bugs (solution) and provides feedback on the correctness.
 * Sends a message to the chat about the submission and waits for feedback.
 * After a short delay, enables the button to proceed to the next code.
 * @param selectedBugs - The solution containing the selected bugs.
 */
async function submitSolution(selectedBugs: ISolution) {
  const feedback: CodeFeedback = await game.submitWrongCode(selectedBugs);
  chat.sendSubmitMessage(game.passedCurrentCode(), !game.hasNextCode());
  codeFeedback.value = feedback;
  setTimeout(() => {
    showNextButton.value = true;
  }, 2000);
}

function playClickSound(){
  clickSound.play();
}
</script>

<template>
  <!-- Main heading for the game -->
  <h2 class="text-center">Find the Bug</h2>
  <!-- Main container for layout -->
  <div class="container">
    <div class="row">
      <div class="col-9">
        <div v-if="currentCode != null">
          <CodeBox :codeFeedback="codeFeedback" :code="currentCode" @submitSolution="submitSolution" />
          <button v-if="showNextButton" class="btn btn-primary float-end mx-3 my-4" @click="nextCode()">
            <span v-if="hasNextCode">Next Code</span>
            <span v-else>Finish</span>
          </button>
        </div>
      </div>
      <!-- Right side: ChatBox for interacting with the game -->
      <div class="col-3">
        <ChatBox />
      </div>
    </div>
  </div>
</template>
