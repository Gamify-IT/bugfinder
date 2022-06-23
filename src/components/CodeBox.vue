<template>
  <h2>Formatted Code but not clickable</h2>
  <pre v-highlightjs><code class="java">
{{currentCodeComplete}}
  </code></pre>

  <h2>Code in a row (trash)</h2>
  <pre v-highlightjs>
    <code class="java">
<button v-for="word in currentCode.words" :key="word.id" @click="clickedButton(word.id)">{{word.word}}</button>
    </code>
  </pre>

  <h2>Code formatted but to much margin</h2>
  <div class="codebox">
    <p v-for="line in codeLines" :key="line">
      <span class="btn-group" v-for="word in lineWords(line)" :key="word" style="position: relative">
        <button v-if="word.word == tab"></button>
        <button class="" v-if="word.word != tab && word.word != newLine" @click="clickedButton(word.id)">
          <pre v-highlightjs><code class="java">{{ word.word }}</code></pre>
        </button>
      </span>
    </p>
  </div>
</template>

<script setup lang="ts">
import { WordType, IWord } from '../model/models';
import { BugFinderGame, exampleCodes } from '../model/bugfindergame';
import { CodeVisualizer } from '../model/code-visualizer';

const newLine = WordType.NEWLINE;
const tab = WordType.TAB;

const bugfinderGame = new BugFinderGame(exampleCodes());
const codeVisualizer = new CodeVisualizer(bugfinderGame.getCurrentCode());

const currentCode = bugfinderGame.getCurrentCode();
const codeLines = codeVisualizer.getCodeLines();
const currentCodeComplete = codeVisualizer.getInFormat();
console.log('Current Code: ' + currentCode);
console.log('Code Lines: ' + codeLines);

function lineWords(line: number): Array<IWord> {
  const words = codeVisualizer.getLineWordsAsList(line);
  console.log(words);
  return words;
}

function clickedButton(id: number) {
  const result = bugfinderGame.submitWrongCode(id);
  console.log(result);
}
</script>

<style lang="css" scoped>
.codebox {
  background-color: rgb(241, 241, 203);
}
button {
  background: transparent;
  border: none !important;
}
</style>
