<template>
  <div class="column is-9">
    <section class="hero">
      <div class="hero-body">
        <div class="rcol mobile-only">
          <article class="message is-warning" v-if="signedIn && !verified">
            <div class="message-body">
              Please check your email for a verification email.
            </div>
          </article>

          <h2 class="subtitle is-3 no-margin">Packages</h2>
          <ul>
            <li v-for="package of packages">
              <router-link :to="{ path: `/package/${package}` }">{{ package }}</router-link>
            </li>
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  export default {
    name: 'user-packages',
    props: ['packages'],
  };
</script>

<style lang="sass" scoped>
  @import '../styles/_bulma.sass'

  .rcol
    +mobile
      max-width: 250px
      display: block
      margin: 0 auto
</style>
