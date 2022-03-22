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
        :value="field.text"
      >
    </div>
    <h2>{{ wordListLength }} {{ lang }}</h2>
    <p class="font-monospace wordbody">
      {{ wordsText }}
    </p>
  </div>
</template>

<script>

import dic_DE from "raw-loader!../assets/de_DE_frami-five.txt";
import dic_US from "raw-loader!../assets/en_US-five.txt";
import dic_HU from "raw-loader!../assets/hu_HU-five.txt";
import { WordListFilter } from '@/lib/WordListFilter.js'

const dicts = {}
dicts["EN"] = dic_US
dicts["DE"] = dic_DE
dicts["HU"] = dic_HU
const wordLists = {}
for (const l in dicts) {

  const fileContent = dicts[l]
  const lineArray = fileContent.split("\n")
  wordLists[l] = new WordListFilter(lineArray).convertToUpperCase()
}
wordLists['DE'].reduceWithoutAnyCharInString('äöüÄÖÜß').convertToUpperCase()


export default {
  data() {
    return {
      inputFields:[
        { position: 0, text: "" },
        { position: 1, text: "" },
        { position: 2, text: "" },
        { position: 3, text: "" },
        { position: 4, text: "" },
      ],
      positionConstraints: {},
      anychar: "",
      resultLength: null,
      words: ""
    };
  },
  props: {
    resetTrigger: {
      type: Number,
      default: 0
    },
    lang: {
      type: String,
      required: true,
      default: 'EN'
    }
  },
  mounted() {
    //this.recalcResultAnyChar()
  },
  watch: {
    // eslint-disable-next-line no-unused-vars
    resetTrigger(newVal, oldVal) {
      this.resetForm()
    }
  },
  computed: {
    workingWordList() {
      const workingWordList = wordLists[this.lang].clone()
      workingWordList.reduceAnyCharInString(this.anychar)

      for (const p in this.positionConstraints) {
        const c = this.positionConstraints[p]
        workingWordList.reduceCharAtPosition(c, p)
      }

      // this.resultLength = workingWordList.len()
      // this.words = workingWordList.getArray().join(' ')
      return workingWordList

    },
    wordListLength() {
      return this.workingWordList.len()
    },
    wordsText() {
      return this.workingWordList.getArray().join(" ")
    }


  },
  methods: {
      
    processInput(e) {
      const up = e.target.value.toUpperCase()
      this.anychar = up
    },
    processAtPos(e) {

      const position = Number(e.target.attributes.pos.value)
      
      // Overwrite field value
      const char = e.target.value.toUpperCase()
      this.inputFields[position].text = char
      e.target.value=char

      if (char == "") {
        delete(this.positionConstraints[position])
      } else {
        this.positionConstraints[position] = char
      }

    },
    resetForm() {
      this.anychar = ""
      this.positionConstraints = {}
      this.inputFields.forEach(x => {
        x.text = ""
      })
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