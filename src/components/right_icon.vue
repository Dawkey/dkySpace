<template>
  <div class="right_icon">
    <div class="button_icon top">
      <i class="icon-top"></i>
    </div>
    <div class="button_icon login">
      <i class="icon-login"></i>
    </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: "RightIcon",
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable.styl"

  .right_icon
    position: fixed
    bottom: 7.5rem
    right: calc(((100% - 88rem)/2 - 15rem)/2)
    width: 15rem
    display:flex
    flex-direction: column-reverse
    align-items: center
    >div
      font-size: 2.2rem
      &:hover
        font-size: 2.3rem
    .login
      display: none
</style>
