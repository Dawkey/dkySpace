# Vue.js + koa2 + mongodb 搭建的个人博客系统(前端部分)

> 在接触`vue`之后,就一直想用vue把原来老旧的博客(基于`jquery`和`php`)重新搭一遍,摸了几个月后,总算摸出来了:joy:.

**博客地址:**  
[https://dawkey.top](https://dawkey.top)

**后端部分:**
[https://github.com/wwk321/dkySpace-server](https://github.com/wwk321/dkySpace-server)

## 1. 技术栈:

* `vue`,`vuex`,`vue-router`(`vue`的全家桶走一下流程);
* `axios`发送ajax请求(这个也不用多说);
* `marked`把`markdown`转为`html`(比自己瞎写的`md-html`好用多了);
* `highlight`代码语法高亮;

> 基本上就是搭建博客常用的一些库.

## 2. 博客页面:

> 我要开始甩图片啦:smirk:

#### 主页:
![](https://i.loli.net/2018/09/11/5b977748824d4.png)

#### 分类:
![](https://i.loli.net/2018/09/11/5b9777b5b6249.png)

#### 归档:
![](https://i.loli.net/2018/09/11/5b977808014bc.png)

#### 更新日志:
![](https://i.loli.net/2018/09/11/5b977844c4a43.png)

### 博客文章:
![](https://i.loli.net/2018/09/11/5b9778b836ded.png)

## 3. 博客的后台管理:

> 后台管理界面也是集成在前端部分的,后端部分只负责处理数据就行了.

> 想要通过浏览器看一下后台界面的朋友,可以**通过`login`界面的`visit`按钮**(不需要账号密码),直接进入后台管理哦,不过没有相关权限就是了:grin:

#### 管理界面:
![](https://i.loli.net/2018/09/11/5b977abb2705c.png)

#### 添加博客到草稿箱:
![](https://i.loli.net/2018/09/11/5b977b2bb1d26.gif)

#### 修改和发布博客:
![](https://i.loli.net/2018/09/11/5b977b81177bb.gif)

#### 删除草稿和博客:
![](https://i.loli.net/2018/09/11/5b977bc166076.gif)

#### 新增和删除分类:
![](https://i.loli.net/2018/09/11/5b977c39dcf33.gif)

#### 新增和删除更新日志:
![](https://i.loli.net/2018/09/11/5b977c8b0c13b.gif)

## 4. 博客搭建相关的

> 发了这么多演示图,还没有些什么实质性的东西.

主要记录一下博客搭建中的遇到的一些问题:

### 4.1 搭建的思路:

博客做的是单页面的,所以我们所以的数据获取都是通过`ajax`的.

我的思路是在页面加载时,就请求一个`main`的关键数据,它是一个数组,其中包含着每篇博客的标题,标签,分类,时间,描述,以及关键的`id`号(这里`id`号在请求博客文章数据时会用到).

对这一个数组数据用`js`进行加工,我们就能得到了`home(首页)`,`tag(标签)`,`classify(分类)`,`archive(归档)`这四个页面(也是一般博客最基础的)所需要的数据,把这些数据存入到`vuex`中.

> 这样,单页面较多页面的优势就体现出来了,我们只请求了一次数据,之后,我们再访问上面提到的四个页面,就再也不会请求任何数据,甚至断网也能正常访问(除非刷新页面)

当我们想要查看一篇博客文章的具体内容时,点击之后,根据前面提到的对应的`id`号,就会通过`ajax`请求对应的文章数据,最终显示浏览器上就完事了.

至于还有一个`update(更新日志)`,这个在访问它时,单独请求数据就行了.

> 原理上可以说是非常简单:satisfied:

> 后面可能会考虑把博客**描述**数据单独拿出来获取,因为博客数量多了之后,描述数据加起来会有点大.


### 4.2 页面间的切换:

因为做的是单页面,页面间的切换是不可避免的,在写页面切换时,我尝试了很多种动画切换(本人是**极端**的外观党:confounded:),最终还选择了现在这种比较传统的方式.

具体的实现方式是,使用`vue-router`中的**导航守卫**中的`beforeEach`(具体查看[vue-router的文档](https://router.vuejs.org/zh/guide/advanced/navigation-guards.html)),在每次切换**路由**时,都先显示一段时间的加载动画,之后才显示出页面,传统,但是实在没想出或者说实现出什么炫酷的切换方式.


### 4.3 `marked`和`highlight`实现的文本编辑:

这俩哥们应该是搭建博客系统时,文本编辑的标配:
* [marked](https://github.com/markedjs/marked)
* [highlight.js](https://highlightjs.org/)

关于这两者的使用网上也是有很多了,这里我主要记录一下我在使用这两者时,遇到的一些**坑**,个人的一些理解,方便同样想要搭建自己博客系统的朋友使用.

#### 4.3.1 `marked`和`highlight`组合达到语法高亮:

> 这个问题应该是首要的,博客文章代码不高亮,干巴巴一片,就太**丑**了

其实就是要用到`marked`的`renderer`,直接看代码:(终于要上代码了:satisfied:)

```js
import marked,{Renderer} from "marked";
import hljs from "highlight.js";
const renderer = new Renderer();

renderer.code = (code,language) => {
  if(!language){
    language = "code";
  }
  let lang_is_valid = (language !== "code" && hljs.getLanguage(language));
  let highlighted = lang_is_valid ? hljs.highlight(language, code).value : code;

  return `<pre><div class="language">${language}</div><code class="hljs ${language}">${highlighted}</code></pre>`;
};

marked.setOptions({renderer});
```

我们先把工作分配明确,在实现语法高亮时,`highlight`负责把**代码**字符串转换为具有**语法高亮结构**的`html`字符串,`marked`只负责告诉`highlight`这串代码用的什么**编程语言**.

好了,接着看上面的代码,`marked`的`renderer`适用于我们来DIY它最终生成的`html`代码,代码中的`renderer.code`自然指的是最终生成的**代码**相关的`html`.

它是一个函数,这里我们可以理解为要重写这个函数,这个函数最终调用时,会传入两个参数,第一个`code`是代码字符串,第二个`language`是代码的编程语言.

代码中的`hljs.highlight(language, code).value`就是根据`marked`提供的两个参数值,所生成的具有代码高亮结构的`html`字符串.

再来看最终的`return`值,我们可以注意到`code`标签里面`class`值是`"hljs空格+编程语言"`,这个`class`的格式是必须的,以告诉`highlight`最终怎么高亮.

以上工作做完之后,我们`marked()`返回的就是具有**高亮代码格式**的`html`字符串,当然前提是我们有引入`highlight`提供的`css`,最终我们才能看到高亮的代码.

> `marked`是怎么知道我们的代码是什么编程语言:neutral_face:,好吧,是我当时孤陋寡闻了:joy:,使用**栅栏代码块**来写代码,让我们来告诉`marked`我们使用的语言.

> 关于`renderer`的更多介绍,可以查看[marked的文档](https://marked.js.org/#/USING_PRO.md#renderer).

#### 4.3.2`marked`生成的链接能跳转到新的标签:

> 默认情况下,`marked`生成的`a`标签是在当前页跳转的,同样通过`renderer`我们可以适当修改一下就好了:

```js
renderer.link = (href,title,text) => {
  return `<a href="${href}" target="_blank">${text}</a>`;
}
```

### 4.4 Mayuri开口说话:

> Mayuri指的就是博客左上角的那个动漫头像,在最开始搭建博客时,我就已经想好要做这个了,当时还准备做几个表情,截了相关的图,不过因为暑假摸了太久,导致目前博客上线时,还只有这个初始的表情.

> 将来也许可能会新增几个表情吧:no_mouth:

#### 4.4.1 嘴部动画

如果你不仔细看,可能不会发现在出现消息文字时,Mayuri的嘴部是在动的.

其实就是三张图片之间在互相切换,因为本人没有一点动漫制作的相关知识,所写这个`css`的动画完全是凭感觉(瞎)写的,最终的效果还行吧,不过还是有一点小瑕疵的:expressionless:.

因为只涉及到一点`css3`的知识,这里就不贴代码了.

#### 4.4.2 文字动画

打字动画的实现,网上讲述的也不少了,但是,我还是想结合我的项目写一写,对这个不感兴趣的朋友可以直接跳过.

打字动画用`js`实现效果肯是要比`css`要好的,本质上就是,通过不断的更换一个元素的`innerHTML`来达到打字的效果.

这里我用到了`Promise`链,当时刚刚看了`promise`,就用了,不知道有没有把这个问题复杂化:confused:.

贴代码:

```js
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
  return promise;
}

//生成新的promise,串成promise链
function type_timer(el,str){
  return new Promise((resolve,reject)=>{
    setTimeout(()=>{
      el.innerHTML = str;
      resolve();
    },115);
  });
}
```

这里我们`export`出了`type`方法,`type`方法,第一个参数是输出文字元素对象,第二个参数是输出的文字,执行type(el,word),就能实现打字效果了.

具体看代码,`type_timer`生成一个含有`setTimeout`的`Promise`,我们对输出的文字进行分割,得到`word_array`数组,再用数组的`reduce`方法串出一条`Promise`链;

使用`Promise`链的好处就是,我们可以通过`then`很好的知道什么时候打字动画结束了.

**对话之间的冲突:confused:**

有时候,我们一条消息对话还没有打完,下一条消息就产生了,这时,肯定会产生两条`Promise`链作用于同一个元素,这就发生了冲突.

这时,我们有两种选择:
* 等前一条`Promise`链执行完,再执行下一条;
* `reject`当前`Promise`链,执行下一条.

我选择了第二种做法,因而需要在上面的代码上稍作修改:

```js
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
    },115);
  });
}
```

用了`vuex`:grimacing:,在`vuex`中存储一个变量`talk_flag`,在执行`type`方法时,传入第三个参数,`vuex`的`$store`对象.

每次我们创建新的消息对话时,先把`vuex`中的`talk_flag`设为`false`,保证,先前的`Promise`链一定会断掉,而在`Promise`链断后,调用的`type`方法就会`catch`到`reject`,在`catch`中,我们再重新把`talk_flag`设为`true`,保证新的`Promise`链能顺利执行.

> 好吧,写到这里我突然意识到,根本不需要用到`vuex`,一个普通的对象就行了,当时编写时,可能觉得`vuex`对象更厉害吧:smiley:.

> 当然,如果有的朋友有更好的实现手段可以和我交流(应该没人有耐心看完这段碎碎念吧~)


## 5. 兼容性

* Chrome上效果很好,Firefox上效果一般,ie上效果未知(并不想测试~)
* 移动端布局做了相关自适应,不过效果不是太满意,后面可能会考虑更好的适配一下移动端吧.

## 6. 写在最后

不知不觉居然写了这么多,算是这几个月的成果的一个总结,秋招了,该好好准备了,接着努力吧~

当然也希望能对想要亲手搭建一个属于自己博客的朋友有所帮助:muscle:吧.

如果你有耐心看到这里,不防点个star:star:吧,也算是对我的一点小小的鼓励:joy:

## 7. TODO
> 不存在的:satisfied:

* Mayuri新的表情添加;
* 移动端更好的视觉效果;
* 文章新增锚点列表;
* 文本编辑时,tab等键位能有对应的作用,更好输入体验;
* 把旧博客的日记功能重新加上.
