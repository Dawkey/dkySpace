const state = {
  router_show: false,
  loading_show: true,

  talk_word: "",      //需要输出的文字
  talk_times: 0,      //输出文字的次数
  talk_flag: "first", //是否继续输出文字的flag,用于处理在输出过程中
                      //talk_word发生变化时的情况

  data_ready: false,  //数据是否获取及处理完毕的flag
  use: null,          //对应于服务器上的use数据库,存储较为重要的信息
  main: [],           //主页(home)数组
  tag_name: [],       //标签名数组
  classify_name: [],  //分类名数组
  archive_name: [],   //归档年份数组
  tag: {},            //每个标签名对应一个数组组成的对象
  classify: {},       //类似于tag的一个对象(分类)
  archive: {},        //类上(归档)
  update: [],         //博客更新日志数据
  diary: [],          //日记数据
  _id: 0,             //记录跳转到的文章_id

  login_flag: false,  //判断是否处于与登录相关的路由的flag
  draft_main: [],     //与草稿相关的 main数据,用于charge组件中的草稿相关显示
  draft_flag: false,  //判断是否已获取草稿数据的flag

  kcharge_flag: false, //判断是否处于keyword_charge组件的flag,主要作用于mayuri对话的颜色显示
}

export default state;
