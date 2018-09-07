<template>
  <div class="login">
    <transition name="router_icon">
      <div class="button_icon router_icon" v-show="show_flag">
        <i class="icon-login"></i>
      </div>
    </transition>
    <transition name="router">
      <div class="login_div router_div" v-show="show_flag">
        <form>
          <div class="account">
            <label for="account">账号:</label>
            <input type="text" name="account" v-model="username" spellcheck="false">
          </div>
          <div class="password">
            <label for="password">密码:</label>
            <input type="password" name="password" v-model="password" spellcheck="false">
          </div>
        </form>
        <div class="button">
          <div class="login" @click="login_click">
            login
          </div>
          <div class="visit" @click="visit_click">
            visit
          </div>
          <div class="loading" v-show="loading_flag">
            <div class="loading-1">
            </div>
            <div class="loading-2">
            </div>
            <div class="loading-3">
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapGetters,mapMutations,mapActions} from "vuex";
  import {login} from "api/post.js";
  import {get_date} from "common/js/get_date.js";
  export default {
    name: "Login",


    data(){
      return {
        username: "",
        password: "",
        loading_flag: false,
        talk_time: 0,
      }
    },


    computed: {
      ...mapGetters([
        "router_show",
        "token_status"
      ]),
      show_flag(){
        if(this.router_show === 'login'){
          this.set_loading_show(false);
          return true;
        }else{
          return false;
        }
      },
    },


    methods: {
      ...mapMutations([
        "set_loading_show",
        "set_token_status",
      ]),

      ...mapActions([
        "add_talk_word",
      ]),

      login_click(){
        if(this.loading_flag){
          return;
        }
        if(this.username === "" || this.password === ""){
          this.add_talk_word("账号|密码不能为空!");
          return;
        }

        this.add_talk_word("提交中...");
        this.loading_flag = true;

        let timer_promise = new Promise((resolve)=>{
          setTimeout(()=>{resolve(0);},1500);
        });
        let json = {username: this.username,password: this.password};
        Promise.all([login(json),timer_promise])
          .then((res)=>{
            let respond = res[0].data;
            if(respond.code !== 1){
              if(respond.code === 0){
                let token = respond.data.token;
                localStorage.setItem("token",token);
                this.set_token_status("token_right");
                this.loading_flag = false;
                this.$router.push("/charge");
              }
              else if(respond.code === 2){
                this.add_talk_word("账号|密码有误!");
                this.loading_flag = false;
              }
            }
            else{
              this.add_talk_word("服务器端出现错误,登录失败!");
              this.loading_flag = false;
            }
          });
      },

      visit_click(){
        this.$router.push("/charge");
      },

    },

    watch: {
      show_flag(){
        if(this.talk_time !== 0){
          return;
        }
        if(this.show_flag === true && this.token_status === "token_no"){
          this.talk_time = this.talk_time + 1;
          this.add_talk_word("你可以通过'visit'按钮直接访问后台界面哦~(不过没有管理员权限就是了)");
        }
      },
    },

  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable.styl"
  .login_div
    width: 22rem
    form
      font-size: 1.3rem
      .account,.password
        display: flex
        justify-content: space-between
        margin-top: 1.2rem
      label
        display: block
        font-size: 1.3rem
        color: $color-3
        flex-shrink: 0
      input
        color: $color-3
        background: transparent
        border: none
        outline: 0
        padding: 0 0.5rem
        width: 100%
        box-sizing: border-box
        box-shadow: $box-shadow-bottom
        letter-spacing: 0.1rem
        &:focus
          box-shadow: 0 0.5rem 0.5rem -0.5rem $color-3
    .button
      position: relative
      display: flex
      margin-top: 3rem
      font-size: 1.5rem
      justify-content: center
      align-items: center
      // margin-bottom: 1.5rem
      .login
        width: 7rem
        line-height: 2.5rem
        text-align: center
        color: $color-2
        background: $color-grey
        box-shadow: $box-shadow
        border-radius: 0.3rem
        cursor: pointer
        &:hover
          background: $color-3
      .visit
        position: absolute
        right: 0.5rem
        width: 4.4rem
        line-height: 1.6rem
        text-align: center
        background: transparent
        color: $color-grey
        box-shadow: 0 0.5rem 0.5rem -0.5rem
        cursor: pointer
        &:hover
          color: $color-3
          transform: scale(1.05)
      .loading
        position: absolute
        left: 1.2rem
        // top: 3rem
        width: 4.5rem
        height: 4.5rem
        display: flex
        align-items: center
        justify-content: center
        .loading-1,.loading-2,.loading-3,.loading-4
          position: absolute
          z-index: 10
          width: 0
          height: 0
          background: $color-3
          filter: drop-shadow(0 0 1px $color-3-o)
          border-radius: 50%
          animation: load 1.8s cubic-bezier(0, 0.2, 0.8, 1) infinite
        .loading-2
          animation-delay: -0.6s
        .loading-3
          animation-delay: -1.2s

  @keyframes load
    100%
      height: 100%
      width: 100%
      opacity: 0


  @media (max-width: $max-width-2)
    .login_div
      form
        label
          flex-shrink: 0
        input
          margin: 0.5rem 0


</style>
