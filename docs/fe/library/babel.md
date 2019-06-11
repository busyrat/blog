# Babel 

> 7.4.0

- 相关的包
  - @babel/core 核心包
  - @babel/cli 终端工具
  - @babel/plugin-xxx 官方插件
  - @babel/preset-xxx 预设，即插件集合，推荐 env
  - @babel/polyfill 补丁，会造成全局污染
  - @babel/plugin-transform-runtime @babel/runtime(**npm install -S**) 可以把工具函数转换成引用的形式
  - babel-loader webpack 的 loader
- 相比 babel6 的改变
  - 废除了 staage0-3
  - 告别 preset-es2015，拥抱 babel-preset-env
- 用 babel.config.js 代替 .babelrc  
  
- 坑
  - 插件顺序：从后往前；预设顺序：从前往后 



### babel-polyfill vs babel-runtime vs babel-preset-env





### 参考

[Babel快速上手使用指南](https://juejin.im/post/5cf45f9f5188254032204df1#heading-6)

[查看ES6 兼容]([http://kangax.github.io/compat-table/es6/](http://kangax.github.io/compat-table/es6/))

