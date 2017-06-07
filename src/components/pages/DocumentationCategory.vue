<template>
  <div class="docs">
    <app-navbar />

    <div class="wrapper">
      <page-title :text="file.title" />

      <div class="container">
        <div class="columns">
          <div class="column is-9">
            <section class="hero">
              <div class="hero-body main">
                <div class="content doc-content" v-html="content"></div>

                <div class="block">
                    <router-link v-if="files[index - 1]" :to="`/docs/${category}/${files[index - 1].path}`" id="nav-top" class="button is-info is-outlined">
                      <span class="icon is-small">
                        <i class="fa fa-arrow-left"></i>
                      </span>
                      <span>{{ files[index - 1].title }}</span>
                    </router-link>

                    <router-link v-if="files[index + 1]" :to="`/docs/${category}/${files[index + 1].path}`" id="nav-top" class="button is-info is-pulled-right is-marginless">
                      <span>{{ files[index + 1].title }}</span>
                      <span class="icon is-small">
                        <i class="fa fa-arrow-right"></i>
                      </span>
                    </router-link>
                </div>
              </div>
            </section>
          </div>

           <hr class="is-hidden-tablet">

          <div class="column">
            <section class="hero">
              <div class="hero-body side-nav">
                <div class="field">
                  <p class="control">
                    <span class="select">
                      <select id="select"></select>
                    </span>
                  </p>
                </div>

                <ul>
                  <li v-for="file of files">
                    <router-link :to="`/docs/${category}/${file.path}`" append id="nav-top">{{ file.title }}</router-link>
                  </li>
                </ul>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>

    <app-footer />
  </div>
</template>

<script>
  import Vue from 'vue';
  import semver from 'semver';
  import $ from 'jquery';
  import request from 'superagent';
  import yaml from 'js-yaml';
  import docs from '../../docs';

  export default {
    name: 'docmentation',

    data() {
      return { page: {}, file: {}, files: [], content: '', category: this.$route.params.category, index: 0 };
    },

    methods: {
      async handleRoute() {
        this.$data.loaded = false;

        const page = docs.find(o => o.path === this.$route.params.category);

        if (!sessionStorage[page.repo]) sessionStorage[page.repo] = '{}';
        const storage = JSON.parse(sessionStorage[page.repo]);

        storage.branches = storage.branches || (await request.get(`https://api.github.com/repos/${page.repo}/branches`).set('Accept', 'application/vnd.github.v3+json'))
          .body.map(o => o.name)
          .filter(o => o !== 'legacy');

        storage.versions = storage.versions || (await request.get(`https://api.github.com/repos/${page.repo}/releases`).set('Accept', 'application/vnd.github.v3+json'))
          .body.filter(o => !o.draft && semver.gt(o.tag_name, '0.10.2'))
          .map(o => ({ name: o.tag_name, prerelease: o.prerelease }));

        storage.current = storage.current || storage.versions.find(o => !o.prerelease) || 'master';
        if (typeof storage.current === 'object') storage.current = storage.current.name;

        sessionStorage[page.repo] = JSON.stringify(storage);

        const res = await request.get(`https://raw.githubusercontent.com/${page.repo}/${storage.current}/docs/index.yml`).buffer();
        const files = yaml.safeLoad(res.text)[this.$route.params.category];
        const index = files.findIndex(o => o.path === (this.$route.params.file || 'index'));
        const file = files[index];

        this.$data.page = page;
        this.$data.file = file;
        this.$data.files = files;
        this.$data.index = index;

        try {
          const res2 = await request.get(`https://raw.githubusercontent.com/${page.repo}/${storage.current}/docs/${page.path}/${file.path}.md`).buffer();
          this.$data.content = Vue.filter('marked')(res2.text);
        } catch (err) {
          this.$router.push(`/docs/${this.$route.params.category}/index`);
        }

        $(() => {
          $('[id=nav-top]').click(() => {
            $('html, body').animate({ scrollTop: 0 }, 'fast');
          });

          $('#select').html('');

          for (const branch of storage.branches) {
            $('#select').append(`<option>${branch}</option>`);
          }

          for (const version of storage.versions) {
            $('#select').append(`<option>${version}</option>`);
          }

          $('#select').val(storage.current).change();

          $('#select').change(() => {
            if ($('#select').val() === storage.current) return;
            storage.current = $('#select').val();
            sessionStorage[page.repo] = JSON.stringify(storage);
            this.handleRoute(this.$route);
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

<style lang="sass">
  @import '../../styles/_bulma.sass'

  .docs
    .button
      +mobile
        width: 100%
        margin-bottom: 20px
    
    .columns
      .hero-body.main
        +mobile
          padding-bottom: 0

      .hero-body.side-nav
        +mobile
          padding-top: 0


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
