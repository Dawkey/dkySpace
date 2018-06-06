import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const Home = () => import("components/route/home.vue");
const Tag = () => import("components/route/tag.vue");
const Classify = () => import("components/route/classify.vue");
const Archive = () => import("components/route/archive.vue");
const AboutMe = () => import("components/route/about_me.vue");

const Update = () => import("components/route/update.vue");

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
    },

    {
      path: "/classify",
      component: Classify
    },

    {
      path: "/archive",
      component: Archive
    },

    {
      path: "/about_me",
      component: AboutMe
    },

    {
      path: "/update",
      component: Update
    }
  ]

});
