import Vue from "vue";
//Dòng này để import vue-router
import Router from "vue-router";
import CompManagement from "../components/CompManagement";
import CompLogin from "../components/CompLogin";
import CompRegistration from "../components/CompRegister";

Vue.use(Router);

const router = new Router({
  routes: [
    // bao gồm danh sách route
    {
      path: "/management", ///path của route
      name: "CompManagement", // tên route
      component: CompManagement, // component route sử dụng
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/login", ///path của route
      name: "CompLogin", // tên route
      component: CompLogin, // component route sử dụng
    },
    {
      path: "/registration", ///path của route
      name: "CompRegistration", // tên route
      component: CompRegistration, // component route sử dụng
    },
  ],
  mode: "history",
});
router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // console.log(Vue.$cookies.get("cookToken"));
    if (Vue.$cookies.get("cookToken") == null) {
      next({
        path: "/login",
        params: { nextUrl: to.fullPath },
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
