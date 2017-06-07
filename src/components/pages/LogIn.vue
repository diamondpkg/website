<template>
  <div class="log-in">
    <app-navbar />

    <div class="wrapper">
      <div class="container">
        <section class="hero">
          <div class="hero-body">
            <div class="columns">
              <div class="column is-2 is-10-mobile is-offset-5 is-offset-1-mobile">
                <div class="form">
                  <article class="message is-danger hidden" id="error">
                    <div class="message-body">
                      Server Error 
                    </div>
                  </article>

                  <h2 class="subtitle is-4">Log In</h2>
                  <div class="field">
                    <label class="label">Username</label>
                    <p class="control has-icons-left">
                      <input id="username" class="input" type="text" placeholder="hackzzila">
                      <span class="icon is-small is-left">
                        <i class="fa fa-user"></i>
                      </span>
                    </p>
                  </div>

                  <div class="field">
                    <label class="label">Password</label>
                    <p class="control has-icons-left">
                      <input id="password" class="input" type="password" placeholder="••••••••••">
                      <span class="icon is-small is-left">
                        <i class="fa fa-lock"></i>
                      </span>
                      <p class="help is-danger hidden" id="invalid">Invalid Credentials</p>
                    </p>
                  </div>

                  <br>

                  <div class="field">
                    <p class="control">
                      <button class="button is-primary" id="button">Log In</button>
                    </p>
                  </div>
                </div>
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

  export default {
    name: 'log-in',
    components: { AppNavbar, AppFooter },

    methods: {
      handleRoute() {
        if (localStorage.user) {
          this.$router.push({ name: 'user', params: { user: JSON.parse(localStorage.user).username } });
        }

        $(() => {
          $('#button').click(() => {
            request.get(`${registry()}/v1/user`)
              .auth($('#username').first().val(), $('#password').first().val())
              .end((err, res) => {
                if (res.statusCode === 401) {
                  $('#username').addClass('is-danger');
                  $('#password').addClass('is-danger');
                  $('#invalid').removeClass('hidden');
                } else if (res.statusCode !== 200) {
                  $('#error').removeClass('hidden');
                } else {
                  const user = res.body;
                  delete user.packages;
                  localStorage.user = JSON.stringify(user);
                  this.$router.push({ name: 'user', params: { user: user.username } });
                }
              });
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
  @import '../../styles/_bulma.sass'

  .hidden
    display: none
</style>
