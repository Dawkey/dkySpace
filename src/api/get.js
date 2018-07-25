import axios from "axios";

function get_view(url){
  let promise = axios.get(url);
  return promise;
}



export function get_main(){
  return get_view("/api/get/main");
}
export function get_update(){
  return get_view("/api/get/update");
}
export function get_diary(){
  return get_view("/api/get/diary");
}

export function get_article(_id,type){
  let promise = axios.get(`/api/get/article?_id=${_id}&type=${type}`);
  return promise;
}

export function get_draft_main(_id){
  let promise = axios.get("/api/get/draft_main");
  return promise;
}
export function get_draft(_id){
  let promise = axios.get(`/api/get/draft?_id=${_id}`);
  return promise;
}
