<template>
  <nav class="nav" v-bind:class="{ 'has-shadow': !docs, docs }">
    <div class="container">
      <div class="nav-left">
        <router-link to="/" class="nav-item">
          <img src="../assets/Diamond.png" alt="logo">
          <h4 class="title is-4">&nbsp;diamond</h4>
        </router-link>
        <router-link to="/" class="nav-item is-tab is-hidden-mobile">Home</router-link>
        <router-link to="/docs" class="nav-item is-tab is-hidden-mobile">Docs</router-link>
        <router-link to="/packages" class="nav-item is-tab is-hidden-mobile">Packages</router-link>
        <router-link to="/unify" class="nav-item is-tab is-hidden-mobile">Unify</router-link>
      </div>

      <div class="nav-center">
        <a class="nav-item" href="https://github.com/diamondpkg/diamond" target="_blank">
          <span class="icon">
            <i class="socicon-github"></i>
          </span>
        </a>

        <a class="nav-item" href="https://twitter.com/diamondpackage" target="_blank">
          <span class="icon">
            <i class="socicon-twitter"></i>
          </span>
        </a>

        <a class="nav-item" href="https://discord.gg/ZeX76Zy" target="_blank">
          <span class="icon">
            <i class="socicon-discord"></i>
          </span>
        </a>
      </div>

      <span class="nav-toggle">
        <span></span>
        <span></span>
        <span></span>
      </span>

      <div class="nav-right nav-menu">
        <router-link to="/" class="nav-item is-tab is-hidden-tablet">Home</router-link>
        <router-link to="/docs" class="nav-item is-tab is-hidden-tablet">Docs</router-link>
        <router-link to="/packages" class="nav-item is-tab is-hidden-tablet">Packages</router-link>
        <router-link to="/unify" class="nav-item is-tab is-hidden-tablet">Unify</router-link>

        <router-link :to="`/user/${user.username}`" class="nav-item is-tab" v-if="user">
          <figure class="image is-16x16" style="margin-right: 8px;">
            <img :src="avatar">
          </figure>
          Profile
        </router-link>
        <a class="nav-item is-tab" id="logout" v-if="user">Log out</a>
        <router-link to="/login" class="nav-item is-tab" v-else>Log In</router-link>
        <router-link to="/register" class="nav-item is-tab" v-if="!user">Register</router-link>
      </div>
    </div>
  </nav>
</template>

<script>
  import $ from 'jquery';
  import crypto from 'crypto';

  export default {
    name: 'navbar',
    props: {
      docs: {
        default: false,
      },
    },

    data() {
      if (localStorage.user) {
        return {
          user: JSON.parse(localStorage.user),
          avatar: `https://www.gravatar.com/avatar/${crypto.createHash('md5').update(JSON.parse(localStorage.user).email, 'utf8').digest('hex')}?d=retro`,
        };
      }
      return { user: false, avatar: false };
    },

    methods: {
      handleRoute() {
        $(() => {
          $('.nav-toggle').click(() => {
            $('.nav-toggle, .nav-menu').toggleClass('is-active');
          });

          $('#logout').click(() => {
            delete localStorage.user;
            delete localStorage.token;
            this.$router.push('/');
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
