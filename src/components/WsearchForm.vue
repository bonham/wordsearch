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
      <label
        class="form-label mt-1"
      >Letters at position</label>
      <div class="mt-1 mb-1 d-flex">
        <input
          v-for="field in inputFields"
          :pos="field.position"
          :key="field.position"
          type="text"
          class="form-control oneletter"
          maxlength="1"
          @input="processAtPos"
          @keyup.delete="processDelete"
          :value="field.text"
          ref="inputref"
        >
      </div>
    </div>

    <h2>{{ wordListLength }} {{ lang }}</h2>
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

import { wordLists } from "@/lib/wordlists"

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
      wordsText: "",
      showWordlist: false,
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
    this.wordListFadeIn()
  },
  watch: {
    resetTrigger() {
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
    wordsTextNew() {
      return this.workingWordList.getArray().join(" ")
    }


  },
  methods: {

    processInput(e) {
      const up = e.target.value.toUpperCase()
      this.anychar = up
      this.wordListFadeOut()
    },
    processAtPos(e) {
      const position = Number(e.target.attributes.pos.value)
      
      // Overwrite field value
      const char = e.target.value.toUpperCase()
      this.inputFields[position].text = char
      e.target.value=char

      // this can happen after a backspace. Stop further processing here
      // Backspace is handled additionally in 'processDelete'
      if (char == "") {
        return
      }

      // add wordlist constraint
      this.positionConstraints[position] = char

      this.wordListFadeOut()

      // set focus
      const maxpos = this.$refs.inputref.length - 1
      const focusposition = Math.min(position + 1, maxpos)
      this.$refs.inputref[focusposition].focus()
    },
    processDelete(e) {
      const position = Number(e.target.attributes.pos.value)
      const char = e.target.value

      if (char != "") {
        console.log("Unexpected - input field not empty", char)
        return
      }

      // remove constraint when field empty
      delete(this.positionConstraints[position])
      this.wordListFadeOut()

      // set focus
      const focusposition = Math.max(position - 1, 0)
      this.$refs.inputref[focusposition].focus()
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
      this.anychar = ""
      this.positionConstraints = {}
      this.inputFields.forEach(x => {
        x.text = ""
      })
      this.wordListFadeOut()
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
    margin-right: .3em;
    text-align: center;
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