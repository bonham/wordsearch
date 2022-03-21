<template>
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
      class="form-control"
      aria-describedby="anyCharHelp"
    >
    <div
      id="anyCharHelp"
      class="form-text"
    >
      Letters which should appear anywhere in the word
    </div>
  </div>
  <div class="mb-3">
    <label
      for="startLetter"
      class="form-label"
    >Start</label>
    <input
      id="startLetter"
      type="text"
      class="form-control"
    >
  </div>
  <button
    class="btn btn-primary"
    @click="recalcResult"
  >
    Submit
  </button>
  <h2>{{ resultLength }} {{ anychar }}</h2>
</template>
<script>
import fvl from "raw-loader!../assets/fiveletters.txt";
const _ = require("lodash");
console.log(fvl.length);
function containsUmlaut(s) {
  const umlaute = ["ä", "ö", "ü", "Ä", "Ö", "Ü", "ß"];
  for (let i = 0; i < umlaute.length; i++) {
    const c = umlaute[i];
    if (s.indexOf(c) >= 0) return true;
  }
  return false;
}
var ar = fvl.split("\n");
ar = _.filter(ar, (x) => !containsUmlaut(x));
ar = _.map(ar, (x) => x.toUpperCase());
console.log(ar.length);
export default {
  data() {
    return {
      anychar: "",
      resultLength: null,
    };
  },
  watch: {
    // eslint-disable-next-line no-unused-vars
    anychar(newvalue, oldvalue) {
      this.recalcResult();
    },
  },
  mounted() {
    console.log("hi");
  },
  methods: {
    recalcResult() {
      var r = ar;
      Array.from(this.anychar).forEach((c) => {
        r = _.filter(r, (x) => x.indexOf(c) >= 0);
      });
      this.resultLength = r.length;
      console.log(r);
    },
  },
};
</script>
