<template>
  <div class="charge">
    <transition name="router">
      <div class="charge_div" v-show="show_flag">

        <charge-ul class="draft_charge"
          :comp = "'draft'"
          :comp_main = "draft_main"
          :remove_comp = "remove_draft"
          :set_comp_main = "set_draft_main"
          :loading_flag = "loading_flag"
          :current_comp = "current_comp"
          :next_id = "draft_id"
          @set_loading_flag = "set_loading_flag"
          @set_current_comp = "set_current_comp"
        >
        </charge-ul>

        <charge-ul class="article_charge"
          :comp = "'article'"
          :comp_main = "main"
          :remove_comp = "remove_article"
          :set_comp_main = "set_main"
          :loading_flag = "loading_flag"
          :current_comp = "current_comp"
          :next_id = "draft_id"
          @set_loading_flag = "set_loading_flag"
          @set_current_comp = "set_current_comp"
        >
        </charge-ul>

        <charge-ul class="update_charge"
          :comp = "'update'"
          :comp_main = "update"
          :remove_comp = "remove_update"
          :set_comp_main = "set_update"
          :loading_flag = "loading_flag"
          :current_comp = "current_comp"
          :next_id = "update_id"
          @set_loading_flag = "set_loading_flag"
          @set_current_comp = "set_current_comp"
        >
        </charge-ul>

        <keyword-charge></keyword-charge>

      </div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import {get_update} from "api/get.js";
  import {remove_draft,remove_article,remove_update} from "api/post.js";
  import {mapGetters,mapMutations,mapActions} from "vuex";
  import {common_data,common_draft} from "common/js/mixin.js";
  import ChargeUl from "./charge_ul/charge_ul.vue";
  import KeywordCharge from "./keyword_charge/keyword_charge.vue";
  export default {
    name: "Charge",


    components: {ChargeUl,KeywordCharge},


    mixins: [common_data,common_draft],


    created(){
      this.set_login_flag(true);
      this.get_update_data();
    },


    data(){
      return {
        loading_flag: false,
        current_comp: "draft",
        talk_time: 0,
      }
    },


    computed: {

      ...mapGetters([
        "update",
        "token_status"
      ]),

      show_flag(){
        if(this.router_show === 'charge'
          && this.main.length != 0
          && this.update.length != 0
          && this.draft_flag === true
        ){
          this.set_loading_show(false);
          return true;
        }else{
          return false;
        }
      },

      update_id(){
        if(this.use === null){
          return null;
        }
        return this.use.update_id + 1;
      },

    },


    methods: {
      ...mapMutations([
        "set_update",
        "set_main",
        "set_login_flag",
        "set_loading_show",
      ]),

      ...mapActions([
        "add_talk_word",
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

      set_loading_flag(bool){
        this.loading_flag = bool;
      },

      set_current_comp(str){
        this.current_comp = str;
      },

      remove_draft(json){
        return remove_draft(json);
      },

      remove_article(json){
        return remove_article(json);
      },

      remove_update(json){
        return remove_update(json);
      },

    },


    watch: {
      show_flag(){
        if(this.talk_time !== 0){
          return;
        }
        if(this.show_flag === true){
          let hour = new Date().getHours();
          let time = "";
          if(6 <= hour && hour < 11){
            time = "早上好";
          }else if(11 <= hour && hour < 13){
            time = "中午好";
          }else if(13 <= hour && hour < 18){
            time = "下午好";
          }else if(18 <= hour && hour < 24){
            time = "晚上好";
          }else if(0 <= hour && hour < 6){
            time = "午夜了,早点休息"
          }
          this.talk_time = this.talk_time + 1;
          if(this.token_status === "token_no"){
            this.add_talk_word(`${time},visitor~欢迎访问dkySpace's charge,你拥有`+
              `查看博客数据的权限,没有修改,添加,发布的权限哦~`);
          }
          else if(this.token_status === "token_expire"){
            this.add_talk_word("当前token已过期,请重新登录以更新token,Dawkey~");
          }
          else if(this.token_status === "token_right"){
            this.add_talk_word(`${time},Dawkey~`);
          }
        }
      },
    },
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable.styl"
  .charge_div
    padding: 0
    box-shadow: none
    font-size: 1.4rem
    .article_charge
      margin-top: 6rem
    .update_charge
      margin-top: 6rem
  @media(max-width: 1024px)
    .charge
      width: calc(100vw - 19rem)
      margin: auto
  @media(max-width: $max-width-2)
    .charge
      width: calc(100% + 4rem)
      margin-left: -2rem

</style>
