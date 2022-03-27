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
import CharAnyPositionForm from '@/components/CharAnyPositionForm'
import { wordLists } from "@/lib/wordlists"
import gsap from 'gsap'

export default {
  components: {
    CharAnyPositionForm,
    CharPositionForm,
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
    processCharAnyPositionConstraints(e) {
      this.anychar = e
      this.wordListFadeOut()
    },

    processPositionConstraints(e) {
      this.positionConstraints = e
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
      // reset both forms
      this.resetCounter++

      // reset wordList
      this.positionConstraints = {}
      this.anychar = ""
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