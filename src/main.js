/*
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';

Vue.config.productionTip = false;

/* eslint-disable no-new * /
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
});
*/

import Vue from 'vue';
import VueRouter from 'vue-router';
import marked from 'marked';
import { hljs } from './util';

import App from './App';
import UnknownPageComponent from './components/UnknownPage';
import HomePageComponent from './components/pages/Home';
import UnifyPageComponent from './components/pages/Unify';
import DocumentationPageComponent from './components/pages/Documentation';
import PackagePageComponent from './components/pages/Package';
import PackageSearchPageComponent from './components/pages/PackageSearch';
import UserPageComponent from './components/pages/User';
import DocsUnknownRoutePageComponent from './components/pages/DocsUnknownRoute';
import LogInPageComponent from './components/pages/LogIn';
import RegisterPageComponent from './components/pages/Register';
import NotFoundPageComponent from './components/pages/NotFound';
import ContainerComponent from './components/Container';
import SlideComponent from './components/Slide';
import LoadingComponent from './components/Loading';
import DocsLoaderComponent from './components/docs/Loader';
import DocsViewerComponent from './components/docs/Viewer';
import FileViewerComponent from './components/docs/FileViewer';
import ClassViewerComponent from './components/docs/class-viewer/ClassViewer';
import TypedefViewerComponent from './components/docs/TypedefViewer';
import DocsSearchComponent from './components/docs/Search';

require('./styles/master.scss');

// Set up the router!
Vue.use(VueRouter);
const router = new VueRouter({
  routes: [
    { path: '/', name: 'home', component: HomePageComponent },
    { path: '/unify', name: 'unify', component: UnifyPageComponent },

    {
      path: '/docs',
      name: 'docs',
      component: DocumentationPageComponent,
      children: [{
        path: ':source',
        name: 'docs-source',
        component: DocsLoaderComponent,
        children: [{
          path: ':tag',
          name: 'docs-tag',
          component: DocsViewerComponent,
          children: [
            { path: 'search', name: 'docs-search', component: DocsSearchComponent },
            { path: 'class/:class', name: 'docs-class', component: ClassViewerComponent },
            { path: 'typedef/:typedef', name: 'docs-typedef', component: TypedefViewerComponent },
            { path: ':category/:file', name: 'docs-file', component: FileViewerComponent },
          ],
        },
        ],
      },
      ],
    },

    { path: '/package', name: 'package-default', redirect: '/packages' },
    { path: '/packages', name: 'package-search', component: PackageSearchPageComponent },
    { path: '/package/:package', name: 'package', component: PackagePageComponent },

    { path: '/user', name: 'user-default', redirect: '/' },
    { path: '/user/:user', name: 'user', component: UserPageComponent },

    { path: '/login', name: 'login', component: LogInPageComponent },
    { path: '/register', name: 'register', component: RegisterPageComponent },

    // Catch-all
    { path: '/docs/*', component: DocsUnknownRoutePageComponent },
    { path: '*', component: NotFoundPageComponent },
  ],
  scrollBehavior(to, from, saved) {
    if (saved) return saved;
    return { x: 0, y: 0 };
  },
});

// Register global components
Vue.component('container', ContainerComponent);
Vue.component('slide', SlideComponent);
Vue.component('loading', LoadingComponent);
Vue.component('unknown-page', UnknownPageComponent);

// Register the hightlight.js directive
Vue.directive('hljs', hljs);

// Register filters
Vue.filter('marked', (text) => {
  if (!text) text = '**Documentation missing.**';
  text = text.replace(/<(info|warn)>([\s\S]+)<\/\1>/gi, '<div class="$1">$2</div>');
  return marked(text);
});

// Initialise the application
const app = new Vue({ // eslint-disable-line no-unused-vars
  el: '#app',
  components: { App },
  template: '<App />',
  router,
});
