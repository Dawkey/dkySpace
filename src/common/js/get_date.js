function time_str(time){
  if(time < 10){
    time = "0" + time;
  }
  return time;
}

export function get_date(){
  let date = new Date();
  let year = time_str(date.getFullYear());
  let month = time_str(date.getMonth()+1);
  let day = time_str(date.getDate());
  let hour = time_str(date.getHours());
  let minute = time_str(date.getMinutes());
  let second = time_str(date.getSeconds());
  let time = year + "/" + month + "/" + day + "/" + hour + ":" + minute + ":" + second;
  return time;
}
