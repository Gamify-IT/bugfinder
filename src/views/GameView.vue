<script setup lang="ts">
import ChatBox from '@/components/ChatBox.vue';
import CodeBox from '@/components/CodeBox.vue';
import { BugFinderGame } from '@/models/bugfindergame';
import { ChatParticipant, ChatElement, ISolution } from '@/models/models';
import { CodeFeedback, WordFeedback } from '@/models/code-feedback';
import { ref } from 'vue';

const emit = defineEmits<{
  (e: 'endGame'): void;
}>();

const game = new BugFinderGame();
const currentCode = ref(game.getCurrentCode());
const hasNextCode = ref(game.hasNextCode());

const codeFeedback = ref(new CodeFeedback([]));

const showNextButton = ref(false);

const chatHistory = ref(Array<ChatElement>());
chatHistory.value.push({ from: ChatParticipant.OTHER, message: 'Hey' });
chatHistory.value.push({
  from: ChatParticipant.OTHER,
  message: "I'm having big trouble with this code. Can you help me finding the bug?",
});

function nextCode() {
  if (game.hasNextCode()) {
    chatHistory.value.push({ from: ChatParticipant.ME, message: "Yes, I'm happy to help you" });
    chatHistory.value.push({ from: ChatParticipant.OTHER, message: 'That is very kind of you!' });
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
  chatHistory.value.push({ from: ChatParticipant.ME, message: 'I think I found the bug. Is the programm now running?' });
  chatHistory.value.push({ from: ChatParticipant.OTHER, message: '...' });
  setTimeout(() => {
    chatHistory.value.pop();
    if (game.passedCurrentCode()) {
      chatHistory.value.push({ from: ChatParticipant.OTHER, message: 'Yes it works! Thank you very much' });
    } else {
      chatHistory.value.push({ from: ChatParticipant.OTHER, message: 'No sadly not.' });
    }
    codeFeedback.value = feedback;

    chatHistory.value.push({ from: ChatParticipant.OTHER, message: '...' });
  }, 1000);
  setTimeout(() => {
    chatHistory.value.pop();
    if (game.hasNextCode()) {
      chatHistory.value.push({ from: ChatParticipant.OTHER, message: 'Can you help me again with another bug?' });
    } else {
      chatHistory.value.push({ from: ChatParticipant.OTHER, message: 'Thank you a lot. You helped me fixing all my codes!' });
    }
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
        <ChatBox :chat-history="chatHistory" />
      </div>
    </div>
  </div>
</template>
