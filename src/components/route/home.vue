<template>
  <div class="home">

    <!-- <div class="update_diary">
      <a class="update home_a">
        <div class="head">
          <div class="title">
            Update Log
          </div>
          <i class="icon-update"></i>
        </div>
        <div class="body">
          Blog
          <span>V1.5</span>
        </div>
      </a>
      <a class="diary home_a">
        <div class="head">
          <i class="icon-diary"></i>
        </div>
        <div class="body">
          Diary
          <span>(22)</span>
        </div>
      </a>
    </div> -->

    <ul class="home_ul">
      <li v-for = "item in main">
        <a class="home_a">
          <div class="head">
            <div class="title">
              {{item.title}}
            </div>
            <div class="date">
              <i class="icon-data"></i>
              {{item.date}}
            </div>
          </div>
          <div class="body">
            <div class="tag_classify">
              <div class="tag">
                <i class="icon-tag"></i>
                {{item.tag}}
              </div>
              <div class="classify">
                <i class="icon-classify"></i>
                {{item.classify}}
              </div>
            </div>
            <div class="description">
              <p v-html = "item.description"></p>
            </div>
          </div>
        </a>
      </li>
    </ul>

  </div>
</template>

<script type="text/ecmascript-6">
  import {mapGetters} from "vuex";
  import {common_data} from "common/js/mixin.js";
  export default {

    name: "Home",

    mixins: [common_data],

    computed: {
      ...mapGetters([
        "main"
      ]),
    },

  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable.styl"

  .home

    .home_a
      background: $color-1
      border-radius: 0.3rem
      box-shadow: $box-shadow
      width: 100%
      cursor: pointer
      &:hover
        background: $color-3-o
      .head
        display: flex
        align-items: center
        justify-content: space-between
        height: 4.5rem
        padding: 0 2.5rem
        box-shadow: $box-shadow-bottom
        .title
          font-size: 1.9rem
          color: $color-black
          width: 100%
          white-space: nowrap
          text-overflow: ellipsis
          overflow: hidden
    .update_diary
      display: flex
      justify-content: space-between
      i
        font-size: 2.2rem
      .update,.diary
        height: 33rem
      .update
        width: 55%
      .diary
        width: 42%
        .head
          flex-direction: row-reverse
          i
            font-size: 1.9rem
        .body
          font-size: 7rem
          span
            margin-left: -1.4rem
      .body
        display: flex
        align-items: center
        justify-content: center
        height: 22rem
        font-size: 8rem
        font-family: Georgia
        color: #888
        span
          display: inline-block
          font-size: 2.4rem
          padding-top: 6.6rem
          padding-left: 1rem
    .home_ul
      i
        color: $color-grey
      >li
        margin-top: 4rem
        .home_a
          .head
            .date
              color: $color-grey
              display: flex
              align-items: center
              font-size: 1.2rem
              margin-left: 1rem
              flex-shrink: 0
              i
                margin-right: 0.5rem
                padding-bottom: 0.2rem
          .body
            padding: 0 2.5rem
            i
              margin-right: 0.5rem
            .tag_classify
              display: flex
              color: $color-grey
              .tag,.classify
                height: 2.4rem
                display: flex
                align-items: center
              .tag
                font-size: 1.3rem
                padding-right: 1rem
              .classify
                font-size: 1.2rem
                padding-left: 1rem
                box-shadow: $box-shadow-left
            .description
              display: flex
              height: 7.8rem
              align-items: center
              box-sizing: border-box
              padding-bottom: 0.8rem
              p
                max-height: 6rem
                font-size: 1.4rem
                line-height: 3rem
                margin: 0
                letter-spacing: 0.1rem
                color: $color-grey
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                overflow: hidden;
                text-overflow: ellipsis


  @media (max-width: $max-width-2)
    .home
      .update_diary
        display: none
      .home_ul
        >li
          margin-top: 1rem
          .home_a
            .head
              padding: 0 1.5rem
              .title
                font-size: 1.7rem
              .date
                display: none
            .body
              padding: 0 1.5rem
              .description
                p
                  padding: 0
                  padding-bottom: 0.5rem


</style>
