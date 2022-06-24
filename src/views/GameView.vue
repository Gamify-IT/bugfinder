<script setup lang="ts">
import CodeBox from '@/components/CodeBox.vue';
import ChatBox from '@/components/ChatBox.vue';
import { BugFinderGame } from '@/model/bugfindergame';
import { chatParticipants, chatElement } from '@/model/models';

var showNextButton = false;

var chatHistory: chatElement[] = [];
chatHistory.push({ from: chatParticipants.OTHER, message: 'Hey' });
chatHistory.push({
  from: chatParticipants.OTHER,
  message: "I'm having big trouble with this code. Can you help me finding the bug?",
});

function nextCode() {
  console.log('nextCode');
  chatHistory.push({ from: chatParticipants.OTHER, message: 'That is very kind of you!' });
}

function submitSolution(isCorrect: boolean) {
  chatHistory.push({ from: chatParticipants.ME, message: 'I think I found the bug. Is the programm now running?' });
  if (isCorrect) {
    chatHistory.push({ from: chatParticipants.OTHER, message: 'Yes it works! Thank you very much' });
  } else {
    chatHistory.push({ from: chatParticipants.OTHER, message: 'No sadly not.' });
  }
  chatHistory.push({ from: chatParticipants.OTHER, message: 'Can you help me again with another bug?' });
  showNextButton = true;
}
</script>

<template>
  <h2 class="text-center">Find the Bug</h2>

  <div class="container">
    <div class="row">
      <div class="col-9">
        <CodeBox />
      </div>

      <div class="col-3">
        <ChatBox :chat-history="chatHistory" />
        <button v-if="showNextButton" class="btn btn-primary position-absolute top-50 start-50 translate-middle" @click="nextCode()">Start</button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
