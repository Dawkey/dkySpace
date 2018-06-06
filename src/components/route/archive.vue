<template>
  <div class="archive">
    <div class="icon">
      <i class="button_icon icon-archive"></i>
    </div>
    <div class="archive_div">
      <ul class="archive_ul" v-for = "ul_item in archive_name">
        <li class="year">
          <div class="year_circle">

          </div>
          {{ul_item}}
        </li>
        <li class="archive_li" v-for = "li_item in archive[ul_item]">
          <div class="archive_li_hover">
            <div class="date">
              <div class="date_circle">

              </div>
              {{li_item.date}}
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
        "archive"
      ]),
    },

  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable.styl"

  .archive
    position: relative
    padding: 1.5rem 3rem 3rem 3rem
    box-shadow: $box-shadow-left
    transform: translateY(4.2rem)
    .icon
      position: absolute
      top: -4.2rem
      left: 0
      transform: translateX(-50%)
      i
        margin: 0
    .archive_div
      .archive_ul
        position: relative
        margin-bottom: 3.5rem
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
            cursor: pointer
            color: $color-grey
            &:hover
              color: $color-black
              .line
                box-shadow: 0 0.5rem 0.5rem -0.5rem $color-black
              .date
                .date_circle
                  background: $color-3-o
            .date
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
            .line
              margin: 0 0.7rem
              width: 36rem
              transform: translateY(-51%)
              box-shadow: $box-shadow-bottom
            .title
              max-width: 26.5rem
              font-size: 1.5rem
              line-height: 1.8rem

</style>
