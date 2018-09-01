import * as types from "./mutation-types";

//取得归档年份名并返回数组
function archive_name_get(last,first){
  let arr = [];
  for(let i = last;i >= first;i--){
    arr.push(i);
  }
  return arr;
}

//对得到的数据处理
export function data_handle({commit},data){
  let view = data.view;
  let use = data.use;

  let main = view;
  let tag_name = use.tag;
  let classify_name = use.classify;

  let last = parseInt(main[0].date.slice(0,4));
  let first = parseInt(main[main.length-1].date.slice(0,4));
  let archive_name = archive_name_get(last,first);

  let tag = {};
  let classify = {};
  let archive = {};

  tag_name.forEach((value)=>{
    tag[value] = [];
  });
  classify_name.forEach((value)=>{
    classify[value] = [];
  });
  archive_name.forEach((value)=>{
    archive[value] = [];
  });

  main.forEach((value)=>{
    let obj = {};
    obj._id = value._id;
    obj.title = value.title;
    obj.date = value.date;
    obj.date_mobile = value.date.slice(0,10);

    let archive_value = value.date.slice(0,4);

    //如果对象属性不是数组,则跳出这一单次循环,继续执行后面的循环
    if(
      !Array.isArray(tag[value.tag])||
      !Array.isArray(classify[value.classify])||
      !Array.isArray(archive[archive_value])
    ){ return; }

    tag[value.tag].push(obj);
    classify[value.classify].push(obj);
    archive[archive_value].push(obj);
  });

  let data_ready = true;

  commit(types.set_main,main);
  commit(types.set_use,use);
  commit(types.set_tag_name,tag_name);
  commit(types.set_classify_name,classify_name);
  commit(types.set_archive_name,archive_name);
  commit(types.set_tag,tag);
  commit(types.set_classify,classify);
  commit(types.set_archive,archive);
  commit(types.set_data_ready,data_ready);

}

export function add_talk_word({commit,state},data){
  let times = state.talk_times + 1;
  commit(types.set_talk_word,data);
  commit(types.set_talk_times,times);
}
