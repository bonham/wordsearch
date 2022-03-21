<template>
  <div class="container-fluid d-flex flex-column">
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
        class="form-control m-1 w-25"
        aria-describedby="anyCharHelp"
        @input="processInput"
      >
    </div>
    <label
      class="form-label"
    >Letters at position</label>
    <div class="mb-3 d-flex">
      <input
        id="letter1"
        type="text"
        class="form-control oneletter"
      >
      <input
        id="letter2"
        type="text"
        class="form-control oneletter"
      >
      <input
        id="letter3"
        type="text"
        class="form-control oneletter"
      >
      <input
        id="letter4"
        type="text"
        class="form-control oneletter"
      >
      <input
        id="letter5"
        type="text"
        class="form-control oneletter"
      >
    </div>
    <h2>{{ resultLength }} {{ anychar }}</h2>
    <p class="font-monospace wordbody">
      {{ words }}
    </p>
  </div>
</template>

<script>

import fileContent from "raw-loader!../assets/fiveletters.txt";
import { WordListFilter } from '@/lib/WordListFilter.js'

const lineArray = fileContent.split("\n")
const wordList = new WordListFilter(lineArray)
wordList.reduceWithoutAnyCharInString('äöüÄÖÜß').convertToUpperCase()


export default {
  data() {
    return {
      anychar: "",
      resultLength: null,
      words: ""
    };
  },
  mounted() {
    this.recalcResultAnyChar()
  },
  methods: {
    recalcResultAnyChar() {
      const workingWordList = wordList.clone()
      workingWordList.reduceAnyCharInString(this.anychar)
      this.resultLength = workingWordList.len()
      this.words = workingWordList.getArray().join(' ')
    },
    processInput(e) {
      const up = e.target.value.toUpperCase()
      this.anychar = up
      this.recalcResultAnyChar
()
    }
  },
};
</script>

<style scoped>
  .wordbody {
    color: rgb(68, 8, 8);
  }
  .oneletter {
    width: 2em;
    margin-left: .2em;
    margin-right: .2em;
  }
</style>