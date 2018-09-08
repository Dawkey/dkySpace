<template>
  <div class="right_icon">
    <ul class="right_top">

      <transition name="login">
        <li class="button_icon login" title="login"
          @click="login_click"
          :class="[{active_login: $route.name === 'login'},
                   {out_login: login_flag},
                   {token_right: token_status === 'token_right'}
                  ]"
          v-show = "$route.name != 'draft' && $route.name != 'edit' && $route.name != 'update_edit'"
        >
          <i class="icon-login"></i>
        </li>
      </transition>

      <transition name="charge">
        <router-link tag="li" to="/charge" class="button_icon charge" title="charge"
          v-show = "$route.name === 'draft' || $route.name === 'edit' || $route.name === 'update_edit'"
        >
          <i class="icon-charge"></i>
        </router-link>
      </transition>

      <transition name="update">
        <router-link tag="li" to="/update" class="button_icon update" title="update" v-show="!login_flag">
          <i class="icon-update"></i>
        </router-link>
      </transition>

    </ul>
    <div class="right_bottom">
      <div class="button_icon top" @click="top_click">
        <i class="icon-top"></i>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import axios from "axios";
  import {mapGetters,mapMutations,mapActions} from "vuex";
  import {check_token} from "api/post.js";
  export default {
    name: "RightIcon",


    created(){
      axios.interceptors.request.use(function(config){
        let token = localStorage.getItem("token");
        if(token && config.method === "post"){
          config.headers.common["Authorization"] = "Bearer " + token;
        }
        return config;
      },function(error){
        return Promise.reject(error);
      });

      let token = localStorage.getItem("token");
      if(!token){
        this.set_token_status("token_no");
      }else{
        check_token().then((res)=>{
          let code = res.data.code;
          if(code === 0){
            this.set_token_status("token_right");
          }else if(code === 3){
            let error = res.data.data.error;
            if(error === "jwt expired"){
              this.set_token_status("token_expire");
            }else{
              this.set_token_status("token_wrong");
            }
          }
        });
      }
    },


    computed: {
      ...mapGetters([
        "login_flag",
        "token_status",
      ]),
    },


    methods: {
      ...mapMutations([
        "set_token_status",
      ]),

      ...mapActions([
        "add_talk_word",
      ]),

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

      top_click(){
        scrollTo(0,0);
      },
    },
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable.styl"

  .right_icon
    .right_top,.right_bottom
      position: fixed
      z-index: 11
      right: calc(var(--left) + 1rem)
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
        &.active_login
          background: $color-3-o
          color: $color-black
          font-size: 2.3rem
        &.out_login
          transform: rotateZ(-180deg)
        &.token_right
          color: $color-3
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

  @media (max-width: $max-width-1)
    .right_icon
      .right_top
        display: none

  @media (max-height: 600px)
    .right_icon
      .right_bottom
        display: none

  @media (max-width: 1100px)
    .right_icon
      .right_bottom
        display: none


</style>
