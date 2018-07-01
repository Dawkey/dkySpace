<template>
  <div class="yes_no" :style="{top: top}" v-show="total_show_flag || father === 'write'">

    <transition name="yes-no" @after-leave="after_leave">
      <div class="yes_no_div"
        v-show="show_flag !== false"
      >
        <div class="yes_div">
          <i class="icon-yes" @click="$emit('yes')"></i>
        </div>
        <div class="line">
        </div>
        <div class="no_div">
          <i class="icon-no" @click="$emit('no')"></i>
        </div>
      </div>
    </transition>

    <transition name="loading">
      <div class="loading" v-show="loading_flag !== false" :class="{write: father === 'write'}">
        <div class="loading-1">
        </div>
        <div class="loading-2">
        </div>
        <div class="loading-3">
        </div>
      </div>
    </transition>

  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: "YesNo",

    data(){
      return {
        total_show_flag: false,
      }
    },

    props: {
      top: {
        type: String,
        default: "0rem",
      },
      show_flag: {
        type: Boolean,
        default: false,
      },
      loading_flag: {
        type: [Boolean,String],
        default: false,
      },
      father: {
        type: String,
        default: "charge"
      }
    },

    methods: {
      after_leave(){
        if(this.loading_flag === false){
          this.total_show_flag = false;
        }
      }
    },

    watch: {

      show_flag(){
        if(this.show_flag !== false){
          this.total_show_flag = true;
        }
      },

      loading_flag(){
        if(this.loading_flag === false){
          this.total_show_flag = false;
        }
      }

    }

  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable.styl"
  .yes_no
    position: relative
    display: flex
    width: 8rem
    height: 2rem
    align-items: center
    justify-content: center
    transition: top 400ms
    .yes_no_div
      display: flex
      align-items: center
      width: 13rem
      height: 2rem
      .yes_div,.no_div
        flex-shrink: 0
        display: flex
        align-items: center
        justify-content: center
        width: 3rem
        height: 3rem
        border-radius: 50%
        box-shadow: $box-shadow
        color: $color-3
        background: $color-1
        font-size: 1.6rem
        i
          display: flex
          align-items: center
          justify-content: center
          width: 2.8rem
          height: 2.8rem
          border-radius: 50%
          cursor: pointer
          &:hover
            background: $color-3
            color: $color-1
        .icon-no
          font-size: 1.3rem
      .line
        width: 100%
        height: 2rem
        box-shadow: $box-shadow-bottom
        margin: 0 -0.5rem
        transform: translateY(-51%)

    .yes-no-enter-active
      transition: transform 400ms,top 400ms
    .yes-no-enter
      transform: scaleY(0)
    .yes-no-enter-to
      transform: scaleY(1)

    .yes-no-leave-active
      transition: transform 400ms
    .yes-no-leave-to
      transform: scaleY(0)


    .loading
      position: absolute
      width: 4.5rem
      height: 4.5rem
      display: flex
      align-items: center
      justify-content: center
      .loading-1,.loading-2,.loading-3,.loading-4
        position: absolute
        z-index: 10
        width: 0
        height: 0
        background: $color-3
        filter: drop-shadow(0 0 1px $color-3-o)
        border-radius: 50%
        animation: load 1.8s cubic-bezier(0, 0.2, 0.8, 1) infinite
      .loading-2
        animation-delay: -0.6s
      .loading-3
        animation-delay: -1.2s
      &.write
        transform: translateX(2.5rem)
        width: 4rem
        height: 4rem

    .loading-enter-active
      transition: transform 400ms,top 400ms
    .loading-enter
      transform: scaleY(0)
    .loading-enter-to
      transform: scaleY(1)


    @keyframes load
      100%
        height: 100%
        width: 100%
        opacity: 0

</style>
