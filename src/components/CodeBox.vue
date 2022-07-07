<script setup lang="ts">
import { WordType, ICode, IWord, ISolution, Solution, IBug, Bug, ErrorType } from '../models/models';
import { CodeFeedback, WordFeedback } from '@/models/code-feedback';
import { CodeVisualizer } from '../models/code-visualizer';
import { ref, watch } from 'vue';

const props = defineProps<{
  code: ICode;
  codeFeedback: CodeFeedback;
}>();

const emit = defineEmits<{
  (e: 'submitSolution', selectedBugs: ISolution): void;
}>();

const newLine = WordType.NEWLINE;
const tab = WordType.TAB;

let submitted = ref(false);
let selectedBugs = ref(Array<IBug>());

let codeVisualizer = new CodeVisualizer(props.code);
const codeLines = ref(codeVisualizer.getCodeLineWords());

const currentEditingBug = ref();
const showModal = ref(false);

function submit() {
  if (!submitted.value) {
    submitted.value = true;
    emit('submitSolution', new Solution(1, selectedBugs.value));
  }
}

function clickedButton(word: IWord) {
  if (submitted.value) {
    return;
  }
  if (selectedBugs.value.find((bug) => bug.wordId == word.id) == null) {
    currentEditingBug.value = new Bug(word.id, ErrorType.DYNAMIC_SEMANTIC, word.word);
    showModal.value = true;
  } else {
    removeBugCode(word.id);
  }
}

function submitBug() {
  selectedBugs.value.push(currentEditingBug.value);
}

function hiddenModal() {
  console.log('HIDE MODAL');
}

function removeBugCode(wordId: number) {
  selectedBugs.value = selectedBugs.value.filter((bug) => bug.wordId != wordId);
}

function isWordSelectedBug(wordId: number) {
  return selectedBugs.value.find((bug) => bug.wordId == wordId) != null;
}

function getCorrectedWordValue(wordId: number): string | null {
  const bug = selectedBugs.value.find((bug) => bug.wordId == wordId);
  if (bug == null) {
    return null;
  }
  return bug.correctValue;
}

watch(
  () => props.code,
  (newCode) => {
    selectedBugs.value = [];
    codeVisualizer = new CodeVisualizer(newCode);
    codeLines.value = codeVisualizer.getCodeLineWords();
    submitted.value = false;
  },
  { deep: true }
);
</script>

<template>
  <div class="codebox">
    <div v-for="line in codeLines" :key="line">
      <div class="btn-group" v-for="word in line" :key="word">
        <div v-if="word.word == tab" class="tab"></div>
        <button
          :id="'word-' + word.id"
          v-if="word.word != tab && word.word != newLine"
          @click="clickedButton(word)"
          class="code-word"
        >
          <pre
            v-highlightjs
          ><code v-if="!isWordSelectedBug(word.id)" class="java" :class="{ 'right-code' : codeFeedback.hasFeedback(word.id) && codeFeedback.getFeedback(word.id).success, 'wrong-code' : codeFeedback.hasFeedback(word.id) && !codeFeedback.getFeedback(word.id).success }">{{ word.word }}</code><code v-else :class="{'selected-code' : !submitted, 'right-code' : codeFeedback.hasFeedback(word.id) && codeFeedback.getFeedback(word.id).success, 'wrong-code' : codeFeedback.hasFeedback(word.id) && !codeFeedback.getFeedback(word.id).success }">{{ getCorrectedWordValue(word.id) }}</code></pre>
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
      </div>
    </div>
  </div>
  <button v-if="!submitted" class="btn btn-success float-end mx-3 my-4" @click="submit()">Submit</button>

  <b-modal title="Edit bug" v-model="showModal" @show="hiddenModal" @hidden="hiddenModal" @ok="submitBug">
    <form ref="form" v-if="currentEditingBug != undefined" @submit.stop.prevent="submitBug">
      <b-form-group label="Fix error (if possible)" label-for="error-fix">
        <b-form-input id="error-fix" v-model="currentEditingBug.correctValue"></b-form-input>
      </b-form-group>

      <b-form-group label="Select ErrorType" label-for="error-type">
        <b-form-select id="error-type" v-model="currentEditingBug.errorType" :options="ErrorType"></b-form-select>
      </b-form-group>
    </form>
  </b-modal>
</template>

<style lang="css" scoped>
.codebox {
  background-color: #fdf6e3;
  margin-top: 10px;
  padding-bottom: 10px;
  border: 2px solid rgb(167, 158, 101);
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
    rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
}
button.code-word {
  background: transparent;
  border: none !important;
  padding: 0;
  height: 25px;
}
code:hover {
  background-color: #ecddb1;
}
code.right-code {
  background-color: rgb(115, 224, 115);
}
code.wrong-code {
  background-color: rgb(233, 175, 161);
}
code.selected-code {
  background-color: rgb(214, 207, 141);
}
.tab {
  width: 30px;
}
</style>
