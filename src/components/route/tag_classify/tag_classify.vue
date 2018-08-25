<template>
  <div class="prop">
    <transition name="router_icon">
      <div class="button_icon router_icon" v-show="show_flag">
        <i :class="icon_name"></i>
      </div>
    </transition>
    <transition name="router">
      <div class="prop_div router_div" v-show="show_flag">
        <ul class="prop_names" :class="{small_size: component_name === 'classify'}">
          <li
            v-for = "item in prop_name"
            @click = "prop_name_click(item)"
            :class = "{active_prop: (item === name)}"
          >
            <div class="prop_name">
              {{item}}
            </div>
            <div class="prop_num">
              ({{prop[item].length}})
            </div>
          </li>
        </ul>

        <ul class="prop_articles" :style="{height: prop_articles_height}">
          <!-- 这里先检测data_ready,以判断数据是否处理好,如果过处理好才判断,数组长度 -->
          <li class="nothing_li" v-if = "data_ready && prop[name].length === 0">
            <div class="title">
              空空如也
            </div>
            <div class="line">
            </div>
            <div class="date">
              (´･ᴗ･`)
            </div>
          </li>
          <li v-for = "item in prop[name]" @click="to_article(item._id)">
            <div class="title">
              {{item.title}}
            </div>
            <div class="line">
            </div>
            <div class="date">
              {{item.date}}
            </div>
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import {common_data} from "common/js/mixin.js";
  export default {
    name: "prop",

    data(){
      return {
        name: "",
      }
    },

    props: {
      component_name: {
        type: String,
        default: "tag"
      }
    },

    mixins: [common_data],

    created(){
      //
    },

    computed: {

      icon_name(){
        return `icon-${this.component_name}`;
      },

      prop(){
        return this.$store.getters[this.component_name];
      },

      prop_name(){
        return this.$store.getters[`${this.component_name}_name`];
      },

      prop_articles_height(){
        if(this.prop_name.length === 0){
          return 0;
        }
        if(this.name === ""){
          this.name = this.prop_name[0];
        }
        let length = this.prop[this.name].length;
        length = length === 0 ? 1 : length;
        let height = (length * 35 - 15)*0.1;
        return `${height}rem`;
      },

      show_flag(){
        if(this.router_show === this.component_name && this.data_ready){
          this.set_loading_show(false);
          return true;
        }else{
          return false;
        }
      }

    },

    methods: {
      prop_name_click(item){
        this.name = item;
      }
    },

  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable.styl"

  .prop
    .prop_div
      .prop_names
        display: flex
        flex-wrap: wrap
        font-size: 3rem
        color: $color-grey
        &.small_size
          font-size: 2.8rem
        >li
          display: flex
          position: relative
          padding: 0 0.5rem
          margin: 0.5rem 2.5rem 2rem 0
          cursor: pointer
          &:before
            content: ""
            position: absolute
            top: 0
            left: 0
            height: 100%
            width: 100%
            box-shadow: $box-shadow-bottom
            transform-origin: 100% 0
            transform: scaleX(0)
            transition: transform 0.4s
          &:hover::before
            transform: scaleX(1)
            transform-origin: 0 0
          &.active_prop
            &:before
              transform: scaleX(1)
              transform-origin: 0 0
          .prop_num
            display: flex
            flex-direction: column-reverse
            margin-bottom: 0.5rem
            margin-left: 0.1rem
            font-size: 1.7rem
      .prop_articles
        height: 0
        margin-top: 1.5rem
        padding: 0 0.5rem
        color: $color-grey
        overflow: hidden
        transition: height 0.4s
        >li
          display: flex
          font-size: 1.5rem
          line-height: 2rem
          height: 2rem
          margin-bottom: 1.5rem
          cursor: pointer
          &:hover
            color: $color-black
            .line
              margin: 0 0.5rem
              box-shadow: 0 0.5rem 0.5rem -0.5rem $color-black
          .title
            flex-shrink: 0
          .line
            width: 100%
            margin: 0 1.5rem
            transition: margin 300ms
            transform: translateY(-51%)
            box-shadow: $box-shadow-bottom
          .date
            flex-shrink: 0

  @media (max-width: $max-width-1)
    .prop
      padding-bottom: 1.5rem
      transform: translateY(2rem)
      .icon
        display: none

</style>
