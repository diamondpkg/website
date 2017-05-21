<template>
  <div class="package">
    <app-navbar />
    
    <div class="wrapper">
      <loading class="loading animated" v-if="!loaded" v-bind:class="{ fadeOut: loaded }"/>
      <div class="container animated" v-else v-bind:class="{ fadeIn: loaded }">
        <div class="columns">
          <user-packages :packages="packages" class="is-hidden-mobile" />

          <div class="column right">
            <section class="hero">
              <div class="hero-body">
                <div class="rcol">
                  <img class="image" :src="avatar" alt="avatar">
                  <h1 class="title"><strong>{{ name }}</strong></h1>
                  <p>{{ email }}</p>
                </div>
              </div>
            </section>
          </div>

         <user-packages :packages="packages" class="is-hidden-tablet" />
        </div>
      </div>
    </div>

    <app-footer />
  </div>
</template>

<script>
  import crypto from 'crypto';
  import request from 'superagent/superagent';
  import AppNavbar from '@/components/AppNavbar';
  import AppFooter from '@/components/AppFooter';
  import UserPackages from '@/components/UserPackages';
  import { registry } from '@/util';

  const data = {
    name: '',
    email: '',
    avatar: '',
    packages: [],
    signedIn: false,
    verified: false,
    loaded: false,
  };

  export default {
    name: 'documentation',
    components: {
      AppNavbar,
      AppFooter,
      UserPackages,
    },

    data() {
      return data;
    },

    methods: {
      handleRoute(route) {
        this.$data.loaded = false;

        request.get(`${registry()}/v1/user/${this.$route.params.user}`).end((err, res) => {
          if (err) return;
          this.$data.name = res.body.username;
          this.$data.email = res.body.email;
          this.$data.packages = res.body.packages;
          this.$data.verified = res.body.verified;
          this.$data.avatar = `http://www.gravatar.com/avatar/${
            crypto.createHash('md5').update(res.body.email, 'utf8').digest('hex')}?s=512&d=retro`;
          this.$data.signedIn = res.body.username === (localStorage.user ? JSON.parse(localStorage.user).username : null);
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
  @import '../../styles/bulma'

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
    margin-bottom: 20px

  h1.title
    margin-bottom: 5px

  .rcol
    max-width: 250px
    display: block
    margin: 0 auto
</style>
