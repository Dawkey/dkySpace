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

export function update_article(json){
  let promise = axios.post("/api/post/update_article",json);
  return promise;
}

export function remove_article(json){
  let promise = axios.post("/api/post/remove_article",json);
  return promise;
}



export function create_update(json){
  let promise = axios.post("/api/post/create_update",json);
  return promise;
}

export function update_update(json){
  let promise = axios.post("/api/post/update_update",json);
  return promise;
}

export function remove_update(json){
  let promise = axios.post("/api/post/remove_update",json);
  return promise;
}



export function update_tag(json){
  let promise = axios.post("/api/post/update_tag",json);
  return promise;
}
export function update_classify(json){
  let promise = axios.post("/api/post/update_classify",json);
  return promise;
}
