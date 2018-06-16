<template>
  <div class="update">
    <transition name="router_icon">
      <div class="button_icon router_icon" v-show="show_flag">
        <i class="icon-update"></i>
      </div>
    </transition>
    <transition name="router">
      <div class="update_div router_div" v-show="show_flag">
        <ul class="update_ul">
          <li class="update_li" v-for = "item in update">
            <div class="head">
              <div class="version">
                <div class="version_circle">
                </div>
                {{item.version}}
              </div>
              <div class="date">
                <i class="icon-date"></i>
                {{item.date}}
              </div>
            </div>
            <ul class="content" v-html = "item.content">
            </ul>
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import {get_update} from "api/get.js";
  import {mapGetters,mapMutations} from "vuex";
  export default {

    name: "Update",

    computed: {

      ...mapGetters([
        "update",
        "router_show"
      ]),

      show_flag(){
        if(this.router_show === 'update' && this.update.length != 0){
          this.set_loading_show(false);
          return true;
        }else{
          return false;
        }
      },

    },

    created(){
      this.get_data();
    },

    methods: {

      ...mapMutations([
        "set_update",
        "set_loading_show"
      ]),

      get_data(){
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

    },

  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable.styl"

  .update
    .update_div
      padding-top: 3rem
      .update_ul
        .update_li
          position: relative
          margin-top: 4rem
          &:before
            content: ""
            position: absolute
            top: 0
            left: -3rem
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
        .update_li:nth-of-type(1)
          margin-top: 0

</style>
