import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const Home = () => import("components/route/home.vue");
const Tag = () => import("components/route/tag.vue");
const Classify = () => import("components/route/classify.vue");
const Archive = () => import("components/route/archive.vue");
const AboutMe = () => import("components/route/about_me.vue");

const Update = () => import("components/route/update.vue");
const Diary = () => import("components/route/diary.vue");

const router = new Router({

  mode: "history",

  scrollBehavior(to,from,savedPosition){
    if(savedPosition){
      return savedPosition;
    }else{
      return {x: 0, y: 0};
    }
  },

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
    },

    {
      path: "/diary",
      component: Diary
    },
  ]

});


export default router;
