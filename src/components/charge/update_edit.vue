<template>
  <div class="update_edit">

    <transition name="router">
      <div class="update_edit_div" v-show="show_flag">

        <div class="write_icon">
          <i class="icon-update"></i>
        </div>

        <div class="edit">
          <div class="version">
            V1.6
          </div>
          <textarea type="text" name="edit" placeholder="内容" spellcheck="false">
          </textarea>
        </div>

        <div class="view">
          <div class="head">
            <div class="version">
              <div class="version_circle">
              </div>
              V1.6
            </div>
            <div class="date">
              <i class="icon-date"></i>
              2018/07/25/20:42:56
            </div>
          </div>
          <ul class="content">
            <li>aaaa</li>
            <li>bbbb</li>
            <li>cccc</li>
          </ul>
        </div>

      </div>
    </transition>

  </div>
</template>

<script type="text/ecmascript-6">
  import {mapGetters,mapMutations} from "vuex";
  import {common_data} from "common/js/mixin.js";

  import {get_update} from "api/get.js"
  import {create_update} from "api/post.js"
  export default {
    name: "update_edit",

    mixins: [common_data],

    data(){
      return {
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

        let _id = parseInt(this.$route.params.id);
        if(_id > this.draft_id || _id <= 0){
          this.$router.replace("/404");
          return;
        }

        else if(_id === this.update_id){
          this.create_flag = true;
          return _id;
        }

        this.edit_flag = true;
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
        "set_loading_show"
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
    },

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
          line-height: 2rem
          font-family: inherit
          letter-spacing: 0.1rem
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
          >>>li
            position: relative
            display: flex
            align-items: center
            font-size: 1.3rem
            margin-top: 1rem
            margin-left: 2rem
            height: 2rem
            &:before
              content: ""
              width: 1.3rem
              height: 1.3rem
              border-radius: 50%
              background: $color-1
              box-shadow: $box-shadow
              margin-right: 0.7rem

      .write_icon
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


</style>
