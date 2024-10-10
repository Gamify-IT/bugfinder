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

/**
 * Submit the selected bugs as a solution and mark the solution as submitted.
 */
function submit() {
  playClickSound();
  if (!submitted.value) {
    submitted.value = true;
    emit('submitSolution', new Solution(undefined, selectedBugs.value));
  }
}

/**
 * Select a bug for a word. If a bug is already selected for the word, it will be removed.
 */
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

/**
 * Submit a bug to the selectedBugs list.
 * @param bug
 */
function submitBug(bug: IBug) {
  selectedBugs.value.push(bug);
}

/**
 * Remove a bug from the selectedBugs list by word ID.
 * @param wordId
 */
function removeBug(wordId: number | string) {
  selectedBugs.value = selectedBugs.value.filter((bug) => bug.wordId != wordId);
}

/**
 * Check if a word has been marked with a bug.
 * @param wordId
 */
function isSelectedBug(wordId: number | string) {
  return selectedBugs.value.find((bug) => bug.wordId == wordId) != null;
}

/**
 * Check if a word is a space (non-editable).
 * @param wordId
 */
function isWordSpace(wordId: number | string): boolean {
  const word = getWordById(wordId);
  return word != null && word.wordContent == space;
}

/**
 * Get the corrected value for a word if a bug has been selected for it.
 * @param wordId
 */
function getCorrectedBugValue(wordId: number | string): string | null {
  const bug = selectedBugs.value.find((searchedBug) => searchedBug.wordId == wordId);
  if (bug == null) {
    return null;
  }
  return bug.correctValue;
}

/**
 * Retrieve a word by its ID from the code props.
 * @param wordId
 */
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
  <!-- Code box that displays code lines -->
  <div class="codebox">
    <!-- Loop through each line of code and display the words with buttons for selecting bugs -->
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
  <!-- Submit button for submitting the selected bugs -->
  <button v-if="!submitted" class="btn btn-success float-end mx-3 my-4" @click="submit()">Submit</button>
  <!-- Modal for selecting a bug for the current word -->
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
