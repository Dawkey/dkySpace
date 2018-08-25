<template>
  <transition name="kcharge">
    <div class="kcharge" v-show="this.kcharge_flag !== false">

      <div class="kcharge_div">
        <i class="icon" :class="`icon-${keyword}`"></i>

        <div class="close">
          <i class="icon-fork" @click="close_click"></i>
        </div>

        <ul class="keys">
          <li class="key"
              v-for="(item,index) in key_name"
              :class="{active_key: active_index === index}">
            {{item}}
            <span>({{key[item].length}})</span>
            <div class="fork" @click="delete_click(item,index)" :class="{frozen: loading_flag}">
              <i class="icon-fork"></i>
            </div>
          </li>
        </ul>

        <div class="key_input">
          <input v-model="new_key" type="text" name="new_key" spellcheck="false">
          <div class="commit" @click="commit_click" :class="{frozen: loading_flag}">
            Commit
          </div>
        </div>

        <yes-no class="yes-no"
          :father = "'write'"
          :top = "'auto'"
          :show_flag = "yes_no_show"
          :loading_flag = "loading_flag"
          @yes = "delete_key"
          @no = "delete_key_cancel"
          @mouseenter.native = "yes_no_enter"
          @mouseleave.native = "yes_no_leave"
        >
        </yes-no>

        <div class="yes-no-icon-div" v-show = "icon_div_show">
          <transition name="yes-no-icon">
            <div class="yes-no-icon" v-show = "yes_no_show && icon_show">
              <i class="icon-delete"></i>
              <span>?</span>
            </div>
          </transition>
        </div>

      </div>

    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import {mapGetters,mapMutations,mapActions} from "vuex";
  import YesNo from "../yes_no/yes_no.vue";
  import {update_tag,update_classify} from "api/post.js";
  export default {
    name: "KeywordCharge",


    components: {YesNo},


    data(){
      return{
        keyword: "",
        keyword_ch: "",
        key_name: [],
        key: {},
        update_key: null,
        add_keyword_key: null,
        set_key_name: null,

        new_key: "",

        yes_no_show: false,
        loading_flag: false,
        icon_show: true,
        icon_div_show: true,
        icon_timer: null,
        active_index: false,

        kcharge_timer: null,
      }
    },


    computed: {
      ...mapGetters([
        "tag_name",
        "tag",
        "classify_name",
        "classify",
        "kcharge_flag",
      ]),
    },


    methods: {
      ...mapMutations([
        "set_kcharge_flag",
        "add_tag_key",
        "set_tag_name",
        "add_classify_key",
        "set_classify_name",
      ]),

      ...mapActions([
        "add_talk_word",
      ]),

      commit_click(){
        if(this.loading_flag){
          return;
        }
        let new_key = this.new_key.trim();
        if(new_key === ""){
          this.add_talk_word("输入框不能为空!");
          return;
        }

        let flag = this.key_name.some((value)=>{
          if(new_key === value){
            this.add_talk_word(`输入的${this.keyword_ch}已存在!`);
            return true;
          }
        });

        if(!flag){
          this.add_talk_word("提交中...");
          this.loading_flag = true;

          let new_key_name = this.key_name.slice();
          new_key_name.push(new_key);

          let timer_promise = new Promise((resolve)=>{
            setTimeout(()=>{resolve(0);},1500);
          });
          Promise.all([this.update_key({[this.keyword]: new_key_name}),timer_promise])
            .then((res)=>{
              let code = res[0].data.code;
              if(code === 0){
                this.add_keyword_key(new_key);
                this.set_key_name(new_key_name);
                this.add_talk_word(`提交成功!已新增一个${this.keyword_ch},${this.keyword_ch}名为'${new_key}'`);
                this.new_key = "";
                this.key_name = new_key_name;
                this.loading_flag = false;
              }
            });
        }

      },

      delete_click(item,index){
        if(this.loading_flag){
          return;
        }
        if(this.key[item].length !== 0){
          this.add_talk_word(`${this.keyword_ch}'${item}'下还存在博客,无法将其删除!`);
          return;
        }
        clearTimeout(this.kcharge_timer);
        this.icon_show = true;
        if(this.yes_no_show){
          clearTimeout(this.icon_timer);
          this.icon_show = false;
          this.icon_timer = setTimeout(()=>{this.icon_show = true;},400);
        }
        this.yes_no_show = true;
        this.active_index = index;
        this.kcharge_timer = setTimeout(()=>{
          this.yes_no_show = false;
          this.active_index = false;
        },4000);
      },

      delete_key(){
        if(this.loading_flag){
          return;
        }
        let index = this.active_index;
        let active_key = this.key_name[index];

        this.add_talk_word("删除中...");
        this.yes_no_show = false;
        this.loading_flag = true;
        this.icon_div_show = false;

        let new_key_name = this.key_name.slice();
        new_key_name.splice(index,1);

        let timer_promise = new Promise((resolve)=>{
          setTimeout(()=>{resolve(0);},1500);
        });
        Promise.all([this.update_key({[this.keyword]: new_key_name}),timer_promise])
          .then((res)=>{
            let code = res[0].data.code;
            if(code === 0){
              this.set_key_name(new_key_name);
              this.add_talk_word(`删除成功!已删除${this.keyword_ch}名为'${active_key}'的${this.keyword_ch}`);
              this.active_index = false;
              this.loading_flag = false;
              this.icon_div_show = true;
              this.key_name = new_key_name;
            }
          });
      },

      delete_key_cancel(){
        clearTimeout(this.kcharge_timer);
        this.yes_no_show = false;
        this.active_index = false;
      },

      close_click(){
        this.set_kcharge_flag(false);
      },

      yes_no_enter(){
        if(this.yes_no_show === false){
          return;
        }

        clearTimeout(this.kcharge_timer);
      },

      yes_no_leave(){
        if(this.yes_no_show === false){
          return;
        }

        this.kcharge_timer = setTimeout(()=>{
          this.yes_no_show = false;
          this.active_index = false;
        },4000);
      },

    },

    watch: {
      kcharge_flag(){
        let flag = this.kcharge_flag;
        if(flag === "tag"){
          this.keyword = "tag";
          this.keyword_ch = "标签";
          this.key_name = this.tag_name;
          this.key = this.tag;
          this.update_key = update_tag;
          this.add_keyword_key = this.add_tag_key;
          this.set_key_name = this.set_tag_name;
        }
        else if(flag === "classify"){
          this.keyword = "classify"
          this.keyword_ch = "分类";
          this.key_name = this.classify_name;
          this.key = this.classify;
          this.update_key = update_classify;
          this.add_keyword_key = this.add_classify_key;
          this.set_key_name = this.set_classify_name;
        }
      },

      $route(){
        if(this.$route.name != "charge" && this.kcharge_flag != false){
          this.set_kcharge_flag(false);
        }
      },
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
    font-family: Georgia
    // display: none

    .kcharge_div
      position: relative
      display: flex
      align-items: center
      flex-direction: column
      max-width: 88rem
      padding-bottom: 2rem

      .icon
        color: $color-2-o
        font-size: 2.2rem
        margin-bottom: 1.5rem

      .close
        position: absolute
        top: -4rem
        right: -1.5rem
        i
          font-size: 2.5rem
          color: $color-2-o
          cursor: pointer
          &:hover
            color: $color-2
            font-size: 2.6rem

      .keys
        display: flex
        flex-wrap: wrap
        justify-content: center
        .key
          position: relative
          margin: 0 1.5rem
          margin-top: 1.5rem
          font-size: 2rem
          font-family: Georgia
          color: $color-2-o
          padding-top: 1.5rem
          cursor: pointer
          span
            font-size: 1.3rem
            font-family: $normal_font
          .fork
            position: absolute
            top: 0
            right: -1rem
            cursor: pointer
            transform: scaleX(0)
            transition: transform 0.4s
            i
              font-size: 1.2rem
              &:hover
                font-size: 1.3rem
                color: $color-2
            &.frozen
              color: rgba(220,220,220,0.8)
              i
                &:hover
                  font-size: 1.2rem
                  color: rgba(220,220,220,0.8)
          &:hover
            .fork
              transform: scaleX(1)
          &.active_key
            .fork
              transform: scaleX(1)

      .key_input
        display: flex
        margin-top: 5rem
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
          &.frozen
            background: rgba(220,220,220,0.8)
            &:hover
              background: rgba(220,220,220,0.8)

      .yes-no
        position: absolute
        bottom: -4rem
        width: 13rem
        >>>.yes_no_div
          .yes_div,.no_div
            color: rgba(96, 126, 121,0.92)
            background: $color-2-o
            box-shadow: none
            &:hover
              font-size: 1.8rem
              background: $color-2
              color: $color-3
              .icon-no
                font-size: 1.4rem
            i
              &:hover
                background: transparent
                color: inherit
          .line
            box-shadow: none
            border-bottom: 1px solid $color-2-o
            transform: none
            margin-top: -1.9rem
        >>>.loading
          transform: translateX(0)
          width: 4.5rem
          height: 4.5rem
          .loading-1,.loading-2,.loading-3,.loading-4
            background: #fff
            filter: drop-shadow(0 0 1px #fff)

      .yes-no-icon-div
        position: absolute
        bottom: -3.1rem
        .yes-no-icon
          color: $color-2-o
          display: flex
          align-items: center
          i
            font-size: 1.8rem
          span
            font-size: 1.7rem
            margin-left: 0.3rem
            cursor: default
        .yes-no-icon-enter
          transform: scaleX(0)
        .yes-no-icon-enter-to
          transform: scaleX(1)
        .yes-no-icon-enter-active
          transition: transform 400ms
        .yes-no-icon-leave-to
          transform: scaleX(0)
        .yes-no-icon-leave-active
          transition: transform 400ms


  .kcharge-enter
    transform: scaleY(0)
    opacity: 0
  .kcharge-enter-to
    transform: scaleY(1)
    opacity: 1
  .kcharge-enter-active
    transition: all 400ms
  .kcharge-leave-to
    transform: scaleY(0)
    opacity: 0
  .kcharge-leave-active
    transition: all 400ms

</style>
