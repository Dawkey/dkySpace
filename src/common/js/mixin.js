import {get_main} from "api/api.js";
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
      this.data_handle(res.data);
    });
  },

  methods: {
    ...mapActions([
      "data_handle"
    ]),
  }

}

//middle_icon loading组件共享的是否显示数据
export const common_show_flag = {

  computed: {

    ...mapGetters([
      "router_show",
      "data_ready",
      "update"
    ]),

    show_flag(){
      let router = this.router_show;
      let array = ["home","tag","classify","archive"];
      if(router === false){
        return false;
      }
      if(array.includes(router) && this.data_ready){
        return true;
      }
      if(router === "update" && this.update.length != 0){
        return true;
      }
      if(router === "about_me"){
        return true;
      }
    }

  }

}
