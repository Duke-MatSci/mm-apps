import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import ComponentTest from '../vue-materials-test/ComponentTest.vue';
import NewComponentsTest from '../vue-materials-test/NewComponentsTest.vue';
import CSSMigrationTest from '../vue-materials-test/CSSMigrationTest.vue';
import MdTabsThemeTest from '../vue-materials-test/MdTabsThemeTest.vue';
import MdSnackbarThemeTest from '../vue-materials-test/MdSnackbarThemeTest.vue';
import MdButtonThemeTest from '../vue-materials-test/MdButtonThemeTest.vue';
import MdIconThemeTest from '../vue-materials-test/MdIconThemeTest.vue';
import MdDrawerThemeTest from '../vue-materials-test/MdDrawerThemeTest.vue';
import MdToolbarThemeTest from '../vue-materials-test/MdToolbarThemeTest.vue';
import MdListThemeTest from '../vue-materials-test/MdListThemeTest.vue';
import MdContentThemeTest from '../vue-materials-test/MdContentThemeTest.vue';
import MdAppTest from '../vue-materials-test/MdAppTest.vue';
import MdSteppersTest from '../vue-materials-test/MdSteppersTest.vue';
import ThemeTest from '../vue-materials-test/ThemeTest.vue';
import ThemeImportTest from '../vue-materials-test/ThemeImportTest.vue';
import SimpleThemeTest from '../vue-materials-test/SimpleThemeTest.vue';
import BasicTest from '../vue-materials-test/BasicTest.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
  },
  {
    path: '/test',
    name: 'test',
    component: ComponentTest,
  },
  {
    path: '/new-components',
    name: 'new-components',
    component: NewComponentsTest,
  },
  {
    path: '/css-migration',
    name: 'css-migration',
    component: CSSMigrationTest,
  },
  {
    path: '/tabs-theme',
    name: 'tabs-theme',
    component: MdTabsThemeTest,
  },
  {
    path: '/snackbar-theme',
    name: 'snackbar-theme',
    component: MdSnackbarThemeTest,
  },
  {
    path: '/button-theme',
    name: 'button-theme',
    component: MdButtonThemeTest,
  },
  {
    path: '/icon-theme',
    name: 'icon-theme',
    component: MdIconThemeTest,
  },
  {
    path: '/drawer-theme',
    name: 'drawer-theme',
    component: MdDrawerThemeTest,
  },
  {
    path: '/toolbar-theme',
    name: 'toolbar-theme',
    component: MdToolbarThemeTest,
  },
  {
    path: '/list-theme',
    name: 'list-theme',
    component: MdListThemeTest,
  },
  {
    path: '/content-theme',
    name: 'content-theme',
    component: MdContentThemeTest,
  },
  {
    path: '/app-test',
    name: 'app-test',
    component: MdAppTest,
  },
  {
    path: '/steppers-test',
    name: 'steppers-test',
    component: MdSteppersTest,
  },
  {
    path: '/theme-test',
    name: 'theme-test',
    component: ThemeTest,
  },
  {
    path: '/theme-import-test',
    name: 'theme-import-test',
    component: ThemeImportTest,
  },
  {
    path: '/simple-theme-test',
    name: 'simple-theme-test',
    component: SimpleThemeTest,
  },
  {
    path: '/basic-test',
    name: 'basic-test',
    component: BasicTest,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
