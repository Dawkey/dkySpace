export const router_show = (state) => state.router_show;

export const talk_word = (state) => state.talk_word;
export const talk_flag = (state) => state.talk_flag;

export const data_ready = (state) => state.data_ready;
export const main = (state) => state.main;
export const tag_name = (state) => state.tag_name;
export const classify_name = (state) => state.classify_name;
export const archive_name = (state) => state.archive_name;
export const tag = (state) => state.tag;
export const classify = (state) => state.classify;
export const archive = (state) => state.archive;
export const update = (state) => state.update;
export const diary = (state) => state.diary;
export const _id = (state) => state._id;


export const show_flag = (state) => {
  let router = state.router_show;
  if(router === false){
    return false;
  }

  let array = ["home","tag","classify","archive"];
  if(array.includes(router)){
    if(state.data_ready){return true;}
    return false;
  }
  if(router === "update"){
    if(state.update.length != 0){return true;}
    return false;
  }
  if(router.slice(0,7) === "article"){
    let _id = router.slice(8);
    if(_id === state._id){return true;}
    return false;
  }
  if(router === "about_me" || router === "login" || router === "charge"){
    return true;
  }
}
