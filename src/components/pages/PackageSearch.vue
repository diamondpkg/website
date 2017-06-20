<template>
  <div class="package">
    <app-navbar />

    <div class="wrapper">
      <section class="hero search is-info">
        <div class="hero-body container">
          <p class="control has-icons-left">
            <input class="input" id="search" type="text" placeholder="Search">
            <span class="icon is-small is-left">
              <i class="fa fa-search"></i>
            </span>
          </p>
        </div>
      </section>

      <div class="container">
        <h2 class="subtitle count"><strong>Packages:</strong> {{ packages.length }}</h2>
        <section class="hero search-result" v-for="package of packages">
          <div class="hero-body">
            <div class="columns">
              <div v-if="package.logo" class="column is-narrow is-hidden-mobile">
                <img :src="package.logo" alt="logo" class="image is-64x64">
              </div>

              <div class="column">
                  <h1 class="title package-name">
                    <router-link :to="{ path: `/package/${package.name}` }">
                      <strong>{{package.name}}</strong> <small>{{package.latest}}</small> <span :class="`tag ${package.lang}`"></span>
                    </router-link>
                  </h1>
                <div class="subtitle">{{package.description}}</div>
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
  import request from 'superagent/superagent';
  import AppNavbar from '@/components/AppNavbar';
  import AppFooter from '@/components/AppFooter';
  import { registry } from '@/util';

  const data = {
    packages: [],
  };

  const logos = {
    sierra: 'https://sierra-library.github.io/img/logo.png',
    caramel: '/static/caramel.svg',
    'sass-mq': 'https://avatars3.githubusercontent.com/u/9341289?v=3&s=500',
  };

  async function getDefault(self) {
    const pkgs = [];
    for (const pkg of (await request.get(`${registry()}/v1/packages`)).body) {
      const main = pkg.versions[pkg.tags.latest].data.main || '';
      pkgs.push({
        name: pkg.name,
        description: pkg.versions[pkg.tags.latest].data.description,
        latest: pkg.tags.latest,
        logo: logos[pkg.name] || null,
        lang: ['sass', 'scss', 'less', 'styl'].includes(main.substr(main.length - 4)) ? main.substr(main.length - 4) : false,
      });
    }

    self.$data.packages = pkgs;
  }

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
      handleRoute() {
        getDefault(this);

        $(() => {
          $('#search').keyup((event) => {
            if ($(event.target).val().trim() === '') return getDefault(this);
            request.get(`${registry()}/v1/search/package?q=${$(event.target).val()}`).end((err, res) => {
              if (err) return;
              const pkgs = [];
              for (const pkg of res.body) {
                const main = pkg.versions[pkg.tags.latest].data.main || '';

                pkgs.push({
                  name: pkg.name,
                  description: pkg.versions[pkg.tags.latest].data.description,
                  latest: pkg.tags.latest,
                  logo: logos[pkg.name] || null,
                  lang: ['sass', 'scss', 'less', 'styl'].includes(main.substr(main.length - 4)) ? main.substr(main.length - 4) : false,
                });
              }

              this.$data.packages = pkgs;
            });

            return undefined;
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

  .hero.search > .hero-body
    padding: 20px

  .search-result > .hero-body
    padding: 20px

  input:hover
    outline: none
    highlight: none
    border-color: $input-border !important

  input:focus
    outline: none
    highlight: none
    border-color: $input-border !important

  .package-name > a
    color: $text !important

  .count
    margin-left: 20px
    margin-top: 20px
</style>
