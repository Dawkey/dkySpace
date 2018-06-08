<template>
  <div class="diary">
    <div class="icon">
      <i class="button_icon icon-diary"></i>
    </div>
    <ul class="diary_ul">
      <li
        class="diary_li"
        v-for = "item in diary"
      >
      </li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
  import {get_diary} from "api/api.js";
  import {mapGetters,mapMutations} from "vuex";
  export default {

    name: "Diary",

    computed: {

      ...mapGetters([
        "diary"
      ]),

    },

    created(){
      this.get_data();
    },

    methods: {

      ...mapMutations([
        "set_diary"
      ]),

      get_data(){
        if(this.diary.length != 0){
          return;
        }
        get_diary().then((res)=>{
          let data = res.data.view;
          this.set_diary(data);
        });
      },

    },

  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable.styl"

  .diary
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
        font-size: 2.2rem

</style>
