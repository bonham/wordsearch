<template>
  <div class="container">
    <Navbar />
    <wsearch-form />
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'
import WsearchForm from './components/WsearchForm.vue'
export default {
  name: 'App',
  components: {
    Navbar,
    WsearchForm
  }
}
</script>