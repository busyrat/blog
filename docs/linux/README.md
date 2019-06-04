# linux

## 1. 修改 ssh 默认 22 端口

```shell
vim /etc/ssh/sshd_config

# 找到 Port 22那一行，修改成
Port 22
Port 2202

# 重启 sshd 服务
systemctl restart sshd
```

## 2. 定时任务



- crontabs命令`可以定时按计划执行任务
  - 有些教程是执行 `crond`，实际上是 `cron`
- `ls -l /etc/init.d` 查看那些命令可以执行
