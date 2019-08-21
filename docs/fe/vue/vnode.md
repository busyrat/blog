# VNode

在使用 element 的 MessageBox组件时，发现了一个有意思属性：

| 参数    | 说明                    | 类型           | 可选值 | 默认值 |
| :------ | :---------------------- | :------------- | :----- | :----- |
| message | MessageBox 消息正文内容 | string / VNode | —      | —      |

除了一个常见 string 类型外，还有个 VNode 类型，下面就对这一点展开的研究下

## 什么是 VNode

VNode 就是 VDOM 树的节点描述，它包含的信息会告诉 Vue 页面上需要渲染什么样的节点，也包括及其子节点的描述信息。

比方说：

```json
{
    tag: 'div'
    data: {
        class: 'test'
    },
    children: [
        {
            tag: 'span',
            data: {
                class: 'demo'
            }
            text: 'hello,VNode'
        }
    ]
}
```

渲染之后的结果就是这样的：

```html
<div class="test">
    <span class="demo">hello,VNode</span>
</div>
```

VNode 的属性数量比真正的 DOM node 少很多，频繁更新 DOM 所消耗的性能基本都花在这个部分上了，还不清楚的可以看看更加详细的[官方文档]([https://cn.vuejs.org/v2/guide/render-function.html#%E8%99%9A%E6%8B%9F-DOM](https://cn.vuejs.org/v2/guide/render-function.html#虚拟-DOM)) 和 [VNode接口](https://github.com/vuejs/vue/blob/dev/src/core/vdom/vnode.js)，有时间可以深入了解VDOM的先驱库 [snabbdom](https://github.com/snabbdom/snabbdom)

## 如何创建 VNode

Vue 的实例上挂载一个全局的方法 `vm.$creactElement` ，这个方法就是用户手写 render 方法使用的，很多场景用 h 代表了。这个方法接收四个参数：`tag标签或者组件`,` VNodeData`, `children`, `normalizationType节点规范的类型`，如果想创建一个普通的 html 节点

```html
<p>
	<span>VNode</span>
</p>
```

就可以写成

```js
const h = vm.$createElement;
h('p', null, [
	h('span', null, 'VNode ')
])
```

又或者想返回组件的 VNode，第二参数 VNodeData 可以[参考源码定义](https://github.com/vuejs/vue/blob/d40b7ddb8177944d1dd50f4f780e6fd92c9455c2/flow/vnode.js#L35)

```js
vm.$createElement(Component, { props })
```

另外，每个已经挂载的组件也有一个私有属性 `_vnode`，类似：

```js
const ComponentConstructor = Vue.extend(Component)
new ComponentConstructor({ propsData: props }).$mount()._vnode
```

## 一些启发

MessageBox 组件是如何做到通过属性传递 VNode 的呢？查看 element 的[源代码](https://github.com/ElemeFE/element/blob/dev/packages/message-box/src/main.js)，发现是通过 slot 传递的

```js
// 实例化组件
instance = new MessageBoxConstructor({
  el: document.createElement('div')
});

// 将 vnode 通过 slot 传递给组件
if (isVNode(instance.message)) {
  instance.$slots.default = [instance.message];
} else {
```

