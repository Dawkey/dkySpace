<template>
  <div class="mayuri" :class="[{zindex_up: talk_show},{zindex_down: !combine_flag && $route.name !== 'charge'}]">
    <div class="mayuri-img" @click="mayuri_click">
      <div class="expression"
        :class="[
          {start_talk: !talk_done},
          {end_talk: talk_done},
          {mouse_open: mouse_open_flag},
        ]"
      >
      </div>
    </div>
    <transition name="talk">
      <div class="talk" v-show="talk_show" :class="{kstyle: kcharge_flag !== false}">
        <div class="talk-box">
          <span class="talk-word">
            <span ref="talk_span" class="word">
            </span>
            <span class="cursor" :class="{star: talk_done}">|</span>
          </span>
        </div>
      </div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import type from "common/js/type.js";
  import {get_user} from "common/js/localStorage.js";
  import {mapGetters,mapMutations} from "vuex";
  export default {
    name: "Mayuri",

    data(){
      return{
        // talk_done: true,//文字是否输出完成的flag
        talk_show: false,
        talk_show_timer: null,

        mouse_open_flag: false,
      }
    },

    computed: {
      ...mapGetters([
        "talk_word",
        "talk_times",
        "talk_flag",
        "talk_done",

        "kcharge_flag",
        "combine_flag"
      ]),
    },

    created(){
      // console.log(get_user());
    },

    methods: {

      ...mapMutations([
        "set_talk_flag",
        "set_talk_done",
      ]),

      mayuri_click(){
        if(this.talk_done === false){
          return;
        }
        if(this.mouse_open_flag === true){
          return;
        }
        this.mouse_open_flag = true;
        setTimeout(()=>{
          this.mouse_open_flag = false;
        },700);
      },

      //开始打字talk的函数
      start_type(){

        clearTimeout(this.talk_show_timer);

        //在文本全部输出完成后,元素还包含着文本,新的一轮type时,先将其清空,
        //  避免造成闪烁
        //但是在文本没有输出完成,这时文本是动态运动的,如果我们这时进入新的
        //  一轮type,也进行清空操作,反而会造成闪烁,故加一个判断.
        if(this.talk_done === true){
          this.$refs.talk_span.innerHTML = "";
        }

        this.talk_show = true;
        this.set_talk_done(false);

        let el = this.$refs.talk_span;
        let word = this.talk_word;
        //把vuex上的$store对象传给type函数,type函数会根据$store的状态有相应变化.
        let $store = this.$store;
        let promise = type(el,word,$store);

        //type返回的是`then`串起来的一长串promise链.
        //如果最后一个promise resolve完成,则把talk_done设为true,以告知组件
        //  文字全部输出完成;
        //如果promise链在执行过程中,因我们前面传给它的 `$store` 发生变化(这
        //  个变化是 vuex 中的talk_flag状态值由true变为false)而出现 reject,
        //  则我们跳出整个promise链,并把talk_flag重新设为true,以让我们后面
        //  创建的新promise链能顺利执行.
        promise
          .then(()=>{
            this.set_talk_done(true);
            this.talk_show_timer = setTimeout(()=>{
              this.talk_show = false;
            },5000);
          })
          .catch((err)=>{
            if(err === "talk_is_break"){
              this.set_talk_flag(true);
            }else{
              console.log("Type程序出现错误,原因如下:\n");
              console.log(err);
            }
          });
      }

    },

    watch: {

      talk_times(){

        if(this.talk_flag === false){
          return;
        }

        if(this.talk_flag === "first"){
          this.set_talk_flag(true);
          return;
        }

        if(this.talk_done === true){
          this.start_type();
          return;
        }
        this.set_talk_flag(false);
      },

      talk_flag(){
        let flag = this.talk_flag;
        if(flag === true){
          this.start_type();
        }
      },

      talk_done(){
        if(this.talk_done === true){
          if(this.talk_flag === false){
            this.set_talk_flag(true);
          }
        }
      }

    }


  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable.styl"

  .mayuri
    position: fixed
    top: 7.5rem
    left: var(--left)
    z-index: 14
    &.zindex_down
      z-index: 9
    &.zindex_up
      z-index: 14
    .mayuri-img
      width: 15rem
      height: 15rem
      border-radius: 50%
      background-image: url(https://static.dawkey.top/img/mayuri.png)
      background-position: 0 0
      background-size: cover
      background-repeat: no-repeat
      box-shadow: 0 0 1rem 0 #000
      cursor: pointer
      // transform: scaleX(-1)
      .expression
        width: 15rem
        height: 15rem
        border-radius: 50%
        background-image: url(https://static.dawkey.top/img/mayuri.png)
        background-position: 0 -15rem
        background-size: cover
        background-repeat: no-repeat
        &.mouse_open
          background-position: 0 -45rem
        &.end_talk
          animation: talk 150ms steps(1) 1;
        &.start_talk
          animation: talk 1.5s steps(1) infinite;
    .talk
      position: fixed
      display: flex
      flex-direction: column
      padding: 0.1rem 0.5rem
      top: 8rem
      left: calc(17.5rem + var(--left))
      color: $color-2
      background: $color-3
      border-radius: 0.3rem
      &:before
        content: ""
        position: absolute
        box-sizing: border-box
        top: 0rem
        height: 1.3rem
        left: -3.75rem
        width: 3.7rem
        transform-origin: 100% 100%
        transform: rotate(-30deg)
        border-bottom: 0.1rem solid rgba(96,126,121,0.6)

      .talk-box
        display: flex
        max-width: 30rem
        .talk-word
          overflow: hidden
          .word
            font-family: monospace
            letter-spacing: 0.1rem
            font-size: 1.4rem
            line-height: 2.2rem
            word-wrap: break-word
            word-break: break-all
          .cursor
            display: inline-block
            font-size: 1.4rem
            line-height: 2.2rem
            &.star
              animation: cursor_star 1.2s steps(1) infinite
      &.kstyle
        color: $color-3
        background: $color-2-o
        &:before
          border-bottom: 0.1rem solid $color-2-o
        .talk-box
          .talk-word
            >i
              &.star
                animation: k_cursor_star 1.2s steps(1) infinite

    .talk-enter-active
      transition: opacity 500ms
    .talk-enter
      opacity: 0
    .talk-enter-to
      opacity: 1
  @keyframes cursor_star
    50%
      color: $color-3
  @keyframes k_cursor_star
    50%
      color: transparent
  @keyframes talk
    0%
      background-position: 0 -30rem
    20%
      background-position: 0 -45rem
    40%
      background-position: 0 -30rem
    50%
      background-position: 0 -15rem
    60%
      background-position: 0 -30rem
    80%
      background-position: 0 -45rem
    100%
      background-position: 0 -30rem


  @media (max-width: $max-width-1)
    .mayuri
      .mayuri-img
        display: none
      .talk
        top: 6.5rem
        left: calc((100% - 88rem)/2 + 16.3rem)
        &:before
          display: none
        &:after
          content: ""
          position: absolute
          top: -1.8rem
          left: 2rem
          bottom: -3.5rem
          z-index: 9
          width: 1rem
          height: 1.8rem
          border-left: 0.1rem solid $color-3

  @media (max-width: 900px)
    .mayuri
      .talk
        left: 17.3rem

  @media (max-width: $max-width-2)
    .mayuri
      .talk
        left: 15rem
        &:after
          left: 4.3rem
        .talk-box
          max-width: 18rem

</style>
