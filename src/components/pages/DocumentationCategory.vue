<template>
  <div class="docs">
    <app-navbar />

    <div class="wrapper">
      <page-title :text="file.title" />

      <div class="container">
        <section class="hero">
          <div class="hero-body">
            <div class="columns">
              <div class="column is-9">
                <div class="content doc-content" v-html="content"></div>

                <div class="block">
                  <router-link v-if="files[index - 1]" :to="`/docs/${category}/${files[index - 1].path}`" class="button is-info is-outlined">
                    <span class="icon is-small">
                      <i class="fa fa-arrow-left"></i>
                    </span>
                    <span>{{ files[index - 1].title }}</span>
                  </router-link>

                  <router-link v-if="files[index + 1]" :to="`/docs/${category}/${files[index + 1].path}`" class="button is-info is-pulled-right">
                    <span>{{ files[index + 1].title }}</span>
                    <span class="icon is-small">
                      <i class="fa fa-arrow-right"></i>
                    </span>
                  </router-link>
                </div>
              </div>

              <div class="column">
                <ul>
                  <li v-for="file of files">
                    <router-link :to="`/docs/${category}/${file.path}`" append>{{ file.title }}</router-link>
                  </li>
                </ul>
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
  import Vue from 'vue';
  import request from 'superagent';
  import yaml from 'js-yaml';
  import docs from '../../docs';

  export default {
    name: 'docmentation',

    data() {
      return { page: {}, file: {}, files: [], content: '', category: this.$route.params.category, index: 0 };
    },

    methods: {
      handleRoute() {
        this.$data.loaded = false;

        (async () => {
          const page = docs.find(o => o.path === this.$route.params.category);

          const res = await request.get(`https://raw.githubusercontent.com/${page.repo}/master/docs/index.yml`).buffer();
          const files = yaml.safeLoad(res.text)[this.$route.params.category];
          const index = files.findIndex(o => o.path === (this.$route.params.file || 'index'));
          const file = files[index];

          this.$data.page = page;
          this.$data.file = file;
          this.$data.files = files;
          this.$data.index = index;

          const res2 = await request.get(`https://raw.githubusercontent.com/${page.repo}/master/docs/${page.path}/${file.path}.md`).buffer();
          this.$data.content = Vue.filter('marked')(res2.text);

          this.$data.loaded = true;
        })();
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

<style lang="sass">
  @import '../../styles/bulma'

  .docs .doc-content
    pre
      background-color: $grey-darker !important
      color: white
      border-radius: 3px
      border-left: 5px solid $blue

      code
        padding: 0 !important

    h3 
      margin-top: 50px !important

      code
        background-color: $blue !important
        color: white
        border-radius: 3px

    h3 + h3, h2 + h3
      margin-top: 0 !important
</style>
