<template>
  <div class="kcharge">

    <div class="kcharge_div">
      <i class="icon-tag icon"></i>

      <ul class="keys">
        <li class="key"
            v-for="(item,index) in tag_name"
            :class="{active_key: yes_no_show && active_index === index}">
          {{item}}
          <span>({{tag[item].length}})</span>
          <div class="fork" @click="delete_click(index)">
            <i class="icon-fork"></i>
          </div>
        </li>
      </ul>

      <div class="key_input">
        <input v-model="new_key" type="text" name="new_key" spellcheck="false">
        <div class="commit" @click="commit_click">
          Commit
        </div>
      </div>

      <yes-no class="yes-no"
        :father = "'write'"
        :top = "'auto'"
        :show_flag = "yes_no_show"
        :loading_flag = "false"
      >
      </yes-no>

      <transition name="yes-no-icon">
        <div class="yes-no-icon" v-show = "yes_no_show && icon_show">
          <i class="icon-delete"></i>
          <span>?</span>
        </div>
      </transition>
    </div>

  </div>
</template>

<script type="text/ecmascript-6">
  import {mapGetters} from "vuex";
  import YesNo from "../yes_no/yes_no.vue";
  export default {
    name: "KeywordCharge",


    components: {YesNo},


    data(){
      return{
        new_key: "",

        yes_no_show: false,
        icon_show: true,
        icon_timer: null,
        active_index: 0,

        kcharge_timer: null,
      }
    },


    computed: {
      ...mapGetters(["tag_name","tag"]),
    },


    methods: {
      commit_click(){

      },

      delete_click(index){
        clearTimeout(this.kcharge_timer);
        this.icon_show = true;
        if(this.yes_no_show){
          clearTimeout(this.icon_timer);
          this.icon_show = false;
          this.icon_timer = setTimeout(()=>{this.icon_show = true;},400);
        }
        this.yes_no_show = true;
        this.active_index = index;
        this.kcharge_timer = setTimeout(()=>{
          this.yes_no_show = false;
        },4000);
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable.styl"

  .kcharge
    position: fixed
    z-index: 12
    top: 0
    left: 0
    height: 100%
    width: 100%
    background: rgba(96, 126, 121,0.92)
    display: flex
    align-items: center
    justify-content: center
    font-family: Georgia
    // display: none

    .kcharge_div
      position: relative
      display: flex
      align-items: center
      flex-direction: column
      max-width: 88rem
      padding-bottom: 2rem

      .icon
        color: $color-2-o
        font-size: 2.2rem
        margin-bottom: 1.5rem

      .keys
        display: flex
        flex-wrap: wrap
        .key
          position: relative
          margin: 0 1.5rem
          font-size: 2rem
          font-family: Georgia
          color: $color-2-o
          padding-top: 1.5rem
          cursor: pointer
          span
            font-size: 1.3rem
            font-family: $normal_font
          .fork
            position: absolute
            top: 0
            right: -1rem
            cursor: pointer
            transform: scaleX(0)
            transition: transform 0.4s
            i
              font-size: 1.2rem
              &:hover
                font-size: 1.3rem
                color: $color-2
          &:before
            content: ""
            position: absolute
            top: 0
            left: 0
            height: 100%
            width: 100%
            padding-bottom: 0.2rem
            border-bottom: 0.1rem solid $color-2-o
            transform-origin: 100% 0
            transform: scaleX(0)
            transition: transform 0.4s
          &:hover::before
            transform: scaleX(1)
            transform-origin: 0 0
          &:hover
            .fork
              transform: scaleX(1)
          &.active_key
            &:before
              transform: scaleX(1)
              transform-origin: 0 0
            .fork
              transform: scaleX(1)

      .key_input
        display: flex
        margin-top: 5rem
        input
          display: block
          width: 13.5rem
          color: $color-2-o
          letter-spacing: 0.1rem
          font-size: 1.8rem
          font-family: Georgia
          background: transparent
          border: none
          outline: 0
          border-bottom: 0.1rem solid $color-2-o
          padding: 0.2rem
          text-align: center
        .commit
          display: flex
          margin-left: 1rem
          margin-bottom: -0.1rem
          height: 2.8rem
          width: 7.5rem
          font-size: 1.6rem
          align-items: center
          justify-content: center
          color: rgba(96, 126, 121,0.92)
          background: $color-2-o
          box-shadow: 0 0 0.4rem 0 $color-2
          border-radius: 0.3rem
          cursor: pointer
          &:hover
            background: #fff

      .yes-no
        position: absolute
        bottom: -5.5rem
        width: 13rem
        >>>.yes_no_div
          .yes_div,.no_div
            color: rgba(96, 126, 121,0.92)
            background: $color-2-o
            box-shadow: none
            &:hover
              font-size: 1.8rem
              background: $color-2
              color: $color-3
              .icon-no
                font-size: 1.4rem
            i
              &:hover
                background: transparent
                color: inherit
          .line
            box-shadow: none
            border-bottom: 1px solid $color-2-o
            transform: none
            margin-top: -1.9rem
        >>>.loading
          transform: translateX(0)
          width: 4.5rem
          height: 4.5rem
          .loading-1,.loading-2,.loading-3,.loading-4
            background: $color-2
            filter: drop-shadow(0 0 1px $color-2-o)

      .yes-no-icon
        position: absolute
        bottom: -4.6rem
        color: $color-2-o
        display: flex
        align-items: center
        i
          font-size: 1.8rem
        span
          font-size: 1.7rem
          margin-left: 0.3rem
          cursor: default
      .yes-no-icon-enter
        transform: scaleX(0)
      .yes-no-icon-enter-to
        transform: scaleX(1)
      .yes-no-icon-enter-active
        transition: transform 400ms
      .yes-no-icon-leave-to
        transform: scaleX(0)
      .yes-no-icon-leave-active
        transition: transform 400ms

</style>
