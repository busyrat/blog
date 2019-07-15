## TODO

- vue ellipsis
- Prettier
- css grid
- MutationObserver
- gis
- canvas
- Iconfont webpack
- Object.create

## 日常

html: dl>dt+dd

[Dockerizing a React App](https://mherman.org/blog/dockerizing-a-react-app/)

## 高阶函数

至少满足下列一个条件的函数，就是高阶函数

- 接受一个或多个函数作为输入
- 输出一个函数

日常经常使用的 `map`、`filter` 都是接受一个函数作为参数，所以他们属于高阶函数

常见的面试题，就考察了这一点：

```js
function add(a) {
    function sum(b) { // 使用闭包
    	a = a + b; // 累加
    	return sum;
    }
    sum.toString = function() { // 重写toString()方法
        return a;
    }
    return sum; // 返回一个函数
}
add(1); // 1
add(1)(2); // 3
add(1)(2)(3)；// 6
```

### 函数柯里化

> 在数学和计算机科学中，柯里化是一种将使用多个参数的函数转换成一系列使用一个参数的函数，并且返回接受余下的参数而且返回结果的新函数的技术。



## wechaty

[没有账号限制](https://github.com/Chatie/wechaty/issues/990#issuecomment-397327621)

[文档](https://docs.chatie.io/v/zh/)



## 流程

### 1. PRD

- Prepare
  - 熟悉迭代需求：阅读 PRD
  - leader 收集问题，整理出疑问点，提交给 PD
  - 分工，小组内部明确各自开发模块
  - 成果物：PRD 疑问点，分工
- Review
  - 理解 PD 对迭代的目标
  - 上个阶段的疑问得到回答

### 2. UI

- Prepare
  - 熟悉迭代需求：阅读高保真
  - leader 收集问题
  - 细化分工，抽象公共组件
- Review
  - 必要的话，UI 讲解交互逻辑，如果有新的公共组件需要说明

### 3. ERD

- Discussion
  - 确认自己负责模块的BE，商讨接口

### 4. Coding

- Coding
- Case review
- code review

### 5. Test

- Fix bugs

## TO 

### 美联实验学校

- 敏行学院为公办对口，博雅学院【华一班（理）、人文班（文）和常青藤班（出国）】民办
- 包括小学和初中，看起来更像是个小学
- 2018 年成立，几乎没什么教学经验
- 合作公司，武汉美联地产有限公司教育背景北京市鼎石学校、文华学院、武汉科技大学城市学院
- 出国方向，海外留学介绍没有

### 我的建议

- 国内义务教育阶段的水平其实还可以，设置高中层面也不差，差距主要在大学，未来出国留学也是建议在高中之后，我高中曾经也有国际班，对口新加坡的大学，后期发展不太好，相反初中同学中，有一批出国的都是在都是在十一中读的，所以我一直不看好在国内环境下的国际班

  

## iconfont

[自动拉取更新](https://blog.csdn.net/shentibeitaokong/article/details/82463941)