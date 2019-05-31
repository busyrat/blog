- 查看进程：`ps -ef | grep mongo`

- 查看系统：`cat /etc/os-release`

- post 请求：`curl -d 'name=xiaoming&age=18' http://localhost:3000/api/add`

- 系统服务管理：`systemctl`  // Mac 上是在指令上加上 &

- Centos 查看 系统信息：`uname -r` 和 `cat /etc/issue` 或 `cat /etc/redhat-release`

- Yum 换源：

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

- Rpm 基本使用

  ```shell
  # 下载
  $ rpm -i xxx
  # 查询
  $ rpm -q xxx
  # 删除
  $ rpm -e
  ```

  

