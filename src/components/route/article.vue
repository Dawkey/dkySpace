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
            <i class="icon-date"></i>
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
        <div class="edit_date">
          最后编辑于<span>{{article.edit_date}}</span>
        </div>
        <div class="before_after_article">
          <div class="before_article"
            v-if="before_article.title"
            @click="to_article(before_article._id)"
          >
            {{before_article.title}}
          </div>
          <div class="before_article_blank"
            v-if="!before_article.title"
          >
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
  import {mapGetters,mapMutations,mapActions} from "vuex";
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
          document.title = this.article.title;
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

      ...mapActions([
        "add_talk_word",
      ]),

      get_data(_id){
        get_article(_id,"show").then((res)=>{
          let res_data = res.data;
          if(res_data.code != 0){
            if(res_data.code === 1){
              this.add_talk_word("服务器端出现错误,获取article数据失败!");
              return;
            }else if(res_data.code === 2){
              this.$router.replace("/404");
              return;
            }
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

  .article
    .article_div
      margin-top: 0
      padding-top: 2.5rem
      padding-right: 3rem
      box-shadow: $box-shadow
      background-color: $color-1
      font-family: Georgia
      border-radius: 1rem
      .title
        font-size: 2.4rem
        font-weight: 800
        height: 3.5rem
        line-height: 3.5rem
        text-align: center
        padding-bottom: 0.8rem
        box-shadow: $box-shadow-bottom
        white-space: nowrap
        text-overflow: ellipsis
        overflow: hidden
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
          i
            display: none
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
      .edit_date
        display: flex
        justify-content: flex-end
        font-size: 1.4rem
        color: #9a9a9a
        >span
          color: rgba(96,126,121,0.8)
          margin-top: 0.1rem
          margin-left: 0.5rem
      .before_after_article
        display: flex
        justify-content: space-between
        margin-top: 3.5rem
        margin-bottom: 1rem
        .before_article,.after_article
          font-size: 1.4rem
          line-height: 2rem
          color: rgba(96,126,121,0.8)
          box-shadow: 0 0.5rem 0.5rem -0.5rem
          cursor: pointer
          padding: 0 0.5rem
          margin-left: -0.5rem
          &:hover
            color: $color-3
        .after_article
          margin-right: -0.5rem

  @media (max-width: $max-width-2)
    .article
      width: calc(100% + 4rem)
      margin-left: -2rem
      .article_div
        padding-left: 1.5rem
        padding-right: 1.5rem
        .title
          font-size: 2.1rem
          line-height: 2.5rem
          height: 2.5rem
        .middle_div
          .date
            padding-right: 0.5rem
            text-align: right
            font-size: 1.2rem
            i
              display: inline
          .tag_classify
            right: auto
            left: 0.5rem
        .before_after_article
          .before_article,.after_article
            max-width: 45%
            white-space: nowrap
            text-overflow: ellipsis
            overflow: hidden


</style>
