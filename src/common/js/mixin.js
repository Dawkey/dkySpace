import {get_main} from "api/api.js";
import {mapActions,mapGetters} from "vuex";

export const common_data = {

  computed: {
    ...mapGetters([
      "data_ready"
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
