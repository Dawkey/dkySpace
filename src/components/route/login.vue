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
            <input type="text" name="account">
          </div>
          <div class="password">
            <label for="password">密码:</label>
            <input type="password" name="password">
          </div>
        </form>
        <div class="button">
          <div class="login" @click="to_charge">
            login
          </div>
          <div class="visit_login">
            visitor's login
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapGetters,mapMutations} from "vuex";
  export default {
    name: "Login",
    computed: {
      ...mapGetters([
        "router_show",
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
      ]),
      to_charge(){
        this.$router.push("/charge");
      },
    },
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable.styl"
  .login_div
    width: 20.2rem
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
      input
        color: $color-3
        background: transparent
        border: none
        outline: 0
        padding: 0 0.5rem
        box-shadow: $box-shadow-bottom
        letter-spacing: 0.1rem
        &:focus
          box-shadow: 0 0.5rem 0.5rem -0.5rem $color-3
    .button
      display: flex
      margin-top: 3rem
      font-size: 1.5rem
      justify-content: center
      .login,.visit_login
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
      .visit_login
        display: none
        font-size: 1.2rem
        width: 8.5rem


</style>
