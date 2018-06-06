<template>
  <footer class="footer">
    <div class="copyright">
      Copyright © 2018 Dawkey
    </div>
    <div class="powered">
      <div>
        Powered by&nbsp
        <a href="https://github.com/wwk321/dkySpace" target="_blank">
          Dawkey
        </a>
      </div>
      <div>|</div>
      <div>
        <a href="http://www.miitbeian.gov.cn" target="_blank">
          陕ICP备18003281号
        </a>
      </div>
    </div>
  </footer>
</template>

<script type="text/ecmascript-6">
  export default {
    name: "Footer"
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable.styl"
  .footer
    display: flex
    margin-top: 5rem
    margin-bottom: 2rem
    flex-direction: column
    align-items: center
    font-size: 1.1rem
    height: 3.5rem
    .copyright
      margin-bottom: 0.5rem
      color: #999
    .powered
      display: flex
      color: #777
      a
        line-height: 1.6rem
        text-decoration: underline
        &:hover
          color: #000
      >div
        display: flex
        line-height: 1.6rem
        margin: 0 0.3rem

  @media (max-width: $max-width-2)
    .footer
      margin: 1rem 0 0.5rem 0
</style>
