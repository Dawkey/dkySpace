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
          :draft_id = "draft_id"
          @set_loading_flag = "set_loading_flag"
        >
        </charge-ul>

        <charge-ul class="article_charge"
          :comp = "'article'"
          :comp_main = "main"
          :remove_comp = "remove_article"
          :set_comp_main = "set_main"
          :loading_flag = "loading_flag"
          :draft_id = "draft_id"
          @set_loading_flag = "set_loading_flag"
        >
        </charge-ul>

        <!-- <div class="update_charge">
          <ul>
            <div class="button_icon">
              <i class="icon-update"></i>
            </div>
            <div class="write_icon">
              <i class="icon-write"
                 :class="{disable: loading_flag !== false}"
              ></i>
            </div>
            <li class="ul_head">
              <div class="version">版本号</div>
              <div class="date">日期</div>
            </li>
            <li v-for = "item in update">
              <div class="version">{{item.version}}</div>
              <div class="date">{{item.date}}</div>
              <div class="icon_div">
                <i class="icon-write"
                   :class="{disable: loading_flag !== false}"
                ></i>
                <i class="icon-delete"
                   :class="{disable: loading_flag !== false}"
                ></i>
              </div>
            </li>
          </ul>
        </div> -->

      </div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import {get_update} from "api/get.js";
  import {remove_draft,remove_article} from "api/post.js";
  import {mapGetters,mapMutations,mapActions} from "vuex";
  import {common_data,common_draft} from "common/js/mixin.js";
  import ChargeUl from "./charge_ul/charge_ul.vue";
  export default {
    name: "Charge",


    components: {ChargeUl},


    mixins: [common_data,common_draft],


    created(){
      this.set_login_flag(true);
      this.get_update_data();
    },


    data(){
      return {
        loading_flag: false,
      }
    },


    computed: {

      ...mapGetters([
        "update",
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

    },


    methods: {
      ...mapMutations([
        "set_update",
        "set_main",
        "set_login_flag",
        "set_loading_show",
      ]),

      get_update_data(){
        if(this.update.length != 0){
          return;
        }
        get_update().then((res)=>{
          if(res.data.code != 0){
            console.log("服务器端获取数据出现错误,Dawkey!");
            return;
          }
          let data = res.data.data.view;
          this.set_update(data);
        });
      },

      set_loading_flag(bool){
        this.loading_flag = bool;
      },

      remove_draft(json){
        return remove_draft(json);
      },

      remove_article(json){
        return remove_article(json);
      }

    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable.styl"
  .charge_div
    margin: 0
    padding: 0
    box-shadow: none
    font-size: 1.4rem
    // font-family: monospace
    .article_charge
      margin-top: 6rem
    // .update_charge
    //   margin-top: 6rem
    //   padding: 2rem 2rem
    //   border-radius: 0.3rem
    //   box-shadow: $box-shadow
    //   background-color: $color-1
    //   .version
    //     width: 65%
    //   .date
    //     width: 21%
</style>
