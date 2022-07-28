<script setup lang="ts">
import { IBug, ErrorType } from '@/models/code';
import { ref, watch } from 'vue';

const errorTypes = Object.values(ErrorType);

const props = defineProps<{
  bug: IBug;
  submitBug: (IBug) => void;
  showErrorTypeSelection: boolean;
}>();

const editBug = ref(props.bug);

watch(
  () => props.bug,
  (newBug) => {
    editBug.value = newBug;
  },
  { deep: true }
);
</script>

<template>
  <b-modal title="Edit bug" id="edit-bug-modal" @ok="submitBug(editBug)">
    <form ref="form" v-if="editBug != undefined" @submit.stop.prevent="submitBug(editBug)">
      <b-form-group label="Fix error (if possible)" label-for="error-fix">
        <b-form-input id="error-fix" v-model="editBug.correctValue"></b-form-input>
      </b-form-group>

      <b-form-group label="Select ErrorType" label-for="error-type" v-if="showErrorTypeSelection">
        <b-form-select id="error-type" v-model="editBug.errorType" :options="errorTypes"></b-form-select>
      </b-form-group>
    </form>
  </b-modal>
</template>
