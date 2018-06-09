import * as types from "./mutation-types";

const mutations = {
  [types.set_router_show](state,router_show){
    state.router_show = router_show;
  },

  [types.set_data_ready](state,data_ready){
    state.data_ready = data_ready;
  },
  [types.set_main](state,main){
    state.main = main;
  },
  [types.set_tag_name](state,tag_name){
    state.tag_name = tag_name;
  },
  [types.set_classify_name](state,classify_name){
    state.classify_name = classify_name;
  },
  [types.set_archive_name](state,archive_name){
    state.archive_name = archive_name;
  },
  [types.set_tag](state,tag){
    state.tag = tag;
  },
  [types.set_classify](state,classify){
    state.classify = classify;
  },
  [types.set_archive](state,archive){
    state.archive = archive;
  },
  [types.set_update](state,update){
    state.update = update;
  },
  [types.set_diary](state,diary){
    state.diary = diary;
  },
}

export default mutations;
