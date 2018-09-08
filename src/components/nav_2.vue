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
        <transition name="nav_ul">
          <ul class="nav" v-show="!login_flag && nav_flag">
            <li v-for = "item in nav">
              <router-link tag="div"
                :to="`/${item}`"
              >
                {{item}}
              </router-link>
            </li>
          </ul>
        </transition>
        <button class="menu"  @click="nav_show" @blur="nav_hide" v-show="!login_flag">
          <i class="icon-menu"></i>
        </button>

        <transition name="login">
          <i class="icon-login"
            @click="login_click"
            :class="{out_login: login_flag}"
            v-show = "$route.name != 'draft' && $route.name != 'edit' && $route.name != 'update_edit'"
          >
          </i>
        </transition>

        <transition name="charge">
          <router-link tag="i" to="/charge" class="icon-charge"
            v-show = "$route.name === 'draft' || $route.name === 'edit' || $route.name === 'update_edit'"
          >
          </router-link>
        </transition>

      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapGetters,mapMutations,mapActions} from "vuex";
  export default {
    name: "Nav2",


    data(){
      return{
        nav: ["home","tag","classify","archive","about_me","update"],
        nav_flag: false,
      }
    },


    mounted(){
      this.nav_flag_set();
      window.onresize = ()=>{
        this.nav_flag_set();
      }
    },


    computed: {
      ...mapGetters([
        "talk_done",
        "login_flag",
        "token_status"
      ]),
    },


    methods: {
      ...mapMutations([
        "set_token_status",
      ]),

      ...mapActions([
        "add_talk_word",
      ]),

      nav_show(){
        this.nav_flag = !this.nav_flag;
      },

      nav_hide(){
        this.nav_flag = false;
      },

      nav_flag_set(){
        let width = document.body.clientWidth;
        if(width < 750){
          this.nav_flag = false;
        }else{
          this.nav_flag = true;
        }
      },

      login_click(){
        if(this.$route.name === "login"){
          return;
        }
        if(this.login_flag){
          this.$router.push("/home");
          return;
        }

        if(this.token_status === "token_right"){
          this.$router.push("/charge");
        }else{
          if(this.token_status === "token_expire"){
            this.add_talk_word("当前token已过期,请重新登录以更新token,Dawkey~");
          }else if(this.token_status === "token_wrong"){
            localStorage.removeItem("token");
            this.set_token_status("token_no");
            this.add_talk_word("当前token无效!已被移除.");
          }
          this.$router.push("/login");
        }
      },
    },

  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable.styl"

  .nav_2_body
    position: fixed
    z-index: 15
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
        position: relative
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
          color: $color-grey
          cursor: pointer
          transition: transform 500ms
          &:hover
            font-size: 2.7rem
            margin-right: 0.9rem
            color: rgba(96,126,121,0.9)
          &.router-link-active
            font-size: 2.7rem
            margin-right: 0.9rem
            color: rgba(96,126,121,0.9)
          &.out_login
            transform: rotateZ(-180deg)
          &.login-leave-active
            transition: transform 500ms,opacity 500ms
          &.login-leave-to
            transform: translateX(-7.5rem) rotateZ(-180deg)
            opacity: 0
          &.login-enter-active
            transition: transform 500ms,opacity 500ms
          &.login-enter
            transform: translateX(-7.5rem) rotateZ(-180deg)
            opacity: 0
          &.login-enter-to
            transform: translateX(0) rotateZ(-180deg)

        .icon-charge
          position: absolute
          right: 1rem
          font-size: 2.6rem
          color: $color-3
          cursor: pointer
          &:hover
            font-size: 2.7rem
        .charge-leave-active
          transition: transform 500ms,opacity 500ms
        .charge-leave-to
          transform: translateX(10rem)
          opacity: 0
        .charge-enter-active
          transition: transform 500ms,opacity 500ms
        .charge-enter
          transform: translateX(10rem)
          opacity: 0
        .charge-enter-to
          transform: translateX(0)

        .menu
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
            display: flex
            position: absolute
            width: 11rem
            background: rgba(248,248,248,0.95)
            border: 0.1rem solid rgb(235,235,235)
            border-radius: 0.5rem
            flex-direction: column
            top: 4.3rem
            right: 0rem
            padding-top: 0.3rem
            padding-bottom: 0.3rem
            >li
              padding: 0.7rem 1rem
              >div
                font-size: 1.6rem
                display: inline-flex
                margin: 0 0
          .nav_ul-enter-active
            transition: transform 400ms,opacity 400ms
          .nav_ul-enter
            transform: translateX(4rem)
            opacity: 0
          .nav_ul-enter-to
            transform: translateX(0)
          .icon-login
            display: none
            color: $color-3
          .menu
            display: block
            margin: 0
            padding: 0
            border: none
            outline: none
            margin-right: 1rem
            background: transparent
            .icon-menu
              display: block
              font-size: 2.1rem
              color: $color-3


</style>
