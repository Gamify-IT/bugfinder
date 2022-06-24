<script setup lang="ts">
import ChatBox from '@/components/ChatBox.vue';
import CodeBox from '@/components/CodeBox.vue';
import { BugFinderGame, exampleCodes } from '@/model/bugfindergame';
import { chatParticipants, chatElement } from '@/model/models';

const game = new BugFinderGame(exampleCodes());
var currentCode = game.getCurrentCode();

var showNextButton = true;

var chatHistory: chatElement[] = [];
chatHistory.push({ from: chatParticipants.OTHER, message: 'Hey' });
chatHistory.push({
  from: chatParticipants.OTHER,
  message: "I'm having big trouble with this code. Can you help me finding the bug?",
});

function nextCode() {
  console.log('nextCode');
  chatHistory.push({ from: chatParticipants.OTHER, message: 'That is very kind of you!' });
  game.nextCode();
  currentCode = game.getCurrentCode();
}

function submitSolution(selectedWordId: number) {
  const correct: boolean = game.submitWrongCode(selectedWordId);
  console.log('SUBMITTED');
  chatHistory.push({ from: chatParticipants.ME, message: 'I think I found the bug. Is the programm now running?' });
  if (correct) {
    chatHistory.push({ from: chatParticipants.OTHER, message: 'Yes it works! Thank you very much' });
  } else {
    chatHistory.push({ from: chatParticipants.OTHER, message: 'No sadly not.' });
  }
  chatHistory.push({ from: chatParticipants.OTHER, message: 'Can you help me again with another bug?' });
  showNextButton = true;
  console.log(showNextButton);
}
</script>

<template>
  <h2 class="text-center">Find the Bug</h2>

  <div class="container">
    <div class="row">
      <div class="col-9">
        <CodeBox :code="currentCode" @submitSolution="submitSolution" />
      </div>

      <div class="col-3">
        <ChatBox :chat-history="chatHistory" />
        <button
          :disabled="!showNextButton"
          class="btn btn-primary position-absolute top-50 start-50 translate-middle"
          @click="nextCode()"
        >
          Next Code
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
