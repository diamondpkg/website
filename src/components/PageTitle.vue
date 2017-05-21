<template>
  <section class="hero is-info">
    <div class="hero-body">
      <div class="container">
        <h1 class="title main-text">
          {{ text }}
        </h1>
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    name: 'navbar',
    props: ['text'],
  };
</script>

<style lang="sass" scoped>
  @import '../styles/bulma'

  .main-text
    font-family: 'Montserrat', sans-serif
    text-shadow: darken($blue, 20%) 5px 5px 0px
    font-size: 3.25em

    +mobile
      font-size: 2em
</style>
