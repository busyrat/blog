# Electron

## 调试

### 两个进程

- 主进程（main）

- 渲染进程（renderer）

两个进程可以互相交互，渲染进程有多个，主进程只有一个

### 主进程调试

启动修改成：`electron --inspect=5858 .`

然后在**浏览器**中打开：`chrome://inspect` -> Configure按钮填写：`loaclhost:8585`

也可以在 **VScode** debugger  .vscode/launch.json 文件配置

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Debug Main Process",
      "type": "node",
      "request": "launch",
      "cwd": "${workspaceFolder}",
      "runtimeExecutable": "${workspaceFolder}/node_modules/.bin/electron",
      "windows": {
        "runtimeExecutable": "${workspaceFolder}/node_modules/.bin/electron.cmd"
      },
      "args" : ["."],
      // "outputCapture": "std"
    }
  ]
}
```

## WebRTC

### getUserMedia

获取多媒体数据（视频、音频）

### RTCPeerConnection

建立P2P连接，传输多媒体数据

### RTCDataChannel

传输数据

## electron-about-window

窗口信息

## 禁止多开

app.requestSingleInstanceLock()

## WebSocket

websocket.org/echo.html 测试

## 打包

1. 下载二进制文件
2. 添加业务代码
3. 修改文件信息
4. 制作镜像

两个打包工具 electron-builder 和 electron-forge

```shell
// windows 用管理员启动 cmd 安装
yarn global add --production windows-build-tools
// 安装打包工具
yarn add electron-build cross-env -D
```

Windows 下需要证书签名，否则会被杀毒软件误杀

Mac 下没有证书签名，无法自动更新

## 坑s

### `process in not define`

在 `webPreferences`下添加：`nodeIntegration: true`

还有其他变量找不到都跟这个有关系

### drop 事件和 dropover 事件都需要禁止默认事件

`event.preventDefault()`

padStart