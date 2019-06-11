# prettier

> 只关心代码格式化，不关心语法问题



## vscode + vutur + prettier

普通的配置 prettier 是这样的：

```json
{
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

vetur 默认的格式化就是 prettier，配置方式如下：

```json
{
  "vetur.format.defaultFormatter.html": "prettier",
  "vetur.format.defaultFormatter.js": "prettier",
  "vetur.format.defaultFormatter.less": "prettier",
  "vetur.format.defaultFormatterOptions": {
    "prettier": {
      "printWidth": 160,  // 每行的宽度
      "singleQuote": true, // 使用单引号
      "semi": false, // 末尾使用分号
    }
  }
}
```



## 参考文章

[超人气代码格式化工具prettier](https://juejin.im/post/5cc58039f265da03775c5a6f)

