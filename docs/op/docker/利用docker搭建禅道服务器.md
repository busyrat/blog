# zentao

## 利用docker搭建禅道服务器 ##


### 要求： ###

- 使用ubuntu镜像
- 使用Dockfile创建镜像
- 数据持久化

### 安装计划 ###

- 禅道数据持久化：将宿主机的`/home/docker/zentao/data`目录挂载到禅道容器内的`/opt/zbox/data`目录
- 禅道`mysql`数据库端口：`3306`
- 禅道`apache`端口：`8091`
- 一些脚本路径：`/home/docker/zentao`
- 使用`entrypoint.sh`作为容器启动时首先运行的脚本

### 下载禅道一键安装包 ###

- 下载`ubuntu`镜像，这里使用16.04版本

		docker pull ubuntu:16.04

- 从[禅道官网](http://www.zentao.net/download/80046.html)下载 `Linux 64位一键安装包（适用于Linux 64位）`，这里下载9.5稳定版，放到`/home/docker/zentao/build/files`目录下

### 持久化数据 ###

- 解压禅道一键安装包

		tar xvzf /home/docker/zentao/build/files/ZenTaoPMS.9.5.stable.zbox_64.tar.gz 
- 将解压后的目录 `/home/docker/zentao/build/files/zbox/data` 拷贝到 `/home/docker/zentao` 下，目录权限暂时不用修改，禅道初始化的时候会自动修改

		cp -r /home/docker/zentao/build/files/zbox/data /home/docker/zentao
- 解压后的目录不再需要，删除掉

		rm -rf /home/docker/zentao/build/files/zbox/

## 制作entrypoint脚本 ##
- 在`/home/docker/zentao/build/files`目录下创建文件`entrypoint.sh`，添加以下内容：

		#!/bin/sh
		/opt/zbox/zbox start
		
		#keep docker running
		while true
		do
		  sleep 10
		done

- 脚本中`/opt/zbox/zbox start`命令是启动禅道服务器，由于禅道服务器是在后台运行的，因此需要添加下面的一个无限循环使脚本一直运作，否则docker会自动停止容器

### 制作Dockfile文件 ###
- 在`/home/docker/zentao/build`目录下创建文件`Dockfile`，添加以下内容：

		FROM ubuntu:16.04
		MAINTAINER zhouchunsong
		
		#Deploye ZenTao
		COPY files /root
		
		USER root 
		
		RUN tar -xzf /root/ZenTaoPMS.9.5.stable.zbox_64.tar.gz -C /opt \
		    && rm -rf /opt/zbox/data \
		    && rm -f /root/ZenTaoPMS.9.5.stable.zbox_64.tar.gz \
		    &&/opt/zbox/zbox -ap 8091 \
		    &&/opt/zbox/zbox -mp 3306  
		
		#start zentao
		ENTRYPOINT ["/root/entrypoint.sh"]

	- `FROM` ： 指明继承自哪个镜像
	- `MAINTAINER` ： 作者信息
	- `COPY files /root` ： 将`files`目录中的文件添加到容器的`/root`目录中，前面的步骤中我们添加了`禅道一键安装包`和`entrypoint.sh`文件到`files`目录中
	- `USER root` ： 使用`root`用户执行下面的命令（`RUN、CMD、ENTRYPOINT`）
	- `RUN` ： 第一行 将`禅道一键安装包`解压到`/opt`目录下
	- `RUN` ： 第二行 删除data目录（因为我们要用宿主机的data目录挂载到该位置，所以容器内的目录不需要了）
	- `RUN` ： 第三行 删除`禅道一键安装包`
	- `RUN` ： 第四行 指定禅道`apache`服务端口为`8091`
	- `RUN` ： 第五行 指定禅道`mysql`服务端口为`3306`
	- `ENTRYPOINT` : 指定容器启动时第一个运行的脚本为：`/root/entrypoint.sh`

### 构建镜像 ###
- 在`/home/docker/zentao/build`目录下执行命令

		docker build -t zcs/zentao:9.5 .
	- `docker build` : 构建命令
	- `-t zcs/zentao:9.5` ： 指定构建镜像的tag
	- `.` ： 指定上下文目录，也就是files所在目录，需要注意`files`并不是指构建命令执行时所在的目录
	
		**注意：不要误以为 `.` 是指定 `Dockerfile` 所在目录，在默认情况下，如果不额外指定 Dockerfile的话，会将上下文目录下的名为 `Dockerfile` 的文件作为 `Dockerfile`，也可以用
		`-f ../Dockerfile.php` 参数指定某个文件作为 `Dockerfile`，如果在`/home/docker/zentao/`
		执行构建，则指令变为`docker build -t zcs/zentao:9.5 ./build/`**
	
- 构建成功后使用`docker images`命令可以查看到该镜像

		zhouchunsong@JuGuang:/home/docker/zentao$ docker images
		REPOSITORY            TAG                 IMAGE ID            CREATED             SIZE
		zcs/zentao            9.5                 682bb7308c02        3 hours ago         724MB
		sonatype/nexus3       latest              9ded7bd31da5        5 days ago          480MB
		jenkins/jenkins       lts                 b36e8b881678        5 days ago          810MB
		httpd                 latest              b669148bb5a5        9 days ago          177MB
		stilliard/pure-ftpd   latest              193339b4053f        2 weeks ago         439MB
		ubuntu                16.04               ccc7a11d65b1        5 weeks ago         120MB
		hello-world           latest              1815c82652c0        3 months ago        1.84kB

### 首次运行容器 ###
- 执行命令 

		docker run -dit -p 8091:8091 -p 3306:3306 --name zantao -v /home/docker/zentao/data:/opt/zbox/data zcs/zentao:9.5

	- 这里参数不再解释，可以看前面几篇教程

### 检查安装是否成功 ###
- 可用性检查，访问 [http://192.168.1.56:8091](http://192.168.1.56:8091)，可以正常打开禅道页面，默认帐号 `admin`，密码`123456`
- 数据持久化检查，在禅道中新建一个测试产品，删除当前容器，再重新启动一个容器，测试产品没有被删除

### 参考 ###
- [禅道安装文档](http://www.zentao.net/book/zentaopmshelp/90.html)