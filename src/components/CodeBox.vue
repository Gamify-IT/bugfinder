<template>
  <br />
  <span v-for="word in currentCode.words" v-bind:key="word">
    <br v-if="word.word == newLine" />
    <button v-if="word.word != tab && word.word != newLine" @click="clickedButton(word.id)">{{ word.word }}</button>
  </span>
</template>

<script setup lang="ts">
import { WordType } from '../model/models';
import { BugFinderGame, exampleCodes } from '../model/bugfindergame';

const newLine = WordType.NEWLINE;
const tab = WordType.TAB;

const bugfinderGame = new BugFinderGame(exampleCodes());
const currentCode = bugfinderGame.getCurrentCode();
const currentCodePerLine = bugfinderGame.getCurrentCodePerLine();
console.log('Current Code: ' + currentCode);
console.log('Current Code per Line: ' + currentCodePerLine);

function clickedButton(id: number) {
  const result = bugfinderGame.submitWrongCode(id);
  console.log(result);
}
</script>

<style lang="css" scoped></style>
>
