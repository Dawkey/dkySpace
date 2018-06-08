<template>
  <div id="app">
    <nav1></nav1>
    <nav2></nav2>
    <div class="body">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
    <right-icon></right-icon>
    <Footer></Footer>
  </div>
</template>

<script type="text/ecmascript-6">
  import Nav1 from "components/nav_1.vue";
  import Nav2 from "components/nav_2.vue";
  import RightIcon from "components/right_icon.vue";
  import Footer from "components/footer.vue";

  export default {
    name: "App",
    components: {Nav1,Nav2,RightIcon,Footer},
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable.styl"

  #app
    padding-bottom: 0.1rem
    .body
      max-width: 88rem
      margin: auto
      margin-top: 14rem
      padding: 0 1rem
      min-height: calc(100vh - 14rem - 10.5rem)
  @media(max-width: $max-width-1)
    #app
      .body
        margin-top: 7rem
        min-height: calc(100vh - 7rem - 10.5rem)
  @media(max-width: $max-width-2)
    #app
      .body
        min-height: calc(100vh - 7rem - 6rem)
</style>
