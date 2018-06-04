<template>
  <div class="tag">
    <div class="icon">
      <i class="button_icon icon-tag"></i>
    </div>
    <ul class="tags">
      <li v-for = "item in tag_name">
        {{item}}
        <span>({{tag[item].length}})</span>
      </li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
  import {get_main} from "api/api.js";
  import {mapActions,mapGetters} from "vuex";
  export default {
    name: "tag",

    created(){
      get_main().then((res)=>{
        this.data_handle(res.data);
      });
    },

    computed: {
      ...mapGetters([
        "tag_name",
        "tag"
      ]),
    },

    methods: {
      ...mapActions([
        "data_handle"
      ]),
    },

  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable.styl"

  .tag
    position: relative
    padding: 1.5rem 0rem 4rem 3.5rem
    box-shadow: $box-shadow-left
    transform: translateY(4.2rem)
    .icon
      position: absolute
      top: -4.2rem
      left: 0
      transform: translateX(-50%)
      i
        margin: 0
    .tags
      display: flex
      flex-wrap: wrap
      font-size: 3rem
      color: $color-grey
      >li
        margin: 0.5rem 2rem 0.5rem 0
        >span
          font-size: 1.8rem

  @media (max-width: $max-width-1)
    .tag
      padding-bottom: 1.5rem
      transform: translateY(2rem)
      .icon
        display: none

</style>
