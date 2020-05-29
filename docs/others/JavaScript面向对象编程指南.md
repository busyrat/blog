## 1. 面向对象的 JavaScript

JavaScript 这个术语通常涵盖了以下 3 个部分：

- ECMAScript
- DOM
- BOM

面向对象程序设计（OOP）中最常用到的概念：

- 对象（实例）、方法、属性
- 类：需要注意的是，JS中没有类，一切都是基于对象的
- 封装
- 聚合
- 重用与继承：通常是类与类之间的关系，但 JS 中只有对象
- 多态

## 2. 基本数据类型

绝大部分值在转换为布尔类型时都为 true，但以下除外：

```js
""(空字符串), null, undefined, 0, NaN, false
```

## 3. 函数

### 3.2.5 URI的编码与反编码

```js
var url = 'http://www.packtpub.com/scr ipt.php?q=this and that';
encodeURI(url);	// 反过来是 decodeURI
// "http://www.packtpub.com/scr%20ipt.php?q=this%20and%20that"
encodeURIComponent(url); // 反过来是 decodeURIComponent
// "http%3A%2F%2Fwww.packtpub.com%2Fscr%20ipt.php%3Fq%3Dthis%20and%20that"
```

### 3.2.6 eval

对于许多经验丰富的 JavaScript 程序员来说：eval is evil，因为：

- 安全性方面，有很多不确定性
- 性能方面比直接执行脚本要慢

### 3.3 变量的作用域

在 JavaScript 中，变量的定义并不是以代码块作为作用域的，而是以函数作为作用域。也就是说 if 和 for 循环这样的代码块中，在外面也是可见的。

如果我们声明一个变量时没有使用 var 语句，该变量就会被默认为全局变量。

变量提升。当 JavaScript 执行过程进入新的函数时，这个函数内被声明的所有变量都会被移动(或者说提升)到函数最开始的地方。只有函数体内声明的这些变量在该函数执 行开始时就存在，而与之相关的赋值操作并不会被提升。

### 3.7 练习题

```js
parseInt(1e1) // 10
parseInt('1e1') // 1
parseFloat('1e1') // 10
parseInt('1e1', 16) // 481
```

tip: parseInt可以转换多种进制，但是无法识别指数。

tip2: 进制转换建议使用：`num.toString(radix)`

## 5. 原型

每个对象都会有一个构造器，而原型本身也是一个对象，这意味着它必然也有一个构造器，而这个构造器又会有自己的原型。于是这种结构可能会一直不断地持续下去，并最终取决于原型链(prototype chain)的长度，但其最后一环肯定是 Object 内建对象，因为它是最高级的父级对象。

千万要记住，`__proto__`只能在学习或调试的环境下使用。或者如果你的代码碰巧只需 要在符合 ES5 标准的环境中使用的话，你也可以使用 `Object.getPrototypeOf()`方法。

### 5.2 扩展内建对象

```js
String.prototype.reverse = function() {
      return Array.prototype.reverse.apply(this.split('')).join('');
}
```

当我们重写某对象的 prototype 时，需要重置相 应的 constructor 属性。

正如上面所说，出于效率考虑，我们应该尽可能地将一些可重用的属性和方法添加到 原型中去。

