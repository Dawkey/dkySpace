<template>
  <div class="tag">

    <div class="icon">
      <i class="button_icon icon-tag"></i>
    </div>

    <ul class="tag_names">
      <li
        v-for = "item in tag_name"
        @click = "tag_name_click(item)"
        :class = "{active_tag: (item === name)}"
      >
        <div class="tag_name">
          {{item}}
        </div>
        <div class="tag_num">
          ({{tag[item].length}})
        </div>
      </li>
    </ul>

    <ul class="tag_articles" :style="{height: tag_articles_height}">
      <!-- 这里先检测data_ready,以判断数据是否处理好,如果过处理好才判断,数组长度 -->
      <li class="nothing_li" v-if = "data_ready && tag[name].length === 0">
        Nothing~
      </li>
      <li v-for = "item in tag[name]">
        <div class="title">
          {{item.title}}
        </div>
        <div class="line">
        </div>
        <div class="date">
          {{item.date}}
        </div>
      </li>
    </ul>

  </div>
</template>

<script type="text/ecmascript-6">
  import {mapGetters} from "vuex";
  import {common_data} from "common/js/mixin.js";
  export default {
    name: "tag",
    mixins: [common_data],
    data(){
      return {
        name: "html",
      }
    },

    computed: {
      ...mapGetters([
        "tag_name",
        "tag"
      ]),
      tag_articles_height(){
        if(this.tag_name.length === 0){
          return 0;
        }
        let length = this.tag[this.name].length;
        length = length === 0 ? 1 : length;
        let height = (length * 35 - 15)*0.1;
        return `${height}rem`;
      },
    },

    methods: {
      tag_name_click(item){
        this.name = item;
      }
    },

  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable.styl"

  .tag
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
    .tag_names
      display: flex
      flex-wrap: wrap
      font-size: 3rem
      color: $color-grey
      >li
        display: flex
        position: relative
        padding: 0 0.5rem
        margin: 0.5rem 2.5rem 0.5rem 0
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
          transform: scaleX(0)
          transition: transform 0.4s
        &:hover::before
          transform: scaleX(1)
          transform-origin: 0 0
        &.active_tag
          &:before
            transform: scaleX(1)
            transform-origin: 0 0
        .tag_num
          display: flex
          flex-direction: column-reverse
          margin-bottom: 0.5rem
          margin-left: 0.1rem
          font-size: 1.7rem
    .tag_articles
      height: 0
      margin-top: 3rem
      padding: 0 0.5rem
      color: $color-grey
      overflow: hidden
      transition: height 0.4s
      .nothing_li
        font-size: 1.7rem
      >li
        display: flex
        font-size: 1.5rem
        line-height: 2rem
        height: 2rem
        margin-bottom: 1.5rem
        cursor: pointer
        &:hover
          color: $color-black
          .line
            box-shadow: 0 0.5rem 0.5rem -0.5rem $color-black
        .title
          flex-shrink: 0
        .line
          width: 100%
          margin: 0 0.7rem
          transform: translateY(-51%)
          box-shadow: $box-shadow-bottom
        .date
          flex-shrink: 0

  @media (max-width: $max-width-1)
    .tag
      padding-bottom: 1.5rem
      transform: translateY(2rem)
      .icon
        display: none

</style>
