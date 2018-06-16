<template>
  <div class="write">
    <transition name="router">
      <div class="write_div" v-show="show_flag">
        <div class="icon_box">
          <div class="save write_icon">
            <i class="icon-save"></i>
          </div>
          <div class="commit write_icon">
            <i class="icon-commit"></i>
          </div>
        </div>
        <div class="markdown">
          <div class="write_icon">
            <i class="icon-exchange"></i>
          </div>
          <form class="input_head">
            <input class="title" placeholder="标题" type="text" name="title">
            <div class="tag_classify">
              <input class="tag" placeholder="标签" type="text" name="tag">
              <input class="classify" placeholder="分类" type="text" name="classify">
            </div>
          </form>
          <textarea class="content" placeholder="内容" name="content" spellcheck="false"></textarea>
        </div>
        <div class="html">
          <div class="write_icon">
            <i class="icon-exchange"></i>
          </div>
          <div class="title">
          </div>
          <div class="middle_div">
            <div class="date">
            </div>
            <div class="tag_classify">
              <div class="tag">
                <i class="icon-tag"></i>
              </div>
              <div class="classify">
                <i class="icon-classify"></i>
              </div>
            </div>
          </div>
          <div class="content article_style">
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapGetters,mapMutations} from "vuex";
  export default {
    name: "write",
    computed: {
      ...mapGetters([
        "router_show"
      ]),
      show_flag(){
        if(this.router_show === "write"){
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

  .write
    .write_div
      display: flex
      justify-content: space-between
      .icon_box
        position: fixed
        z-index: 11
        top: 24.5rem
        left: calc((100% - 4rem)/2 - 4.5rem)
        .write_icon
          position: relative
          margin-left: 1.8rem
          margin-top: 2rem
          &:before
            content: ""
            position: absolute
            z-index: 10
            width: 3rem
            height: 6.5rem
            right: 1.8rem
            background: $color-1
          &.save
            font-size: 2.4rem
          &.commit
            font-size: 1.8rem
      .markdown,.html
        position: relative
        z-index: 10
        width:calc((100% - 4rem)/2)
        min-height: 70rem
        background: rgba(246,246,246,0.8)
        box-shadow: $box-shadow
        padding: 3rem 3rem
        padding-top: 2.5rem
        box-sizing: border-box
        .write_icon
          position: absolute
          top: -1.8rem
          left: calc(50% - 2.2rem)
          font-size: 1.7rem
          &:before
            content: ""
            position: absolute
            z-index: 10
            width: 6.5rem
            height: 3rem
            top: 1.8rem
            background: $color-1
      .markdown
        display: flex
        flex-direction: column
        font-family: monospace
        .input_head
          flex-shrink: 0
          display: flex
          height: 8.1rem
          padding-top: 0.8rem
          input
            display: block
            color: $color-3
            background: transparent
            border: none
            outline: 0
            padding: 0 0.5rem
            font-family: inherit
            box-shadow: $box-shadow-bottom
            letter-spacing: 0.1rem
          .title
            width: 100%
            height: 3.5rem
            line-height: 3.5rem
            font-size: 2.4rem
          .tag_classify
            flex-shrink: 0
            width: 10rem
            margin-left: 1rem
            .tag,.classify
              box-sizing: border-box
              width: 100%
              height: 2.5rem
              padding-top: 0.5rem
              line-height: 2rem
              font-size: 1.3rem
              margin-top: 1rem
            .classify
              margin-top: 0.6rem
        .content
          display: block
          background: transparent
          border: none
          outline: 0
          padding: 0.5rem 0.7rem
          padding-right: 0
          resize: none
          box-sizing: border-box
          width: 100%
          height: 100%
          font-size: 1.6rem
          line-height: 2rem
          font-family: inherit
          letter-spacing: 0.1rem
          box-shadow: $box-shadow-left
      .html
        font-family: Georgia
        .title
          font-size: 2.4rem
          font-weight: 800
          height: 3.5rem
          line-height: 3.5rem
          text-align: center
          padding-bottom: 0.8rem
          box-shadow: $box-shadow-bottom
        .middle_div
          position: relative
          margin-top: 0.1rem
          margin-bottom: 2rem
          color: $color-grey
          .date
            height: 2.5rem
            line-height: 2.5rem
            text-align: center
            font-size: 1.4rem
          .tag_classify
            position: absolute
            top: 0
            right: 1.2rem
            height: 100%
            display: flex
            i
              margin-right: 0.5rem
            .tag,.classify
              height: 100%
              display: flex
              align-items: center
            .tag
              font-size: 1.3rem
              padding-right: 1rem
            .classify
              font-size: 1.2rem
              padding-left: 1rem
              box-shadow: $box-shadow-left

</style>
