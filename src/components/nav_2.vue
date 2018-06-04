<template>
  <div class="nav_2_body">
    <div class="nav_2">
      <div class="nav_left">
        Dawkey's blog
      </div>
      <div class="nav_right">
        <ul class="nav">
          <li class="home">home</li>
          <li class="tag">tag</li>
          <li class="classify">classify</li>
          <li class="archive">archive</li>
          <li class="about_me">about me</li>
        </ul>
        <i class="icon-login"></i>
        <i class="icon-menu"></i>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: "Nav2",
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable.styl"

  .nav_2_body
    position: fixed
    top: 0
    left: 0
    right: 0
    width: 100%
    background: rgba(248,248,248,0.95)
    border-bottom: 0.1rem solid rgb(235,235,235)
    .nav_2
      max-width: 88rem
      margin: 0 auto
      padding: 0 1rem
      display: flex
      height: 5.5rem
      align-items: center
      justify-content: space-between
      .nav_left
        display: flex
        align-items: center
        font-size: 2.2rem
        color: $color-3
        margin-left: 0.5rem
        flex-shrink: 0
      .nav_right
        display: flex
        align-items: center
        justify-content: space-between
        width: 100%
        margin-left: 6.5rem
        margin-right: 0.5rem
        font-size: 1.9rem
        color: $color-grey
        .icon-menu
          display: none
        .nav
          display: flex
          font-size: 1.5rem
          color: $color-grey
          >li
            margin-right: 1.5rem
            position: relative
            padding: 0.3rem 0.6rem
            cursor: pointer
            &:before
              content: ""
              position: absolute
              top: 0
              left: 0
              height: 100%
              width: 100%
              box-shadow: $box-shadow-bottom
              transform-origin: 100% 0
              transform: scaleX(0);
              transition: transform 0.4s
            &:hover::before
              transform: scaleX(1);
              transform-origin: 0 0
          .home
            color: $color-3

  @media (min-width: $max-width-1)
    .nav_2_body
      display: none

  @media (max-width: $max-width-2)
    .nav_2_body
      .nav_2
        justify-content: space-between
        .nav_right
          width: auto
          flex-direction: column-reverse
          .icon-menu
            display: inline
          .icon-login
            display: none
          .nav
            display: none
            position: absolute
            top: 5.5rem
            right: 0
            flex-direction: column
            background: rgba(248,248,248,0.95)
            border-bottom: 0.1rem solid rgb(235,235,235)
            border-left: 0.1rem solid rgb(235,235,235)
            padding-bottom: 0.5rem
            >li
              margin-right: 0
              padding: 0.5rem 1.5rem



</style>
