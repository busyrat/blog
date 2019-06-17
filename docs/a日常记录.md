## TODO

- vue ellipsis
- Prettier
- css grid
- MutationObserver



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

