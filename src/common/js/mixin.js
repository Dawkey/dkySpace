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


export const common_token = {
  computed: {
    ...mapGetters([
      "token_status",
    ]),
  },

  methods: {
    ...mapMutations([
      "set_token_status",
    ]),

    token_test_1(){
      if(this.token_status === "token_no"){
        this.add_talk_word("你没有权限做这个哦~ (´･ω･)ﾉ(._.`)");
      }
      else if(this.token_status === "token_wrong"){
        localStorage.removeItem("token");
        this.set_token_status("token_no");
        this.add_talk_word("当前token无效!已被移除.");
      }
      else if(this.token_status === "token_expire"){
        this.add_talk_word("当前token已过期,请重新登录以更新token,Dawkey~");
      }
    },

    token_test_2(error){
      if(error === "jwt expired"){
        this.set_token_status("token_expire");
        this.add_talk_word("当前token已过期,请重新登录以更新token,Dawkey~");
      }else{
        localStorage.removeItem("token");
        this.set_token_status("token_no");
        this.add_talk_word("当前token无效!已被移除.");
      }
    },
  },

}
