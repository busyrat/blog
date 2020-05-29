# npm

### package.json

- npm 使用git仓库地址示例：`git+ssh://git@git.wh.site:fe/react-native-calendars#master#ca1a48030bc4c49762d499c69d3e26765c99e705`

- dependencies 和 devDependencies 主要差别是在其他项目引用时是否下载依赖，比如：

  A:

  ​	dependencies: B

  ​	devDependencies: C

  B:

  ​	dependencies: D

  ​	devDependencies: E

  项目 A 执行 `yarn install` ,只会把 BCD 下载下来，E 会被忽略

### npm link

[你所不知道的模块调试技巧 - npm link](https://github.com/atian25/blog/issues/17)

自己新建一个包，在根目录执行 `npm link` 命令，就会把这个包链接到全局，然后在另一个工程中 npm link path/xxx 就会把全局的包连接到这个工程中，实现了两个工程开发的同步，卸载 npm unlink xxx



### npm-check-updates

查看依赖更新

```
# 查看更新列表
ncu
# 更新包
ncu -u xxx
```



### 各种超时

```
yarn install --network-timeout 1000000
```

[参考](https://github.com/yarnpkg/yarn/issues/4890#issuecomment-358179301)



### 版本自动更新

```shell
npm version patch
npm version minor
npm version major
```



