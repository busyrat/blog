# Docker Swarm
>Swarm 在 Docker 1.12 版本之前属于一个独立的项目，在 Docker 1.12 版本发布之后，该项目合并到了 Docker 中，成为 Docker 的一个子命令。目前，Swarm 是 Docker 社区提供的唯一一个原生支持 Docker 集群管理的工具。它可以把多个 Docker 主机组成的系统转换为单一的虚拟 Docker 主机，使得容器可以组成跨主机的子网网络。

## 初始化swarm
初始化后该节点自动成为管理节点，`docker swarm init --listen-addr <MANAGER-IP>:<PORT>`
```bash
root@JuGuang:/home# docker swarm init
Swarm initialized: current node (693jrftodx1nvglyqhlhevth8) is now a manager.

To add a worker to this swarm, run the following command:

docker swarm join --token SWMTKN-1-5wculuv0eajx1n2egcm5p5zeshd9u8mghocgt4c0tg7hl3xp48-brtf8sedk6q7xznu0s5bd2jie 192.168.1.56:2377

To add a manager to this swarm, run 'docker swarm join-token manager' and follow the instructions.
```
如果不指定ip和port，则默认在所有ip上监听2377端口
```bash
root@JuGuang:/home# docker swarm init
Swarm initialized: current node (ou9zwv49wcn64gszp1s5ovflh) is now a manager.

To add a worker to this swarm, run the following command:

    docker swarm join --token SWMTKN-1-4u4vihapr0ruqvyhlmyzyarzj21gip6m9upo028wdh96rxkeqa-4wistx5wvu4yfb9x4nhpt8hcm 192.168.1.56:2377

To add a manager to this swarm, run 'docker swarm join-token manager' and follow the instructions.

root@JuGuang:/home# netstat -anp|grep 2377
tcp6       0      0 :::2377                 :::*                    LISTEN      7491/dockerd 
```
如果指定ip和port，则在指定ip监听指定port
```bash
root@JuGuang:/home# docker swarm init --listen-addr 192.168.1.56:2378
Swarm initialized: current node (8z55rcs3gpo9zuvw1toodvn34) is now a manager.

To add a worker to this swarm, run the following command:

    docker swarm join --token SWMTKN-1-0gbf0poro8w71x505vfbwmvjyz9hxanynsvpv8ktn7ora4lu25-8d03yt705ycsmfof7b7l59s8c 192.168.1.56:2378

To add a manager to this swarm, run 'docker swarm join-token manager' and follow the instructions.

root@JuGuang:/home# netstat -anp|grep 2378
tcp        0      0 192.168.1.56:2378       0.0.0.0:*               LISTEN      7491/dockerd    
unix  3      [ ]         STREAM     CONNECTED     17297870 23784/3   
```

从上面的执行结果可以看到docker提示了如何加入该swarm，在其它docker节点直接执行上面的命令即可加入，后面如果忘记，可以通过以下命令查看：
```bash       
root@fpi:/home# docker swarm join-token worker
To add a worker to this swarm, run the following command:

docker swarm join --token SWMTKN-1-48ut16wbobyicvdcst3zjlubcc3xoprmgxt8ge4c1hvfkq68ap-5c4c87klns2kbj5acbj1uqsch 192.168.1.48:2377

root@fpi:/home# docker swarm join-token manager 
To add a manager to this swarm, run the following command:

docker swarm join --token SWMTKN-1-48ut16wbobyicvdcst3zjlubcc3xoprmgxt8ge4c1hvfkq68ap-8qqyshayfovf94s45nbbe1uci 192.168.1.48:2377
```

## 加入swarm
执行命令`docker swarm join --token xxx <MANAGER-IP>:<PORT>`
```bash
root@JuGuang:/home# docker swarm join --token SWMTKN-1-48ut16wbobyicvdcst3zjlubcc3xoprmgxt8ge4c1hvfkq68ap-5c4c87klns2kbj5acbj1uqsch 192.168.1.48:2377
This node joined a swarm as a worker.
```

加入成功后可以在对应的管理节点查看到该节点：`docker node ls`，其中HOSTNAME：`fpi-worker-1`就是刚加入的节点
```bash
root@fpi:/home# docker node ls
ID                            HOSTNAME            STATUS              AVAILABILITY        MANAGER STATUS
nibhlxst0t90nunmfpb00aso0 *   fpi-manager-1       Ready               Active              Leader
qsrqqyw7rekm4ftua7uzn9iph     fpi-worker-1        Ready               Active     
```

注意：一个swarm中可以存在多个管理者，节点可以以管理者的身份加入，像下面的`fpi-worker-1`这样，它的MANAGER列会被标识为Reachable，而创建此swarm的节点为`Leader`
```bash
fpi@fpi-manager-1:/home$ docker node ls
ID                            HOSTNAME            STATUS              AVAILABILITY        MANAGER STATUS
nfsf7b6wj9yqstz70jfbw5fsc     fpi-worker-1        Ready               Active              Reachable
nibhlxst0t90nunmfpb00aso0 *   fpi-manager-1       Ready               Active              Leader
```

## 离开/删除swarm
离开，使用`docker swarm leave`命令，如果是一个管理节点离开，则会给一个提示，需要使用`docker swarm leave --force`命令；一个swarm中的所有管理节点都离开后，整个swarm就被删除
```bash
root@JuGuang:/home# docker swarm leave
Error response from daemon: You are attempting to leave the swarm on a node that is participating as a manager. Removing the last manager erases all current state of the swarm. Use `--force` to ignore this message.
root@JuGuang:/home# docker swarm leave --force
Node left the swarm.
```

踩坑记：创建了一个swarm，其中有一个Leader管理节点，然后又加入了另一个普通管理节点，接着删除普通管理节点，整个swarm就挂了，执行任何命令都报错，提示活着的管理节点不足。最后重建整个swarm才得以解决（可能有更好的办法）。

## 节点升降级

- 普通节点升级为管理节点：`docker node promote`
- 管理节点降级为普通节点：`docker node demote`

## 管理端删除节点
`docker swarm leave`命令是节点离开swarm，但是此节点的信息还记录在管理端，管理端显示此节点的`status`是`down`，要从管理端移除该节点，需要执行命令`docker node rm [OPTIONS] NODE [NODE...]`
```bash
root@fpi-manager-1:~# docker node ls
ID                            HOSTNAME            STATUS              AVAILABILITY        MANAGER STATUS
169ut86ul6i7ymgc73ci5gf1z *   fpi-manager-1       Ready               Active              Leader
uujt74sedz62cv6oh87iq3zxf     fpi-worker-1        Down                Active 
root@fpi-manager-1:~# docker node rm fpi-worker-1
fpi-worker-1
root@fpi-manager-1:~# docker node ls
ID                            HOSTNAME            STATUS              AVAILABILITY        MANAGER STATUS
169ut86ul6i7ymgc73ci5gf1z *   fpi-manager-1       Ready               Active              Leader
```

## docker service
>有关service的详细介绍，可以参见[官方文档](https://docs.docker.com/get-started/part3/#introduction)

在分布式应用程序中，应用程序的不同部分被称为“service”。例如，假如你有一个视频共享网站，它可能包括一个存储应用程序数据的service，一个在用户上传某个东西后在后台进行视频转码的service，一个前端service等，各个服务可以独立部署，共同协作完成业务。引入service的概念可以实现系统的隔离，对服务进行监控、扩展，从而保证系统的高可用性。

在大气网格项目的测试环境中，需要有前端服务（nginx），后端服务（tomcat），风场服务（windfield），zookeeper+kafka，数据库服务（mysql+mongo）等。

`service`用法如下
```bash
root@fpi-manager-1:/home/docker/baseimages/alpine-tomcat# docker service

Usage:	docker service COMMAND

Manage services

Options:
      --help   Print usage

Commands:
  create      Create a new service
  inspect     Display detailed information on one or more services
  logs        Fetch the logs of a service or task
  ls          List services
  ps          List the tasks of one or more services
  rm          Remove one or more services
  scale       Scale one or multiple replicated services
  update      Update a service

Run 'docker service COMMAND --help' for more information on a command.
```

## docker stack
>`stack`可以理解为一组`service`

用法如下：
```bash
root@fpi-manager-1:/home/docker/baseimages/alpine-tomcat# docker stack

Usage:	docker stack COMMAND

Manage Docker stacks

Options:
      --help   Print usage

Commands:
  deploy      Deploy a new stack or update an existing stack
  ls          List stacks
  ps          List the tasks in the stack
  rm          Remove one or more stacks
  services    List the services in the stack
  ```
例如大气网格的测试环境中，前端服务（nginx），后端服务（tomcat），风场服务（windfield），zookeeper+kafka，数据库服务（mysql+mongo）等各种服务可以组合为一个`stack`。

## 实例
- 准备两台物理机：`192.168.1.48` 和  `192.168.1.56`

- 在`192.168.1.48`上执行`docker swarm init`，初始化swarm

- 在`192.168.1.56`上执行`docker swarm join --token xxxxx 192.168.1.48:2377`，加入swarm

- 在`192.168.1.48`上创建文件docker-compose.yml,写入以下内容

```yaml
version: "3"

services:
  mongo:
    image: mongo:3.4.10
    restart: always
    environment:
      TZ: "Asia/Shanghai"
    ports:
      - "27017:27017"
    volumes:
      - "/home/docker/mongo/data:/data/db"
    deploy:
      replicas: 1
      placement:
        constraints: [node.role == manager]

  mysql:
    image: mysql:5.7.20
    restart: always
    environment:
      TZ: "Asia/Shanghai"
      MYSQL_ROOT_PASSWORD: fpi123456
    ports:
      - "3306:3306"
    volumes:
      - "/etc/localtime:/etc/localtime"
      - "/home/docker/mysql/data:/var/lib/mysql"
    deploy:
      replicas: 1
      placement:
        constraints: [node.role == manager]
        
  tomcat:
    image: alpine-tomcat:8.5.24
    depends_on:
      - "mysql"
      - "mongo"
    restart: always
    environment:
      TZ: "Asia/Shanghai"
    mac_address: 6C:92:BF:4E:0C:C6
    ports:
      - "8081:8080"
    volumes:
      - "/etc/localtime:/etc/localtime"
      - "/home/docker/tomcat/tomcat-agms/logs:/usr/local/tomcat/logs"
      - "/home/docker/tomcat/tomcat-agms/webapps:/usr/local/tomcat/webapps"
      - "/home/docker/tomcat/tomcat-agms/conf:/usr/local/tomcat/conf"
      - "/home/docker/tomcat/tomcat-agms/files:/usr/local/tomcat/files"
      - "/home/docker/tomcat/tomcat-agms/fonts:/usr/share/fonts"
    deploy:
      replicas: 1
      placement:
        constraints: [node.role == manager]

  windfield:
    image: windfield:1.0
    restart: always
    ports:
      - "10000:80"
    deploy:
      replicas: 1
      placement:
        constraints: [node.role == manager]
```

- 部署stack，执行命令`docker stack deploy -c docker-compose.yml agms`，docker会尝试启动`docker-compose.yml`中定义的一系列服务。

- 查看当前启动的service：`docker service ls`

```bash
root@fpi-manager-1:/home/docker/agms# docker service ls
ID                  NAME                     MODE                REPLICAS            IMAGE                             PORTS
7qnt4kfp8cwe        web_manager_visualizer   replicated          1/1                 dockersamples/visualizer:latest   *:9001->8080/tcp
kmku1xxfhwbz        agms_windfield           replicated          1/1                 windfield:1.0                     *:10000->80/tcp
llyk3og3xmh5        web_manager_portainer    replicated          1/1                 portainer/portainer:latest        *:9000->9000/tcp
lt0jre2e4exn        agms_tomcat              replicated          1/1                 alpine-tomcat:8.5.24              *:8081->8080/tcp
pjgg5x6q2muc        agms_mysql               replicated          1/1                 mysql:5.7.20                      *:3306->3306/tcp
qpdzwckwtf03        agms_mongo               replicated          1/1                 mongo:3.4.10                      *:27017->27017/tcp
```

- 增加service规模

```bash
root@fpi-manager-1:/home/docker/agms# docker service scale agms_tomcat=2
agms_tomcat scaled to 2
root@fpi-manager-1:/home/docker/agms# docker service ls
ID                  NAME                     MODE                REPLICAS            IMAGE                             PORTS
7qnt4kfp8cwe        web_manager_visualizer   replicated          1/1                 dockersamples/visualizer:latest   *:9001->8080/tcp
kmku1xxfhwbz        agms_windfield           replicated          1/1                 windfield:1.0                     *:10000->80/tcp
llyk3og3xmh5        web_manager_portainer    replicated          1/1                 portainer/portainer:latest        *:9000->9000/tcp
lt0jre2e4exn        agms_tomcat              replicated          2/2                 alpine-tomcat:8.5.24              *:8081->8080/tcp
pjgg5x6q2muc        agms_mysql               replicated          1/1                 mysql:5.7.20                      *:3306->3306/tcp
qpdzwckwtf03        agms_mongo               replicated          1/1                 mongo:3.4.10                      *:27017->27017/tcp
```

>可以看到`agms_tomcat`的`REPLICAS`变为`2/2`了

>service也可以自动修复，比如删除service对应的一个正在运行的容器，service会尝试重新启动一个新的容器,以保持应用的理想状态（维持相应的规模）。

- 减少service规模，执行`docker service scale agms_tomcat=1`

- 检查负载均衡：访问`http://192.168.1.48:8081/agms/web/api/v1/grids/select-tree`，可以正常返回结果，将URL替换为`http://192.168.1.56:8081/agms/web/api/v1/grids/select-tree`，也可以正常返回结果
