# linux

### 修改 ssh 默认 22 端口

```shell
vim /etc/ssh/sshd_config

# 找到 Port 22那一行，修改成
Port 22
Port 2202

# 重启 sshd 服务
systemctl restart sshd
```

