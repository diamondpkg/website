<template>
  <div class="error">
    <section class="hero is-info is-fullheight">
      <div class="hero-body">
        <div class="container">
          <div class="center">
            <img src="../../assets/Diamond.svg" alt="Diamond">
            <h1 class="title is-1">No diamonds here!</h1>
            <router-link to="/">Go back home.</router-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  export default {
    name: 'not-found',
  };
</script>

<style lang="sass" scoped>
  html, body
    overflow-y: hidden

    .center
      text-align: center
      position: absolute
      top: 50%
      left: 50%
      transform: translate(-50%, -50%)

      img
        width: 50%
        height: 50%
</style>
