<script setup lang="ts">
import ChatBox from '@/components/ChatBox.vue';
import CodeBox from '@/components/CodeBox.vue';
import { BugFinderGame } from '@/services/bugfindergame';
import { ISolution } from '@/models/code';
import * as chat from '@/services/chat';
import { CodeFeedback } from '@/services/code-feedback';
import { ref } from 'vue';

const emit = defineEmits<{
  (e: 'endGame'): void;
}>();

const game = new BugFinderGame();
const currentCode = ref(game.getCurrentCode());
const hasNextCode = ref(game.hasNextCode());
const codeFeedback = ref(new CodeFeedback([]));
const showNextButton = ref(false);

chat.sendStartMessgae();

function nextCode() {
  if (game.hasNextCode()) {
    chat.sendNextCode();
    game.nextCode();
    currentCode.value = game.getCurrentCode();
    showNextButton.value = false;
    hasNextCode.value = game.hasNextCode();
    codeFeedback.value = new CodeFeedback([]);
  } else {
    emit('endGame');
  }
}

function submitSolution(selectedBugs: ISolution) {
  const feedback: CodeFeedback = game.submitWrongCode(selectedBugs);
  chat.sendSubmitMessage(game.passedCurrentCode(), !game.hasNextCode());
  codeFeedback.value = feedback;
  setTimeout(() => {
    showNextButton.value = true;
  }, 2000);
}
</script>

<template>
  <h2 class="text-center">Find the Bug</h2>

  <div class="container">
    <div class="row">
      <div class="col-9">
        <CodeBox :codeFeedback="codeFeedback" :code="currentCode" @submitSolution="submitSolution" />
        <button v-if="showNextButton" class="btn btn-primary float-end mx-3 my-4" @click="nextCode()">
          <div v-if="hasNextCode">Next Code</div>
          <div v-else>Finish</div>
        </button>
      </div>

      <div class="col-3">
        <ChatBox />
      </div>
    </div>
  </div>
</template>
