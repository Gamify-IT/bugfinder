<script setup lang="ts">
import { WordType, ICode, ISolution, Solution, IBug, Bug, ErrorType } from '../models/models';
import { CodeVisualizer } from '../models/code-visualizer';
import { ref, watch } from 'vue';

const props = defineProps<{
  code: ICode;
  feedbackSolution: Array<boolean>;
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

function submit() {
  if (!submitted.value) {
    submitted.value = true;
    emit('submitSolution', new Solution(1, selectedBugs.value));
    selectedBugs.value = [];
  }
}

function clickedButton(wordId: number) {
  if (!submitted.value) {
    const isInList = selectedBugs.value.find((bug) => bug.wordId == wordId);
    if (!isInList) {
      selectedBugs.value.push(new Bug(wordId, ErrorType.LEXICAL));
    } else {
      selectedBugs.value = selectedBugs.value.filter((bug) => bug.wordId != wordId);
    }
  }
}

watch(
  () => props.code,
  (newCode) => {
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
        <button v-if="word.word != tab && word.word != newLine" @click="clickedButton(word.id)" class="code-word">
          <pre
            v-highlightjs
          ><code class="java" :class="{ 'right-code' : feedbackSolution[word.id] === true, 'wrong-code' : feedbackSolution[word.id]  === false, 'selected-code' : selectedBugs.find((bug) => bug.wordId == word.id) }">{{ word.word }}</code></pre>
        </button>
      </div>
    </div>
  </div>
  <button v-if="!submitted" class="btn btn-success float-end mx-3 my-4" @click="submit()">Submit</button>
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
