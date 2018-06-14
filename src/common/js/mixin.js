import {get_main} from "api/get.js";
import {mapActions,mapGetters} from "vuex";

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
        console.log("服务器端获取数据出现错误,Dawkey!");
        return;
      }
      this.data_handle(res.data.data);
    });
  },

  methods: {

    ...mapActions([
      "data_handle"
    ]),

    to_article(_id){
      this.$router.push(`/article/${_id}`);
    }

  }

}
