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
      component: Tag,
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

let timer = null;


//设置(commit) vuex 上的router_show值
function commit_router_show(name){
  //通过router.app上的$store属性可以直接访问挂载的 vuex ~
  let store = router.app.$store;
  if(store){
    store.commit("set_router_show",name);
  }
}


router.beforeEach((to,from,next)=>{
  clearTimeout(timer);

  commit_router_show(false);

  let name = (to.path).slice(1);

  timer = setTimeout(()=>{
    commit_router_show(name);
  },800);

  next();
});



export default router;
