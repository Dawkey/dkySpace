<template>
  <div class="right_icon">
    <ul class="right_top">
      <router-link tag="li" :to="login_to" class="button_icon login" :class="{out_login: login_flag}">
        <i class="icon-login"></i>
      </router-link>
      <transition name="icon">
        <router-link tag="li" to="/update" class="button_icon update" v-show="!login_flag">
          <i class="icon-update"></i>
        </router-link>
      </transition>
    </ul>
    <div class="right_bottom">
      <div class="button_icon top">
        <i class="icon-top"></i>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapGetters} from "vuex";
  export default {
    name: "RightIcon",
    computed: {
      ...mapGetters(["login_flag"]),
      login_to(){
        if(this.login_flag === false){
          return "/login";
        }else{
          return "/home";
        }
      },
    },
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable.styl"

  .right_icon
    .right_top,.right_bottom
      position: fixed
      z-index: 13
      right: calc(((100% - 88rem)/2 - 15rem)/2)
      width: 15rem
    .right_top
      top: 24.5rem
      display: flex
      flex-direction: column
      align-items: center
      background: transparent
      .button_icon
        margin-top: 2rem
        font-size: 2.2rem
        &.router-link-active
          background: $color-3-o
          color: $color-black
          font-size: 2.3rem
        &:hover
          font-size: 2.3rem
      .login
        transition: transform 500ms
        &.out_login
          transform: rotateZ(-180deg)
      .icon-leave-active
        transition: transform 500ms
      .icon-leave-to
        transform: scale(0)
      .icon-enter-active
        transition: transform 500ms
      .icon-enter
        transform: scale(0)
      .icon-enter-to
        transform: scale(1)
    .right_bottom
      bottom: 7.5rem
      display: flex
      justify-content: center
      background: transparent
</style>
