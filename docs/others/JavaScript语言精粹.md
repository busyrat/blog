# JavaScript 语言精粹

## 1. 精华

优秀的想法：

- 函数
- 弱类型
- 动态对象
- 富有表现力的对象字面量表示法

糟粕的想法：

- 基于全局变量的编程模型

JavaScript 的函数是（主要）基于*词法作用域*的顶级对象。是第一个成为主流的 Lambda 语言

原型继承是 JavaScript 中一个有争议的特性

函数式编程

## 2. 语法

railroad diagram 表示语法：

- 从左开始
- 圆框代表字面量，方块代表规则或描述
- 走通即合法，不通即非法
- 末端只有一条竖条，允许任意一对符号中间插入空白；两条的则代表不允许

### 注释

没有用的注释比没有注释更糟糕

推荐 `//`注释

### 标识符

字母/下划线/$开头 + 字母/数字/下划线

保留字不允许作为变量名和属性名，`undefined` `NaN` `Infinity` 等不是保留字

### 数字

只有一个数字类型，64位浮点数

没有分离整数类型，所以`1 === 1.0`成立，完全避免了短整形的溢出问题

NaN 是一个数值，不等于任何值，包括它自己，用 `isNaN`判断

### 字符串

所有字符串都是16位，因为创建JS的时候，Unicode是16位

`\u`约定用来指定数字字符编码

### 语句

代码块（一对花括号）不会创建新的作用域，因此变量应该被定义在函数的头部

switch、while、for 和 do 语句允许有一个可选的前置标签，它配合 break 语句来使用

false、null、undefined、空字符串' '、数字0、数字NaN 都是 falsy

### 表达式

### 字面量

### 函数

## 3. 对象

JavaScript 的简单数据类型包括数字、字符串、布尔值、null 和 undefined。其他所有的值都是对象。数字、字符串和布尔值虽然都有方法，但是都是不可变的。对象是可变的键控集合。

对象通过引用来传递，它们永远不会被复制

### 原型

继承一个对象：

```js
if (typeof Object.create !== 'function') {
	Object.create = function (o) {
    var F = function () {}
    F.prototype = o
    return new F()
  }
}
var another_stooge = Object.create(stooge)
```

### 枚举

for in 语句可用来遍历一个对象中的所有属性名，包括函数和原型中的属性，属性名出现的顺序是不确定的。

### 删除

delete 运算符可以用来删除对象的属性，它不会触及原型链中的任何对象。

## 4. 函数

所谓编程，就是将一组需求分解成一组函数与数据结构的技能

### 函数对象

函数就是对象，对象是键值对的集合并拥有一个连到原型对象的隐藏连接。对象字面量产生的对象连接到 Object.prototype。函数对象连接到 Function.prototype（该原型对象本身连接到 Object.prototype）。每个函数在创建时会附加两个隐藏属性：函数的上下文和实现函数行为的代码。

### 调用

调用一个函数会暂停当前函数的执行，传递控制权和参数给新函数。除了声明时定义的形式参数，每个函数还接收两个附加的参数：this 和 arguments。this 的 值取决于调用的模式。

JS中一共有 4 中调用模式：方法调用模式、函数调用模式、构造器调用模式、apply 调用模式

#### 构造器通用模式

如果在一个函数前面带上 new 来调用，那么背地里将会创建一个连接到该函数的 prototype 成员的新对象，同时  this 会被绑定到那个新对象上。

一个函数，如果创建的目的就是希望结合 new 前缀来用，那么它就被称为构造器函数，约定大写开头

#### apply 调用模式

因为 JS 是一门函数式的面向对象编程语言，所以函数可以拥有方法。

### 参数

arguments 并不是一个真正的数组，它只是一个 array-like 的对象

### 返回

如果函数调用时在前面加上了 new 前缀，且返回值不是一个对象，则返回 this

### 扩充类型的功能

通过给 Function.prototype 增加方法使得所有函数可用

```js
Function.prototype.method = function (name, func) {
  if (!this.prototype[name]) {
    this.prototype[name] = func
  }
  return this
}
```

丰富 Number 函数

```js
// 数字取整
Number.method('integer', function() {
  return Math[this < 0 ? 'ceil' : 'floor'](this)
})
// example
(-10/3).integer() // -3
```

### 递归

递归是一种强大的编程技术，它把一个问题分解为一组相似的子问题，每一问题都用一个寻常解去解决。递归函数就是会直接或者间接调用自身的一种函数，一般来说，一个递归函数调用自身去解决它的子问题。

// todo 还不是很理解

汉诺塔，解法：

```js
var hanoi = function (disc, src, helper, dst) {
  if (disc > 0) {
    hanoi(disc - 1, src, dst, helper)
    console.log(`移动 ${disc} 从 ${src} 到 ${dst}`)
    hanoi(disc - 1, helper, src, dst)
  }
}
hanoi(3, '柱子一', '柱子二', '柱子三')
```

#### 算法分析：

把一堆圆盘从一个柱子移动另一根柱子，必要时使用辅助的柱子。可以把它分为三个子问题：

- 首先，移动一对圆盘中较小的圆盘到辅助柱子上，从而露出下面较大的圆盘，

- 其次，移动下面的圆盘到目标柱子上

- 最后，将刚才较小的圆盘从辅助柱子上在移动到目标柱子上

把三个步骤转化为简单数学问题：

- 把 n-1个盘子由A 移到 B；

- 把 第 n个盘子由 A移到 C；

- 把 n-1 个盘子由B 移到 C；

### 作用域

作用域控制着变量与参数的可见性及生命周期。

JS 缺少块级作用域，所以最好的做法是在函数的顶部声明函数中可能用到的所有变量。

### 闭包

作用域的好处是内部函数可以访问定义它们的外部函数的参数和变量（除了 this 和 arguments）

一个糟糕的例子

```js
for (i = 0; i < 3; i++) {
  setTimeout(() => console.log(i))
} // 3 3 3

for (i = 0; i < 3; i++) {
	var helper = (i) => () => console.log(i)
  setTimeout(helper(i))
} // 0 1 2
```

### 模块

模块是一个提供接口却隐藏状态与实现的函数或对象

模块模式的一般形式是：一个定义了私有变量和函数的函数；利用闭包创建可以访问私有变量和函数的特权函数；最后返回这个特权函数，或者把它们保存到一个可访问的地方

### 级联

让一些方法返回 this 而不是 undefined 就可以启用级联了，典型的就是 jquery 的实现

### 柯里化

柯里化允许我们把函数与传递给它的参数相结合，产生出一个新的函数

```js
Function.method('curry', function() {
	var slice = Array.prototype.slice,
      args = slice.apply(arguments),
      that = this
  return function () {
    return that.apply(null, args.concat(slice.apply(arguments)))
  }
})
```

### 记忆

```js
var memoizer = function (memo, formula) {
  var recur = function (n) {
    var result = memo[n]
    if (typeof result !== 'number') {
      result = formula (recur, n)
      memo[n] = result
    }
    return result
  }
  return recur
}
```

## 5. 继承

JS 是一门基于原型的语言，这意味着对象直接从其他对象继承

###  伪类

当一个函数对象被创建时，Function 构造器产生的函数对象会运行类似这样的一些代码：

```js
this.prototype = { constructor: this }
```

当采用构造器调用模式，函数执行的方式会被修改：

```js
Function.method('new', function() {
  // 创建一个新对象，它继承自构造器函数的原型对象
  var that = Object.create(this.prototype)
  // 调用构造器函数，绑定 this 到新对象上
  var other = this.apply(that, arguments)
  // 如果它的返回值不是一个对象，就返回新对象
  return (typeof other === 'object' && other)  || that
})
```

伪类继承

```js
var Cat = function () {}
Cat.prototype = new Mammal()
```

## 6. 数组

数组是一段线性分配的内存，它通过整数计算偏移并访问其中的元素。数组是一种性能出色的数据结构。JavaScript 提供了一种拥有一些类数组 （array-like）特性的对象。它把数组的下标转变成字符串，用其作为属性。

大多数语言中，一个数组的所有元素都要求是相同的类型，JS 中允许数组包含任意混合类型的值。

### 长度

length 属性的值是这个数组的最大整数属性名加上 1。它不一定等于数组里的属性的个数。

`[]`后置下标运算符把它所含的表达式转换成一个字符串，如果该表达式有 toStrinng 方法，就是用该方法的值。即允许 `let arr = []; arr.obj = 'oobj';`

把 lenght 设小将导致所有下标大于等于新 length 的属性被删除。

### 删除

由于 JS 的数组其实就是对象，所以 `delete` 运算符可以用来从数组中移除元素，但只是把目标重置为 `undefined`，留下了一个空洞。可以通过`splice`方法达到目的，对于大型数组来说效率不高。

### 枚举

使用 for 循环

### 指定初始值

JS 的数组通常不会预置值。JS 没有多维数组，但就像大多数类C语言一样样，它支持元素为数组的数组。

## 7. 正则表达式

JavaScript 的许多特性都借鉴自其它语言。语法JAVA，函数Scheme，原型Self，正则Perl

```js
var parse_url = /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/;
```

`(?: . . .)`非捕获型分组

```js
var parse_number = /^-?\d+(?:\.\d*)?(?:e[+\-]?\d+)?$/i;
```

### 结构

通过 `new RegExp()`方式创建一个正则表达式需要多加小心，因为反斜杠在正则表达式和在字符串字面量中有一些不同的含义。通常需要双写反斜杠，以及对引号进行转义：

```js
var my_regexp = /"(?:\\.|[^\\\"])*"/g
var my_regexp = new RegExp("\"(?:\\\\.|[^\\\\\\\"])*\"",'g');
```

## 10. 优美的特性

精简的 JavaScript 里都是好东西，包括以下主要内容。

- **函数是顶级函数**：函数是有词法作用域的闭包
- **基于原型继承的动态对象**：对象是无类别的。我们可以通过普通的赋值给任何对象增加一个新成员属性。一个对象可以从另一个对象继承成员属性。
- **对象字面量和数组字面量**：这对创建新的对象和数组来说是一种非常方便的表示法。JavaScript 字面量是数据交换格式 JSON 的灵感之源。

额外的功能：

- 增加了 pi 作为常量，为了证明解析器的一个特性。
- 增加了块级作用域

## A. 毒瘤

### 全局变量

- 一个全局变量可以被程序的任何成分在任意时间修改
- 不同子程序容易引起命名冲突

#### 尽量避免

- 任何函数之外放置一个 var 语句
- 挂载在 window 对象上
- 未经声明的变量，即隐式的全局变量

### 作用域

- 没有提供块级作用域：代码块中声明的变量在包含此代码块的函数的任何位置都是可见的
- 大多数语言中，变量声明放在第一次使用上，JS 中最好的方式是放在最前

### 自动插入分号

避免这种代码：

```js
return
{
  status: true
}
```

### Unicode

Unicode 把一对字符视为一个单一的字符。而 JavaScript 认为一对字符是两个不同的字符

### typeof

`typeof null` 结果是 object

### parseInt

接收两个参数，如果是`08`最好写成`parseInt('08', 10)`

### NaN

`NaN === NaN // false`，可以通过 `isNaN(NaN) // true`

### 伪数组

arguments 数组不是一个数组，它只是一个有着 length 成员属性的对象

### hasOwnProperty

它是一个很好的方法，却不是一个运算符，容易被覆盖

## B. 糟粕

- 在JavaScript 的执行环境一般接触不到硬件，所以非常慢，不建议使用位运算