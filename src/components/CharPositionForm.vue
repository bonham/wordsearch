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
        @keydown.delete="processDelete"
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
    }
  },
  
  props: {
    resetTrigger: {
      type: Number,
      default: 0
    },
  },

  computed: {

    formValues() {
      // Return object of form { posN: letter1, posM: letter2 } for all form positions having a value
      const r = {}
      this.inputFields.forEach(x =>{
        if (x.text !="") {
          const pos = x.position
          r[pos] = x.text
        }
      })
      return r
    }
  },

  methods: {
    
    processAtPos(e) {
      const position = Number(e.target.attributes.pos.value)
      //console.log("atpos", position, e.data, e)
      
      if (e.data != null) { 
        const firstChar = e.data[0]
        const charUpper = firstChar.toUpperCase()

        // overwrite field
        this.inputFields[position].text = charUpper

        // set focus
        const maxpos = this.$refs.inputref.length - 1
        const focusposition = Math.min(position + 1, maxpos)
        this.$refs.inputref[focusposition].focus()
      } else {

        this.inputFields[position].text = ""

      }
      this.emitFormValues()
    },

    processDelete(e) {

      const position = Number(e.target.attributes.pos.value)
      var focusposition
      // Field was empty - change focus before inputevent is processed
      if (e.target.value.length == 0) {
        focusposition = Math.max(position - 1, 0)
        this.$refs.inputref[focusposition].focus()
      }
    },

    emitFormValues() {
      this.$emit('pos-form-update', this.formValues)
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