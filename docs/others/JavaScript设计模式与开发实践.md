## 7. 迭代器模式

迭代器模式是指提供一种方法顺序访问一个聚合对象中的各个元素，而又不需要暴露该对象的内部表示。迭代器模式可以把迭代的过程从业务逻辑中分离出来，在使用迭代器模式之后，即使不关心对象的内部构造，也可以按顺序访问其中的每个元素。

- 内部迭代器：完全接手整个迭代过程，外部只需要一次初始调用
- 外部迭代器：必须显式地请求迭代下一个元素。增加了一些调用的复杂度，但相对也增强了迭代器的灵活性，我们可以手工控制 迭代的过程或者顺序

### 迭代器模式的应用举例

```js
var getUploadObj = function() {
  try {
    return new ActiveXObject('TXFTNActiveX.FTNUpload') // IE 上传控件
  } catch (e) {
    if (supportFlash()) {
      // supportFlash 函数未提供
      var str = '<object type="application/x-shockwave-flash"></object>'
      return $(str).appendTo($('body'))
    } else {
      var str = '<input name="file" type="file"/>' // 表单上传
      return $(str).appendTo($('body'))
    }
  }
}

// 优化 (把代码写多) 几种不同的上传方法在各自的函数里互不干扰
var getActiveUploadObj = function() {
  try {
    return new ActiveXObject('TXFTNActiveX.FTNUpload') // IE 上传控件
  } catch (e) {
    return false
  }
}
var getFlashUploadObj = function() {
  if (supportFlash()) {
    // supportFlash 函数未提供
    var str = '<object type="application/x-shockwave-flash"></object>'
    return $(str).appendTo($('body'))
  }
  return false
}
var getFormUpladObj = function() {
  var str = '<input name="file" type="file" class="ui-file"/>' // 表单上传
  return $(str).appendTo($('body'))
}
var iteratorUploadObj = function() {
  for (var i = 0, fn; (fn = arguments[i++]); ) {
    var uploadObj = fn()
    if (uploadObj !== false) {
      return uploadObj
    }
  }
}
var uploadObj = iteratorUploadObj(getActiveUploadObj, getFlashUploadObj, getFormUpladObj)
```

迭代器模式是一种相对简单的模式，简单到很多时候我们都不认为它是一种设计模式。

## 9. 发布—订阅模式

发布—订阅模式又叫**观察者模式**，它定义对象间的一种一对多的依赖关系，当一个对象的状态发生改变时，所有依赖于它的对象都将得到通知。在 JavaScript 开发中，我们一般用**事件模型**来替代传统的发布—订阅模式。

- 可以广泛应用于异步编程中，这是一种替代传递回调函数的方案。

- 可以取代对象之间硬编码的通知机制，一个对象不用再显式地调 用另外一个对象的某个接口。

### DOM 事件、自定义事件

三个必要条件：

- 首先要指定好谁充当发布者
- 然后给发布者添加一个缓存列表，用于存放回调函数以便通知订阅者
- 最后发布消息的时候，发布者会遍历这个缓存列表，依次触发里面存放的订阅者回调函数

```js
var event = {
  clientList: [],
  listen(key, fn) {
    if (!this.clientList[key]) {
      this.clientList[key] = []
    }
    this.clientList[key].push(fn)
  },
  trigger() {
    let key = Array.prototype.shift.call(arguments)
    let fns = this.clientList[key]
    if (!fns || fns.length === 0) {
      return false
    }

    for (let i = 0, fn; (fn = fns[i++]); ) {
      fn.apply(this, arguments)
    }
  },
  remove(key, fn) {
    let fns = this.clientList[key]
    if (!fns) {
      return false
    }
    if (!fn) {
      fns && (fns.length = 0)
    } else {
      for (let l = fns.length - 1; l >= 0; l--) {
        if (fns[l] === fn) {
          fns.splice(l, 1)
        }
      }
    }
  }
}

let installEvent = obj => {
  for (let i in event) {
    obj[i] = event[i]
  }
}

let salesOffices = {}
installEvent(salesOffices)

// 订阅
salesOffices.listen(
  'squareMeter88',
  (fn1 = function(price) {
    console.log('价格= ' + price)
  })
)

salesOffices.listen('squareMeter100', function(price) {
  console.log('价格= ' + price)
})

// 发布
salesOffices.remove('squareMeter88', fn1)
salesOffices.trigger('squareMeter88', 2000000)
```

### 登录更新页面的优化

```js
login.success(function(data) {
  header.setAvatar(data.avatar)
})

// 优化，分离解耦
$.ajax('http:// xxx.com?login', function(data) {
  login.trigger('loginSucc', data) // 发布登录成功的消息
})
var header = (function() {
  // header 模块
  login.listen('loginSucc', function(data) {
    header.setAvatar(data.avatar)
  })
  return {
    setAvatar: function(data) {
      console.log('设置 header 模块的头像')
    }
  }
})()
```

### 模块间通信

我们要留意一个问题，模块之间如果用了太多的全局发布—订阅模式来通信，那 么模块与模块之间的联系就被隐藏到了背后。我们最终会搞不清楚消息来自哪个模块，或者消息 会流向哪些模块，这又会给我们的维护带来一些麻烦，也许某个模块的作用就是暴露一些接口给 其他模块调用。

### 完整的功能

- 离线模式
- 命名空间

```js
var Event = (function() {
  var global = this,
    Event,
    _default = 'default'

  Event = (function() {
    var _listen,
      _trigger,
      _remove,
      _slice = Array.prototype.slice,
      _shift = Array.prototype.shift,
      _unshift = Array.prototype.unshift,
      namespaceCache = {},
      _create,
      find,
      each = function(ary, fn) {
        var ret
        for (var i = 0, l = ary.length; i < l; i++) {
          var n = ary[i]
          ret = fn.call(n, i, n)
        }
        return ret
      }

    _listen = function(key, fn, cache) {
      if (!cache[key]) {
        cache[key] = []
      }
      cache[key].push(fn)
    }

    _remove = function(key, cache, fn) {
      if (cache[key]) {
        if (fn) {
          for (var i = cache[key].length; i >= 0; i--) {
            if (cache[key][i] === fn) {
              cache[key].splice(i, 1)
            }
          }
        } else {
          cache[key] = []
        }
      }
    }
    _trigger = function() {
      var cache = _shift.call(arguments),
        key = _shift.call(arguments),
        args = arguments,
        _self = this,
        ret,
        stack = cache[key]

      if (!stack || !stack.length) {
        return
      }
      return each(stack, function() {
        return this.apply(_self, args)
      })
    }

    _create = function(namespace) {
      var namespace = namespace || _default
      var cache = {},
        offlineStack = [],
        ret = {
          listen: function(key, fn, last) {
            _listen(key, fn, cache)
            if (offlineStack === null) {
              return
            }
            if (last === 'last') {
              offlineStack.length && offlineStack.pop()
            } else {
              each(offlineStack, function() {
                this()
              })
            }

            offlineStack = null
          },
          one: function(key, fn, last) {
            _remove(key, cache)
            this.listen(key, fn, last)
          },
          remove: function(key, fn) {
            _remove(key, cache, fn)
          },
          trigger: function() {
            var fn,
              args,
              _self = this
            _unshift.call(arguments, cache)
            args = arguments
            fn = function() {
              return _trigger.apply(_self, args)
            }
            if (offlineStack) {
              return offlineStack.push(fn)
            }
            return fn()
          }
        }

      return namespace 
        ? (namespaceCache[namespace] 
           ? namespaceCache[namespace] 
           : (namespaceCache[namespace] = ret)) 
      	: ret
    }
    return {
      create: _create,
      one: function(key, fn, last) {
        var event = this.create()
        event.one(key, fn, last)
      },
      remove: function(key, fn) {
        var event = this.create()
        event.remove(key, fn)
      },
      listen: function(key, fn, last) {
        var event = this.create()
        event.listen(key, fn, last)
      },
      trigger: function() {
        var event = this.create()
        event.trigger.apply(this, arguments)
      }
    }
  })()

  return Event
})()

/************** 先发布后订阅 ********************/
Event.trigger('click', 1)
Event.listen('click', function(a) {
  console.log(a) // 输出:1
})

/************** 使用命名空间 ********************/

Event.create('namespace1').listen('click', function(a) {
  console.log(a) // 输出:1
})
Event.create('namespace1').trigger('click', 1)
Event.create('namespace2').listen('click', function(a) {
  console.log(a) // 输出:2
})
Event.create('namespace2').trigger('click', 2)
```

### 优缺点

- 优点：
  - 时间上解耦
  - 对象之间解耦
  - 大量的应用在异步编程中
  - JS本身也是一门基于事件驱动的语言
- 缺点：
  - 消耗一定的时间和内存
  - 订阅的消息可能永远收不到消息，却始终占用内存
  - 过度使用，代码不容易跟踪

