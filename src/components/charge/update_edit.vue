<template>
  <div class="update_edit">

    <transition name="router">
      <div class="update_edit_div" v-show="show_flag">

        <div class="_id">_id:{{router_id}}</div>

        <div class="write_icon update_icon">
          <i class="icon-update"></i>
        </div>

        <div class="commit">
          <div class="write_icon commit_icon">
            <i class="icon-commit"
              @click="commit_update_click"
              :class="{active: active_button === 'commit'}"
            ></i>
          </div>
          <yes-no class="yes-no"
            :father = "'write'"
            :top = "'6.5rem'"
            :show_flag = "yes_no_show"
            :loading_flag = "loading_flag"
            @yes = "commit_update"
            @no = "cancel_commit_update"
          >
          </yes-no>
        </div>

        <div class="edit">
          <div class="version">
            {{version}}
          </div>
          <textarea type="text" name="edit" placeholder="内容(以'*+空格'的格式)" spellcheck="false"
            v-model = "markdown"
            :class = "{wrong_format: !format_flag}"
            :style = "{height: textarea_height}"
          >
          </textarea>
        </div>

        <div class="view">
          <div class="head">
            <div class="version">
              <div class="version_circle">
              </div>
              {{version}}
            </div>
            <div class="date">
              <i class="icon-date"></i>
              {{date}}
            </div>
          </div>
          <ul class="content" v-html="html" ref="html">
          </ul>
        </div>

      </div>
    </transition>

  </div>
</template>

<script type="text/ecmascript-6">
  import YesNo from "./yes_no/yes_no.vue";
  import {mapGetters,mapMutations,mapActions} from "vuex";
  import {common_data} from "common/js/mixin.js";
  import {get_date} from "common/js/get_date.js";

  import {get_update} from "api/get.js"
  import {create_update,update_update} from "api/post.js"
  export default {
    name: "update_edit",

    components: {YesNo},

    mixins: [common_data],

    data(){
      return {
        version: "",
        date: "",

        markdown: "",
        format_flag: true,
        textarea_height: "auto",

        active_button: false,
        yes_no_show: false,
        loading_flag: false,

        create_flag: false,
        edit_flag: false,
      }
    },


    created(){
      this.set_login_flag(true);
      this.get_update_data();
    },


    computed: {
      ...mapGetters([
        "use",
        "update"
      ]),

      html(){
        if(this.create_flag === true){
          this.date = get_date();
        }
        return this.md_html(this.markdown);
      },

      //创造下一个update时,所应使用的_id
      update_id(){
        if(this.use === null){
          return null;
        }
        return this.use.update_id + 1;
      },

      //当前url中update对应的_id
      router_id(){
        if(this.$route.name != "update_edit"){return;}
        if(this.update_id === null){return;}

        this.create_flag = false;
        this.edit_flag = false;

        let _id = parseInt(this.$route.params.id);
        if(_id > this.update_id || _id <= 0){
          this.$router.replace("/404");
          return;
        }

        else if(_id === this.update_id){
          this.create_flag = true;
          this.version = this.id_version(_id);
          this.date = get_date();
          this.markdown = "";
          return _id;
        }

        this.edit_flag = true;
        if(this.update.length != 0){
          let length = this.update.length;
          let update_obj = this.update[length - _id];
          this.version = update_obj.version;
          this.date = update_obj.date;
          this.markdown = update_obj.markdown;
        }
        return _id;
      },

      show_flag(){
        if(this.router_show != false && this.data_ready != false && this.update.length != 0){
          let name = this.$route.name;
          if(name !== "update_edit"){
            return false;
          }

          this.set_loading_show(false);
          return true;
        }else{
          return false;
        }
      },

    },


    methods: {
      ...mapMutations([
        "set_login_flag",
        "set_update",
        "set_loading_show",
        "set_use"
      ]),

      ...mapActions([
        "add_talk_word"
      ]),


      get_update_data(){
        if(this.update.length != 0){
          return;
        }
        get_update().then((res)=>{
          if(res.data.code != 0){
            console.log("服务器端获取update数据出现错误!");
            return;
          }
          let data = res.data.data.view;
          this.set_update(data);
        });
      },

      //markdown格式转html(列表)
      md_html(md){
        let md_array = md.split("\n");
        let ul = /^\*\s.*/;
        let flag = true;

        let html_array = [];
        md_array.forEach((value,index)=>{
          if(ul.test(value)){
            let html_str = `<li>${value.substr(2)}</li>`;
            html_array.push(html_str);
          }else{
            if(index < md_array.length - 1){
              flag = false;
            }else{
              if(value != "" && value != "*"){ flag = false; }
            }
          }
        });

        this.format_flag = flag;

        let html = html_array.join("");
        return html;
      },

      id_version(_id){
        let version_num = ((_id - 1) + 10)/10;
        let version = "V" + version_num
        if(version_num % 1 === 0){
          version = version + ".0";
        }
        return version;
      },

      commit_update_click(){
        if(this.format_flag === false){
          this.add_talk_word("输入格式有误,请以 '*+空格' 的markdown格式输入!");
          return;
        }
        this.active_button = "commit";
        this.yes_no_show = true;
      },

      commit_update(){
        this.yes_no_show = false;
        this.loading_flag = true;

        this.add_talk_word("提交中...");

        let update_json = {
          _id: this.router_id,
          version: this.version,
          date: this.date,
          markdown: this.markdown,
          content: this.html,
        };

        let timer_promise = new Promise((resolve)=>{
          setTimeout(()=>{resolve(0);},1500);
        });

        if(this.edit_flag === true){
          Promise.all([update_update(update_json),timer_promise])
            .then((res)=>{
              let code = res[0].data.code;
              let data = res[0].data.data;
              if(code === 0){
                this.loading_flag = false;
                this.active_button = false;

                this.set_update(data);

                this.add_talk_word(`编辑成功!版本号为${this.version}的更新日志已发生变更`);
                this.$router.push(`/update`);
              }
              else if(code === 1){
                this.loading_flag = false;
                this.active_button = false;

                this.add_talk_word("服务器端出现错误,保存失败!");
              }
            })
            .catch((err)=>{
              this.loading_flag = false;
              this.active_button = false;

              this.add_talk_word("axios请求出现错误,保存失败!");
              console.log(err);
            });
        }
        else if(this.create_flag === true){
          Promise.all([create_update(update_json),timer_promise])
            .then((res)=>{
              let code = res[0].data.code;
              let data = res[0].data.data;
              if(code === 0){
                this.loading_flag = false;
                this.active_button = false;

                this.set_update(data.update);
                this.set_use(data.use)

                this.add_talk_word(`提交成功!新增版本号为${this.version}的更新日志,版本升级到${this.version}`);
                this.$router.push(`/charge`);
              }
              else if(code === 1){
                this.loading_flag = false;
                this.active_button = false;

                this.add_talk_word("服务器端出现错误,保存失败!");
              }
            })
            .catch((err)=>{
              this.loading_flag = false;
              this.active_button = false;

              this.add_talk_word("axios请求出现错误,保存失败!");
              console.log(err);
            });
        }
      },

      cancel_commit_update(){
        this.active_button = false;
        this.yes_no_show = false;
      }
    },


    watch: {
      html(){
        if(this.$refs.html){
          this.$nextTick().then(()=>{
            let height = this.$refs.html.offsetHeight;
            this.textarea_height = height + "px";
          });
        }
      },

      format_flag(){
        if(this.format_flag === false){
          this.add_talk_word("输入格式有误,请以 '*+空格' 的markdown格式输入!");
        }
      },
    }

  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable.styl"

  .update_edit
    .update_edit_div
      box-shadow: $box-shadow
      box-sizing: border-box
      padding: 30px 30px 35px
      background: $color-1

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

      .edit
        padding-top: 1.5rem
        padding-left: 2rem
        box-shadow: $box-shadow-left
        font-family: monospace
        .version
          display: inline-block
          font-size: 2rem
          padding: 0.2rem 0.6rem
          margin-left: -0.6rem
          margin-bottom: 1.5rem
          box-shadow: $box-shadow-bottom
        textarea
          display: block
          background: transparent
          border: none
          outline: 0
          padding: 0
          resize: none
          box-sizing: border-box
          width: 100%
          min-height: 15rem
          font-size: 1.4rem
          line-height: 2.5rem
          font-family: inherit
          letter-spacing: 0.1rem
          word-wrap: break-word
          word-break: break-all
          transition: height 300ms
          &.wrong_format
            color: red

      .view
        position: relative
        margin-top: 4rem
        padding-left: 3rem
        padding-top: 2.5rem
        padding-bottom: 1rem
        box-shadow: $box-shadow-left
        &:before
          content: ""
          position: absolute
          top: 2.5rem
          left: 0
          height: 2.4rem
          width: 3rem
          box-shadow: $box-shadow-bottom
          transform: translateY(-51%)
        .head
          display: flex
          align-items: center
          .version
            display: inline-flex
            width: auto
            font-size: 2rem
            color: $color-black
            .version_circle
              width: 2rem
              height: 2rem
              border-radius: 50%
              margin-top: 0.05rem
              margin-right: 1rem
              background: $color-1
              box-shadow: $box-shadow
          .date
            font-size: 1.2rem
            margin-left: 2.5rem
            color: $color-grey
        .content
          margin-left: 1rem
          margin-top: -0.2rem
          padding: 0.5rem 0
          color: $color-text
          box-sizing: border-box
          min-height: 15rem
          >>>li
            position: relative
            display: flex
            font-size: 1.3rem
            margin-top: 1rem
            margin-left: 2rem
            word-wrap: break-word
            word-break: break-all
            letter-spacing: 0.05rem
            line-height: 2.4rem
            &:before
              content: ""
              flex-shrink: 0
              width: 1.3rem
              height: 1.3rem
              border-radius: 50%
              background: $color-1
              box-shadow: $box-shadow
              margin-right: 0.7rem
              margin-top: 0.4rem

      .update_icon
        position: absolute
        top: -1.8rem
        left: calc(50% - 2.2rem)
        font-size: 2.2rem
        &:before
          content: ""
          position: absolute
          z-index: 10
          width: 6.5rem
          height: 3rem
          top: 1.8rem
          background: $color-1
        i
          font-size: inherit
          cursor: default
          &:hover
            font-size: 2.3rem
            background: $color-1
            color: $color-3

      .commit
        position: absolute
        top: 9rem
        right: -1.8rem
        .yes-no
          position: absolute
          left: calc(50% - 6rem)
          width: 12rem
        .commit_icon
          position: relative
          z-index: 10
          margin-top: 2rem
          font-size: 1.8rem
          >i
            &.active
              background: $color-3
              color: $color-1
          &:before
            content: ""
            position: absolute
            z-index: 10
            width: 3rem
            height: 6.5rem
            right: 1.8rem
            background: $color-1



</style>
