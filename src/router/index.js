import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const Home = () => import("components/route/home.vue");
const Tag = () => import("components/route/tag.vue");
const Classify = () => import("components/route/classify.vue");
const Archive = () => import("components/route/archive.vue");
const AboutMe = () => import("components/route/about_me.vue");

const Update = () => import("components/route/update.vue");

const Article = () => import("components/route/article.vue");

const Login = () => import("components/route/login.vue");

const NotFound = () => import("components/route/404.vue");

const Charge = () => import("components/charge/charge.vue");
const Write = () => import("components/charge/write.vue");


let scroll_timer = null;

const router = new Router({

  mode: "history",

  scrollBehavior (to, from, savedPosition) {
    return new Promise((resolve)=>{
      clearTimeout(scroll_timer);
      scroll_timer = setTimeout(()=>{
        resolve({ x: 0, y: 0 });
      },100);
    })
  },

  routes: [
    {path: "/",redirect: "/home"},

    {
      path: "/home",
      name: "home",
      component: Home
    },

    {
      path: "/tag",
      name: "tag",
      component: Tag,
    },

    {
      path: "/classify",
      name: "classify",
      component: Classify
    },

    {
      path: "/archive",
      name: "archive",
      component: Archive
    },

    {
      path: "/about_me",
      name: "about_me",
      component: AboutMe
    },

    {
      path: "/update",
      name: "update",
      component: Update
    },

    {
      path: "/article/:id(\\d+)",
      name: "article",
      component: Article
    },

    {
      path: "/login",
      name: "login",
      component: Login
    },

    {
      path: "/charge",
      name: "charge",
      component: Charge
    },

    {
      path: "/draft/:id(\\d+)",
      name: "draft",
      component: Write
    },

    {
      path: "/edit/:id(\\d+)",
      name: "edit",
      component: Write
    },

    {
      path: "*",
      name: "404",
      component: NotFound
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

function commit_login_flag(boolean){
  let store = router.app.$store;
  if(store){
    if(store.state.login_flag === boolean){
      return;
    }
    store.commit("set_login_flag",boolean);
  }
}

function commit_loading_show(boolean){
  let store = router.app.$store;
  if(store){
    if(store.state.loading_show === boolean){
      return;
    }
    store.commit("set_loading_show",boolean);
  }
}


router.beforeEach((to,from,next)=>{
  clearTimeout(timer);

  commit_router_show(false);
  commit_loading_show(true);

  let name = (to.path).slice(1);

  if(to.name === "charge" || to.name === "draft" || to.name === "edit"){
    commit_login_flag(true);
  }else{
    commit_login_flag(false);
  }

  if(to.name === "404"){
    name = "404";
  }

  timer = setTimeout(()=>{
    commit_router_show(name);
  },500);

  next();
});



export default router;
