export default function type(el,word,$store){
  let word_array = word.split("");
  let promise = Promise.resolve();
  word_array.reduce((meno,value,index)=>{
    let str = meno + value;
    if(index === 1){
      promise = type_timer(el,meno,$store);
    }
    promise = promise.then(()=>{
      return type_timer(el,str,$store);
    });
    return str;
  });
  return promise;
}

//生成新的promise,串成promise链
function type_timer(el,str,$store){
  return new Promise((resolve,reject)=>{
    //如果talk_flag === false,则reject,以防止生成多条promise链产生冲突.
    if($store.getters["talk_flag"] === false){
      reject("talk_is_break");
    }
    setTimeout(()=>{
      el.innerHTML = str;
      resolve();
    },100);
  });
}
