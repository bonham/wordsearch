<template>
  <div class="container d-flex flex-column shadow">
    <div class="rounded border p-3 mt-2 mb-1">
      <div class="mb-1">
        <label
          for="anychar"
          class="form-label"
        >Letters at any position</label>
        <input
          id="anychar"
          v-model="anychar"
          type="text"
          class="form-control w-25"
          @input="processInput"
        >
      </div>
      <CharPositionForm 
        :reset-trigger="resetCounter"
        @pos-form-update="processPositionConstraints"
      />
    </div>

    <h2>{{ resultLength.toFixed() }} {{ lang }}</h2>
    <transition @after-leave="wordListFadeIn">
      <div
        v-show="showWordlist"
        class="font-monospace wordbody p-1"
      >
        {{ wordsText }}
      </div>
    </transition>
  </div>
</template>

<script>

import CharPositionForm from '@/components/CharPositionForm'
import { wordLists } from "@/lib/wordlists"
import gsap from 'gsap'

export default {
  components: {
    CharPositionForm
  },
  data() {
    return {
      anychar: "",
      positionConstraints: {},
      resultLength: 0,
      wordsText: "",
      showWordlist: false,
      resetCounter: 0,
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

    // trigger watcher
    this.resultLength = this.workingWordList.len()

    // 
    this.wordListFadeIn()
  },
  watch: {
    resetTrigger() {
      this.resetForm()
    },
    workingWordList(newval) {
      // count up animation
      gsap.to(this, { duration: 0.2, resultLength: newval.len()})
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

      return workingWordList

    },
      wordsTextNew() {
      return this.workingWordList.getArray().join(" ")
    }


  },
  methods: {
    processPositionConstraints(e) {
      this.positionConstraints = e
      this.wordListFadeOut()
    },
    processInput(e) {
      const up = e.target.value.toUpperCase()
      this.anychar = up
      this.wordListFadeOut()
    },
    wordListFadeOut() {

      this.showWordlist = false
      // transition hook after-leave will take care call wordListFadeIn()
    },

    wordListFadeIn() {
      this.wordsText = this.wordsTextNew
      this.showWordlist = true
    },

    resetForm() {
      // reset CharPositionForm
      this.resetCounter++

      // reset CharAnyPosition Form
      this.anychar = ""

      // reset wordList
      this.positionConstraints = {}
      this.wordListFadeOut()
    }
  },
};
</script>

<style scoped>
  .wordbody {
    color: rgb(68, 8, 8);
  }

 .v-enter-active,
.v-leave-active {
  transition: opacity 0.2s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>