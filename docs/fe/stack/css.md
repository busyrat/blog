# css

## 背景彩虹

```css
background-image: linear-gradient(to right bottom, #ff0000, #ffa500, #ffff00, #008000, #0000ff, #4b0082, #9400d3);
```

## tips

- 块级元素和 display: block; 不是一个概念，因为 display: table; 和 display: list-item 都是块级元素
- button 是典型的 inline-block 有个最大宽度 240px
- content-box 下 width 和 padding border 分离
- `<textarea>`  是替换元素，尺寸由内部元素决定。
- box-sizing 被发明出来最大的初衷应该是解决替换元素宽度自适应问题
- 重置样式：img { display: inline-block }
- 图片资源的固有尺寸是无法改变的
- &:empty
- content 是一个非常强大的 CSS 属性，其中一个强 大之处就是计数器效果

## Flex

轴线概念：主轴，副轴

display: flex

flex-wrap: wrap 到容器的宽度小于子元素的宽度的时候，会压缩子元素

### 容器：

| 理解 | 方向           | 换行      | 主轴对齐        | 副轴对齐     | 多轴对齐      |
| ---- | -------------- | --------- | --------------- | ------------ | ------------- |
| 属性 | flex-direction | flex-wrap | justify-content | align-iterms | align-content |
| 默认 | row            | nowrap    | flex-start      | flex-start   | stretch       |

缩写：flex-flow: flex-direction flex-wrap

### 项目：

| 理解 | 顺序  | 放大比例  | 缩小比例    | 自身大小   | 自身对齐   |
| ---- | ----- | --------- | ----------- | ---------- | ---------- |
| 属性 | order | flex-grow | flex-shrink | flex-basis | align-self |
| 默认 | 0     | 0         | 1           | auto       | 继承       |

### 缩写：

flex: flex-grow flex-shrink flex-basis; ***none***: 0 0 auto; ***auto***: 1 1 auto

flex: 1 => 1 1 0%

flex: 24px => 1 1 24px

可以理解为，如果是一个数字，则依次赋值，如果是带单位或百分比则赋值给 flex-basis

### 箭头阴影

```
  &::after {
    content: '';
    position: absolute;
    z-index: -1;
    width: 30px;
    height: 15px;
    left: 50%;
    transform: translate3d(-50%, 0, 0);
    bottom: 0;
    background-color: white;
  }
  &::before {
    content: '';
    position: absolute;
    z-index: -2;
    width: 0;
    height: 0;
    bottom: -16px;
    left: 50%;
    box-sizing: border-box;

    border: 8px solid black;
    border-color: transparent transparent white white;

    transform-origin: 0 0;
    transform: translate3d(-12px, 0, 0) rotate(-45deg);

    box-shadow: 0 2px 6px 0 rgba(174, 183, 197, 0.5);
  }
```

### 对 flex-basis 的理解：

规定的是子元素的基准值

auto：主尺寸 | content

content：px | auto

百分比：相对于父容器 | auto

## BFC 和 IFC

> BFC = Block Formatting Context = Block-level box + Formatting Context
>
> IFC = Inline Formatting Context

block-level box 块级元素：block, list-item, table

inline-level box 内联元素：inline, inline-block, inline-table

### BFC

满足其一即可：

- 根元素
- float 不为 none
- overflow 不为 visible
- display 为 inline-block, table/table-cell, table-caption
- position 为 absolute 或 fixed

规则:

- Box垂直方向的距离由margin决定。属于同一个BFC的两个相邻Box的margin会发生重叠
- BFC的区域不会与float box重叠。
- 计算BFC的高度时，浮动元素也参与计算

可以解决的问题：

- 相邻 margin 的合并问题
- 父子 margin 融合的问题
- 和 float box 重叠
- 清浮动

### 参考

[BFC 原理解析](https://github.com/zuopf769/notebook/blob/master/fe/BFC%E5%8E%9F%E7%90%86%E5%89%96%E6%9E%90/README.md)

## CSS 动画

### transition

- transition-property: 属性
- transition-duration: 间隔
- transition-timing-function: 曲线
- transition-delay: 延迟
- 常用钩子: transitionend

