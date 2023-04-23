
const routes = [
  {
    name: "Home",
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/EditorPage.vue') }
    ]
  },
  // added new
  {
    name: "EmailConfirmation",
    path: "/email-confirmation",
    component: () => import("../pages/EmailConfirmation.vue"),
  },
  {
    name: "Me",
    path: "/me",
    meta: {
      requiresAuth: true,
    },
    component: () => import("../pages/MePage.vue"),
  },
  {
    name: "Login",
    path: "/login",
    component: () => import("../pages/LoginPage.vue"),
  },
  {
    name: "ForgotPassword",
    path: "/forgotPassword",
    component: () => import("../pages/ForgotPassword.vue"),
  },
  {
    name: "Logout",
    path: "/logout",
    beforeEnter: async () => {
      const { logout } = useAuthUser();
      await logout();
      return { name: "Home" };
    },
  },
  {
    name: "Register",
    path: "/register",
    component: () => import("../pages/RegisterPage.vue"),
  },
  {
    name: "Company",
    path: "/company",
    component: () => import("../pages/CompanyPage.vue"),
  },
  // end
  {
    path: '/index',
    component: () => import('pages/IndexPage.vue')
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  },

]

export default routes
