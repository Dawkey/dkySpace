<template>
  <div class="nav_2_body">
    <div class="nav_2">
      <div class="nav_left">
        Dawkey's blog
      </div>
      <div class="min-mayuri">
        <div class="in" :class="{talk: !talk_done}"></div>
        <div class="out" :class="{talk: !talk_done}"></div>
      </div>
      <div class="nav_right">
        <ul class="nav" :class="{show: nav_flag}">
          <li v-for = "item in nav">
            <router-link tag="div"
              :to="`/${item}`"
              @click.native = "nav_hide"
            >
              {{item}}
            </router-link>
          </li>
        </ul>
        <i class="icon-menu" @click="nav_show"></i>
        <router-link tag="i" to="/login" class="icon-login">
        </router-link>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapGetters,mapActions} from "vuex";
  export default {
    name: "Nav2",

    data(){
      return{
        nav: ["home","tag","classify","archive","about_me","update"],
        nav_flag: false,
      }
    },

    computed: {
      ...mapGetters([
        "talk_done"
      ]),
    },

    methods: {
      ...mapActions([
        "add_talk_word",
      ]),

      nav_show(){
        this.nav_flag = !this.nav_flag;
      },

      nav_hide(){
        this.nav_flag = false;
      },
    },

  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable.styl"

  .nav_2_body
    position: fixed
    z-index: 13
    top: 0
    left: 0
    right: 0
    width: 100%
    background: rgba(248,248,248,0.95)
    border-bottom: 0.1rem solid rgb(235,235,235)
    // font-family: Georgia,serif
    .nav_2
      max-width: 88rem
      margin: 0 auto
      padding: 0 1rem
      display: flex
      height: 5.5rem
      align-items: center
      .nav_left
        display: flex
        align-items: center
        font-size: 2.2rem
        color: $color-3
        flex-shrink: 0
      .nav_right
        display: flex
        align-items: center
        justify-content: flex-end
        width: 100%
        margin-right: -0.6rem
        font-size: 1.9rem
        color: $color-grey
        .icon-login
          margin-left: 2.5rem
          margin-right: 1rem
          font-size: 2.6rem
          color: $color-3
          cursor: pointer
          &:hover
            transform: scale(1.1)
            color: rgba(96,126,121,0.9)
          &.router-link-active
            transform: scale(1.1)
            color: rgba(96,126,121,0.9)
        .icon-menu
          display: none
        .nav
          display: flex
          font-size: 1.6rem
          color: $color-grey
          >li
            >div
              margin-left: 1.3rem
              position: relative
              padding: 0.3rem 0.6rem
              cursor: pointer
              &:before
                content: ""
                position: absolute
                top: 0
                left: 0
                height: 100%
                width: 100%
                box-shadow: 0 0.5rem 0.5rem -0.5rem $color-3
                transform-origin: 100% 0
                transform: scaleX(0);
                transition: transform 0.4s
              &:hover
                color: $color-3
                transform: scale(1.1)
                transform-origin: 50% 100%
              &:hover::before
                transform: scaleX(1)
                transform-origin: 0 0
              &.router-link-active
                color: $color-3
                transform: scale(1.1)
                transform-origin: 50% 100%
                &:before
                  transform: scaleX(1)
                  transform-origin: 0 0
          .home
            color: $color-3

      .min-mayuri
        position: relative
        display: flex
        flex-shrink: 0
        align-items: center
        justify-content: center
        width: 4rem
        height: 4rem
        margin-left: 2.5rem
        .in
          position: absolute
          width: 2rem
          height: 2rem
          background: rgba(248,248,248,0.9)
          border: 0.2rem solid $color-3
          border-radius: 50%
          z-index: 11
          animation: in_move 3.2s ease-in-out infinite
          &.talk
            width: 1.6rem
            height: 1.6rem
            background: rgba(96,126,121,0.8)
            border: 0
            animation: in_move_talk 0.5s ease-in-out infinite
        .out
          position: absolute
          width: 4rem
          height: 4rem
          background: rgba(96,126,121,0.4)
          border-radius: 50%
          z-index: 10
          animation: out_move 3.2s ease-in-out infinite
          &.talk
            animation: out_move_talk 0.5s ease-in-out infinite


  @keyframes in_move
    50%
      transform: scale(1.14)
    100%
      transform: scale(1)
  @keyframes out_move
    50%
      transform: scale(0.85)
    100%
      transform: scale(1)

  @keyframes in_move_talk
    50%
      transform: scale(1.7)
    100%
      transform: scale(1)
  @keyframes out_move_talk
    50%
      transform: scale(0.9)
    100%
      transform: scale(1)



  @media (min-width: $max-width-1)
    .nav_2_body
      display: none

  @media (max-width: $max-width-1)
    .nav_2_body
      display: block

  @media (max-width: $max-width-2)
    .nav_2_body
      .nav_2
        .nav_right
          .nav
            display: none
            position: absolute
            width: 100%
            background: rgba(248,248,248,0.95)
            border-bottom: 0.1rem solid rgb(235,235,235)
            flex-direction: column
            top: 5.4rem
            padding-bottom: 1rem
            &.show
              display: flex
            >li
              text-align: center
              >div
                display: inline-flex
                margin: 0.3rem 0
          .icon-menu
            display: block
            font-size: 2.1rem
            padding-bottom: 0.5rem
            color: $color-3



</style>
