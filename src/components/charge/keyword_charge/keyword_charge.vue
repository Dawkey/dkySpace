<template>
  <div class="kcharge">
    <i class="icon-tag icon"></i>
    <ul class="keys">
      <li class="key" v-for="item in tag_name">
        {{item}}<span>({{tag[item].length}})</span>
      </li>
    </ul>
    <div class="key_input">
      <input v-model="new_key" type="text" name="new_key">
      <div class="commit">
        Commit
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapGetters} from "vuex";
  export default {
    name: "KeywordCharge",


    data(){
      return{
        new_key: "",
      }
    },


    computed: {
      ...mapGetters(["tag_name","tag"]),
    },
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable.styl"

  .kcharge
    position: fixed
    z-index: 12
    top: 0
    left: 0
    height: 100%
    width: 100%
    background: rgba(96, 126, 121,0.92)
    display: flex
    align-items: center
    justify-content: center
    flex-direction: column
    font-family: Georgia
    .icon
      color: $color-2-o
      font-size: 2.2rem
      margin-bottom: 2.5rem
    .keys
      display: flex
      flex-wrap: wrap
      .key
        margin: 0 1.2rem
        font-size: 2rem
        font-family: Georgia
        color: $color-2-o
        span
          font-size: 1.3rem
          font-family: $normal_font
    .key_input
      display: flex
      margin-top: 3.5rem
      input
        display: block
        width: 13.5rem
        color: $color-2-o
        letter-spacing: 0.1rem
        font-size: 1.8rem
        font-family: Georgia
        background: transparent
        border: none
        outline: 0
        border-bottom: 0.1rem solid $color-2-o
        padding: 0.2rem
        text-align: center
      .commit
        display: flex
        margin-left: 1rem
        margin-bottom: -0.1rem
        height: 2.8rem
        width: 7.5rem
        font-size: 1.6rem
        align-items: center
        justify-content: center
        color: rgba(96, 126, 121,0.92)
        background: $color-2-o
        box-shadow: 0 0 0.4rem 0 $color-2
        border-radius: 0.3rem
        cursor: pointer
        &:hover
          background: #fff


</style>
