<template>
  <div class="article">
    <transition name="router">
      <div class="article_div router_div"
        v-if="article != null"
        v-show="show_flag"
      >
        <div class="title">
          {{article.title}}
        </div>
        <div class="middle_div">
          <div class="date">
            {{article.date}}
          </div>
          <div class="tag_classify">
            <div class="tag">
              <i class="icon-tag"></i>
              {{article.tag}}
            </div>
            <div class="classify">
              <i class="icon-classify"></i>
              {{article.classify}}
            </div>
          </div>
        </div>
        <div class="content article_style" v-html = "article.content">
        </div>
        <div class="before_after_article">
          <div class="before_article"
            v-if="before_article.title"
            @click="to_article(before_article._id)"
          >
            {{before_article.title}}
          </div>
          <div class="after_article"
            v-if="after_article.title"
            @click="to_article(after_article._id)"
          >
            {{after_article.title}}
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import {get_article} from "api/get.js"
  import {mapGetters,mapMutations} from "vuex";
  export default {
    name: "Article",

    data(){
      return {
        before_article: null,
        article: null,
        after_article: null
      }
    },

    computed: {
      ...mapGetters([
        "_id",
        "router_show",
      ]),
      show_flag(){
        if(this.router_show != false
          && this.router_show.slice(0,7) === 'article'
          && this.router_show.slice(8) === this._id
        ){
          this.set_loading_show(false);
          return true;
        }else{
          return false;
        }
      }
    },

    created(){
      let _id = this.$route.params.id;
      this.get_data(_id);
    },

    methods: {

      ...mapMutations([
        "set__id",
        "set_loading_show"
      ]),

      get_data(_id){
        get_article(_id).then((res)=>{
          let res_data = res.data;
          if(res_data.code != 0){
            return;
          }
          let data = res_data.data;
          let {before_article,article,after_article} = data;
          article.content = data.content;

          this.set__id(_id);
          this.before_article = before_article;
          this.article = article;
          this.after_article = after_article;
        });
      },

      to_article(_id){
        this.$router.push(`/article/${_id}`);
      }

    },

    watch: {
      $route(){
        if(this.$route.name != "article"){
          return;
        }
        let _id = this.$route.params.id;
        if(_id === this._id){
          return;
        }

        this.get_data(_id);
      }
    }

  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable.styl"
  @import "~common/stylus/article.styl"

  .article_div
    margin-top: 0
    padding-top: 2.5rem
    box-shadow: $box-shadow
    background-color: $color-1
    font-family: Georgia
    .title
      font-size: 2.4rem
      font-weight: 800
      height: 3.5rem
      line-height: 3.5rem
      text-align: center
      padding-bottom: 0.8rem
      box-shadow: $box-shadow-bottom
    .middle_div
      position: relative
      margin-top: 0.1rem
      margin-bottom: 2rem
      color: $color-grey
      .date
        height: 2.5rem
        line-height: 2.5rem
        text-align: center
        font-size: 1.4rem
      .tag_classify
        position: absolute
        top: 0
        right: 1.2rem
        height: 100%
        display: flex
        i
          margin-right: 0.5rem
        .tag,.classify
          height: 100%
          display: flex
          align-items: center
        .tag
          font-size: 1.3rem
          padding-right: 1rem
        .classify
          font-size: 1.2rem
          padding-left: 1rem
          box-shadow: $box-shadow-left
    .before_after_article
      display: flex
      justify-content: space-between
      margin-top: 3rem
      margin-bottom: 1rem
      .before_article,.after_article
        font-size: 1.4rem
        line-height: 2rem
        color: rgba(96,126,121,0.8)
        box-shadow: 0 0.5rem 0.5rem -0.5rem;
        cursor: pointer
        padding: 0 0.5rem
        margin-left: -0.5rem
        &:hover
          color: $color-3
      .after_article
        margin-right: -0.5rem


</style>
