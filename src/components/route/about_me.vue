<template>
  <div class="about_me">
    <transition name="router_icon">
      <div class="button_icon router_icon" v-show="show_flag">
        <i class="icon-about_me"></i>
      </div>
    </transition>
    <transition name="router">
      <div class="about_me_div router_div" v-show="show_flag">
        <div class="github">
          <i class="icon-github"></i>
          <a class= "follow" href="https://github.com/wwk321" target="_blank">
            Follow
          </a>
        </div>
        <div class="word">
          <div>
            <div class="like">
              喜欢
            </div>
             写代码&nbsp|&nbsp打游戏&nbsp|&nbsp<span class="hightlight">纸片人</span>
          </div>
          <div>
            <div class="dislike">
              讨厌
            </div>
             <span class="hightlight">丑陋</span>的布局&nbsp|&nbsp期末考
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapGetters,mapMutations} from "vuex";
  export default {
    name: "AboutMe",
    computed: {
      ...mapGetters([
        "router_show",
      ]),
      show_flag(){
        if(this.router_show === "about_me"){
          this.set_loading_show(false);
          return true;
        }else{
          return false;
        }
      }
    },
    methods: {
      ...mapMutations([
        "set_loading_show"
      ]),
    },
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable.styl"

  .about_me
    .about_me_div
      padding-top: 3rem
      padding-bottom: 1.5rem
      .github
        display: flex
        align-items: center
        >i
          font-size: 3rem
          color: $color-grey
        .follow
          display: flex
          margin-left: 1.5rem
          height: 2.5rem
          width: 7rem
          font-size: 1.6rem
          align-items: center
          justify-content: center
          color: $color-2
          background: $color-grey
          box-shadow: $box-shadow
          border-radius: 0.3rem
          &:hover
            background: $color-3
      .word
        margin-top: 2.5rem
        font-size: 1.3rem
        >div
          display: flex
          align-items: center
          margin-bottom: 1.5rem
          color: $color-grey
          .hightlight
            color: $color-3
          .like,.dislike
            display: flex
            align-items: center
            justify-content: center
            height: 2.2rem
            width: 3rem
            margin-right: 1.5rem
            font-size: 1.3rem
            box-shadow: $box-shadow-bottom
            color: $color-3

</style>
