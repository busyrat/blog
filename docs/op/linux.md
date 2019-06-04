# linux



### ssh

- 修改 ssh 默认 22 端口

  ```shell
  vim /etc/ssh/sshd_config
  
  # 找到 Port 22那一行，修改成
  Port 22
  Port 2202
  
  # 重启 sshd 服务
  systemctl restart sshd
  ```

  

### 定时任务

- crontabs命令`可以定时按计划执行任务
  - 有些教程是执行 `crond`，实际上是 `cron`
- `ls -l /etc/init.d` 查看那些命令可以执行



### 进程

- 查看`ps -ef | grep mongo`



### 系统信息

- 查看系统：`cat /etc/os-release`
- Centos 查看 系统信息：`uname -r` 和 `cat /etc/issue` 或 `cat /etc/redhat-release` 



### systemctl

- [参考]([http://www.ruanyifeng.com/blog/2016/03/systemd-tutorial-commands.html](http://www.ruanyifeng.com/blog/2016/03/systemd-tutorial-commands.html))



### curl

- post 请求：`curl -d 'name=xiaoming&age=18' http://localhost:3000/api/add



### yum

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

  

### 其他

- Rpm 基本使用

  ```shell
  # 下载
  $ rpm -i xxx
  # 查询
  $ rpm -q xxx
  # 删除
  $ rpm -e
  ```

  