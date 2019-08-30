# ssr

> 科学上网

## 步骤

- 查看服务器语言环境：`locale`
  出现：

  ```
  LANG=
  LANGUAGE=
  LC_CTYPE="POSIX"
  LC_NUMERIC="POSIX"
  LC_TIME="POSIX"
  ...
  ```

  执行 `export LANG=en_US.UTF-8` 改变语言。再次输入 `locale`

  出现类似下面的  报错：

  ```
  locale: Cannot set LC_CTYPE to default locale: No such file or directory
  locale: Cannot set LC_MESSAGES to default locale: No such file or directory
  locale: Cannot set LC_ALL to default locale: No such file or directory
  ...
  ```

  需要下载语言包：`sudo locale-gen en_US.UTF-8` 英文版本：en_US.UTF-8

- 文档介绍

  ```
  apt-get install python-pip
  pip install git+https://github.com/shadowsocks/shadowsocks.git@master
  ```

  但是这里作为一个  新的服务器，执行前需要准备其他依赖

  ```
  apt-get update
  # git 的依赖
  apt-get install libcurl4-gnutls-dev libexpat1-dev gettext libz-dev libssl-dev
  apt-get install git
  ```

  除此之外还需要提醒，下载好 pip 后，到运行`pip install`前，需要重新进入服务器

- 开启并在后台运行

  ```
  sudo ssserver -p 443 -k password -m aes-256-cfb -d start
  ```

- 关闭

  ```
  sudo ssserver -d stop
  ```

## PAC无效的问题

方法打开软件包，修改`abp.js`
这行

```js
var direct = 'DIRECT;'；
```

下面添加

```js
rules = rules.filter(item => !(/^@@/g).test(item)); // 删除所有强制屏蔽规则
```

我自己使用的只删除与自定义冲突的屏蔽规则是

```js
var direct = 'DIRECT;';
// 去除用户自定义规则在强制屏蔽规则列表里面，如pan.baidu.com,需要去除@@||baidu.com
var usersRules = rules.slice(0, rules.indexOf("||4tern.com")); // 用户自定义规则
var exRules = rules.filter(item => (/^@@/g).test(item)).map(item => item.replace('@@||', '')); // 强制屏蔽规则
var delRules = exRules.filter(item => usersRules.find(item1 => item1.indexOf(item) !== -1)).map(item => '@@||' + item); // 筛选出需要删除的规则
rules = rules.filter(item => !delRules.find(item1 => item1.indexOf(item) !== -1)); // 重新修正规则

for (var i = 0; i < rules.length; i++) {
  defaultMatcher.add(Filter.fromText(rules[i]));
}
```

修改完成后需要修改一下自定义的顺序，为了重新生成配置文件gfwlist.js

## 参考

[shadowsocks](https://github.com/shadowsocks/shadowsocks/tree/master)

[修改 locale](http://wiki.ubuntu.org.cn/%E4%BF%AE%E6%94%B9locale)

[安装 git](https://git-scm.com/book/zh/v1/%E8%B5%B7%E6%AD%A5-%E5%AE%89%E8%A3%85-Git)

[PAC代理无法添加百度网盘代理](https://github.com/shadowsocks/ShadowsocksX-NG/issues/881)