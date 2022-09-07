<script setup lang="ts">
import ChatBox from '@/components/ChatBox.vue';
import CodeBox from '@/components/CodeBox.vue';
import { BugFinderGame } from '@/services/bugfindergame';
import { ICode, ISolution } from '@/models/code';
import * as chat from '@/services/chat';
import { CodeFeedback } from '@/services/code-feedback';
import { Ref, ref } from 'vue';

const emit = defineEmits<{
  (e: 'endGame'): void;
}>();

const game = new BugFinderGame();
let currentCode = ref(null) as Ref<ICode | null>;
game.getCurrentCode().then((res) => {
  currentCode.value = res;
});
const hasNextCode = ref(game.hasNextCode());
const codeFeedback = ref(new CodeFeedback([]));
const showNextButton = ref(false);

chat.sendStartMessgae();

async function nextCode() {
  if (await game.hasNextCode()) {
    await chat.sendNextCode();
    await game.nextCode();
    currentCode.value = await game.getCurrentCode();
    showNextButton.value = false;
    hasNextCode.value = game.hasNextCode();
    codeFeedback.value = new CodeFeedback([]);
  } else {
    emit('endGame');
  }
}

async function submitSolution(selectedBugs: ISolution) {
  const feedback: CodeFeedback = await game.submitWrongCode(selectedBugs);
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
        <div v-if="currentCode != null">
          <CodeBox :codeFeedback="codeFeedback" :code="currentCode" @submitSolution="submitSolution" />
          <button v-if="showNextButton" class="btn btn-primary float-end mx-3 my-4" @click="nextCode()">
            <span v-if="hasNextCode">Next Code</span>
            <span v-else>Finish</span>
          </button>
        </div>
      </div>

      <div class="col-3">
        <ChatBox />
      </div>
    </div>
  </div>
</template>
