import * as types from "./mutation-types";

const mutations = {
  [types.set_router_show](state,router_show){
    state.router_show = router_show;
  },

  [types.set_talk_word](state,talk_word){
    state.talk_word = talk_word;
  },
  [types.set_talk_flag](state,talk_flag){
    state.talk_flag = talk_flag;
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
  [types.set__id](state,_id){
    state._id = _id;
  },
}

export default mutations;
