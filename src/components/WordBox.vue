<script setup lang="ts">
import { WordType, IWord } from '@/models/code';
import { CodeFeedback } from '@/services/code-feedback';

defineProps<{
  word: IWord;
  codeFeedback: CodeFeedback;
  selectBugWord: (word: IWord) => void;
  selected: boolean;
  correctedBugWordValue: string | null;
  submitted: boolean;
}>();

const newLine = WordType.NEWLINE;
const tab = WordType.TAB;
const space = WordType.SPACE;
</script>

<template>
  <div v-if="word.word == tab" class="tab"></div>
  <button
    :id="'word-' + word.id"
    v-if="word.word != tab && word.word != newLine"
    @click="selectBugWord(word)"
    class="code-word"
    :class="{
      'code-space': word.word == space && !selected,
      'code-space-selected': word.word == space && selected,
      'right-code': codeFeedback.hasFeedback(word.id) && codeFeedback.getFeedback(word.id).success,
      'wrong-code': codeFeedback.hasFeedback(word.id) && !codeFeedback.getFeedback(word.id).success,
      'selected-code': !submitted && selected,
    }"
  >
    <b-badge v-if="word.word == space && !selected" variant="success" class="code-space-badge">+</b-badge>
    <pre
      v-else
      v-highlightjs
    ><code v-if="!selected" class="java">{{ word.word }}</code><code v-else>{{ correctedBugWordValue }}</code></pre>
  </button>
  <b-popover
    v-if="codeFeedback.hasFeedback(word.id)"
    :target="'word-' + word.id"
    triggers="hover"
    placement="top"
    variant="danger"
  >
    <template #title>Code Feedback</template>
    Selected right: <a v-if="codeFeedback.getFeedback(word.id).codeSelectedSuccessful" class="text-success">Successful</a>
    <a v-else class="text-danger">Failed</a><br />
    Error Type: <a v-if="codeFeedback.getFeedback(word.id).codeErrorTypeSuccessful" class="text-success">Successful</a>
    <a v-else class="text-danger">Failed</a><br />
    Code Fixed: <a v-if="codeFeedback.getFeedback(word.id).codeFixedSuccessful" class="text-success">Successful</a>
    <a v-else class="text-danger">Failed</a><br />
  </b-popover>
</template>

<style lang="css" scoped>
button.code-word {
  background: transparent;
  border: none !important;
  padding: 2px;
}
button.code-space {
  min-width: 5px;
}
.code-space-badge {
  display: none;
}
button.code-space:hover .code-space-badge {
  display: inherit;
}
button.code-space-selected {
  margin-left: 4px;
  margin-right: 4px;
}
button.code-word:hover {
  background-color: #ecddb1;
}
button.right-code {
  background-color: rgb(115, 224, 115);
}
button.wrong-code {
  background-color: rgb(233, 175, 161);
}
button.selected-code {
  background-color: rgb(214, 207, 141);
}
.tab {
  width: 30px;
}

code {
  background: transparent;
  margin: 0;
  padding: 0;
}
pre {
  margin: 0;
  padding: 0;
}
</style>
