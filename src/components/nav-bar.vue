<template>
  <header
    class="navbar navbar-expand-sm navbar-light navbar-custom-bg"
  >
    <nav class="container">
      <a
        class="navbar-brand me-4"
        href="#"
      >wordlesearch</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon" />
      </button>
      <div
        class="collapse navbar-collapse"
        id="navbarSupportedContent"
      >
        <ul class="navbar-nav me-auto mb-2 mb-sm-0">
          <li
            v-for="l in languages"
            :key="l.id"
            class="nav-item"
          >
            <a
              class="nav-link"
              :class="{ active: isActive(l.id) }"
              @click="setLang(l.id)"
              href="#"
            >{{ l.id }}</a>
          </li>
        </ul>
        <form class="d-flex">
          <button
            class="btn btn-outline-dark"
            @click="$emit('reset')"
          >
            Reset
          </button>
        </form>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  emits: ['reset','lang'],
  data() {
    return {
      lang: "EN",
      languages: [
        { id: 'EN'},
        { id: 'DE'},
        { id: 'HU'},
      ]
    }
  },
  methods: {
    isActive(current_lang) {
      if (this.lang == current_lang) 
        return "active"
      else 
        return ""
    },
    setLang(l) {
      this.lang=l
      this.$emit('lang',l)
    }
  }

}
</script>
<style scoped>

.navbar-custom-bg {
  background-color:aquamarine;
}
</style>
