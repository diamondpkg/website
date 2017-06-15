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

      <div id="docs-modal" class="modal">
        <div class="modal-background"></div>
        <div class="modal-card">
          <header class="modal-card-head">
            <p class="modal-card-title">Docs</p>
            <button id="docs-modal-close" class="delete"></button>
          </header>
          <section class="modal-card-body">
            Docs are automatically built with <a href="https://sassdoc.com">SassDoc</a> which only supports
            Sass mixins, functions, and variables. This only documents a subset of packages.
          </section>
        </div>
      </div>

      <loading class="loading animated" v-if="!loaded" v-bind:class="{ fadeOut: loaded }"/>
      <div class="container animated" v-else v-bind:class="{ fadeIn: loaded }">
        <div class="columns">
          <div class="column is-9">
            <section class="hero">
              <div class="hero-body">
                <div class="is-hidden-tablet">
                  <h1 class="title"><strong>{{ name }}</strong> <small>{{ latest }}</small> <span :class="`tag ${lang}`"></span></h1>
                  <h2 class="subtitle main">{{ description }}</h2>
                  <hr>
                </div>

                <div class="content readme" v-html="readme"></div>
              </div>
            </section>
          </div>

          <hr class="is-hidden-tablet">

          <div class="column right">
            <section class="hero">
              <div class="hero-body">
                <div class="is-hidden-mobile">
                  <h1 class="title"><strong>{{ name }}</strong> <small>{{ latest }}</small> <span :class="`tag ${lang}`"></span></h1>
                  <h2 class="subtitle main">{{ description }}</h2>
                </div>

                <h2 class="subtitle is-4 no-margin">Use</h2>
                <pre><code class="nohighlight">$ diamond install {{ name }}</code></pre>

                <br>

                <h2 class="subtitle is-4 no-margin">Docs</h2>
                <p><strong><a :href="`https://docs.diamondpkg.org/${name}`">docs.diamondpkg.org/{{ name }}</a></strong></p>
                <p>Docs may not always be present. <a id="docs">Learn why.</a></p>

                <br>

                <h2 class="subtitle is-4 no-margin">CDN</h2>
                <pre><code class="nohighlight">https://cdn.diamondpkg.org/v1/{{ name }}/{{ latest }}</code></pre>

                <br>

                <h2 class="subtitle is-4 no-margin">Badge</h2>
                <img :src="`https://registry.hackzzila.com/package/${name}/badge/full.svg`" alt="Badge" id="badge" class="image">

                <br>

                <h2 class="subtitle is-4 no-margin">Downloads</h2>
                <div id="graph"></div>
                <table class="table no-margin">
                  <tbody>
                    <tr>
                      <td>In the Past Week</td>
                      <td><strong>{{weeklyDownloads}}</strong></td>
                    </tr>
                    <tr>
                      <td>Overall</td>
                      <td><strong>{{downloads}}</strong></td>
                    </tr>
                  </tbody>
                </table>
                <br>

                <h2 class="subtitle is-4 no-margin">Authors</h2>
                <ul class="margin-left">
                  <li v-for="author in authors">
                    <router-link class="author" :to="{ path: `/user/${author.username}` }">
                      <img :src="`https://www.gravatar.com/avatar/${
                        crypto.createHash('md5').update(author.email, 'utf8').digest('hex')}?s=512&d=retro`">
                      <span>{{author.username}}</span>
                    </router-link>
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
  import crypto from 'crypto';
  import moment from 'moment';
  import Highcharts from 'highcharts';
  import request from 'superagent/superagent';
  import AppNavbar from '@/components/AppNavbar';
  import AppFooter from '@/components/AppFooter';
  import { registry } from '@/util';

  const data = {
    moment,
    crypto,
    name: '',
    readme: '',
    description: '',
    latest: '',
    lang: false,
    versions: {},
    authors: [],
    tags: {},
    downloads: 0,
    weeklyDownloads: 0,
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
          this.$data.downloads = res.body.downloads;
          this.$data.weeklyDownloads = res.body.weeklyDownloads;

          const main = res.body.versions[res.body.tags.latest].data.main || '';
          this.$data.lang = ['sass', 'scss', 'less', 'styl'].includes(main.substr(main.length - 4)) ? main.substr(main.length - 4) : false;

          this.$data.loaded = true;

          const now = new Date(Date.now());
          const min = (((now.getFullYear() - 2016) * 12) + now.getMonth()) - 12;
          // const currentEpoch = ((date.getFullYear() - 2016) * 12) + date.getMonth();

          const arr = new Array(12).fill(0);
          for (const date in res.body.monthlyDownloads) {
            const d = new Date(date);
            const epoch = ((d.getFullYear() - 2016) * 12) + d.getMonth();
            if (epoch > min) {
              arr[epoch - min] = res.body.monthlyDownloads[date];
            }
          }

          $(() => {
            $('#badge').click(() => {
              $('#badge-modal').addClass('is-active');
            });

            $('#badge-modal-close').click(() => {
              $('#badge-modal').removeClass('is-active');
            });

            $('#docs').click(() => {
              $('#docs-modal').addClass('is-active');
            });

            $('#docs-modal-close').click(() => {
              $('#docs-modal').removeClass('is-active');
            });

            Highcharts.chart('graph', {
              chart: {
                backgroundColor: null,
                borderWidth: 2,
                borderColor: '#3273dc',
              },

              title: {
                text: null,
              },

              yAxis: {
                title: {
                  text: null,
                },
                labels: {
                  enabled: false,
                },
                gridLineColor: 'transparent',
                lineWidth: 0,
                minorGridLineWidth: 0,
                lineColor: 'transparent',
                minorTickLength: 0,
                tickLength: 0,
              },

              exporting: {
                enabled: false,
              },

              legend: {
                enabled: false,
              },

              tooltip: {
                pointFormat: '{point.y}',
              },

              xAxis: {
                type: 'datetime',
                labels: {
                  enabled: false,
                },
                lineWidth: 0,
                minorGridLineWidth: 0,
                lineColor: 'transparent',
                minorTickLength: 0,
                tickLength: 0,
              },

              plotOptions: {
                series: {
                  pointStart: Date.UTC(Math.floor(min / 12) + 2016, (min % 12) + 1),
                  pointIntervalUnit: 'month',
                },
              },

              credits: {
                enabled: false,
              },

              series: [{
                color: '#3273dc',
                name: 'Downloads',
                data: arr,
              }],
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

<style lang="sass">
  .readme table
    display: block
    overflow-x: auto
</style>

<style lang="sass" scoped>
  @import '../../styles/_bulma.sass'

  .wrapper
    position: relative

  .author
    display: inline-block

    span
      vertical-align: middle

    img
      height: 1.25rem
      vertical-align: middle
      border-radius: 3px

  .sass
    background: $sass-color
    color: white

    &:after
      content: 'Sass'

  .scss
    background: $sass-color
    color: white

    &:after
      content: 'Sass'

  .less
    background: $less-color
    color: white

    &:after
      content: 'Less'

  .stylus
    background: $stylus-color
    color: white

    &:after
      content: 'Stylus'

  .loading
    position: absolute
    top: 50%
    left: 50%
    transform: translate(-50%, -50%)

  #badge
    cursor: pointer

  #graph
    height: 150px

  ul.margin-left
    margin-left: 20px

  .subtitle.main
    margin-bottom: 2em

  .subtitle.no-margin
    margin-bottom: 10px

  .table.no-margin
    margin-bottom: 0

  .table
    td:nth-child(2)
      text-align: right
</style>
