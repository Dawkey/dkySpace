import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const Home = () => import("components/route/home.vue");
const Tag = () => import("components/route/tag.vue");

export default new Router({

  routes: [
    {path: "/",redirect: "/home"},

    {
      path: "/home",
      component: Home
    },

    {
      path: "/tag",
      component: Tag
    }
  ]

});
