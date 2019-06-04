## 搭建nexus仓库服务器 ##

### 要求： ###

- 使用docker安装
- 支持docker、maven
- 数据持久化
- 
### 安装计划 ###
- 数据持久化：将宿主机目录`/home/docker/nexus/nexus-data`挂在到容器的`/nexus-data`目录
- `nexus`管理网页访问端口：`8081`
- `nexus`镜像上传下载端口：`8082`

### 下载nexus3镜像 ###
- 搜索nexus镜像 `docker search nexus`

		zhouchunsong@JuGuang:/home/jenkins/jenkins_home$ docker search nexus
		NAME                                         DESCRIPTION                                     STARS     OFFICIAL   AUTOMATED
		sonatype/nexus                               Sonatype Nexus                                  346                  [OK]
		sonatype/nexus3                              Sonatype Nexus Repository Manager 3             223                  
		sonatype/docker-nexus3                       Sonatype Nexus 3 [DEPRECATED]                   25                   [OK]
		clearent/nexus                               Sonatype Nexus container                        20                   
		baselibrary/nexus                            ThoughtWorks Docker Image: nexus                7                    [OK]
		accenture/adop-nexus                         ADOP Nexus                                      5                    [OK]
		bradbeck/nexus-https                         Dockerized version of Nexus Repo Manager 3...   5                    [OK]
		frekele/nexus                                docker run --rm --name nexus -p 8081:8081 ...   4                    [OK]
		travix/sonatype-nexus                        Container to run Sonatype Nexus Profession...   3                    [OK]
		shifudao/nexus3                              clone from nexus3 image but based from ope...   3                    [OK]
		fabric8/nexus                                                                                2                    [OK]
		madmuffin/nexus3                             Sonatype Nexus3 Milestone7 docker image         2                    [OK]
		openshiftdemos/nexus                         Sonatype Nexus with JBoss Enterprise repos...   1                    
		generix/nexus-data                           Data container for nexus                        1                    
		descoped/nexus                               SonaType Nexus OSS Artifact Repository Man...   1                    [OK]
		airdock/nexus                                Docker image for Nexus Repository Manager       0                    [OK]
		ffung/nexus                                                                                  0                    
		stangenberg/nexus                            Docker container featuring Sonatype's Nexu...   0                    [OK]
		atzoum/aarch64-nexus3                        Nexus3 for Arm 64bit Architecture               0                    [OK]
		ocadotechnology/nexus-data-pipeline-backup   Backup Nexus3 with AWS Data Pipeline and E...   0                    [OK]
		mcreations/jenkins-with-nexus-support        Jenkins image with correct SSL config for ...   0                    [OK]
		enieuw/nexus3-oss                            nexus3-oss                                      0                    [OK]
		nayarsystems/nexus                           Nexus RPC + RethinkDB                           0                    
		openfrontier/nexus                           Official Nexus docker plus p2 plugins.          0                    [OK]
		trialgrid/nexus-docker                       Nexus docker image        

- 下载nexus3镜像`sonatype/nexus3`,该镜像[使用教程](https://hub.docker.com/r/sonatype/nexus3/)

		zhouchunsong@JuGuang:/home$ docker pull sonatype/nexus3
		Using default tag: latest
		latest: Pulling from sonatype/nexus3
		7b6bb4652a1b: Pull complete 
		61b7deda4e4c: Pull complete 
		e8de5f20436b: Pull complete 
		6dd980b30942: Pull complete 
		82a5f5980c65: Pull complete 
		fb37f8a9062f: Pull complete 
		Digest: sha256:d259282800473f246419b4aba1141778abda3f8a13e0c94594feac5cf428ce54
		Status: Downloaded newer image for sonatype/nexus3:latest
		zhouchunsong@JuGuang:/home$ docker volume create --name nexus-data

### 运行nexus ###
- 首次启动，注意`home/docker/nexus/nexus-data`目录权限需要修改为`200:200`，对应容器内部的`nexus`用户，不然会因权限不足导致启动失败；`8081`为网页端口，`8082`为镜像上传下载端口

		zhouchunsong@JuGuang:/home/docker/nexus$ sudo chown -R 200:200 /home/docker/nexus/nexus-data/		
		zhouchunsong@JuGuang:/home/docker/nexus$ docker run -d -p 8081:8081 -p 8082:8082 --name nexus -v /home/docker/nexus/nexus-data:/nexus-data sonatype/nexus3
		526c03402bf6bb3c86105453be55203365b4491c3448c7183227968f12a03e14
		zhouchunsong@JuGuang:/home/docker/nexus$ docker ps 
		CONTAINER ID        IMAGE                 COMMAND                  CREATED             STATUS              PORTS                                                      NAMES
		526c03402bf6        sonatype/nexus3       "bin/nexus run"          10 seconds ago      Up 9 seconds        0.0.0.0:8081->8081/tcp                                     nexus
		1cd4c73638da        stilliard/pure-ftpd   "/bin/bash -c 'use..."   2 days ago          Up 24 hours         0.0.0.0:21->21/tcp, 0.0.0.0:30000-30209->30000-30209/tcp   ftpd_server

- 修改默认端口
	- 修改容器内 `/nexus-data/etc/nexus.properties` 文件， `application-port=[your port]`，这里因为和其它应用冲突，所以修改为8092。
- 测试工作是否正常
	- 命令行检测，正常运行时会输出`pong`

			zhouchunsong@JuGuang:/home/docker/nexus$ curl -u admin:admin123 http://localhost:8081/service/metrics/ping
			pong
	
	- 浏览器打开[http://192.168.1.56:8092](http://192.168.1.56:8092)，可正常显示网页
-  非首次启动，执行`docer start nexus`

### 添加docker hosted仓库 ###
- 访问[http://192.168.1.56:8092](http://192.168.1.56:8092)，使用默认账号/密码:`admin/admin123`登录
- 创建`docker(hosted)`仓库，名称`docker-hosted`，注意配置http端口，这里配置为`8093`，与启动参数一致


### 修改docker启动参数 ###
- 由于我们添加的本地仓库只配置了http服务，而docker默认使用https，因此在docker启动文件`/etc/docker/daemon.json`中添加私有仓库地址：`"insecure-registries":["http://192.168.1.56:8093"]`，`daemon.json`文件内容变为：

		{
		  "registry-mirrors": ["https://7uko0u1b.mirror.aliyuncs.com"],
		  "insecure-registries":["http://192.168.1.56:8093"]
		}

- 重启docker服务：`service docker restart`

### 向本地仓库push镜像 ###

- 为待上传的镜像打标签，格式为`docker tag <imageId or imageName> <nexus-hostname>:<repository-port>/<image>:<tag>`

		zhouchunsong@JuGuang:/home/docker/nexus$ docker images
		REPOSITORY            TAG                 IMAGE ID            CREATED             SIZE
		sonatype/nexus3       latest              9ded7bd31da5        37 hours ago        480MB
		jenkins/jenkins       lts                 b36e8b881678        37 hours ago        810MB
		httpd                 latest              b669148bb5a5        6 days ago          177MB
		stilliard/pure-ftpd   latest              193339b4053f        2 weeks ago         439MB
		ubuntu                16.04               ccc7a11d65b1        4 weeks ago         120MB
		hello-world           latest              1815c82652c0        3 months ago        1.84kB
		zhouchunsong@JuGuang:/home/docker/nexus$ docker tag hello-world 192.168.1.56:8093/hello-world:1.0
		zhouchunsong@JuGuang:/home/docker/nexus$ docker images
		REPOSITORY                      TAG                 IMAGE ID            CREATED             SIZE
		sonatype/nexus3                 latest              9ded7bd31da5        37 hours ago        480MB
		jenkins/jenkins                 lts                 b36e8b881678        37 hours ago        810MB
		httpd                           latest              b669148bb5a5        6 days ago          177MB
		stilliard/pure-ftpd             latest              193339b4053f        2 weeks ago         439MB
		ubuntu                          16.04               ccc7a11d65b1        4 weeks ago         120MB
		192.168.1.56:8082/hello-world   1.0                 1815c82652c0        3 months ago        1.84kB
		hello-world                     latest              1815c82652c0        3 months ago        1.84kB

- 登录仓库，默认账号/密码为：`admin/admin123`，不登录就push镜像会提示：`no basic auth credentials`

		zhouchunsong@JuGuang:/home/docker/nexus$ docker login 192.168.1.56:8093
		Username (admin): admin
		Password: 
		Login Succeeded

- push镜像

		zhouchunsong@JuGuang:/home/docker/nexus$ docker push 192.168.1.56:8082/hello-world:1.0
		The push refers to a repository [192.168.1.56:8093/hello-world]
		45761469c965: Layer already exists 
		1.0: digest: sha256:9fa82f24cbb11b6b80d5c88e0e10c3306707d97ff862a3018f22f9b49cef303a size: 524

- 从[http://192.168.1.56:8092](http://192.168.1.56:8092)上可以看到docker-hosted仓库中已经有了刚刚上传的镜像

### 从本地仓库搜索镜像 ###

		zhouchunsong@JuGuang:/home/docker/nexus$ docker search 192.168.1.56:8093/hello
		NAME                                DESCRIPTION   STARS     OFFICIAL   AUTOMATED
		192.168.1.56:8093/hello-world:1.0  

### 从本地仓库pull镜像 ###

			zhouchunsong@JuGuang:/home/docker/nexus$ docker images
			REPOSITORY            TAG                 IMAGE ID            CREATED             SIZE
			sonatype/nexus3       latest              9ded7bd31da5        37 hours ago        480MB
			jenkins/jenkins       lts                 b36e8b881678        37 hours ago        810MB
			httpd                 latest              b669148bb5a5        6 days ago          177MB
			stilliard/pure-ftpd   latest              193339b4053f        2 weeks ago         439MB
			ubuntu                16.04               ccc7a11d65b1        4 weeks ago         120MB
			hello-world           latest              1815c82652c0        3 months ago        1.84kB
			zhouchunsong@JuGuang:/home/docker/nexus$ docker pull 192.168.1.56:8093/hello-world:1.0
			1.0: Pulling from hello-world
			Digest: sha256:9fa82f24cbb11b6b80d5c88e0e10c3306707d97ff862a3018f22f9b49cef303a
			Status: Downloaded newer image for 192.168.1.56:8093/hello-world:1.0
			zhouchunsong@JuGuang:/home/docker/nexus$ docker images
			REPOSITORY                      TAG                 IMAGE ID            CREATED             SIZE
			sonatype/nexus3                 latest              9ded7bd31da5        37 hours ago        480MB
			jenkins/jenkins                 lts                 b36e8b881678        37 hours ago        810MB
			httpd                           latest              b669148bb5a5        6 days ago          177MB
			stilliard/pure-ftpd             latest              193339b4053f        2 weeks ago         439MB
			ubuntu                          16.04               ccc7a11d65b1        4 weeks ago         120MB
			192.168.1.56:8082/hello-world   1.0                 1815c82652c0        3 months ago        1.84kB
			hello-world                     latest              1815c82652c0        3 months ago        1.84kB