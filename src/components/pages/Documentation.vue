<template>
  <div class="docs-out">
    <app-navbar docs=true />

    <div id="docs" class="docs-in">
      <docs-navbar :sources="sources" :source="source" />
      <router-view :source="source" :tag="tag" />
    </div>

    <app-footer />
  </div>
</template>

<script>
  import AppNavbar from '@/components/AppNavbar';
  import AppFooter from '@/components/AppFooter';
  import MainSource from '../../data/MainSource';
  import UnifySource from '../../data/UnifySource';
  import DocsNavbar from '../docs/Navbar';

  export default {
    name: 'documentation',
    components: {
      DocsNavbar,
      AppNavbar,
      AppFooter,
    },

    data() {
      return {
        sources: {
          [MainSource.id]: MainSource,
          [UnifySource.id]: UnifySource,
        },
        source: MainSource,
        tag: MainSource.defaultTag,
        docs: true,
      };
    },

    methods: {
      setSource(id) {
        this.source = this.sources[id];
      },

      setTag(tag) {
        this.tag = tag;
        this.source.recentTag = tag;
      },

      handleRoute(route) {
        // Set the source, or redirect to a default route
        if (route.params.source && this.sources[route.params.source]) {
          this.setSource(route.params.source);
        } else {
          this.$router.replace({
            name: 'docs-file',
            params: {
              source: MainSource.id,
              tag: MainSource.defaultTag,
              category: MainSource.defaultFile.category,
              file: MainSource.defaultFile.id,
            },
          });
          return;
        }

        // Set the tag, or redirect to a default route
        if (route.params.tag) {
          this.setTag(route.params.tag);
        } else {
          this.$router.replace({
            name: 'docs-file',
            params: {
              source: this.source.id,
              tag: this.source.recentTag || this.source.defaultTag,
              category: this.source.defaultFile.category,
              file: this.source.defaultFile.id,
            },
          });
          return;
        }

        // Redirect to a default route
        if (!route.params.file && !route.params.class && !route.params.typedef && route.name !== 'docs-search') {
          this.$router.replace({
            name: 'docs-file',
            params: {
              source: this.source.id,
              tag: this.tag,
              category: this.source.defaultFile.category,
              file: this.source.defaultFile.id,
            },
          });
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
