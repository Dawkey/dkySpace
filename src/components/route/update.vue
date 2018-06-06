<template>
  <div class="update">
    update
  </div>
</template>

<script type="text/ecmascript-6">
  import {get_update} from "api/api.js";
  export default {

    name: "Update",

    data(){
      return {
        update: [],
      }
    },

    created(){
      get_update().then((res)=>{
        console.log(res);
        this.update = res.data.view;
      });
    },

  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable.styl"

  .update
    width: 100%
    height: 50rem
    box-shadow: $box-shadow

</style>
