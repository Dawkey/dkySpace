import axios from "axios";

export function create_draft(json){
  let promise = axios.post("/api/post/create_draft",json);
  return promise;
}

export function update_draft(json){
  let promise = axios.post("/api/post/update_draft",json);
  return promise;
}

export function remove_draft(json){
  let promise = axios.post("/api/post/remove_draft",json);
  return promise;
}


export function create_article(json){
  let promise = axios.post("/api/post/create_article",json);
  return promise;
}

export function remove_article(json){
  let promise = axios.post("/api/post/remove_article",json);
  return promise;
}