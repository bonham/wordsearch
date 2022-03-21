<template>
  <div class="mb-3">
    <label
      for="anychar"
      class="form-label"
    >Letters at any position</label>
    <input
      id="anychar"
      v-model="anychar"
      placeholder="Any char"
      type="text"
      class="form-control"
      aria-describedby="anyCharHelp"
    >
    <div
      id="anyCharHelp"
      class="form-text"
    >
      Letters which should appear anywhere in the word
    </div>
  </div>
  <div class="mb-3">
    <label
      for="startLetter"
      class="form-label"
    >Start</label>
    <input
      id="startLetter"
      type="text"
      class="form-control"
    >
  </div>
  <button
    class="btn btn-primary"
    @click="recalcResult"
  >
    Submit
  </button>
  <h2>{{ resultLength }} {{ anychar }}</h2>
  <div>{{ words }}</div>
</template>

<script>

import fileContent from "raw-loader!../assets/fiveletters.txt";
import { WordListFilter } from '@/lib/WordListFilter.js'

const lineArray = fileContent.split("\n")
const wordList = new WordListFilter(lineArray)
wordList.reduceWithoutAnyCharInString('äöüÄÖÜß')

export default {
  data() {
    return {
      anychar: "",
      resultLength: null,
    };
  },
  watch: {
    // eslint-disable-next-line no-unused-vars
    anychar(newvalue, oldvalue) {
      this.recalcResult();
    },
  },
  mounted() {
    this.recalcResult()
  },
  methods: {
    recalcResult() {
      const workingWordList = wordList.clone()
      workingWordList.reduceAnyCharInString(this.anychar)
      this.resultLength = workingWordList.len()
      this.words = workingWordList.getArray().join(' ')
    },
  },
};
</script>
