import {get_main,get_draft_main} from "api/get.js";
import {mapActions,mapMutations,mapGetters} from "vuex";

//home,tag,classify,archive共享的数据
export const common_data = {

  computed: {
    ...mapGetters([
      "data_ready",
      "router_show"
    ]),
  },

  created(){
    if(this.data_ready){
      return;
    }
    get_main().then((res)=>{
      if(this.data_ready){
        return;
      }
      if(res.data.code != 0){
        console.log("服务器端获取数据出现错误,获取main数据失败!");
        return;
      }
      this.data_handle(res.data.data);
    });
  },

  methods: {
    ...mapMutations([
      "set_loading_show"
    ]),
    ...mapActions([
      "data_handle"
    ]),

    to_article(_id){
      this.$router.push(`/article/${_id}`);
    }

  }

}

export const common_draft = {

  computed: {

    ...mapGetters([
      "main",
      "draft_main",
      "draft_flag",
      "use",
    ]),

    draft_id(){
      if(this.use === null){
        return;
      }
      return this.use.draft_id + 1;
    },

  },


  created(){
    this.get_draft_main_data();
  },


  methods: {

    ...mapMutations([
      "set_draft_main",
      "set_draft_flag",
      "set_use",
    ]),

    get_draft_main_data(){
      if(this.draft_flag === true){
        return;
      }
      get_draft_main().then((res)=>{
        if(res.data.code != 0){
          console.log("服务器端获取数据出现错误,获取draft_main数据失败");
          return;
        }
        let data = res.data.data;
        this.set_draft_main(data);
        this.set_draft_flag(true);
      });
    },

  }

}
