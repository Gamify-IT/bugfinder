<template>
  <div class="codebox">
    <div v-for="line in codeLines" :key="line">
      <div class="btn-group" v-for="word in line" :key="word">
        <div v-if="word.word == tab" class="tab"></div>
        <button v-if="word.word != tab && word.word != newLine" @click="clickedButton(word.id)">
          <pre
            v-highlightjs
          ><code class="java" :class="{ 'right-code' : rightWordId === word.id, 'wrong-code' : wrongWordId === word.id }">{{ word.word }}</code></pre>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { WordType, ICode } from '../models/models';
import { CodeVisualizer } from '../models/code-visualizer';
import { ref, watch } from 'vue';

const props = defineProps<{
  code: ICode;
  rightWordId: number;
  wrongWordId: number;
}>();

const emit = defineEmits<{
  (e: 'submitSolution', selectedWordId: number): void;
}>();

const newLine = WordType.NEWLINE;
const tab = WordType.TAB;

let submitted = false;

var codeVisualizer = new CodeVisualizer(props.code);
const codeLines = ref(codeVisualizer.getCodeLineWords());

function clickedButton(id: number) {
  if (!submitted) {
    submitted = true;
    emit('submitSolution', id);
  }
}

watch(
  () => props.code,
  (newCode) => {
    codeVisualizer = new CodeVisualizer(newCode);
    codeLines.value = codeVisualizer.getCodeLineWords();
    submitted = false;
  },
  { deep: true }
);
</script>

<style lang="css" scoped>
.codebox {
  background-color: #fdf6e3;
  margin-top: 10px;
  padding-bottom: 10px;
  border: 2px solid rgb(167, 158, 101);
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
    rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
}
button {
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
.tab {
  width: 30px;
}
</style>
