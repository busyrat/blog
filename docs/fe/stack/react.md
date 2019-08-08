# React

## http请求接口数据的时机

下面几个方法一次执行：

- constructor()

- componentWillMount()

- render()

- componentDidMount()

componentWillMount方法的调用在constructor之后，在render之前，在这方法里的代码调用setState方法不会触发重渲染，所以它一般不会用来作加载数据之用，它也很少被使用到。



