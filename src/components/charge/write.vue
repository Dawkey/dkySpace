<template>
  <div class="write">

    <transition name="icon_box">

      <div class="icon_box"
           v-show="show_flag && icon_show"
           :class="[{combine: icon_show === 'combine'},
                 {discombine: icon_show === 'discombine'}]"
      >
        <div class="save write_icon" v-show = "$route.name !== 'edit'">
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
            _id:{{$route.name === "draft" ? router_id : edit_router_id}}
          </div>
          <div class="write_icon">
            <i class="icon-exchange" @click="markdown_change"></i>
          </div>
          <form class="input_head">
            <input v-model="title" class="title" placeholder="标题" type="text" name="title" spellcheck="false">
            <div class="tag_classify">
              <div class="tag_box_contain">
                <transition name="tag_box">
                  <ul class="tag_box" v-show="tag_box_show">
                    <li v-for="item in tag_name">
                      {{item}}
                    </li>
                  </ul>
                </transition>
              </div>
              <input
                v-model="tag"
                @focus="box_focus('tag_box_show')"
                @blur="box_blur('tag_box_show')"
                class="tag" placeholder="标签" type="text" name="tag" spellcheck="false">
              </input>
              <input
                v-model="classify"
                @focus="box_focus('classify_box_show')"
                @blur="box_blur('classify_box_show')"
                class="classify" placeholder="分类" type="text" name="classify" spellcheck="false">
              </input>
              <div class="classify_box_contain">
                <transition name="classify_box">
                  <ul class="classify_box" v-show="classify_box_show">
                    <li v-for="item in classify_name">
                      {{item}}
                    </li>
                  </ul>
                </transition>
              </div>
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
              {{date}}
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
          <div class="edit_date" v-show="combine_flag === true && html_flag === true">
            最后编辑于<span>{{edit_date}}</span>
          </div>

        </div>

      </div>

    </transition>


    <transition name="shadow">

      <div class="shadow_box" v-show="shadow_flag" @click="shadow_click">
        <div class="message">
          是否保存博客后再跳转?
        </div>
        <yes-no
          :father = "'write'"
          :show_flag = "true"
          @yes = "shadow_yes"
          @no = "shadow_no"
        >
        </yes-no>
      </div>

    </transition>

  </div>
</template>

<script type="text/ecmascript-6">
  import marked,{Renderer} from "marked";
  import hljs from "highlight.js";

  import {common_data,common_draft} from "common/js/mixin.js";
  import {get_date} from "common/js/get_date.js";

  import {get_draft,get_article} from "api/get.js";
  import {create_draft,update_draft,create_article,update_article} from "api/post.js";
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
        date: "",

        old_data: {},

        combine_flag: true,//控制输入框是合并还是分开
        markdown_flag: true,//控制markdown框的显示和隐藏
        html_flag: false,//控制html框的显示和隐藏
        icon_show: "combine",//控制markdown框旁边icon的显示和隐藏

        update_flag: false,//判断draft是否是更新状态(在草稿箱中原有博客上修改)
        create_flag: false,//判断draft是否是创建状态(添加一篇新的博客到草稿)
        router_id_flag: true,//控制computed下的router_id,以避免其重复触发.
        edit_flag: false,

        article_json: null,//需要提交到正式博客数据库中的json数据
        article_timer: null,
        active_button: false,//此时进行的操作对应的按钮高亮(有false,commit,save三种状态)
        yes_no_show: false,//yes_no组件中对应的yes_no_div元素的显示和隐藏
        loading_flag: false,//yes_no组件中对象的loading元素的显示和隐藏(同时,在其为
                            //true期间,所有操作会无效化)

        autosave_timer: null,
        autosave_flag: false,

        shadow_flag: false,
        next_flag: false,
        saved_flag: false,
        next_path: "/",

        tag_box_show: false,
        classify_box_show: false,
      }
    },


    created(){
      this.set_login_flag(true);

      const renderer = new Renderer();

      renderer.code = (code,language) => {
        if(!language){
          language = "code";
        }
        let lang_is_valid = (language !== "code" && hljs.getLanguage(language));
        let highlighted = lang_is_valid ? hljs.highlight(language, code).value : code;

        return `<pre><div class="language">${language}</div><code class="hljs ${language}">${highlighted}</code></pre>`;
      };
      marked.setOptions({renderer});
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
        this.autosave();
        this.update_flag = false;
        this.create_flag = false;

        let data = {title: "",tag: "",classify: "",markdown: ""};
        this.set_input(data);
        this.old_data = data;

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
            if(res.data.code === 1){
              this.add_talk_word("服务器端出现错误,获取draft数据失败!");
              return;
            }else if(res.data.code === 2){
              this.$router.replace("/404");
              return;
            }
          }
          let data = res.data.data;

          this.set_input(data);
          this.old_data = data;

          this.update_flag = true;
          this.router_id_flag = false;
        });
        return _id;
      },

      //已经发表的博客文章发布
      edit_router_id(){
        if(this.$route.name != "edit"){
          return;
        }
        this.edit_flag = false;

        let data = {title: "",tag: "",classify: "",markdown: ""};
        this.set_input(data);

        let _id = parseInt(this.$route.params.id);
        get_article(_id,"edit").then((res)=>{
          if(res.data.code != 0){
            if(res.data.code === 1){
              this.add_talk_word("服务器端出现错误,获取article数据失败!");
              return;
            }else if(res.data.code === 2){
              this.$router.replace("/404");
              return;
            }
          }
          let data = res.data.data.article;
          data.markdown = res.data.data.markdown;
          this.set_input(data);

          this.date = data.date;

          this.edit_flag = true;
        });
        return _id;
      },

      show_flag(){
        if(this.router_show != false
            && this.data_ready != false//判断main数据是否获取.
        ){
          let name = this.$route.name;
          if(name !== "draft" && name !== "edit"){
            return false;
          }

          if(name === "draft" && this.create_flag === false && this.update_flag === false){
            return false;
          }
          if(name === "edit" && this.edit_flag === false){
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
        if(this.$route.name !== "draft" && this.$route.name !== "edit"){
          return;
        }
        let title = this.title;
        let tag = this.tag;
        let classify = this.classify;
        let content = this.content;

        let now_date = get_date();

        if(this.$route.name === "draft"){
          this.date = now_date;
        }
        this.saved_flag = false;
        this.next_flag = false;
        return now_date;
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

      autosave(){
        this.autosave_timer = setTimeout(()=>{
          let {title,tag,classify,markdown} = this.old_data;
          this.autosave_flag = true;
          this.save_draft();
          this.autosave_flag = false;
        },600000);
      },

      //检测输入框的内容是否合法
      input_test(){
        let title = this.title.trim();
        let tag = this.tag.trim();
        let classify = this.classify.trim();
        let markdown = this.content.trim();

        let warning = "";
        if(title === ""){
          warning = "标题输入框不能为空!";
          return warning;
        }
        if(tag === ""){
          warning = "标签输入框不能为空!";
          return warning;
        }
        if(classify === ""){
          warning = "分类输入框不能为空!";
          return warning;
        }
        if(markdown === ""){
          warning = "内容输入框不能为空!";
          return warning;
        }

        let title_flag = this.main.some((value)=>{
          if(this.$route.name === "edit"){
            return (value.title === title && value._id !== this.edit_router_id);
          }
          return value.title === title;
        });
        if(title_flag){
          warning = `标题 '${title}' 已经存在了! 请换一个新的标题`;
          return warning;
        }
        if(! this.tag_name.includes(tag)){
          warning = `标签 '${tag}' 不存在! 是否回到charge页面添加新标签?`;
          return warning;
        }
        if(! this.classify_name.includes(classify)){
          warning = `分类 '${classify}' 不存在! 是否回到charge页面添加新分类?`;
          return warning;
        }

        let blockquote_el = this.$refs["html"].children[0];
        if(!blockquote_el || blockquote_el.nodeName != "BLOCKQUOTE"){
          warning = "内容输入框的第一段必须为 'blockquote' 元素,以作为这篇博客的介绍";
          return warning;
        };

        let description_el = blockquote_el.children[0];
        if(!description_el){
          warning = "第一段 'blockquote' 元素不能为空!";
          return warning;
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
        if(this.$route.name !== "draft"){
          return;
        }
        clearTimeout(this.autosave_timer);
        this.autosave();
        let json = this.input_test();

        if(typeof json === "string"){
          let warning = json;
          if(this.autosave_flag === false){
            this.add_talk_word(warning);
          }
          if(this.next_flag === true){
            this.next_flag = false;
          }
          return;
        }

        this.active_button = "save";
        clearTimeout(this.article_timer);
        this.yes_no_show = false;
        this.loading_flag = true;

        let draft_json = json.draft_json;

        if(this.autosave_flag === false){
          this.add_talk_word("保存中...");
        }else{
          this.add_talk_word("自动保存中...");
        }


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

                this.saved_flag = true;
                if(this.next_flag === true){
                  this.$router.push(this.next_path);
                }
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

                this.saved_flag = true;
                if(this.next_flag === true){
                  this.$router.push(this.next_path);
                }
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

        // clearTimeout(this.autosave_timer);
        // this.autosave();

        if(typeof json === "string"){
          let warning = json;
          this.add_talk_word(warning);
          return;
        }
        this.article_json = json.article_json;
        this.yes_no_show = true;
        this.active_button = "commit";
        clearTimeout(this.article_timer);
        this.article_timer = setTimeout(()=>{
          this.yes_no_show = false;
          this.active_button = false;
        },4000);
      },

      //真正发表博客内容的函数(创建一篇新的博客),由yes_no组件中的yes按钮触发
      commit_draft(){
        clearTimeout(this.article_timer);
        this.yes_no_show = false;
        this.loading_flag = true;

        this.add_talk_word("提交中...");
        let article_json = this.article_json;
        let _id = this.use.article_id + 1;
        if(this.$route.name === "edit"){
          _id = this.edit_router_id;
        }

        article_json.main._id = _id;
        article_json.article._id = _id;

        let timer_promise = new Promise((resolve)=>{
          setTimeout(()=>{resolve(0);},1500);
        });

        if(this.$route.name === "draft"){
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
                this.saved_flag = true;
                this.$router.push(`/charge`);
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
        }

        else if(this.$route.name === "edit"){
          Promise.all([update_article(article_json),timer_promise])
            .then((res)=>{
              let code = res[0].data.code;
              let data = res[0].data.data;
              if(code === 0){
                this.loading_flag = false;
                this.active_button = false;

                this.set_data_ready(false);
                this.data_handle(data);

                this.add_talk_word(`编辑成功!一篇博客已发生变更,_id号为${_id}`);
                this.$router.push(`/charge`);
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
        }

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
        },4000);
      },

      shadow_yes(){
        this.shadow_flag = false;
        this.next_flag = true;
        this.save_draft();
      },

      shadow_no(){
        this.shadow_flag = false;
        this.next_flag = true;
        this.$router.push(this.next_path);
      },

      shadow_click(){
        this.shadow_flag = false;
      },

      box_focus(flag){
        this[flag] = true;
      },

      box_blur(flag){
        this[flag] = false;
      },


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

    beforeRouteLeave(to,from,next){
      if(this.$route.name !== "draft"){
        next();
        return;
      }
      if(this.saved_flag === true){
        this.saved_flag = false;
        clearTimeout(this.autosave_timer);
        next();
        return;
      }
      if(this.next_flag === false){

        let {title,tag,classify,markdown} = this.old_data;
        if(title === this.title && tag === this.tag
           && classify === this.classify && markdown === this.content
         )
         {
          clearTimeout(this.autosave_timer);
          next();
          return;
         }

        this.next_path = to.path;
        this.shadow_flag = true;
      }
      else if(this.next_flag === true){
        this.next_flag = false;
        clearTimeout(this.autosave_timer);
        next();
      }
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
      top: 24.1rem
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
            position: relative
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
            .tag_box_contain
              position: absolute
              display: flex
              top: 1rem
              left: 0
              transform: translateY(-100%)
            .tag_box,.classify_box
              position: relative
              display: flex
              flex-wrap: wrap
              font-size: 1.4rem
              color: $color-3
              padding-left: 0.5rem
              background: $color-1
              box-shadow: $box-shadow
              border-radius: 0.3rem
              >li
                position: relative
                padding: 0.3rem 0.5rem
                box-shadow: $box-shadow-left
                z-index: 10
            .tag_box
              &:before
                content: ""
                position: absolute
                background: $color-1
                width: calc(100% + 3.6rem)
                height: 4.85rem
                bottom: -0.6rem
                left: -0.6rem
                z-index: 9

            .tag_box-enter,.tag_box-leave-to,.classify_box-enter,.classify_box-leave-to
              transform: scaleY(0)
              opacity: 0
            .tag_box-enter-to,.tag_box-leave,.classify_box-enter-to,.classify_box-leave
              transform: scaleY(1)
              opacity: 1
            .tag_box-enter-active,.tag_box-leave-active,.classify_box-enter-active,.classify_box-leave-active
              transition: all 300ms

            .classify_box_contain
              position: absolute
              bottom: 0
              left: 0
              transform: translateY(100%)
            .classify_box
              font-size: 1.2rem
              box-shadow: none
              margin-top: -0.3rem
              >li
                margin-right: 0.5rem

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
      .edit_date
        display: flex
        justify-content: flex-end
        font-size: 1.4rem
        color: #9a9a9a
        >span
          color: rgba(96,126,121,0.8)
          margin-top: 0.1rem
          margin-left: 0.5rem

    .shadow_box
      position: fixed
      z-index: 12
      top: 0
      left: 0
      height: 100%
      width: 100%
      background: rgba(0,0,0,0.4)
      display: flex
      align-items: center
      justify-content: center
      flex-direction: column
      .message
        font-family: monospace
        letter-spacing: 0.1rem
        font-size: 1.4rem
        line-height: 2.2rem
        padding: 0.1rem 0.5rem
        background: $color-3
        color: $color-2
        border-radius: 0.3rem
      .yes_no
        margin-top: 1.4rem
        width: 11rem
    .shadow-enter
      opacity: 0
    .shadow-enter-to
      opacity: 1
    .shadow-enter-active
      transition: opacity 300ms

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
