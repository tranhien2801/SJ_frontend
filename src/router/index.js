import { createRouter, createWebHistory } from "../libs/vue-router";
import Dashboard from "../views/Dashboard.vue";
import Users from "../views/Users.vue";
import Managers from "../views/Managers.vue";
import Judgment from "../views/Judgment.vue";
import Signup from "../views/Signup.vue";
import Signin from "../views/Signin.vue";
import JudgmentDetail from "../views/JudgmentDetail.vue";
import JudgmentHistory from "../views/JudgmentHistory.vue";
import JudgmentLiked from "../views/JudgmentLiked.vue";
import auth from "../middleware/auth";
import admin from "../middleware/admin";
import managerOrUser from "../middleware/managerOrUser";
import middlewarePipeline from "../middleware/middleware-pipeline";
import adminOrManager from "../middleware/adminOrManager";

const routes = [
  {
    path: "/",
    name: "/",
    redirect: "/signin",
  },
  {
    path: "/dashboard-default",
    name: "Dashboard",
    component: Dashboard,
    meta: {
      middleware: [auth, admin]
    }
  },
  {
    path: "/users",
    name: "Users",
    component: Users,
    meta: {
      middleware: [auth, adminOrManager]
    }
  },
  {
    path: "/managers",
    name: "Managers",
    component: Managers,
    meta: {
      middleware: [auth, admin]
    }
  },
  {
    path: "/judgment",
    name: "Judgment",
    component: Judgment,
    meta: {
      middleware: [auth, managerOrUser]
    }
  },
  {
    path: "/history",
    name: "JudgmentHistory",
    component: JudgmentHistory,
    meta: {
      middleware: [auth, managerOrUser]
    }
  },
  {
    path: "/liked",
    name: "JudgmentLiked",
    component: JudgmentLiked,
    meta: {
      middleware: [auth, managerOrUser]
    }
  },
  {
    path: "/judgment-detail/:uid",
    name: "JudgmentDetail",
    component: JudgmentDetail,
    meta: {
      middleware: [auth, managerOrUser]
    }
  },
  {
    path: "/signin",
    name: "Signin",
    component: Signin,
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
    meta: {
      middleware: [auth, adminOrManager]
    }
  },

];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active",
});

router.beforeEach((to, from, next) => {

  /** Navigate to next if middleware is not applied */
  if (!to.meta.middleware) {
    return next()
  }

  const middleware = to.meta.middleware;
  const context = {
    to,
    from,
    next,
    //   store  | You can also pass store as an argument
  }

  return middleware[0]({
    ...context,
    next: middlewarePipeline(context, middleware, 1)
  })
})

export default router;
