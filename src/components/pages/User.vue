<template>
  <div class="package">
    <app-navbar />
    
    <div class="wrapper">
      <loading class="loading animated" v-if="!loaded" v-bind:class="{ fadeOut: loaded }"/>
      <div class="container animated" v-else v-bind:class="{ fadeIn: loaded }">
        <div class="columns">
          <div class="column is-9">
            <section class="hero">
              <div class="hero-body">
                  <h1 class="title"><strong>{{ name }}</strong> <small>{{ email }}</small></h1>

                  <br>

                  <h2 class="subtitle is-4 no-margin">Packages</h2>
                  <hr>
                  <ul>
                    <li v-for="package of packages">
                      <router-link :to="{ path: `/package/${package}` }">{{ package }}</router-link>
                    </li>
                  </ul>
              </div>
            </section>
          </div>

          <div class="column right">
            <section class="hero">
              <div class="hero-body">
                <img class="image" :src="avatar" alt="avatar">
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
  import crypto from 'crypto';
  import moment from 'moment';
  import request from 'superagent/superagent';
  import AppNavbar from '@/components/AppNavbar';
  import AppFooter from '@/components/AppFooter';

  const data = {
    moment,
    name: '',
    email: '',
    avatar: '',
    packages: [],
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

        request.get(`https://registry.hackzzila.com/user/${this.$route.params.user}`).end((err, res) => {
          if (err) return;
          this.$data.name = res.body.username;
          this.$data.email = res.body.email;
          this.$data.packages = res.body.packages;
          this.$data.avatar = `http://www.gravatar.com/avatar/${
            crypto.createHash('md5').update(res.body.email, 'utf8').digest('hex')}?s=512`;
          this.$data.loaded = true;
        });

        // Redirect to a default route
        if (!route.params.user) {
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

  ul.margin-left
    margin-left: 20px

  .subtitle.no-margin
    margin-bottom: 5px

  .table.no-margin
    margin-bottom: 0

  td
    width: 75%

  hr
    margin-top: 0
    margin-bottom: 5px

  img
    height: 250px
    display: block
    margin: 0 auto

  .column.right
    border-left: 1px solid #dbdbdb
</style>