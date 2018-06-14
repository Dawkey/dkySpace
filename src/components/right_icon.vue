<template>
  <div class="right_icon">
    <ul class="right_top">
      <router-link tag="li" to="/update" class="button_icon update">
        <i class="icon-update"></i>
      </router-link>
      <router-link tag="li" to="/login" class="button_icon login">
        <i class="icon-login"></i>
      </router-link>
    </ul>
    <div class="right_bottom">
      <div class="button_icon top">
        <i class="icon-top"></i>
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
    .right_top,.right_bottom
      position: fixed
      right: calc(((100% - 88rem)/2 - 15rem)/2)
      width: 15rem
    .right_top
      top: 24.5rem
      display: flex
      flex-direction: column
      align-items: center
      background: $color-2
      .button_icon
        margin-top: 2rem
        font-size: 2.2rem
        &.router-link-active
          background: $color-3-o
          color: $color-black
          font-size: 2.3rem
        &:hover
          font-size: 2.3rem
    .right_bottom
      bottom: 7.5rem
      display: flex
      justify-content: center
      background: $color-2
</style>
