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

                  <h2 class="subtitle is-4">Register</h2>
                  <div class="field">
                    <label class="label">Username</label>
                    <p class="control has-icons-left">
                      <input id="username" class="input" type="text" placeholder="hackzzila">
                      <span class="icon is-small is-left">
                        <i class="fa fa-user"></i>
                      </span>
                      <p class="help is-danger hidden" id="usinvalid">Cannot be empty.</p>
                    </p>
                  </div>

                  <div class="field">
                    <label class="label">Email</label>
                    <p class="control has-icons-left">
                      <input id="email" class="input" type="text" placeholder="admin@hackzzila.com">
                      <span class="icon is-small is-left">
                        <i class="fa fa-envelope"></i>
                      </span>
                      <p class="help is-danger hidden" id="eminvalid">Cannot be empty.</p>
                    </p>
                  </div>

                  <div class="field">
                    <label class="label">Password</label>
                    <p class="control has-icons-left">
                      <input id="password1" class="input" type="password" placeholder="••••••••••">
                      <span class="icon is-small is-left">
                        <i class="fa fa-lock"></i>
                      </span>
                    </p>
                  </div>

                  <div class="field">
                    <p class="control has-icons-left">
                      <input id="password2" class="input" type="password" placeholder="••••••••••">
                      <span class="icon is-small is-left">
                        <i class="fa fa-lock"></i>
                      </span>
                      <p class="help is-danger hidden" id="pwinvalid">Passwords do not match.</p>
                      <p class="help is-danger hidden" id="pwempty">Password can not be empty.</p>
                    </p>
                  </div>

                  <br>

                  <div class="field">
                    <p class="control">
                      <button class="button is-primary" id="button">Register</button>
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
            if ($('#password1').first().val() !== $('#password2').first().val()) {
              $('#password1').addClass('is-danger');
              $('#password2').addClass('is-danger');
              $('#pwinvalid').removeClass('hidden');
              return;
            }

            if ($('#password1').first().val().trim() === '') {
              $('#password1').addClass('is-danger');
              $('#password2').addClass('is-danger');
              $('#pwempty').removeClass('hidden');
              return;
            }

            $('#password1').removeClass('is-danger');
            $('#password2').removeClass('is-danger');
            $('#pwinvalid').addClass('hidden');

            if ($('#username').first().val().trim() === '') {
              $('#username').addClass('is-danger');
              $('#usinvalid').removeClass('hidden');
              return;
            }

            $('#username').removeClass('is-danger');
            $('#usinvalid').addClass('hidden');

            if ($('#email').first().val().trim() === '') {
              $('#email').addClass('is-danger');
              $('#eminvalid').removeClass('hidden');
              return;
            }

            $('#email').removeClass('is-danger');
            $('#eminvalid').addClass('hidden');

            request.post(`${registry()}/v1/user`)
              .send({
                username: $('#username').first().val(),
                email: $('#email').first().val(),
                password: $('#password1').first().val(),
              })
              .end((err, res) => {
                if (res.statusCode !== 200) {
                  $('#error').removeClass('hidden');
                } else {
                  const user = res.body.user;
                  const token = res.body.token;
                  delete user.packages;
                  localStorage.user = JSON.stringify(user);
                  localStorage.token = token;
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
