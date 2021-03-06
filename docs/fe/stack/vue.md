# Vue

## 源码构建

基于 Rollup 构建

从 package.json 中的 build 脚本出发：scripts/build.js

源码学习 runtime + compile 版本，包含编译；平时开发中更多的使用 runtime 版本，效率更高

## 数据驱动

![new-vue](https://ustbhuangyi.github.io/vue-analysis/assets/new-vue.png)

`function Vue` 入口

- `Vue.prototype.init` 合并配置，各种初始化
  - `Vue.prototype.$mount` 实例挂载，不同平台的实现不同
    - `mountComponent` 挂载组件，最后当更节点挂载完毕 mounted 钩子执行
      - `new Watcher` 监听属性变化，回调，钩子beforeUpdate在它之前
        - `updateComponent` 更新组件
          - `vm._render` 生成vnode，DOM 之所以”昂贵“是因为属性太多了，[snabbdom](https://github.com/snabbdom/snabbdom)一个更纯粹的 vdom库
            - `vm.$options.render` 平时手写 render 比较少，都是 template
              - `vm.$createElement` 用户手写的 render，`vm._c` 模板编译的 render
                - `createElement(_createElement)` 
                  - `normalizeChildren` 规范化子节点的结构
                  - `createComponent` 创建 vnode的实现 -> 组件化继续
          - `vm._update` 更新 DOM，涉及VNode 的 create、diff、patch 等过程
            - `vm.__patch__(patch)` 
              - `createElm`



Vue.js 一个核心思想是数据驱动



## 组件化

`createElement(_createElement)`

- `createComponent` 
  - `Ctor = baseCtor.extend(Ctor)` Vue.extend
    - `Sub` 继承 Vue 的构造器
  - `installComponentHooks` 注册合并何种钩子函数
  - `new Vnode()` 实例化，这里的 vnode 没有 children



## 技巧

### vue-router

- 打开新的页面

  ```js
  let url = this.$router.resolve({name: 'templateDetails', query: {code}})
  window.open(url.href, '_blank');
  ```


### JSX

https://www.w3ctech.com/topic/2130

https://juejin.im/post/5c65511ce51d457fd23cf56b

https://zhuanlan.zhihu.com/p/37920151

### 组件封装

https://juejin.im/entry/5a9a4fd3518825558251cbd4

### 主题切换

[更换主题](https://panjiachen.github.io/vue-element-admin-site/zh/guide/advanced/theme.html#样式覆盖)

## 资源

### 公开课

[尤雨溪讲解](https://www.bilibili.com/video/av49047971/?p=1)



