<template>
  <div class="codebox">
    <div v-for="line in codeLines" :key="line">
      <div class="btn-group" v-for="word in line" :key="word">
        <div v-if="word.word == tab" class="tab"></div>
        <button v-if="word.word != tab && word.word != newLine" @click="clickedButton(word.id)">
          <pre v-highlightjs><code class="java">{{ word.word }}</code></pre>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { WordType, ICode, Code } from '../model/models';
import { CodeVisualizer } from '../model/code-visualizer';
import { ref, watch } from 'vue';

const props = defineProps<{
  code: ICode;
}>();

const emit = defineEmits<{
  (e: 'submitSolution', selectedWordId: number): void;
}>();

const newLine = WordType.NEWLINE;
const tab = WordType.TAB;

var codeVisualizer = new CodeVisualizer(props.code);
const codeLines = ref(codeVisualizer.getCodeLines());

function clickedButton(id: number) {
  emit('submitSolution', id);
}

watch(
  () => props.code,
  (newCode, oldCode) => {
    codeVisualizer = new CodeVisualizer(newCode);
    codeLines.value = codeVisualizer.getCodeLines();
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
.tab {
  width: 30px;
}
</style>
