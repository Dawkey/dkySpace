<template>
  <ul class="left_icon">
    <li v-for = "item in nav">
      <transition name="icon">
        <router-link tag="div" class="button_icon"
          :to = "`/${item}`"
          :title = "item"
          v-show = "!login_flag"
          @click.native = "nav_talk(item)"
        >
          <i :class="`icon-${item}`"></i>
        </router-link>
      </transition>
    </li>
  </ul>
</template>

<script type="text/ecmascript-6">
  import Mayuri from "components/base/mayuri.vue";
  import {mapGetters,mapMutations} from "vuex";
  export default {
    name: "LeftIcon",

    components: {Mayuri},

    data(){
      return{
        nav: ["home","tag","classify","archive","about_me"],
      }
    },

    computed: {
      ...mapGetters([
        "login_flag"
      ]),
    },

    methods: {

      ...mapMutations([
        "set_talk_word"
      ]),

      nav_talk(item){
        this.set_talk_word(`${item}~`);
      }

    }

  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable.styl"

  .left_icon
    position: fixed
    top: 24.5rem
    left: calc(((100% - 88rem)/2 - 15rem)/2)
    z-index: 12
    width: 15rem
    display: flex
    flex-direction: column
    align-items: center
    background: $color-2
    >li
      .button_icon
        margin-top: 2rem
        &.router-link-active
          background: $color-3-o
          color: $color-black
          font-size: 2.1rem
      .icon
        position: absolute
      .icon-leave-active
        transition: transform 500ms,opacity 500ms
      .icon-leave-to
        transform: translateX(10rem)
        opacity: 0
      .icon-enter-active
        transition: transform 500ms,opacity 500ms
      .icon-enter
        transform: translateX(10rem)
        opacity: 0
      .icon-enter-to
        transform: translateX(0)

  @media (max-width: $max-width-1)
    .left_icon
      display: none
</style>
