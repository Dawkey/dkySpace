import axios from "axios";

function get_view(url){
  let promise = axios(url);
  return promise;
}

export function get_main(){
  return get_view("/api/main");
}
export function get_update(){
  return get_view("/api/update");
}
export function get_diary(){
  return get_view("/api/diary");
}
