<template>
  <div>
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
</template>

<script>
export default {
  emits: ['pos-form-update'],
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
    }
  },
  
  props: {
    resetTrigger: {
      type: Number,
      default: 0
    },
  },
  methods: {
    
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

      this.emitConstraints()

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
      this.emitConstraints()

      // set focus
      const focusposition = Math.max(position - 1, 0)
      this.$refs.inputref[focusposition].focus()
    },

    emitConstraints() {
      this.$emit('pos-form-update', this.positionConstraints)
    },

  },
  watch: {
    resetTrigger() {
      this.inputFields.forEach(x => {
        x.text = ""
      })
    }
  }
}
</script>

<style scoped>
  .oneletter {
    width: 3em;
    margin-right: .3em;
    text-align: center;
  }
</style>