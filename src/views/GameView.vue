<script setup lang="ts">
import ChatBox from '@/components/ChatBox.vue';
import CodeBox from '@/components/CodeBox.vue';
import { BugFinderGame } from '@/models/bugfindergame';
import { ISolution } from '@/models/models';
import { ChatParticipant, ChatElement, ChatColor } from '@/models/chat';
import { CodeFeedback } from '@/models/code-feedback';
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
chatHistory.value.push({ from: ChatParticipant.OTHER, message: 'Hey', color: ChatColor.LIGHT });
chatHistory.value.push({
  from: ChatParticipant.OTHER,
  message: "I'm having big trouble with this code. Can you help me finding the bug?",
  color: ChatColor.LIGHT,
});

function nextCode() {
  if (game.hasNextCode()) {
    chatHistory.value.push({ from: ChatParticipant.ME, message: "Yes, I'm happy to help you", color: ChatColor.INFO });
    chatHistory.value.push({ from: ChatParticipant.OTHER, message: 'That is very kind of you!', color: ChatColor.LIGHT });
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
  chatHistory.value.push({
    from: ChatParticipant.ME,
    message: 'I think I found the bug. Is the programm now running?',
    color: ChatColor.INFO,
  });
  chatHistory.value.push({ from: ChatParticipant.OTHER, message: '...', color: ChatColor.LIGHT });
  setTimeout(() => {
    chatHistory.value.pop();
    if (game.passedCurrentCode()) {
      chatHistory.value.push({
        from: ChatParticipant.OTHER,
        message: 'Yes it works! Thank you very much',
        color: ChatColor.SUCCESS,
      });
    } else {
      chatHistory.value.push({ from: ChatParticipant.OTHER, message: 'No sadly not.', color: ChatColor.WARNING });
    }
    codeFeedback.value = feedback;

    chatHistory.value.push({ from: ChatParticipant.OTHER, message: '...', color: ChatColor.LIGHT });
  }, 1000);
  setTimeout(() => {
    chatHistory.value.pop();
    if (game.hasNextCode()) {
      chatHistory.value.push({
        from: ChatParticipant.OTHER,
        message: 'Can you help me again with another bug?',
        color: ChatColor.LIGHT,
      });
    } else {
      chatHistory.value.push({
        from: ChatParticipant.OTHER,
        message: 'Thank you a lot. You helped me fixing all my codes!',
        color: ChatColor.PRIMARY,
      });
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
