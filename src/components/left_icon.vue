<template>
  <ul class="left_icon" :class="{zindex_down: !combine_flag}">
    <li v-for = "item in nav">
      <transition name="icon">
        <router-link tag="div" class="button_icon"
          :to = "`/${item}`"
          :title = "item"
          v-show = "!login_flag"
        >
          <i :class="`icon-${item}`"></i>
        </router-link>
      </transition>
    </li>
    <transition name="token">
      <li class="token"
          v-if="login_flag && (token_status === 'token_right' || token_status === 'token_expire')"
          @click="get_expire_time"
      >
        <div class="button_icon">
          <i class="icon-token"></i>
          <div class="token_shadow_div">
            <div class="token_shadow" :style="{'height': token_height}">
            </div>
          </div>
        </div>
      </li>
    </transition>
  </ul>
</template>

<script type="text/ecmascript-6">
  import Mayuri from "components/base/mayuri.vue";
  import {mapGetters,mapActions} from "vuex";
  export default {
    name: "LeftIcon",

    components: {Mayuri},

    data(){
      return{
        nav: ["home","tag","classify","archive","about_me"],
        token_height: "50%",
      }
    },

    computed: {
      ...mapGetters([
        "login_flag",
        "combine_flag",
        "token_status",
      ]),
    },

    methods: {

      ...mapActions([
        "add_talk_word",
      ]),

      get_expire_time(){
        if(this.token_status === "token_expire"){
          this.token_height = "100%";
          this.add_talk_word("token已过期,请重新登录以更新token,Dawkey~");
        }
        else if(this.token_status === "token_right"){
          let token = localStorage.getItem("token");
          let encode_str = token.split(".")[1];
          let json_str = window.atob(encode_str);
          let json_obj = JSON.parse(json_str);
          let expire = json_obj.exp;
          let duration = expire - Math.floor(Date.now()/1000);

          let token_height = 100 - Math.floor((duration / (3600 * 24 * 15)) * 100);
          this.token_height = token_height + "%";

          let day = Math.floor(duration / (24 * 3600));
          let hour_dur = duration % (24 * 3600);
          let hour = Math.floor(hour_dur / 3600);
          let minute_dur = hour_dur % 3600;
          let minute = Math.floor(minute_dur / 60);
          let second = minute_dur % 60;
          this.add_talk_word(`token将于'${day}天${hour}时${minute}分${second}秒'后到期~`);
        }
      },

    }

  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable.styl"

  .left_icon
    position: fixed
    top: 24.5rem
    left: var(--left)
    z-index: 11
    width: 15rem
    display: flex
    flex-direction: column
    align-items: center
    background: $color-2
    &.zindex_down
      z-index: 9
    >li
      .button_icon
        margin-top: 2rem
        &.router-link-active
          background: $color-3-o
          color: $color-black
          font-size: 2.1rem
        .icon-token
          color: $color-3
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

    .token
      position: absolute
      .button_icon
        &:hover
          .token_shadow_div
            display: none
        .token_shadow_div
          position: absolute
          display: flex
          align-items: flex-end
          width: 1.8rem
          height: 1.8rem
          .token_shadow
            width: 100%
            height: 50%
            background: rgba(246,246,246,0.5)

    .token-leave-active
      transition: transform 500ms,opacity 500ms
    .token-leave-to
      transform: translateX(-7.5rem)
      opacity: 0
    .token-enter-active
      transition: transform 500ms,opacity 500ms
    .token-enter
      transform: translateX(-7.5rem)
      opacity: 0
    .token-enter-to
      transform: translateX(0)

  @media (max-width: $max-width-1)
    .left_icon
      display: none
</style>
