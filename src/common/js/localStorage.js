import {get_date} from "./get_date.js"

export function get_user(){
  if(!window.localStorage){
    return null;
  }

  let data = null;
  data = localStorage.getItem("data");

  if(data === null){
    let user = init_user();
    let user_str = JSON.stringify(user);
    localStorage.setItem("data",user_str);
    return {
      message: "first_vist",
      user: user
    };
  }

  let user = JSON.parse(data);

  let name = user.name;
  let num = user.num;
  let day_num = user.day_num;
  let days = user.days;
  let date = user.date;

  let date_now = get_date().slice(0,13);

  if(date != date_now){
    day_num = 0;
    date = date_now;
    days = days + 1;
  }

  if(day_num + 1 >= 6){
    return {
      message: "over_num",
      user: user
    }
  }

  user.num = num + 1;
  user.day_num = day_num + 1;
  user.days = days;
  user.date = date;

  let user_str = JSON.stringify(user);
  localStorage.setItem("data",user_str);

  let message = "normal";

  if(user.num === 5){
      message = "first_five";
  }

  if(user.name === "visitor" && user.num >= 6){
      message = "change_name";
  }

  return {
    message,user
  }

}


function init_user(){
  let date = get_date().slice(0,13);
  let data = {
    name: "visitor",
    num: 1,
    day_num: 1,
    days: 1,
    date: date
  }
  return data;
}
