<script setup lang="ts">
import { WordType, ICode, IWord, ISolution, Solution, IBug, Bug, ErrorType } from '@/models/code';
import { CodeFeedback } from '@/services/code-feedback';
import { CodeVisualizer } from '@/services/code-visualizer';
import WordBox from '@/components/WordBox.vue';
import SelectBugModal from '@/components/SelectBugModal.vue';
import { ref, watch } from 'vue';

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

console.log('============', props, props.code);
let codeVisualizer = new CodeVisualizer(props.code);
const codeLines = ref(codeVisualizer.getCodeLineWords());

const emptyBug = new Bug(-1, ErrorType.UNDEFINED, '');
const currentEditingBug = ref(emptyBug);
const showModal = ref(false);

function submit() {
  if (!submitted.value) {
    submitted.value = true;
    emit('submitSolution', new Solution(1, selectedBugs.value));
  }
}

function selectBug(word: IWord) {
  if (submitted.value) {
    return;
  }
  if (selectedBugs.value.find((bug) => bug.wordId == word.id) == null) {
    let wordString = word.word;
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

function isSelectedBug(wordId: number) {
  return selectedBugs.value.find((bug) => bug.wordId == wordId) != null;
}

function isWordSpace(wordId: number): boolean {
  const word = getWordById(wordId);
  return word != null && word.word == space;
}

function getCorrectedBugValue(wordId: number): string | null {
  const bug = selectedBugs.value.find((searchedBug) => searchedBug.wordId == wordId);
  if (bug == null) {
    return null;
  }
  return bug.correctValue;
}

function getWordById(wordId: number): IWord | undefined {
  return props.code.words.find((word) => word.id == wordId);
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
    <div class="code-line" v-for="line in codeLines" :key="line">
      <div class="btn-group" v-for="word in line" :key="word">
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
