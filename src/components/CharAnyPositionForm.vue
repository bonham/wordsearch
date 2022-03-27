<template>
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
</template>

<script>
export default {
  emits: ['anypos-form-update'],
  data() {
    return {
      anychar: ""
    }
  },
  
  props: {
    resetTrigger: {
      type: Number,
      default: 0
    },
  },
  methods: {
    processInput(e) {
      const up = e.target.value.toUpperCase()
      this.anychar = up
      this.$emit('anypos-form-update', this.anychar)
    },
  },
  
  watch: {
    resetTrigger() {
      this.anychar = ""
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