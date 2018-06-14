<template>
  <div class="loading" v-show = "!show_flag">
    <div class="loading-1">
    </div>
    <div class="loading-2">
    </div>
    <div class="loading-3">
    </div>
    <div class="loading-4">
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapGetters} from "vuex";
  export default {

    name: "Loading",

    computed: {
      ...mapGetters([
        "show_flag"
      ]),
    }

    // mixins: [common_show_flag],

  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable.styl"
  .loading
    position: fixed
    z-index: 11
    top: 22.5rem
    left: calc(50vw - 6rem)
    width: 12rem
    height: 12rem
    display: flex
    align-items: center
    justify-content: center
    .loading-1,.loading-2,.loading-3,.loading-4
      position: absolute
      z-index: 10
      width: 0
      height: 0
      background: $color-3-o;
      filter: drop-shadow(0 0 1px $color-2)
      border-radius: 50%
      animation: load 2s cubic-bezier(0, 0.2, 0.8, 1) infinite
    .loading-2
      animation-delay: -0.5s
    .loading-3
      animation-delay: -1s
    .loading-4
      animation-delay: -1.5s

  @keyframes load
    100%
      height: 12rem
      width: 12rem
      opacity: 0

</style>
