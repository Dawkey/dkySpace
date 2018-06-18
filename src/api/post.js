import axios from "axios";

export function post_draft(json){
  let promise = axios.post("/api/post/set_draft",json);
  return promise;
}
