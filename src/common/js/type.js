export default function type(el,word){
  let word_array = word.split("");
  let promise = Promise.resolve();
  word_array.reduce((meno,value,index)=>{
    let str = meno + value;
    if(index === 1){
      promise = type_timer(el,meno);
    }
    promise = promise.then(()=>{
      return type_timer(el,str);
    });
    return str;
  });
}

function type_timer(el,str){
  return new Promise((resolve)=>{
    setTimeout(()=>{
      el.innerHTML = str;
      resolve();
    },100);
  });
}
