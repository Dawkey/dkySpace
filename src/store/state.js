const state = {
  router_show: false,

  talk_word: "",      //需要输出的文字
  talk_flag: "first", //是否继续输出文字的flag,用于处理在输出过程中
                      //talk_word发生变化时的情况

  data_ready: false,  //数据是否获取及处理完毕的flag
  main: [],           //主页(home)数组
  tag_name: [],       //标签名数组
  classify_name: [],  //分类名数组
  archive_name: [],   //归档年份数组
  tag: {},            //每个标签名对应一个数组组成的对象
  classify: {},       //类似于tag的一个对象(分类)
  archive: {},        //类上(归档)
  update: [],         //博客更新日志数据
  diary: [],          //日记数据
  _id: 0              //记录跳转到的文章_id
}

export default state;
