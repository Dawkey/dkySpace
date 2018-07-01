<template>
  <div class="write">

    <transition name="icon_box">

      <div class="icon_box"
           v-show="show_flag && icon_show"
           :class="[{combine: icon_show === 'combine'},
                 {discombine: icon_show === 'discombine'}]"
      >
        <div class="save write_icon">
          <i class="icon-save"
             @click="save_draft"
             :class="{active: active_button === 'save'}"
          ></i>
        </div>
        <div class="commit write_icon">
          <i class="icon-commit"
             @click="commit_draft_click"
             :class="{active: active_button === 'commit'}"
          ></i>
        </div>
        <yes-no
          :father = "'write'"
          :top = "'6.5rem'"
          :show_flag = "yes_no_show"
          :loading_flag = "loading_flag"
          @yes = "commit_draft"
          @no = "cancel_commit_draft"
          @mouseenter.native = "yes_no_enter"
          @mouseleave.native = "yes_no_leave"
        >
        </yes-no>
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

          <div class="_id">
            _id:{{router_id}}
          </div>
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
          <div class="content article_style" v-html="html" ref="html">
          </div>

        </div>

      </div>

    </transition>

  </div>
</template>

<script type="text/ecmascript-6">
  import marked from "marked";
  import highlight from "highlight.js";

  import {common_data,common_draft} from "common/js/mixin.js";
  import {get_date} from "common/js/get_date.js";

  import {get_draft} from "api/get.js";
  import {create_draft,update_draft,create_article} from "api/post.js";
  import {mapGetters,mapMutations,mapActions} from "vuex";
  import YesNo from "./yes_no/yes_no.vue";
  export default {
    name: "write",


    components: {YesNo},


    mixins: [common_data,common_draft],


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

        update_flag: false,//判断draft是否是更新状态(在草稿箱中原有博客上修改)
        create_flag: false,//判断draft是否是创建状态(添加一篇新的博客到草稿)
        router_id_flag: true,//控制computed下的router_id,以避免其重复触发.

        article_json: null,//需要提交到正式博客数据库中的json数据
        article_timer: null,
        active_button: false,//此时进行的操作对应的按钮高亮(有false,commit,save三种状态)
        yes_no_show: false,//yes_no组件中对应的yes_no_div元素的显示和隐藏
        loading_flag: false,//yes_no组件中对象的loading元素的显示和隐藏(同时,在其为
                            //true期间,所有操作会无效化)
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
        "main",
        "draft_main",
        "use",
        "tag_name",
        "classify_name",
      ]),

      //draft数据库在插入下一条数据时,其应该对应的_id值.
      draft_id(){
        if(this.use === null){
          return null;
        }
        return this.use.draft_id + 1;
      },

      //核心代码,不只是用来获取路由对应的id值,还会根据路由的变化,控制一系列相关值的变化.
      //因为router_id在vue的computed中,其后的update_flag,create_flag在变化时,会重复
      //触发router_id,这里设置一个router_id_flag,用来保证,其中每次路由跳转时,只会触发一次
      router_id(){
        if(this.$route.name != "draft"){
          return;
        }
        if(this.router_id_flag === false){
          let _id = parseInt(this.$route.params.id);
          return _id;
        }

        this.update_flag = false;
        this.create_flag = false;

        let data = {title: "",tag: "",classify: "",markdown: ""};
        this.set_input(data);

        if(this.draft_id === null){
          return;
        }
        let _id = parseInt(this.$route.params.id);
        if(_id > this.draft_id || _id <= 0){
          this.$router.replace("/404");
          return;
        }
        if(_id === this.draft_id){
          this.create_flag = true;
          this.router_id_flag = false;
          return _id;
        }
        get_draft(_id).then((res)=>{
          if(res.data.code != 0){
            this.add_talk_word("服务器端出现错误,获取draft数据失败!");
            return;
          }
          let data = res.data.data;

          this.set_input(data);

          this.update_flag = true;
          this.router_id_flag = false;
        });
        return _id;
      },

      show_flag(){
        if(this.router_show != false
            && this.router_show.slice(0,5) === "draft"
            && this.data_ready != false//判断main数据是否获取.
        ){
          if(this.create_flag === false && this.update_flag === false){
            return false;
          }
          this.set_loading_show(false);
          return true;
        }else{
          return false;
        }
      },

      html(){
        return marked(this.content);
      },

      //最后编辑日期
      edit_date(){
        let title = this.title;
        let tag = this.tag;
        let classify = this.classify;
        let content = this.content;
        return get_date();
      },

      //发布博客日期
      date(){
        return this.edit_date;
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
        "set_loading_show",
        "set_login_flag",
        "set_talk_word",
        "set_data_ready"
      ]),

      ...mapActions([
        "add_talk_word",
        "data_handle"
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

      //检测输入框的内容是否合法
      input_test(){
        let title = this.title.trim();
        let tag = this.tag.trim();
        let classify = this.classify.trim();
        let markdown = this.content.trim();

        if(title === ""){
          this.add_talk_word("标题输入框不能为空!");
          return;
        }
        if(tag === ""){
          this.add_talk_word("标签输入框不能为空!");
          return;
        }
        if(classify === ""){
          this.add_talk_word("分类输入框不能为空!");
          return;
        }
        if(markdown === ""){
          this.add_talk_word("内容输入框不能为空!");
          return;
        }

        let title_flag = this.main.some((value)=>{
          return value.title === title;
        });
        if(title_flag){
          this.add_talk_word(`标题 '${title}' 已经存在了! 请换一个新的标题`);
          return;
        }
        if(! this.tag_name.includes(tag)){
          this.add_talk_word(`标签 '${tag}' 不存在! 是否回到charge页面添加新标签?`);
          return;
        }
        if(! this.classify_name.includes(classify)){
          this.add_talk_word(`分类 '${classify}' 不存在! 是否回到charge页面添加新分类?`);
          return;
        }

        let blockquote_el = this.$refs["html"].children[0];
        if(!blockquote_el || blockquote_el.nodeName != "BLOCKQUOTE"){
          this.add_talk_word("内容输入框的第一段必须为 'blockquote' 元素,以作为这篇博客的介绍");
          return;
        };

        let description_el = blockquote_el.children[0];
        if(!description_el){
          this.add_talk_word("第一段 'blockquote' 元素不能为空!");
          return;
        }

        let description = description_el.innerHTML;
        let date = this.date;
        let edit_date = this.edit_date;
        let article = this.html;

        let draft_json = {title,date,edit_date,tag,classify,description,article,markdown};
        let article_json = {};
        article_json.main = {title,date,edit_date,tag,classify,description};
        article_json.article = {article,markdown};
        return {draft_json,article_json};
      },

      //设置输入框的内容
      set_input(data){
        this.title = data.title;
        this.tag = data.tag;
        this.classify = data.classify;
        this.content = data.markdown;
      },

      //保存草稿内容(可能是创建一篇新的草稿,或者在原有草稿上修改)
      save_draft(){
        let json = this.input_test();

        if(!json){
          return;
        }

        this.active_button = "save";
        clearTimeout(this.article_timer);
        this.yes_no_show = false;
        this.loading_flag = true;

        let draft_json = json.draft_json;

        this.add_talk_word("保存中...");

        let _id = this.router_id;
        draft_json._id = _id;

        let timer_promise = new Promise((resolve)=>{
          setTimeout(()=>{resolve(0);},1500);
        });

        if(this.create_flag === true){
          Promise.all([create_draft(draft_json),timer_promise])
            .then((res)=>{
              this.loading_flag = false;
              this.active_button = false;

              let code = res[0].data.code;
              let data = res[0].data.data;
              if(code === 0){
                this.set_use(data.use);
                this.set_draft_main(data.draft_main);

                this.create_flag = false;
                this.update_flag = true;

                this.add_talk_word(`保存成功!已新增一篇博客到草稿箱,_id号为${this.router_id}`);
              }
              else if(code === 1){
                this.add_talk_word("服务器端出现错误,保存失败!");
              }
            })
            .catch((err)=>{
              this.add_talk_word("axios请求出现错误,保存失败!");
              console.log(err);
            });
        }
        else if(this.create_flag === false){
          Promise.all([update_draft(draft_json),timer_promise])
            .then((res)=>{
              this.loading_flag = false;
              this.active_button = false;

              let code = res[0].data.code;
              let data = res[0].data.data;
              if(code === 0){
                this.set_draft_main(data);
                this.add_talk_word("保存成功!");
              }
              else if(code === 1){
                this.add_talk_word("服务器端出现错误,保存失败!");
              }
            })
            .catch((err)=>{
              this.add_talk_word("axios请求出现错误,保存失败!");
              console.log(err);
            });
        }

      },

      //发表博客内容的点击事件,弹出yes_no组件
      commit_draft_click(){
        let json = this.input_test();

        if(!json){
          return;
        }
        this.article_json = json.article_json;
        this.yes_no_show = true;
        this.active_button = "commit";
        this.article_timer = setTimeout(()=>{
          this.yes_no_show = false;
          this.active_button = false;
        },3000);
      },

      //真正发表博客内容的函数(创建一篇新的博客),由yes_no组件中的yes按钮触发
      commit_draft(){
        clearTimeout(this.article_timer);
        this.yes_no_show = false;
        this.loading_flag = true;

        this.add_talk_word("提交中...");
        let article_json = this.article_json;
        let _id = this.use.article_id + 1;
        article_json.main._id = _id;
        article_json.article._id = _id;

        let timer_promise = new Promise((resolve)=>{
          setTimeout(()=>{resolve(0);},1500);
        });


        Promise.all([create_article(article_json),timer_promise])
          .then((res)=>{
            let code = res[0].data.code;
            let data = res[0].data.data;
            if(code === 0){
              this.loading_flag = false;
              this.active_button = false;

              this.set_data_ready(false);
              this.data_handle(data);

              this.add_talk_word(`提交成功!已新增一篇博客,_id号为${_id}`);
            }
            else if(code === 1){
              this.loading_flag = false;
              this.active_button = false;

              this.add_talk_word("服务器端出现错误,保存失败!");
            }
          })
          .catch((err)=>{
            this.add_talk_word("axios请求出现错误,保存失败!");
            console.log(err);
          });
      },

      cancel_commit_draft(){
        clearTimeout(this.article_timer);
        this.yes_no_show = false;
        this.active_button = false;
      },

      //控制yes_no组件的移入移出事件
      yes_no_enter(){
        if(this.yes_no_show === false){
          return;
        }

        clearTimeout(this.article_timer);
      },

      yes_no_leave(){
        if(this.yes_no_show === false){
          return;
        }

        this.article_timer = setTimeout(()=>{
          this.yes_no_show = false;
          this.active_button = false;
        },3000);
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

      $route(){
        if(this.$route.name != "draft"){
          return;
        }
        this.router_id_flag = true;
      }

    },

    // beforeRouteLeave(to,from,next){
    // }

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
        left: calc((100% - 4rem)/2 - 4.5rem + 1.8rem)
      &.combine
        left: calc((100% - 88rem)/2 + 88rem - 4.5rem + 1.8rem)
      .write_icon
        position: relative
        z-index: 10
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
          >i
            &.active
              background: $color-3
              color: $color-1
        &.commit
          font-size: 1.8rem
          >i
            &.active
              background: $color-3
              color: $color-1
      .yes_no
        position: absolute
        z-index: 11
        left: calc(50% - 6rem)
        width: 12rem

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
        position: relative
        display: flex
        margin-right: 4rem
        flex-direction: column
        font-family: monospace
        ._id
          position: absolute
          top: 0.4rem
          right: 0.4rem
          font-size: 1.1rem
          padding: 0.1rem
          color: $color-3-o
          font-family: cursive
          border: 0.1rem solid
          opacity: 0.5
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
      .icon_box
        &.combine
          left: calc(100% - 3rem - 4.5rem + 1.8rem)
</style>
