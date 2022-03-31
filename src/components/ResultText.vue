<template>
  <div>
    <h2>
      {{ resultLengthDisplay.toFixed() }}
      <span class="langText">{{ langDisplay }}</span>
    </h2>
    <div class="wordbody">
      {{ wordsTextDisplay }}
    </div>
  </div>
</template>

<script>
import gsap from 'gsap'

export default {
  data() { return {
    langDisplay: "",
    wordsTextDisplay: "",
    resultLengthDisplay: 0,
  }
},

  props: {
    lang: {
      type: String,
      required: true,
    },
    wordsText: {
      type: String,
      required: true,
    },
    resultLength: {
      type: Number,
      required: true
    }
  },

  mounted() {
    this.langDisplay = this.lang
    this.wordsTextDisplay = this.wordsText
    this.resultLengthDisplay = this.resultLength
  },

  watch: {
    resultLength(newval) {
      // count up animation
      gsap.to(this, { duration: .2, resultLengthDisplay: newval})
    },
    wordsText(newval) {

      const tl = gsap.timeline()
      tl.fromTo(
        ".wordbody",
        { opacity: 1 },
        { duration: .1, opacity: 0, ease: "power1.out"})
      tl.set(
        this,
        { wordsTextDisplay: newval })
      tl.fromTo(
        ".wordbody",
        { opacity: 0 },
        { duration: .1, opacity: 1, ease: "power1.in"})

    },
    lang(newval) {

      const tl = gsap.timeline()
      tl.fromTo(
        ".langText",
        { opacity: 1 },
        { duration: .1, opacity: 0, ease: "power1.out"})
      tl.set(
        this,
        { langDisplay: newval })
      tl.fromTo(
        ".langText",
        { opacity: 0 },
        { duration: .1, opacity: 1, ease: "power1.in"})

    },
  },
}
</script>

<style scoped>
  .wordbody {
    color: rgb(68, 8, 8);
    opacity: 1;
  }
  .langText {
    opacity: 1;
  }
</style>