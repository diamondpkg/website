<template>
  <div class="graphiql">
    <app-navbar />

    <section class="hero">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">GraphQL API v2 <span class="tag">Beta</span></h1>
          <h2 class="subtitle" v-if="user">Logged in as <strong>{{ user.username }}</strong></h2>
          <h2 class="subtitle" v-else>Not logged in</h2>

          <iframe id="graphiql" src="/graphiql.html" frameborder="0"></iframe>
        </div>
      </div>
    </section>

    <app-footer />
  </div>
</template>

<script>
  export default {
    name: 'GraphiQL',

    data() {
      if (localStorage.user) return { user: JSON.parse(localStorage.user) };
      return { user: false };
    },
  };
</script>

<style lang="sass" scoped>
  @import '../../styles/bulma'

  #graphiql
    border: 1px solid $grey-light
    height: 80vh
    width: 100%
</style>
