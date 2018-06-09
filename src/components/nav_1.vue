<template>
  <div class="nav_1">
    <div class="head-img" @click="test">
      <div class="expression">
      </div>
    </div>
    <div class="head-talk">
      <div class="talk-box">
        <span class="talk-word" ref="talk_span"></span>
        <div class="talk-cursor"></div>
      </div>
    </div>
    <ul class="nav">
      <li v-for = "item in nav">
        <transition name="icon">
          <div class="nav_div" v-show = "item != ($route.path).slice(1)">
            <router-link :to="`/${item}`" tag="div" class="button_icon">
              <i :class="`icon-${item}`"></i>
            </router-link>
          </div>
        </transition>
      </li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
  import type from "common/js/type.js";
  export default {
    name: "Nav1",

    data(){
      return{
        nav: ["home","tag","classify","archive","about_me"],
      }
    },

    computed: {
      active_nav(){
        return this.$route.path;
      },
    },

    methods: {

      test(){
        let el = this.$refs.talk_span;
        type(el,"嘟嘟噜~我是一段会说话的文字哦ヽ(￣▽￣)ﾉ");
      },

    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable.styl"

  .nav_1
    position: fixed
    top: 7.5rem
    left: calc(((100% - 88rem)/2 - 15rem)/2)
    .head-img
      width: 15rem
      height: 15rem
      border-radius: 50%
      background-image: url(/static/icon-img/a.jpg);
      background-size: cover
      box-shadow: 0 0 1rem 0 #000
    .head-talk
      position: fixed
      display: flex
      flex-direction: column
      padding: 0 0.5rem
      top: 8rem
      left: 26rem
      color: $color-2
      background: $color-3
      display: none
      &:before
        content: ""
        position: absolute
        width: 5rem
        height: 4.5rem
        top: 2.3rem
        left: -2.7rem
        border-radius: 0 0 1000% 0 / 0 0 1000% 0
        box-shadow: 0.1rem 0.1rem 0.1rem -0.1rem $color-3
      .talk-box
        display: flex
        align-items: center
        .talk-word
          white-space: nowrap
          font-family: monospace
          letter-spacing: 0.1rem
          font-size: 1.4rem
          line-height: 2rem
          overflow: hidden
        .talk-cursor
          width: 0.2rem
          height: 1.4rem
          background: $color-2
          margin-left: 0.2rem
          animation: cursor_move 1s steps(1) infinite

    .nav
      display: flex
      flex-direction: column
      align-items: center
      width: 100%
      margin-top: 3.5rem
      background: $color-2
      .nav_div
        height: 6rem
      .icon-enter-active
        transition: all 500ms
        .button_icon
          transition: all 500ms
      .icon-enter
        height: 0
        opacity: 0
        .button_icon
          transform:  translateX(100%)
      .icon-enter-to
        height: 6rem
        opacity: 1
        .button_icon
          transform:  translateX(0)

      .icon-leave-active
        transition: all 500ms
        .button_icon
          transition: all 500ms
      .icon-leave-to
        height: 0
        opacity: 0
        .button_icon
          transform: scale(0) translateX(100%)



  @keyframes cursor_move
    50%
      background: transparent

  @media (max-width: $max-width-1)
    .nav_1
      display: none
</style>
