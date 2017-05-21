import Vue from 'vue';
import VueRouter from 'vue-router';
import marked from 'marked';

import App from './App';
import HomePageComponent from './components/pages/Home';
import UnifyPageComponent from './components/pages/Unify';
import PackagePageComponent from './components/pages/Package';
import PackageSearchPageComponent from './components/pages/PackageSearch';
import UserPageComponent from './components/pages/User';
import LogInPageComponent from './components/pages/LogIn';
import RegisterPageComponent from './components/pages/Register';
import NotFoundPageComponent from './components/pages/NotFound';
import DocumentationPageComponent from './components/pages/Documentation';
import LoadingComponent from './components/Loading';
import AppNavbar from './components/AppNavbar';
import AppFooter from './components/AppFooter';
import PageTitle from './components/PageTitle';
import DocsCategoryComponent from './components/pages/DocumentationCategory';

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
    },

    {
      path: '/docs/:category',
      name: 'docs-category',
      component: DocsCategoryComponent,
      children: [{
        path: ':file',
        name: 'docs-file',
      }],
    },

    { path: '/package', name: 'package-default', redirect: '/packages' },
    { path: '/packages', name: 'package-search', component: PackageSearchPageComponent },
    { path: '/package/:package', name: 'package', component: PackagePageComponent },

    { path: '/user', name: 'user-default', redirect: '/' },
    { path: '/user/:user', name: 'user', component: UserPageComponent },

    { path: '/login', name: 'login', component: LogInPageComponent },
    { path: '/register', name: 'register', component: RegisterPageComponent },

    // Catch-all
    // { path: '/docs/*', component: DocsUnknownRoutePageComponent },
    { path: '*', component: NotFoundPageComponent },
  ],
  scrollBehavior(to, from, saved) {
    if (saved) return saved;
    return { x: 0, y: 0 };
  },
});


Vue.component('loading', LoadingComponent);
Vue.component('app-navbar', AppNavbar);
Vue.component('app-footer', AppFooter);
Vue.component('page-title', PageTitle);

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
