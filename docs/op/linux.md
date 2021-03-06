# linux

## ssh

- 修改 ssh 默认 22 端口

  ```shell
  vim /etc/ssh/sshd_config

  # 找到 Port 22那一行，修改成
  Port 22
  Port 2202

  # 重启 sshd 服务
  systemctl restart sshd
  ```

- 免问权限

  ```shell
  $ ssh -o StrictHostKeyChecking=no
  ```

- 免密登录

  ```
  # .ssh/authorized_keys 添加ssh公钥
  ssh-rsa xxxxxxx
  ```

## 定时任务

- crontabs 命令`可以定时按计划执行任务
  - 有些教程是执行 `crond`，实际上是 `cron`
- `ls -l /etc/init.d` 查看那些命令可以执行

## 进程

- 查看`ps -ef | grep mongo`

## 系统信息

- 查看系统：`cat /etc/os-release`
- Centos 查看 系统信息：`uname -r` 和 `cat /etc/issue` 或 `cat /etc/redhat-release`

## systemctl

- [参考](<[http://www.ruanyifeng.com/blog/2016/03/systemd-tutorial-commands.html](http://www.ruanyifeng.com/blog/2016/03/systemd-tutorial-commands.html)>)

## curl

- post 请求：`curl -X POST -d 'name=xiaoming&age=18' http://localhost:3000/api/add

## 重置密码

```shell
sudo passwd root
```

## yum

- 换源

  ```shell
  $ mv /etc/yum.repos.d/CentOS-Base.repo /etc/yum.repos.d/CentOS-Base.repo.backup

  $ wget -O /etc/yum.repos.d/CentOS-Base.repo http://mirrors.aliyun.com/repo/Centos-7.repo

  # 运行yum makecache生成缓存
  $ yum makecache

  $ yum -y update
  已加载插件：fastestmirror, refresh-packagekit, security
  设置更新进程Loading mirror speeds from cached hostfile
  * base: mirrors.aliyun.com
  * extras: mirrors.aliyun.com
  * updates: mirrors.aliyun.com
  ```

## 切换到 root 用户

```shell
$ su
```

## 第三方仓库([IUS](https://ius.io/GettingStarted/))安装 git2.x

```shell
# 安装IUS 工具
$ curl https://setup.ius.io | sh

# 查询到 git2u
$ yum search git
...
git.x86_64 : Fast Version Control System
git2u.x86_64 : Fast Version Control System
gitflow.noarch : Extensions providing operations for V. Driessen's branching model
...

# 安装 git 2.x
$ yum -y install git2u

# 完成
$ git --version
git version 2.16.4
```

[参考](https://blog.csdn.net/caimengyuan/article/details/80634752)

## sshpass

一个可以带上密码免交互的工具

```shell
sshpass -p $PASSWORD scp -r ./dist/* $USER@$SERVER:/data/www/
```

## lftp

传送文件到目标服务器

```shell
lftp -c "mirror -R dist/ sftp://$USER:$PASSWORD@$SERVER/$TARGET/dist"
```

## 测速

```shell
wget https://raw.githubusercontent.com/sivel/speedtest-cli/master/speedtest.py
chmod +rx speedtest.py
sudo mv speedtest.py /usr/local/bin/speedtest-cli
sudo chown root:root /usr/local/bin/speedtest-cli
speedtest-cli
```

## 防火墙开放 IP 段

在一台服务器上部署了一个 npm 私有仓库（xxx:4873），但是在用 gitlab-ci runner 下载依赖的时候，怎么都访问不到。

有一个这样的报错：

```
error An unexpected error occurred: "http://xxx:4873/debug/-/debug-3.1.0.tgz: connect EHOSTUNREACH xxx:4873".
```

在容器内部是可以 Ping 通私有仓库的地址的，就是访问不到。

接着我又尝试直接访问页面

```
$ curl xxx:4873
curl: (7) Failed to connect to xxx port 4873: No route to host
```

配置防火墙白名单

```xml
// /etc/firewalld/zones/public.xml
<zone>
	...
  <rule family="ipv4">
    <source address="172.17.0.0/24"/> # 代表开放172.17.0.0 - 172.17.0.255
    <accept/>
  </rule>
</zone>
```

重启防火墙：`systemctl restart firewalld.service`，一切 OK

[参考：Linux 系统通过 firewall 限制或开放 IP 及端口](https://blog.csdn.net/ywd1992/article/details/80401630)

[参考：Docker 启动容器报错: connect: no route to host](https://blog.csdn.net/bacteriumX/article/details/83589126)

## 文件大小

`du -h -d 1`

## 字符串处理

把根目录下的 *.md 文件以链接的形式写入 README

`ls -1 | awk -F '.md' '{print "[" $1 "](./" $1 ")\n" }' >> README.md`

## tree

```
tree -L 2 -I 'node_modules|.git|.DS_Store' -a
```

## Rpm RedHat Package Manager（RedHat 软件包管理工具）

```shell
# 下载
$ rpm -i xxx
# 查询
$ rpm -q xxx
# 删除
$ rpm -e
```

## frp

> frp 是一个可用于内网穿透的高性能的反向代理应用，支持 tcp, udp, http, https 协议。

### 使用

- [下载软件](https://github.com/fatedier/frp/releases) (mac 使用 darwin, 小米路由器 3 使用 mipsle)

- 安装软件分为两部分：将 frps 及 frps.ini 放到具有公网 IP 的机器上；将 frpc 及 frpc.ini 放到处于内网环境的机器上。两个软件需要版本一致。

- 配置 frps.ini 执行 `./frps -c ./frps.ini`

- 配置 frpc.ini 执行 `./frpc -c ./frpc.ini`

- 后台运行

  - screen command

  - nohup command &

### 参考

[frp 官方](https://github.com/fatedier/frp)

[一篇好博文](http://www.sunnyrx.com/2016/10/21/simple-to-use-frp/)
