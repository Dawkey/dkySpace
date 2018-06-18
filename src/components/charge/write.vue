<template>
  <div class="write">
    <transition name="icon_box">
      <div class="icon_box"
        v-show="show_flag && icon_show"
        :class="[{combine: icon_show === 'combine'},
                 {discombine: icon_show === 'discombine'}]"
      >
        <div class="save write_icon">
          <i class="icon-save" @click="save_draft"></i>
        </div>
        <div class="commit write_icon">
          <i class="icon-commit"></i>
        </div>
      </div>
    </transition>
    <transition name="router">
      <div class="write_div" v-show="show_flag"
        :class="[{combine: combine_flag},
                 {markdown_flex: markdown_flag},
                 {html_flex: html_flag}]"
      >
        <div class="markdown"
          :class="[{combine: combine_flag},
                   {opacity: markdown_opacity}]"
        >
          <div class="write_icon">
            <i class="icon-exchange" @click="markdown_change"></i>
          </div>
          <form class="input_head">
            <input v-model="title" class="title" placeholder="标题" type="text" name="title">
            <div class="tag_classify">
              <input v-model="tag" class="tag" placeholder="标签" type="text" name="tag">
              <input v-model="classify" class="classify" placeholder="分类" type="text" name="classify">
            </div>
          </form>
          <textarea class="content" placeholder="内容" name="content" spellcheck="false"
            v-model="content"
          >
          </textarea>
        </div>
        <div class="html"
          :class="[{combine: combine_flag},
                   {opacity: html_opacity}]"
        >
          <div class="write_icon">
            <i class="icon-exchange" @click="html_change"></i>
          </div>
          <div class="title">
            {{title}}
          </div>
          <div class="middle_div">
            <div class="date">
              {{edit_date}}
            </div>
            <div class="tag_classify">
              <div class="tag">
                <i class="icon-tag"></i>
                {{tag}}
              </div>
              <div class="classify">
                <i class="icon-classify"></i>
                {{classify}}
              </div>
            </div>
          </div>
          <div class="content article_style" v-html="html">
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import {post_draft} from "api/post.js";
  import {mapGetters,mapMutations} from "vuex";
  import marked from "marked";
  import highlight from "highlight.js";
  import {get_date} from "common/js/get_date.js";
  export default {
    name: "write",


    data(){
      return {
        title: "",
        tag: "",
        classify: "",
        content: "",
        combine_flag: true,//控制输入框是合并还是分开
        markdown_flag: true,//控制markdown框的显示和隐藏
        html_flag: false,//控制html框的显示和隐藏
        icon_show: "combine",//控制markdown框旁边icon的显示和隐藏
      }
    },


    created(){
      this.set_login_flag(true);
      marked.setOptions({
        highlight(code){
          return highlight.highlightAuto(code).value;
        }
      });
    },


    computed: {

      ...mapGetters([
        "router_show",
      ]),

      show_flag(){
        if(this.router_show === "write"){
          this.set_loading_show(false);
          return true;
        }else{
          return false;
        }
      },

      html(){
        return marked(this.content);
      },

      edit_date(){
        let title = this.title;
        let tag = this.tag;
        let classify = this.classify;
        let content = this.content;
        return get_date();
      },

      markdown_opacity(){
        if(this.combine_flag === false){
          return false;
        }
        if(this.markdown_flag === true){
          return false;
        }
        return true;
      },

      html_opacity(){
        if(this.combine_flag === false){
          return false;
        }
        if(this.html_flag === true){
          return false;
        }
        return true;
      },

    },


    methods: {

      ...mapMutations([
        "set_login_flag",
        "set_loading_show"
      ]),

      markdown_change(){
        this.combine_flag = ! this.combine_flag;
        this.markdown_flag = true;
        this.html_flag = false;
      },

      html_change(){
        this.combine_flag = ! this.combine_flag;
        this.markdown_flag = false;
        this.html_flag = true;
      },

      save_draft(){
        // let title = this.title;
        // let date = this.date;
        // let edit_date = this.edit_date;
        // let tag = this.tag;
        // let classify = this.classify;
        // let description = this.description;
        //
        // let article = this.html;
        // let markdown = this.content;
        //
        // let draft_json = {title,date,edit_date,tag,classify,description,article,markdown};
        // post_draft(draft_json);
      }

    },


    watch: {
      combine_flag(){
        this.icon_show = false;
        setTimeout(()=>{
          if(this.combine_flag === true){
            if(this.markdown_flag === true){
              this.icon_show = "combine";
            }
          }else{
            this.icon_show = "discombine";
          }
        },100);
      },
    },

  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable.styl"
  @import "~common/stylus/article.styl"

  @keyframes icon_show
    0%
      transform: scaleY(0)
    50%
      transform: scaleY(0)
    100%
      transform: scaleY(1)

  .write
    overflow: hidden
    padding: 0 3rem
    padding-top: 2.5rem
    padding-bottom: 1rem
    margin-top: -2.5rem
    margin-bottom: -1rem
    .icon_box
      position: fixed
      z-index: 11
      top: 0
      top: 24.5rem
      left: -10rem
      &.discombine
        left: calc((100% - 4rem)/2 - 4.5rem)
      &.combine
        left: calc((100% - 88rem)/2 + 88rem - 4.5rem)
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
    .icon_box-enter-active
      animation: icon_show 400ms

    .write_div
      display: flex
      width: 100%
      margin: auto
      transition: width 500ms,transform 300ms,opacity 300ms
      &.combine
        width: 88rem
      &.markdown_flex
        justify-content: flex-start
      &.html_flex
        justify-content: flex-end
      .markdown,.html
        flex-shrink: 0
        position: relative
        z-index: 10
        width:calc((100% - 4rem)/2)
        min-height: 70rem
        background: rgba(246,246,246,0.8)
        box-shadow: $box-shadow
        padding: 3rem 3rem
        padding-top: 2.5rem
        box-sizing: border-box
        transition: width 500ms,opacity 500ms
        &.combine
          width: 88rem
        &.opacity
          opacity: 0
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
        margin-right: 4rem
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
          font-size: 1.4rem
          line-height: 2rem
          font-family: inherit
          letter-spacing: 0.1rem
          box-shadow: $box-shadow-left
      .html
        font-family: Georgia
        padding-bottom: 60rem
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

  @media(max-width: 940px)
    .write
      .write_div
        &.combine
          width: 100%
        .markdown,.html
          &.combine
            width: 100%

</style>
