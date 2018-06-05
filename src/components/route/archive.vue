<template>
  <div class="archive">
    <div class="icon">
      <i class="button_icon icon-archive"></i>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: "Archive",
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable.styl"

  .archive
    position: relative
    padding: 1.5rem 3rem 3rem 3rem
    box-shadow: $box-shadow-left
    transform: translateY(4.2rem)
    .icon
      position: absolute
      top: -4.2rem
      left: 0
      transform: translateX(-50%)
      i
        margin: 0
</style>
