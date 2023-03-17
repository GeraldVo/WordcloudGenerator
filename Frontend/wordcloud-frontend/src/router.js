import { createRouter, createWebHistory } from "vue-router";
import MenuView from "./components/MenuView.vue";
import Login from "./components/LoginForm.vue";
import SubsiteOne from "./components/SubsiteOne.vue";
import SubsiteTwo from "./components/SubsiteTwo.vue";
import SubsiteThree from "./components/SubsiteThree.vue";
import auth from './auth';


const routes = [
  {
    path: "/menu",
    name: "MenuView",
    component: MenuView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/subsite1",
    name: "SubsiteOne",
    component: SubsiteOne,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/subsite2",
    name: "SubsiteTwo",
    component: SubsiteTwo,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/subsite3",
    name: "SubsiteThree",
    component: SubsiteThree,
    meta: {
      requiresAuth: true,
    },
  },
];

routes.forEach((route) => {
  route.beforeEnter = (to, from, next) => {
    if (auth.loggedIn || to.name === 'Login') {
      next();
    } else {
      next({ name: 'Login' });
    }
  };
});

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
