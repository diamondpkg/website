<template>
  <div class="docs">
    <app-navbar />

    <div class="wrapper">
      <page-title text="Documentation" />

      <div class="container">
        <section class="hero">
          <div class="hero-body">
            <p class="control has-icons-left search">
              <input class="input" id="docsearch" type="text" placeholder="Search">
              <span class="icon is-small is-left">
                <i class="fa fa-search"></i>
              </span>
            </p>

            <div class="tile is-ancestor">
              <div class="tile page-tile is-parent is-4" v-for="page in pages">
                <router-link :to="page.path" append>
                  <article class="tile is-child box">
                    <p class="title">{{ page.title }}</p>
                    <p class="subtitle">{{ page.desc }}</p>
                    <router-link :to="page.path" append>Read more</router-link>
                  </article>
                </router-link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>

    <app-footer />
  </div>
</template>

<script>
  import $ from 'jquery';
  import docs from '../../docs';

  export default {
    name: 'docmentation',

    data() {
      return { pages: docs };
    },

    methods: {
      handleRoute() {
        $(() => {
          docsearch({ // eslint-disable-line no-undef
            apiKey: '34a9f0c4b728c8d5d0e6f9c3b0c49835',
            indexName: 'diamondpkg',
            inputSelector: '#docsearch',
            debug: false, // Set debug to true if you want to inspect the dropdown
          });
        });
      },
    },

    watch: {
      $route(to) {
        this.handleRoute(to);
      },
    },

    created() {
      this.handleRoute(this.$route);
    },
  };
</script>

<style lang="sass" scoped>
  @import '../../styles/_bulma.sass'

  .page-tile
    article

      &:hover
        cursor: pointer
        box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.3) !important

        a
          color: black

  .search
    margin-bottom: 20px

  input:focus
    outline: none
    highlight: none
    border-color: $input-border !important
</style>
