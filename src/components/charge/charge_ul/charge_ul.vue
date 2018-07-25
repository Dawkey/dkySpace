<template>
  <div class="charge_ul">
    <ul>

      <div class="button_icon" :class="{draft: comp === 'draft'}">
        <i :class="icon_class"></i>
      </div>

      <div class="write_icon">
        <i class="icon-write"
           @click="to_comp"
           :class="{disable: loading_flag !== false}"
        ></i>
      </div>

      <yes-no
        :father = "'charge'"
        :top = "comp_top"
        :show_flag = "(active_comp.index !== false && active_comp.id !== false)"
        :loading_flag = "loading_flag"
        @yes = "delete_comp"
        @no = "cancel_delete_comp"
      >
      </yes-no>

      <li class="ul_head">
        <div class="version" v-if="comp === 'update'">版本号</div>
        <div class="title" v-if="comp !== 'update'">标题</div>
        <div class="classify" v-if="comp !== 'update'">分类<i class="icon-add"></i></div>
        <div class="tag" v-if="comp !== 'update'">标签<i class="icon-add"></i></div>
        <div class="date">日期</div>
      </li>

      <li class="empty_li" v-show = "comp_main.length === 0">
        草稿箱里面还空空如也~
      </li>

      <li v-for = "(item,index) in comp_main"
        :class="{active: active_comp.index === index}">
        <div class="version" v-if="comp === 'update'">{{item.version}}</div>
        <div class="title" v-if="comp !== 'update'">{{item.title}}</div>
        <div class="classify" v-if="comp !== 'update'">{{item.classify}}</div>
        <div class="tag" v-if="comp !== 'update'">{{item.tag}}</div>
        <div class="date">{{item.date}}</div>
        <div class="icon_div">
          <i class="icon-write"
             @click="edit_comp(item._id)"
             :class="{disable: loading_flag !== false}"
          ></i>
          <i class="icon-delete"
             v-if = "comp !== 'update'"
             @click="delete_comp_click(item._id,index)"
             :class="[{active: active_comp.index === index},
                     {disable: loading_flag !== false}
                    ]"
          ></i>
        </div>
      </li>

    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapMutations,mapActions} from "vuex";
  import YesNo from "../yes_no/yes_no.vue";
  export default {
    //这是一个charge.vue组件中,draft,article,update部分所公用的ul组件
    name: "ChargeUl",


    components: {YesNo},


    data(){
      return{
        active_comp: {index: false,id: false},//处于激活状态的li元素
        comp_timer: null,
        comp_top: "4.1rem",//yes_no组件的top位置
      }
    },


    props: {
      //用来指示当前组件属于draft,article,update中的哪个部分
      comp: {
        type: String,
        default: "draft"
      },

      //用来填充li元素的main数据
      comp_main: {
        type: Array,
        default(){
          return [];
        }
      },

      //在需要移除li元素时,对应的POST函数(与后端交互)
      remove_comp: {
        type: Function
      },

      //在移除相应元素后,后端会返回发生改变的main数据,set_comp_main表示需要修改的
      //vuex中mutations中的修改相关main数据的函数.
      set_comp_main: {
        type: Function
      },

      //在从后端获取数据时,一切交互会被无效化,由loading_flag控制,loading_flag也是,draft,
      //article,update三个部分所共有的唯一数据.
      loading_flag: {
        type: Boolean,
        default: false
      },

      //draft和article所共有的数据,表示在创建新的博客时,位于草稿箱中该博客应对应的id号.
      draft_id: {
        type: Number,
        default: 0
      },
    },


    computed: {

      icon_class(){
        if(this.comp === "article"){
          return "icon-archive";
        }else{
          return `icon-${this.comp}`;
        }
      },

      edit_path(){
        if(this.comp === "draft"){
          return "draft";
        }else if(this.comp === "article"){
          return "edit";
        }else if(this.comp === "update"){
          return "update_edit";
        }
      }

    },


    methods: {
      ...mapMutations([
        "set_use",
        "set_data_ready"
      ]),

      ...mapActions([
        "add_talk_word",
        "data_handle"
      ]),

      //触发charge.vue父组件来修改loading_flag的值
      emit_loading_flag(bool){
        this.$emit("set_loading_flag",bool);
      },

      //跳转到新建页面
      to_comp(){
        if(this.loading_flag !== false){
          return;
        }
        if(this.comp !== "update"){
          this.$router.push(`/draft/${this.draft_id}`);
        }else{
          this.$router.push(`/update_edit/${this.draft_id}`);
        }

      },

      //跳转到编辑页面
      edit_comp(_id){
        if(this.loading_flag !== false){
          return;
        }
        this.$router.push(`/${this.edit_path}/${_id}`);
      },

      //删除对应li元素(数据库中单条数据)的点击事件,弹出yes_no组件
      delete_comp_click(_id,index){
        if(this.loading_flag !== false){
          return;
        }
        clearTimeout(this.comp_timer);
        this.active_comp.index = index;
        this.active_comp.id = _id;
        this.comp_top = (4.1 + index * 3.2) + "rem";
        this.comp_timer = setTimeout(()=>{
          this.active_comp.index = false;
          this.active_comp.id = false;
        },3000);
      },

      //真正的删除事件
      delete_comp(){
        if(this.loading_flag !== false){
          return;
        }
        let _id = this.active_comp.id;
        if(_id === false){
          return;
        }
        clearTimeout(this.comp_timer);
        this.active_comp.id = false;
        this.emit_loading_flag(true);

        let comp_id = null;
        let _id_max = this.comp_main[0]._id;
        if(_id === _id_max){
          let length = this.comp_main.length;
          comp_id = length === 1 ? 0 : this.comp_main[1]._id;
        }

        let timer_promise = new Promise((resolve)=>{
          setTimeout(()=>{resolve(0);},1000);
        });

        this.add_talk_word("删除中...");

        let use_id = `${this.comp}_id`;
        Promise.all([this.remove_comp({_id:_id,[use_id]:comp_id}),timer_promise])
          .then((res)=>{
            let code = res[0].data.code;
            let data = res[0].data.data;
            if(code === 0){
              this.set_use(data.use);

              let comp_main = `${this.comp}_main`;

              if(this.comp == "article"){
                this.set_data_ready(false);
                this.data_handle(data);
              }else{
                this.set_comp_main(data[comp_main]);
              }

              this.active_comp.index = false;
              this.emit_loading_flag(false);

              this.add_talk_word(`删除成功,_id号为${_id}的草稿数据已被移除`);
            }
            else if(code === 1){
              this.add_talk_word("服务器端出现错误,删除失败!");
            }
          })
          .catch((err)=>{
            this.add_talk_word("axios请求出现错误,删除失败!");
            console.log(err);
          });
      },

      cancel_delete_comp(){
        clearTimeout(this.comp_timer);
        this.active_comp.index = false;
        this.active_comp.id = false;
      }
    }

  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable.styl"
  .charge_ul
    padding: 2rem 2rem
    border-radius: 0.3rem
    box-shadow: $box-shadow
    background-color: $color-1
    ul
      position: relative
      .title
        width: 40%
      .classify
        width: 10%
      .tag
        width: 15%
      .date
        width: 21%
      .version
        width: 65%

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
        &.draft
          font-size: 1.6rem
          &:hover
            font-size: 1.7rem

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
        i
          &.disable
            color: #888
            background: transparent

      .yes_no
        position: absolute
        top: 4.1rem
        right: -10.5rem

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
        &.active
          background: rgba(96,126,121,0.68)
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
        &.empty_li
          justify-content: center
          background: transparent
          color: $color-3
          margin: 1rem 0 0 0
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
            &.disable
              color: #888
            &.active
              font-size: 1.8rem
              margin-left: 3.1rem
              color: $color-black

</style>
