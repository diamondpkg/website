<template>
  <div class="docs">
    <app-navbar />

    <div class="wrapper">
      <page-title text="Documentation" />

      <div class="container">
        <section class="hero">
          <div class="hero-body">
            <div class="tile is-ancestor">
              <div class="tile is-parent is-4" v-for="page in pages">
                <article class="tile is-child box">
                  <p class="title">{{ page.title }}</p>
                  <p class="subtitle">{{ page.desc }}</p>
                  <router-link :to="page.path" append>Read more</router-link>
                </article>
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
  import docs from '../../docs';

  export default {
    name: 'docmentation',

    data() {
      return { pages: docs };
    },
  };
</script>
