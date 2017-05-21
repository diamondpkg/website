<template>
  <div class="home">
    <app-navbar />

    <div class="wrapper">
      <section class="hero is-medium is-info">
        <div class="hero-body">
          <div class="container">
            <h1 class="title main-text">
              Dependency management built for Sass, Less, Stylus, and CSS.
            </h1>
            <div class="bottom">
              <router-link to="/docs" class="button is-info is-outlined get-started">Get Started</router-link>
              <h2 class="subtitle sub-text">
                <b>Install: </b>
                <code>npm i -g diamondpkg</code>
              </h2>
            </div>
          </div>
        </div>
      </section>

      <section class="hero">
        <div class="hero-body">
          <div class="container">
            <h1 class="title">
              Thousands of Packages
            </h1>
            <h2 class="subtitle">
              diamond works with any package on npm, GitHub, or GitLab.
            </h2>
          </div>
        </div>
      </section>

      <section class="hero">
        <div class="hero-body">
          <div class="container">
            <h1 class="title">
              Cross-preprocessor
            </h1>
            <h2 class="subtitle">
              Sass packages work with Less, Less packages work with Sass, and so on. You can mix and match packages of any preprocessor.
            </h2>
          </div>
        </div>
      </section>

      <section class="hero">
        <div class="hero-body">
          <div class="container">
            <h1 class="title">
              Multipurpose
            </h1>
            <h2 class="subtitle">
              diamond can distribute Sass functions, Sass mixins, Sass importers, Less plugins, postprocessors, and just plain old libraries like Bootstrap.
            </h2>
          </div>
        </div>
      </section>

      <section class="hero">
        <div class="hero-body">
          <div class="container">
            <h1 class="title">
              Secure
            </h1>
            <h2 class="subtitle">
              diamond uses checksums to verify every package on install.
            </h2>
          </div>
        </div>
      </section>

      <section class="hero">
        <div class="hero-body">
          <div class="container">
            <h1 class="title">
              Fast
            </h1>
            <h2 class="subtitle">
              diamond caches every npm package you install so you dont have to redownload it ever again.
            </h2>
          </div>
        </div>
      </section>

      <section class="hero">
        <div class="hero-body">
          <div class="container">
            <h1 class="title">
              Flatpacked
            </h1>
            <h2 class="subtitle">
              Packages are flatpacked, so you don't need several seperate installs of the same package.
            </h2>
          </div>
        </div>
      </section>

      <section class="hero is-medium is-info">
        <div class="hero-body">
          <div class="container has-text-centered">
            <div class="columns">
              <div class="column">
                <h2 class="title main-text bottom-text">
                  What are you waiting for?
                </h2>
              </div>

              <div class="column is-narrow-desktop">
                <router-link to="/docs" class="button is-info is-outlined get-started bottom-text">Get Started</router-link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <app-footer />
  </div>
</template>

<script>
  import AppNavbar from '@/components/AppNavbar';
  import AppFooter from '@/components/AppFooter';

  export default {
    name: 'home',
    components: { AppNavbar, AppFooter },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
  @import '../../styles/bulma'

  .lang
    margin-right: 5px

  .main-text
    font-family: 'Montserrat', sans-serif
    text-transform: uppercase
    text-shadow: darken($blue, 20%) 5px 5px 0px
    font-size: 4em
    font-weight: 900

    +mobile
      font-size: 2em

  a.get-started
    border-color: darken($blue, 20%) !important
    font-size: 2em
    color: white !important
    transition: border-color 100ms ease-in-out

    +mobile
      font-size: 1.5em
      width: 100%

    &:hover
      border-color: white !important

  .bottom
    margin-top: 50px !important

    +mobile
      margin-top: 1.5rem !important

    .sub-text
      margin-left: 20px
      display: inline
      font-size: 2em
      line-height: 2.285em

      +mobile
        display: none

      code
        background: darken($blue, 20%)
        color: white
        border-radius: 3px
</style>
