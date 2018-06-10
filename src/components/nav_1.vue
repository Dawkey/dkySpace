<template>
  <div class="nav_1">
    <mayuri></mayuri>
    <ul class="nav">
      <li v-for = "item in nav">
        <router-link tag="div" class="button_icon"
          :to = "`/${item}`"
          :title = "item"
          @click.native = "nav_talk(item)"
        >
          <i :class="`icon-${item}`"></i>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
  import Mayuri from "components/base/mayuri.vue";
  import {mapMutations} from "vuex";
  export default {
    name: "Nav1",

    components: {Mayuri},

    data(){
      return{
        nav: ["home","tag","classify","archive","about_me"],
      }
    },

    methods: {

      ...mapMutations([
        "set_talk_word"
      ]),

      nav_talk(item){
        this.set_talk_word(`${item}正在跳转至...`);
      }

    }

  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable.styl"

  .nav_1
    position: fixed
    top: 7.5rem
    left: calc(((100% - 88rem)/2 - 15rem)/2)
    z-index: 12

    .nav
      display: flex
      flex-direction: column
      align-items: center
      width: 100%
      margin-top: 2rem
      background: $color-2
      >li
        .button_icon
          margin-top: 2rem
          &.router-link-active
            background: $color-3-o
            color: $color-black
            font-size: 2.1rem


  @media (max-width: $max-width-1)
    .nav_1
      display: none
</style>
