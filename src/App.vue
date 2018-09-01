<template>
  <div id="app">
    <loading></loading>
    <mayuri></mayuri>
    <left-icon></left-icon>
    <nav2></nav2>
    <div class="body" :class="{write: router_show && (router_show.slice(0,5) === 'draft' || router_show.slice(0,4) === 'edit')}">
      <keep-alive>
        <router-view class="router-class"></router-view>
      </keep-alive>
    </div>
    <right-icon></right-icon>
    <Footer></Footer>
  </div>
</template>

<script type="text/ecmascript-6">
  import Loading from "components/base/loading.vue";
  import Mayuri from "./components/base/mayuri.vue";
  import Nav2 from "components/nav_2.vue";
  import LeftIcon from "components/left_icon.vue";
  import RightIcon from "components/right_icon.vue";
  import Footer from "components/footer.vue";

  import {mapGetters} from "vuex";
  export default {
    name: "App",
    components: {Loading,Mayuri,Nav2,LeftIcon,RightIcon,Footer,},
    computed: {
      ...mapGetters([
        "router_show"
      ]),
    },
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable.styl"

  #app
    padding-bottom: 0.1rem
    .body
      position: relative
      z-index: 10
      width: calc(100% - 57rem)
      padding: 0.1rem 0
      margin-left: 31rem
      margin-top: 15rem
      min-height: calc(100vh - 14rem - 10.5rem)
      &.write
        max-width: 100vw
        margin: 15rem 0 0 0
        padding: 0.1rem 0
        z-index: 12

  @media(max-width: $max-width-1)
    #app
      .body
        width: auto
        max-width: calc(88rem - 4.6rem)
        padding: 0.1rem 3.3rem
        margin: auto
        margin-top: 10rem
        min-height: calc(100vh - 7rem - 10.5rem)
  @media(max-width: $max-width-2)
    #app
      .body
        margin-top: 8.5rem
        min-height: calc(100vh - 7rem - 6rem)
</style>
