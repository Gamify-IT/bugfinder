<script setup lang="ts">
import { WordType, ICode, IWord, ISolution, Solution, IBug, Bug, ErrorType } from '@/models/code';
import { CodeFeedback } from '@/services/code-feedback';
import { CodeVisualizer } from '@/services/code-visualizer';
import WordBox from '@/components/WordBox.vue';
import SelectBugModal from '@/components/SelectBugModal.vue';
import { ref, watch } from 'vue';
import clickSoundSource from '@/assets/music/click_sound.mp3';
import { fetchAndChangeVolumeLevel } from '@/services/changeVolumeLevel';

const clickSound = fetchAndChangeVolumeLevel(clickSoundSource);
const props = defineProps<{
  code: ICode;
  codeFeedback: CodeFeedback;
}>();

const emit = defineEmits<{
  (e: 'submitSolution', selectedBugs: ISolution): void;
}>();

const space = WordType.SPACE;

const submitted = ref(false);
const selectedBugs = ref(Array<IBug>());

let codeVisualizer = new CodeVisualizer(props.code);
const codeLines = ref(codeVisualizer.getCodeLineWords());

const emptyBug = new Bug(-1, ErrorType.UNDEFINED, '');
const currentEditingBug = ref(emptyBug);
const showModal = ref(false);


function submit() {
  playClickSound();
  if (!submitted.value) {
    submitted.value = true;
    emit('submitSolution', new Solution(undefined, selectedBugs.value));
  }
}

function selectBug(word: IWord) {
  if (submitted.value) {
    return;
  }
  playClickSound();
  if (selectedBugs.value.find((bug) => bug.wordId == word.id) == null) {
    let wordString = word.wordContent;
    if (wordString == space) {
      wordString = '';
    }
    currentEditingBug.value = new Bug(word.id, ErrorType.UNDEFINED, wordString);
    showModal.value = true;
  } else {
    removeBug(word.id);
  }
}

function submitBug(bug: IBug) {
  selectedBugs.value.push(bug);
}

function removeBug(wordId: number | string) {
  selectedBugs.value = selectedBugs.value.filter((bug) => bug.wordId != wordId);
}

function isSelectedBug(wordId: number | string) {
  return selectedBugs.value.find((bug) => bug.wordId == wordId) != null;
}

function isWordSpace(wordId: number | string): boolean {
  const word = getWordById(wordId);
  return word != null && word.wordContent == space;
}

function getCorrectedBugValue(wordId: number | string): string | null {
  const bug = selectedBugs.value.find((searchedBug) => searchedBug.wordId == wordId);
  if (bug == null) {
    return null;
  }
  return bug.correctValue;
}

function getWordById(wordId: number | string): IWord | undefined {
  return props.code.words.find((word) => word.id == wordId);
}

function playClickSound(){
  clickSound.play();
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
    <div class="code-line" v-for="line in codeLines" :key="line[0].id">
      <div class="btn-group" v-for="word in line" :key="word.id">
        <WordBox
          :word="word"
          :codeFeedback="codeFeedback"
          :selectBug="selectBug"
          :selected="isSelectedBug(word.id)"
          :correctedBugValue="getCorrectedBugValue(word.id)"
          :submitted="submitted"
        />
      </div>
    </div>
  </div>
  <button v-if="!submitted" class="btn btn-success float-end mx-3 my-4" @click="submit()">Submit</button>

  <SelectBugModal
    v-model="showModal"
    :bug="currentEditingBug"
    :submitBug="submitBug"
    :showErrorTypeSelection="!isWordSpace(currentEditingBug.wordId)"
  />
</template>

<style scoped>
.codebox {
  background-color: #fdf6e3;
  margin-top: 10px;
  padding-bottom: 10px;
  border: 2px solid rgb(167, 158, 101);
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
    rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
}
</style>
