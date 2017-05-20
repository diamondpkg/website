<template>
  <div class="unify">
    <div class="wrapper">
      <section class="hero is-fullheight is-bold is-dark">
          <div class="hero-head">
            <app-navbar />
          </div>
          <div class="hero-body">
            <div class="container">
              <h1 class="main-img has-text-centered">
                <img src="../../assets/unify-full-nopadding.svg" alt="">
              </h1>
              <h1 class="title main-text has-text-centered">
                Sass, Less, and Stylus, unified.
              </h1>
            </div>
          </div>
        </section>

        <section class="hero">
          <div class="hero-body">
            <div class="container">
              <div class="columns">
                <div class="column is-6">
                  <h1 class="title">Unify</h1>
                  <p>
                    Unify is diamond's open API for writing cross-preprocessor plugins.
                  </p>

                  <br>

                  <h1 class="title is-4">Easy</h1>
                  <h2 class="subtitle is-6">Unify has easy to understand, clear documentation.</h2>

                  <br>

                  <h1 class="title is-4">Cross-platform</h1>
                  <h2 class="subtitle is-6">Any plugin written with Unify can be used with any preprocessor.</h2>
                </div>

                <div class="column is-6">
                  <img class="love-img" src="../../assets/unify-love-padding.svg" alt="Unify Loves">
                </div>
              </div>
            </div>
          </div>
        </section>

        <section class="hero">
          <div class="hero-body">
            <div class="container">
              <h1 class="title">Example</h1>

              <div class="columns">
                <div class="column">
                  <h2 class="subtitle">Install Unify:</h2>
                  <pre><code>npm i -S diamond-unify</code></pre>

                  <h2 class="subtitle example">Write JS using Unify:</h2>
                  <pre><code class="javascript">// Require Unify
const unify = require('diamond-unify');

// Create a new PluginManager
const plugin = new unify.PluginManager();

// Create a new function called 'foo'
class Foo extends unify.FunctionController {
  // Called when the function 'foo' is called in Sass or Less
  handler() {
    // Return the color white
    return new unify.UColor(255, 255, 255);
  }
}

// Add 'foo' to our plugin
plugin.add(new Foo());

// Export our plugin
module.exports = plugin;</code></pre>
                </div>

                <div class="column">
                  <h2 class="subtitle">Add a Unify field to your <code>diamond.json</code> file:</h2>
                  <pre><code class="json">{
  "unify": "path/to/your/js/file"
}</code></pre>

                  <h2 class="subtitle example">Then you can use the function in your Sass or Less like so:</h2>
                  <pre><code class="scss">#foo {
  color: foo();
}</code></pre>

                  <h2 class="subtitle example">Compile the Sass or Less with diamond:</h2>
                  <pre><code>diamond c path/to/file</code></pre>

                  <h2 class="subtitle example">Which will then generate CSS like this:</h2>
                  <pre><code class="css">#foo {
  color: white;
}</code></pre>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <app-footer />
  </div>
</template>

<script>
  import hljs from 'highlightjs';
  import AppNavbar from '@/components/AppNavbar';
  import AppFooter from '@/components/AppFooter';

  export default {
    name: 'unify',
    components: { AppNavbar, AppFooter },
  };

  hljs.initHighlightingOnLoad();
</script>

<style lang="sass" scoped>
  .main-img
    margin-bottom: 30px

    img
      width: 60%

  .footer-img
    width: 10%
    margin-bottom: 20px

  .main-text
    font-family: 'Montserrat', sans-serif
    text-transform: uppercase
    font-size: 2.75em

  .hljs
    padding: 1.25rem 1.5rem

  .subtitle.example
    margin-top: 1.5rem
</style>
