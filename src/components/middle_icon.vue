<template>
  <transition name="icon">
    <div class="middle_icon button_icon"
      v-show = "router_show != 'home' && show_flag"
      :class="{update: router_show === 'update'}"
    >
      <i :class="icon_class"></i>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import {common_show_flag} from "common/js/mixin.js";
  export default {
    name: "MiddleIcon",

    mixins: [common_show_flag],

    computed: {

      icon_class(){
        let name = this.router_show;
        if(name === false){
          return "false";
        }
        return `icon-${name}`;
      },

    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable.styl"
  .middle_icon
    position: absolute
    top: 0
    left: 1rem
    z-index: 11
    transform: translateX(-50%)
    &.button_icon
      background: $color-3-o
      color: $color-black
      font-size: 2.1rem
      cursor: default
      &.update
        font-size: 2.3rem
  .icon-enter-active
    transition: all 300ms
  .icon-enter
    transform: translateX(-50%) scale(0)
    opacity: 0
  .icon-enter-to
    transform: translateX(-50%) scale(1)
    opacity: 1
</style>
