import * as types from "./mutation-types";

const mutations = {
  [types.set_router_show](state,router_show){
    state.router_show = router_show;
  },
  [types.set_loading_show](state,loading_show){
    state.loading_show = loading_show;
  },

  [types.set_talk_word](state,talk_word){
    state.talk_word = talk_word;
  },
  [types.set_talk_times](state,talk_times){
    state.talk_times = talk_times;
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
  [types.set_use](state,use){
    state.use = use;
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

  [types.set_login_flag](state,login_flag){
    state.login_flag = login_flag;
  },
  [types.set_draft_main](state,draft_main){
    state.draft_main = draft_main;
  },
  [types.set_draft_flag](state,draft_flag){
    state.draft_flag = draft_flag;
  },

  [types.set_kcharge_flag](state,kcharge_flag){
    state.kcharge_flag = kcharge_flag;
  },

  [types.add_tag_key](state,key){
    state.tag[key] = [];
  },
}

export default mutations;
