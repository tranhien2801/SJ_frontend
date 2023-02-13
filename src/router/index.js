import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import Users from "../views/Users.vue";
import Managers from "../views/Managers.vue";
import Judgment from "../views/Judgment.vue";
import Profile from "../views/Profile.vue";
import Signup from "../views/Signup.vue";
import Signin from "../views/Signin.vue";
import JudgmentDetail from "../views/JudgmentDetail.vue";

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
  },
  {
    path: "/users",
    name: "Users",
    component: Users,
  },
  {
    path: "/managers",
    name: "Managers",
    component: Managers,
  },
  {
    path: "/home",
    name: "Home",
    component: Judgment,
  },
  {
    path: "/judgment",
    name: "Judgment",
    component: Judgment,
  },
  {
    path: "/judgment-detail/:uid",
    name: "JudgmentDetail",
    component: JudgmentDetail,
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
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
  },

];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active",
});

export default router;
