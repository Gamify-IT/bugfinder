<script setup lang="ts">
import ChatBox from '@/components/ChatBox.vue';
import CodeBox from '@/components/CodeBox.vue';
import { BugFinderGame, exampleCodes } from '@/model/bugfindergame';
import { chatParticipants, chatElement } from '@/model/models';
import { ref, defineEmits } from 'vue';

const emit = defineEmits<{
  (e: 'endGame'): void;
}>();

const game = new BugFinderGame(exampleCodes());
const currentCode = ref(game.getCurrentCode());
const hasNextCode = ref(game.hasNextCode());

const rightWordId = ref(-1);
const wrongWordId = ref(-1);

const showNextButton = ref(false);

var chatHistory: chatElement[] = [];
chatHistory.push({ from: chatParticipants.OTHER, message: 'Hey' });
chatHistory.push({
  from: chatParticipants.OTHER,
  message: "I'm having big trouble with this code. Can you help me finding the bug?",
});

function nextCode() {
  if (game.hasNextCode()) {
    chatHistory.push({ from: chatParticipants.OTHER, message: 'That is very kind of you!' });
    game.nextCode();
    currentCode.value = game.getCurrentCode();
    showNextButton.value = false;
    hasNextCode.value = game.hasNextCode();
    rightWordId.value = wrongWordId.value = -1;
  } else {
    emit('endGame');
  }
}

function submitSolution(selectedWordId: number) {
  const correct: boolean = game.submitWrongCode(selectedWordId);
  chatHistory.push({ from: chatParticipants.ME, message: 'I think I found the bug. Is the programm now running?' });
  if (correct) {
    chatHistory.push({ from: chatParticipants.OTHER, message: 'Yes it works! Thank you very much' });
    rightWordId.value = selectedWordId;
  } else {
    chatHistory.push({ from: chatParticipants.OTHER, message: 'No sadly not.' });
    wrongWordId.value = selectedWordId;
  }
  if (game.hasNextCode()) {
    chatHistory.push({ from: chatParticipants.OTHER, message: 'Can you help me again with another bug?' });
  } else {
    chatHistory.push({ from: chatParticipants.OTHER, message: 'Thank you a log. You helped me fixing all my codes!' });
  }
  showNextButton.value = true;
}
</script>

<template>
  <h2 class="text-center">Find the Bug</h2>

  <div class="container">
    <div class="row">
      <div class="col-9">
        <CodeBox :rightWordId="rightWordId" :wrongWordId="wrongWordId" :code="currentCode" @submitSolution="submitSolution" />
      </div>

      <div class="col-3">
        <ChatBox :chat-history="chatHistory" />
        <button :disabled="!showNextButton" class="btn btn-primary top-50 start-50 translate-middle" @click="nextCode()">
          <div v-if="hasNextCode">Next Code</div>
          <div v-else>Finish</div>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
