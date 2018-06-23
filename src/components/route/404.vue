<template>
  <div class="404">
    <transition name="router">
      <div class="div_404" v-show="show_flag">
        <div class="font">
          404
        </div>
        <div class="explain">
          输入url有误 (￣.￣)
        </div>
      </div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapGetters,mapMutations} from "vuex";
  export default {
    name: "NotFound",

    computed: {
      ...mapGetters([
        "router_show"
      ]),
      show_flag(){
        if(this.router_show === "404"){
          this.set_loading_show(false);
          return true;
        }else{
          return false;
        }
      },
    },

    methods: {
      ...mapMutations([
        "set_loading_show"
      ]),
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable.styl"

  .div_404
    display: flex
    flex-direction: column
    align-items: center
    padding-top: 6rem
    color: $color-3
    font-family: Georgia
    .font
      font-size: 18rem
    .explain
      font-size: 1.4rem
      margin-top: 1.5rem
      padding: 0.5rem
      box-shadow: $box-shadow-bottom

</style>
