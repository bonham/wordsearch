<template>
  <div class="container d-flex flex-column shadow">
    <div class="rounded border p-3 mt-2 mb-1">
      <CharAnyPositionForm 
        :reset-trigger="resetCounter"
        @anypos-form-update="processCharAnyPositionConstraints"
      />
      <CharPositionForm 
        :reset-trigger="resetCounter"
        @pos-form-update="processPositionConstraints"
      />
    </div>

    <ResultText 
      :words-text="wordsText"
      :result-length="resultLength"
      :lang="lang"
    />
  </div>
</template>

<script>

import CharPositionForm from '@/components/CharPositionForm'
import CharAnyPositionForm from '@/components/CharAnyPositionForm'
import { wordLists } from "@/lib/wordlists"
import ResultText from '@/components/ResultText'

export default {
  components: {
    CharAnyPositionForm,
    CharPositionForm,
    ResultText,
  },
  data() {
    return {
      resetCounter: 0,
      anychar: "",
      positionConstraints: {},
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
  },
  watch: {
    resetTrigger() {
      this.resetForm()
    },
  },
  computed: {
    workingWordList() {
      const workingWordList = wordLists[this.lang].clone()
      workingWordList.reduceAnyCharInString(this.anychar)

      for (const p in this.positionConstraints) {
        const c = this.positionConstraints[p]
        workingWordList.reduceCharAtPosition(c, p)
      }

      return workingWordList
    },

    resultLength() {
      return this.workingWordList.len()
    },

    wordsText() {
      return this.workingWordList.getArray().join(" ")
    }
  },
  methods: {
    processCharAnyPositionConstraints(e) {
      this.anychar = e
    },

    processPositionConstraints(e) {
      this.positionConstraints = e
    },

    resetForm() {
      // reset both forms
      this.resetCounter++

      // reset wordList
      this.positionConstraints = {}
      this.anychar = ""
    }
  },
};
</script>

