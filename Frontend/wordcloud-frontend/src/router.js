import { createRouter, createWebHistory } from "vue-router";
import MenuView from "./components/MenuView.vue";
import Login from "./components/LoginForm.vue";
import UmfragenView from "./components/UmfragenView.vue";
import UmfrageView from "./components/UmfrageView.vue";
import CreateUmfrageView from "./components/CreateUmfrageView.vue";
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
    path: "/umfragen",
    name: "UmfragenView",
    component: UmfragenView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/umfragen/:umfrageID",
    name: "UmfrageView",
    component: UmfrageView,
    props: true,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/createUmfrage",
    name: "CreateUmfrageView",
    component: CreateUmfrageView,
    meta: {
      requiresAuth: true,
    },
  }

];

routes.forEach((route) => {
  route.beforeEnter = (to, from, next) => {
    if (sessionStorage.getItem("loggedIn") ||auth.state.loggedIn || to.name === 'Login') {
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
