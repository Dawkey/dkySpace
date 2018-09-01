<template>

  <div class="archive">
    <transition name="router_icon">
      <div class="button_icon  router_icon" v-show="show_flag">
        <i class="icon-archive"></i>
      </div>
    </transition>
    <transition name="router">
      <div class="archive_div router_div" v-show="show_flag">
        <ul class="archive_ul" v-for = "ul_item in archive_name">
          <li class="year">
            <div class="year_circle">
            </div>
            {{ul_item}}
          </li>
          <li class="archive_li" v-for = "li_item in archive[ul_item]" @click="to_article(li_item._id)">
            <div class="archive_li_hover">
              <div class="date">
                <div class="date_circle">
                </div>
                <span class="date_pc">{{li_item.date}}</span>
                <span class="date_mobile">{{li_item.date_mobile}}</span>
              </div>
              <div class="line">
              </div>
              <div class="title">
                {{li_item.title}}
              </div>
            </div>
          </li>
        </ul>
      </div>
    </transition>
  </div>

</template>

<script type="text/ecmascript-6">
  import {mapGetters} from "vuex";
  import {common_data} from "common/js/mixin.js";
  export default {
    name: "Archive",

    mixins: [common_data],

    computed: {
      ...mapGetters([
        "archive_name",
        "archive",
      ]),
      show_flag(){
        if(this.router_show === 'archive' && this.data_ready){
          this.set_loading_show(false);
          return true;
        }else{
          return false;
        }
      }
    },


  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable.styl"


  .archive
    .archive_div
      position: relative
      padding-top: 3rem
      padding-bottom: 1.5rem
      .archive_ul
        position: relative
        margin-top: 3.5rem
        &:before
          content: ""
          position: absolute
          top: 0
          left: -3rem
          height: 2.4rem
          width: 3rem
          box-shadow: $box-shadow-bottom
          transform: translateY(-51%)
        .year
          display: inline-flex
          width: auto
          font-size: 2rem
          color: $color-black
          .year_circle
            width: 2rem
            height: 2rem
            border-radius: 50%
            margin-top: 0.05rem
            margin-right: 1rem
            background: $color-1
            box-shadow: $box-shadow
        .archive_li
          position: relative
          display: flex
          margin: 1.5rem 0
          &:before
            content: ""
            position: absolute
            top: -1.8rem
            left: 0.3rem
            height: 1.8rem
            width: 1.4rem
            box-shadow: $box-shadow-left
            transform: translateX(51%)
            cursor: auto
          .archive_li_hover
            display: flex
            width: 100%
            cursor: pointer
            color: $color-grey
            &:hover
              color: $color-black
              .line
                margin: 0 0.5rem
                box-shadow: 0 0.5rem 0.5rem -0.5rem $color-black
              .date
                .date_circle
                  background: $color-3-o
            .date
              flex-shrink: 0
              display: flex
              font-size: 1.4rem
              line-height: 1.8rem
              .date_circle
                width: 1.4rem
                height: 1.4rem
                border-radius: 50%
                margin: 0 1.3rem 0 0.3rem
                margin-top: 0.05rem
                background: $color-1
                box-shadow: $box-shadow
              .date_pc
                display: inline
              .date_mobile
                display: none
            .line
              margin: 0 1.5rem
              width: 100%
              transform: translateY(-51%)
              transition: width 300ms , margin 300ms
              box-shadow: $box-shadow-bottom
            .title
              flex-shrink: 0
              width: 26.5rem
              font-size: 1.5rem
              line-height: 1.8rem
              white-space: nowrap
              text-overflow: ellipsis
              overflow: hidden
      .archive_ul:nth-of-type(1)
        margin-top: 0

  @media (max-width: $max-width-2)
    .archive
      width: calc(100% + 1.3rem)
      .archive_div
        padding-left: 2rem
        padding-right: 0
        .archive_ul
          &:before
            left: -2rem
            width: 2rem
          .year
            .year_circle
              margin-right: 0.5rem
          .archive_li
            .archive_li_hover
              .date
                .date_circle
                  margin-right: 0.8rem
                .date_pc
                  display: none
                .date_mobile
                  display: inline    
              .line
                margin: 0
              .title
                width: 50%

</style>
