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
        v-for="field in inputFields"
        :pos="field.position"
        :key="field.position"
        type="text"
        class="form-control oneletter"
        maxlength="1"
        @input="processAtPos"
      >
    </div>
    <h2>{{ resultLength }}</h2>
    <p class="font-monospace wordbody">
      {{ words }}
    </p>
  </div>
</template>

<script>

import dic_DE from "raw-loader!../assets/de_DE_frami-five.txt";
import dic_US from "raw-loader!../assets/en_US-five.txt";
import dic_HU from "raw-loader!../assets/hu_HU-five.txt";
import { WordListFilter } from '@/lib/WordListFilter.js'

const lang = "HU"
const dicts = {}
dicts["EN"] = dic_US
dicts["DE"] = dic_DE
dicts["HU"] = dic_HU
const fileContent = dicts[lang]
const lineArray = fileContent.split("\n")
const wordList = new WordListFilter(lineArray)
wordList.reduceWithoutAnyCharInString('äöüÄÖÜß').convertToUpperCase()


export default {
  data() {
    return {
      inputFields:[
        { position: 0 },
        { position: 1 },
        { position: 2 },
        { position: 3 },
        { position: 4 },
      ],
      positionConstraints: {},
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

      for (const p in this.positionConstraints) {
        const c = this.positionConstraints[p]
        workingWordList.reduceCharAtPosition(c, p)
      }

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

      const position = Number(e.target.attributes.pos.value)
      
      // Overwrite field value
      const char = e.target.value.toUpperCase()
      e.target.value=char

      if (char == "") {
        delete(this.positionConstraints[position])
      } else {
        this.positionConstraints[position] = char
      }

      this.recalcResultAnyChar()
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