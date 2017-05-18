<template>
  <div class="package">
    <app-navbar />

    <div class="wrapper">
      <div id="badge-modal" class="modal">
        <div class="modal-background"></div>
        <div class="modal-card">
          <header class="modal-card-head">
            <p class="modal-card-title">Badge</p>
            <button id="badge-modal-close" class="delete"></button>
          </header>
          <section class="modal-card-body">
            <h2 class="subtitle is-4 no-margin">URL</h2>
            <pre><code class="nohighlight">https://registry.hackzzila.com/package/{{name}}/badge/full.svg</code></pre>

            <br>

            <h2 class="subtitle is-4 no-margin">Markdown</h2>
            <pre><code class="nohighlight">[![diamond](https://registry.hackzzila.com/package/{{name}}/badge/full.svg)](https://diamond.js.org/#/package/{{name}})</code></pre>
          </section>
        </div>
      </div>

      <loading class="loading animated" v-if="!loaded" v-bind:class="{ fadeOut: loaded }"/>
      <div class="container animated" v-else v-bind:class="{ fadeIn: loaded }">
        <div class="columns">
          <div class="column is-9">
            <section class="hero">
              <div class="hero-body">
                <div class="content readme" v-html="readme"></div>
              </div>
            </section>
          </div>

          <div class="column right">
            <section class="hero">
              <div class="hero-body">
                <h1 class="title"><strong>{{ name }}</strong> <small>{{ latest }}</small></h1>
                <h2 class="subtitle main">{{ description }}</h2>

                <h2 class="subtitle is-4 no-margin">Use</h2>
                <pre><code class="nohighlight">$ diamond install {{ name }}</code></pre>

                <br>

                <h2 class="subtitle is-4 no-margin">Badge</h2>
                <img :src="`https://registry.hackzzila.com/package/${name}/badge/full.svg`" alt="Badge" id="badge" class="image">

                <br>

                <h2 class="subtitle is-4 no-margin">Authors</h2>
                <ul class="margin-left">
                  <li v-for="author in authors">
                    <router-link :to="{ path: `/user/${author.username}` }">{{author.username}}</router-link>
                  </li>
                </ul>

                <br>

                <h2 class="subtitle is-4 no-margin">Tags</h2>
                <table class="table no-margin">
                  <tbody>
                    <tr v-for="(version, index) in tags">
                      <td>{{index}}</td>
                      <td><strong>{{version}}</strong></td>
                    </tr>
                  </tbody>
                </table>

                <br>

                <h2 class="subtitle is-4 no-margin">Versions</h2>
                <table class="table no-margin">
                  <tbody>
                    <tr v-for="(version, index) in versions">
                      <td>{{ moment(version.createdAt).format('MMMM Do, YYYY') }}</td>
                      <td><strong>{{index}}</strong></td>
                    </tr>
                  </tbody>
                </table>
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
  import $ from 'jquery';
  import Vue from 'vue';
  import moment from 'moment';
  import request from 'superagent/superagent';
  import AppNavbar from '@/components/AppNavbar';
  import AppFooter from '@/components/AppFooter';
  import { registry } from '@/util';

  const data = {
    moment,
    name: '',
    readme: '',
    description: '',
    latest: '',
    versions: {},
    authors: [],
    tags: {},
    loaded: false,
  };

  export default {
    name: 'documentation',
    components: {
      AppNavbar,
      AppFooter,
    },

    data() {
      return data;
    },

    methods: {
      handleRoute(route) {
        this.$data.loaded = false;
        request.get(`${registry()}/v1/package/${this.$route.params.package}`).end((err, res) => {
          if (err) return;
          this.$data.name = res.body.name;
          this.$data.readme = Vue.filter('marked')(res.body.versions[res.body.tags.latest].readme);
          this.$data.description = res.body.versions[res.body.tags.latest].data.description;
          this.$data.latest = res.body.tags.latest;
          this.$data.versions = res.body.versions;
          this.$data.authors = res.body.authors;
          this.$data.tags = res.body.tags;
          this.$data.loaded = true;

          $(() => {
            $('#badge').click(() => {
              $('#badge-modal').addClass('is-active');
            });

            $('#badge-modal-close').click(() => {
              $('#badge-modal').removeClass('is-active');
            });
          });
        });

        // Redirect to a default route
        if (!route.params.package) {
          this.$router.go('/packages');
        }
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
  .wrapper
    position: relative

  .loading
    position: absolute
    top: 50%
    left: 50%
    transform: translate(-50%, -50%)

  #badge
    cursor: pointer

  ul.margin-left
    margin-left: 20px

  .subtitle.main
    margin-bottom: 2em

  .subtitle.no-margin
    margin-bottom: 10px

  .table.no-margin
    margin-bottom: 0

  td
    width: 75%
</style>
