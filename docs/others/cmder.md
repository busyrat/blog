# Cmder

> Windows 优雅的终端

从 Mac 转回 Windows 碰到的第一个问题是终端，Mac 环境下的各种终端百花齐放，Windows 自带的 cmd 基本不能用，就算是升级版本的 PowerShell 还是满足不了日常开发需求。Cmder 就是个很不错的工具

## 几个优点

- 好看

- git 很友好

- 内置了很多 Unix 命令

- 可以增加一些别名

## 安装

[官网下载](https://cmder.net/)，完整版包括 git，选择 `Mini` 版本

## 集成到 VSCode

配置添加：

```json
// [cmder_root] 自行更改
{
    "terminal.integrated.shell.windows": "cmd.exe",
    "terminal.integrated.env.windows": {"CMDER_ROOT": "[cmder_root]"},
    "terminal.integrated.shellArgs.windows": ["/k", "[cmder_root]\\vendor\\init.bat"],
}
```

## 将Cmder添加到系统右键菜单中

- 把 Cmder 加到环境变量，然后 Win + r 运行 cmder 使环境变量更新

- 添加 cmder 到右键菜单：管理员权限的终端下执行 `Cmder.exe /REGISTER ALL`

## 小技巧

- 增加自定义别名：在 `[cmder_root]\config\user_aliases.cmd` 添加


