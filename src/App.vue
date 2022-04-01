<template>
  <div>
    <Navbar
      @reset="resetAction"
      @lang="setLang"
    />
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
  </div>
</template>

<script>
import CharPositionForm from '@/components/CharPositionForm'
import CharAnyPositionForm from '@/components/CharAnyPositionForm'
import { wordLists } from "@/lib/wordlists"
import ResultText from '@/components/ResultText'
import Navbar from '@/components/nav-bar'

export default {
  name: 'App',
  components: {
    Navbar,
    CharAnyPositionForm,
    CharPositionForm,
    ResultText,
  },
  data() {
    return {
      lang: "EN",
      resetCounter: 0,
      anychar: "",
      positionConstraints: {},
    }
  },
  methods: {

    resetAction() {
      this.positionConstraints = {}
      this.anychar = ""
      this.resetCounter++
    },

    setLang(language) {
      this.resetAction()
      this.lang = language
    },

    processCharAnyPositionConstraints(e) {
      this.anychar = e
    },

    processPositionConstraints(e) {
      this.positionConstraints = e
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
  }
}
</script>