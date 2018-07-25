<template>
  <div class="right_icon">
    <ul class="right_top">

      <transition name="login">
        <router-link tag="li" class="button_icon login"
          :to="login_to"
          :class="{out_login: login_flag}"
          v-show = "$route.name != 'draft' && $route.name != 'edit' && $route.name != 'update_edit'"
        >
          <i class="icon-login"></i>
        </router-link>
      </transition>

      <transition name="charge">
        <router-link tag="li" to="/charge" class="button_icon charge"
          v-show = "$route.name === 'draft' || $route.name === 'edit' || $route.name === 'update_edit'"
        >
          <i class="icon-charge"></i>
        </router-link>
      </transition>

      <transition name="update">
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
      right: calc(((100% - 88rem)/2 - 6rem)/2)
      width: 6rem
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


      .charge
        position: absolute
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


      .update-leave-active
        transition: transform 500ms,opacity 500ms
      .update-leave-to
        transform: translateX(-7.5rem)
        opacity: 0
      .update-enter-active
        transition: transform 500ms,opacity 500ms
      .update-enter
        transform: translateX(-7.5rem)
        opacity: 0
      .update-enter-to
        transform: translateX(0)

    .right_bottom
      bottom: 7.5rem
      display: flex
      justify-content: center
      background: transparent
</style>
