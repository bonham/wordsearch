<template>
  <div class="container">
    <Navbar
      @reset="resetAction"
      @lang="setLang"
    />
    <wsearch-form
      :lang="langStatus"
      :reset-trigger="resetCounter"
    />
  </div>
</template>

<script>
import Navbar from './components/nav-bar.vue'
import WsearchForm from './components/WsearchForm.vue'
export default {
  name: 'App',
  components: {
    Navbar,
    WsearchForm
  },
  data() {
    return {
      resetCounter: 0,
      langStatus: "EN"
    }
  },
  methods: {
    resetAction() {
      this.resetCounter++
    },
    setLang(language) {
      this.resetAction()
      this.langStatus = language
    }
  }
}
</script>