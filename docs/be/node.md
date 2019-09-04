## path 模块

path.join() 结果是绝对路径

path.relative() 相对地址

## node调试

nodeJS 从 v6.x 开始内置了一个 inspector，可以用来调试，例如：`node --inspect app.js`

### chrome

启动 node 后，在 chrome 打开 `chrome://inspect`就可以找到相应的入口，如果需要设置断点，参数改成`--inspect-brk`，这个时候就会自动停在第一个断点上。

### vscode

配置调试文件

```json
// .vscode/launch.json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "node inspect",
      "program": "${workspaceFolder}/app.js"
    }
  ]
}
```

### 调试

- webpack

```
node --inspect-brk ./node_modules/webpack/bin/webpack.js --config webpack.pro.js
```

- vuepress

```
node --nolazy --inspect-brk=9229 ./node_modules/vuepress/cli.js dev docs --no-cache
```

配合 vscode 启动配置

```json
{
  "version": "0.2.0",
  "configurations": [
      {
          "type": "node",
          "request": "launch",
          "name": "Debug vuepress",
          "runtimeExecutable": "npm",
          "runtimeArgs": ["run-script", "debug"],
          "port": 9229
      }
  ]
}
```

### 参考

[node官方调试文档](https://nodejs.org/en/docs/guides/debugging-getting-started/)

[vscode官方NODEJS调试文档](https://code.visualstudio.com/docs/editor/debugging#_launch-configurations)