<template>
  <div class="container">
    <Navbar @reset="resetAction" />
    <wsearch-form />
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
  methods: {
    resetAction(e) {
      console.log("Event received",e)
    }
  }
}
</script>