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
        id="letter0"
        type="text"
        class="form-control oneletter"
        maxlength="1"
        @input="processAtPos"
      >
      <input
        id="letter1"
        type="text"
        class="form-control oneletter"
        maxlength="1"
      >
      <input
        id="letter2"
        type="text"
        class="form-control oneletter"
        maxlength="1"
      >
      <input
        id="letter3"
        type="text"
        class="form-control oneletter"
        maxlength="1"
      >
      <input
        id="letter4"
        type="text"
        class="form-control oneletter"
        maxlength="1"
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
      return workingWordList
    },
    processInput(e) {
      const up = e.target.value.toUpperCase()
      this.anychar = up
      this.recalcResultAnyChar()
    },
    processAtPos(e) {
//      const up = e.target.value.toUpperCase()
      const c = e.target.value.toUpperCase()
      const regex = /^letter(\d+)$/
      const found = e.target.id.match(regex)
      var pos = found[1] // group
      if (typeof(pos)=="undefined") throw Error("could not extract position integer")
      pos = Number(pos)
      console.log(e.target.id, e.target.value, pos)
      const workingWordList = this.recalcResultAnyChar()
      console.log(c, pos)
      workingWordList.reduceCharAtPosition(c,pos)
      this.resultLength = workingWordList.len()
      this.words = workingWordList.getArray().join(' ')




    }
  },
};
</script>

<style scoped>
  .wordbody {
    color: rgb(68, 8, 8);
  }
  .oneletter {
    width: 3em;
    margin-left: .2em;
    margin-right: .2em;
    text-align: center;
  }
</style>