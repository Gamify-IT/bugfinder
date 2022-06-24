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
import { WordType } from '../model/models';
import { BugFinderGame, exampleCodes } from '../model/bugfindergame';
import { CodeVisualizer } from '../model/code-visualizer';

const newLine = WordType.NEWLINE;
const tab = WordType.TAB;

const bugfinderGame = new BugFinderGame(exampleCodes());
const codeVisualizer = new CodeVisualizer(bugfinderGame.getCurrentCode());

const currentCode = bugfinderGame.getCurrentCode();
const codeLines = codeVisualizer.getCodeLineWords();
const currentCodeComplete = codeVisualizer.getInFormat();
console.log('Current Code: ' + currentCode);
console.log('Code Lines: ' + codeLines);

function clickedButton(id: number) {
  const result = bugfinderGame.submitWrongCode(id);
  console.log(result);
}
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
