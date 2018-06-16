<template>
  <div class="charge">
    <transition name="router">
      <div class="charge_div" v-show="show_flag">
        <div class="article_charge">
          <ul>
            <div class="button_icon">
              <i class="icon-archive"></i>
            </div>
            <div class="write_icon">
              <i class="icon-write" @click="to_write"></i>
            </div>
            <li class="ul_head">
              <div class="title">标题</div>
              <div class="classify">分类<i class="icon-add"></i></div>
              <div class="tag">标签<i class="icon-add"></i></div>
              <div class="date">日期</div>
            </li>
            <li v-for = "item in main">
              <div class="title">{{item.title}}</div>
              <div class="classify">{{item.classify}}</div>
              <div class="tag">{{item.tag}}</div>
              <div class="date">{{item.date}}</div>
              <div class="icon_div">
                <i class="icon-write"></i>
                <i class="icon-delete"></i>
              </div>
            </li>
          </ul>
        </div>
        <div class="update_charge">
          <ul>
            <div class="button_icon">
              <i class="icon-update"></i>
            </div>
            <div class="write_icon">
              <i class="icon-write"></i>
            </div>
            <li class="ul_head">
              <div class="version">版本号</div>
              <div class="date">日期</div>
            </li>
            <li v-for = "item in update">
              <div class="version">{{item.version}}</div>
              <div class="date">{{item.date}}</div>
              <div class="icon_div">
                <i class="icon-write"></i>
                <i class="icon-delete"></i>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import {get_update} from "api/get.js";
  import {mapGetters,mapMutations} from "vuex";
  import {common_data} from "common/js/mixin.js";
  export default {

    name: "Charge",

    mixins: [common_data],

    computed: {
      ...mapGetters([
        "main",
        "update",
        "router_show"
      ]),
      show_flag(){
        if(this.router_show === 'charge'
          && this.main.length != 0
          && this.update.length != 0
        ){
          this.set_loading_show(false);
          return true;
        }else{
          return false;
        }
      },
    },

    created(){
      this.set_login_flag(true);
      this.get_data();
    },

    methods: {
      ...mapMutations([
        "set_update",
        "set_login_flag",
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

      to_write(){
        this.$router.push("/write");
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
    ul
      position: relative
      li
        display: flex
        line-height: 3.2rem
        padding: 0 0.8rem
        &:nth-of-type(2n-1)
          background: rgba(96,126,121,0.28)
        &:nth-of-type(2n)
          background: rgba(96,126,121,0.37)
        &:hover
          background: rgba(96,126,121,0.55)
        &.ul_head
          background: transparent
          color: $color-3
          line-height: 2.8rem
          padding-top: 0.7rem
          &:hover
            background: transparent
          >div
            display: flex
            align-items: center
            i
              font-size: 1.3rem
              color: rgba(96,126,121,0.9)
              margin-left: 0.2rem
              cursor: pointer
              &:hover
                font-size: 1.4rem
                color: $color-3
        .icon_div
          display: flex
          height: 3.2rem
          align-items: center
          i
            font-size: 1.7rem
            color: rgba(96,126,121,0.9)
            margin-left: 3.2rem
            cursor: pointer
            &:hover
              font-size: 1.8rem
              margin-left: 3.1rem
              color: $color-black

      .button_icon
        position: absolute
        top: -3.8rem
        left: 0
        color: $color-3
        box-shadow: $box-shadow
        cursor: default
        i
          position: relative
          z-index: 11
        &:hover
          background: $color-1
        &:before
          content: ""
          position: absolute
          z-index: 10
          width: 6.5rem
          height: 3rem
          top: 1.8rem
          background: $color-1
      .write_icon
        position: absolute
        top: -3.8rem
        right: 0
        &:before
          content: ""
          position: absolute
          z-index: 10
          width: 6.5rem
          height: 3rem
          top: 1.8rem
          background: $color-1
    .article_charge
      padding: 2rem 2rem
      border-radius: 0.3rem
      box-shadow: $box-shadow
      background-color: $color-1
      .title
        width: 40%
      .classify
        width: 10%
      .tag
        width: 15%
      .date
        width: 21%
    .update_charge
      margin-top: 6rem
      padding: 2rem 2rem
      border-radius: 0.3rem
      box-shadow: $box-shadow
      background-color: $color-1
      .version
        width: 65%
      .date
        width: 21%
</style>
