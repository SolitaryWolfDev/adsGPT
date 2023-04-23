import { route } from "quasar/wrappers";
import {
  createRouter,
  createMemoryHistory,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";
import useAuthUser from "../composables/UseAuthUser";

const routes = [
  {
    path: "/",
    name: "Main",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        name: "Editor",
        meta: { requiresAuth: true },
        component: () => import("pages/EditorPage.vue"),
      },
      {
        path: "company",
        name: "Company",
        meta: { requiresAuth: true },
        component: () => import("pages/CompanyPage.vue"),
      },
      {
        path: "product",
        meta: { requiresAuth: true },
        component: () => import("pages/ProductPage.vue"),
      },
      {
        path: "email-confirmation",
        component: () => import("pages/EmailConfirmation.vue"),
      },
      {
        path: "home",
        name: "Home",
        meta: { requiresAuth: true },
        component: () => import("pages/HomePage.vue"),
      },
      { path: "prompt", component: () => import("pages/PromptPage.vue") },
      {
        name: "Login",
        path: "login",
        component: () => import("pages/LoginPage.vue"),
      },
      {
        path: "forgotPassword",
        component: () => import("pages/ForgotPassword.vue"),
      },
      { path: "register", component: () => import("pages/RegisterPage.vue") },
      { path: "index", component: () => import("pages/IndexPage.vue") },
    ],
  },
  {
    name: "Logout",
    path: "/logout",
    beforeEnter: async () => {
      const { logout } = useAuthUser();
      await logout();
      return { name: "Login" };
    },
  },
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === "history"
    ? createWebHistory
    : createWebHashHistory;

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE),
  });

  Router.beforeEach((to) => {
    const { isLoggedIn } = useAuthUser();
    if (
      !isLoggedIn() &&
      to.meta.requiresAuth &&
      !Object.keys(to.query).includes("fromEmail")
    ) {
      return { name: "Login" };
    }
  });

  return Router;
});
