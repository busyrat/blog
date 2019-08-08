# 搭建ftp服务器 #

## 要求： ##

- 使用docker安装
- 可以匿名登录，匿名用户只能下载文件，不能上传文件，不能删除文件
- 可以非匿名登录，非匿名用户可以上传、下载、删除文件
- 数据持久化

## 安装计划 ##
- 数据持久化：
	- 将宿主机目录`/home/ftp/conf`挂在到容器`/etc/pure-ftpd/passwd`目录，保存用户账号信息
	- 将宿主机目录`/home/ftp/data`挂在到容器`/home/ftpusers/www`目录
	- 将宿主机目录`/home/ftp/data`挂在到容器`/home/ftp`目录
- 端口规划：
	- 服务端命令端口：21
	- 服务端主动模式数据传输端口：20
	- 服务端被动模式数据传输端口：30000-30009

----

##	docker安装 ##

- 安装参考 [官方文档](https://docs.docker.com/engine/installation/linux/docker-ce/ubuntu/)

## 验证docker安装正确 ##
- 安装完毕执行 `sudo docker run hello-world` ，如果安装正确，会输出以下内容：

		Hello from Docker!
		This message shows that your installation appears to be working correctly.
		
		To generate this message, Docker took the following steps:
		 1. The Docker client contacted the Docker daemon.
		 2. The Docker daemon pulled the "hello-world" image from the Docker Hub.
		 3. The Docker daemon created a new container from that image which runs the
		    executable that produces the output you are currently reading.
		 4. The Docker daemon streamed that output to the Docker client, which sent it
		    to your terminal.
		
		To try something more ambitious, you can run an Ubuntu container with:
		 $ docker run -it ubuntu bash
		
		Share images, automate workflows, and more with a free Docker ID:
		 https://cloud.docker.com/
		
		For more examples and ideas, visit:
		 https://docs.docker.com/engine/userguide/


- 需要注意的是如果是第一次运行`hello-world`，`docker`会先从官方镜像下载`hello-world`镜像再运行

----

## docker配置 ##
- 以非`root`用户运行`docker`方法
	- 创建docker组：`sudo groupadd docker`
	- 将当前用户加入docker组：`sudo gpasswd -a ${USER} docker` 或者 `sudo usermod -a ${user} -G docker`
	- 重启服务：`sudo service docker restart`
	- 刷新docker成员：`newgrp – docker`
	
- 配置阿里云镜像加速
	
	- 修改配置文件`/etc/docker/daemon.json`，添加以下内容
			
			{
			 "registry-mirrors": ["<your accelerate address>"] 
			}

	- 重启docker服务：`sudo service docker restart`
	- 更详细教程可参考[阿里文档](https://yq.aliyun.com/articles/29941)
## 下载pure-ftp镜像 ##
- 搜索镜像：`docker search ftp`

		zhouchunsong@JuGuang:~$ docker search ftp
		NAME                               DESCRIPTION                                     STARS     OFFICIAL   AUTOMATED
		stilliard/pure-ftpd                Docker Pure-ftpd Server                         84                   [OK]
		bogem/ftp                          Simple vsftpd server                            14                   [OK]
		mcreations/ftp                                                                     11                   [OK]
		gists/pure-ftpd                    Pure-FTPd on Alpine                             8                    [OK]
		factual/s3-backed-ftp              An ftp/sftp server using s3fs to mount an ...   5                    [OK]
		vimagick/pure-ftpd                 Pure-FTPd is a free (BSD), secure, product...   4                    [OK]
		damienlagae/ftp                    FTP server (vsftpd & supervisor)                4                    [OK]
		aequitas/ftp-resource              Concourse resource to interact with FTP se...   3                    [OK]
		ustclug/ftp                        FTP site of USTC Linux User Group https://...   1                    [OK]
		easysubsea/git-ftp                 With this image you can use bitbucket pipe...   1                    [OK]
		maaiins/ftp-transfer               Simple FTP transfer container                   1                    [OK]
		merapar/ftp-stub                   Ftp-stub is needed for tests. This stub cr...   0                    
		radektomasek/keboola-wr-ftp-ftps   A FTP/FTPS writer for Keboola Connection        0                    [OK]
		mwienk/docker-git-ftp              Git FTP in Docker                               0                    [OK]
		besn0847/arm-ftp                   An FTP server for Raspberry pi 2                0                    
		apnarm/ftp2http                    ftp2http                                        0                    [OK]
		engines/ftp                        FTP service for engines                         0                    
		esnerd/keboola-ftp-extractor       keboola ftp extractor docker component          0                    [OK]
		astronomerio/ftp                                                                   0                    
		byuoitav/ftp-microservice          Send files over FTP to Crestron boxes           0                    
		yellowblackandwhite/sftp-ftp       SFTP/FTP in docker container                    0                    [OK]
		eleet/ubuntu-ftp-mcpe12                                                            0                    
		nlesc/xenon-ftp                    Docker container with ftp server, to run t...   0                    [OK]
		jack12816/ftpd_test                Easy to use test FTP server for docker setups   0                    
		pushtospace/pure-ftpd-mysql        pure-ftpd-mysql    
                   
- 下载`stilliard/pure-ftpd`镜像：`docker pull stilliard/pure-ftpd`
	- 该镜像项目托管在[github](https://github.com/stilliard/docker-pure-ftpd)上，有详细教程
- 下载完毕后查看本地镜像：`docker images`
 
		zhouchunsong@JuGuang:~$ docker images
		REPOSITORY            TAG                 IMAGE ID            CREATED             SIZE
		httpd                 latest              b669148bb5a5        4 days ago          177MB
		vsftpd                latest              03ab5fe70117        11 days ago         741MB
		stilliard/pure-ftpd   latest              193339b4053f        13 days ago         439MB
		ubuntu                16.04               ccc7a11d65b1        4 weeks ago         120MB
		hello-world           latest              1815c82652c0        3 months ago        1.84kB

----

## 配置并运行ftp服务	 ##
- 首次启动

		docker run -d --name ftpd_server -p 20-21:20-21 -p 30000-30009:30000-30009 -v /home/ftp/conf:/etc/pure-ftpd/passwd -v /home/ftp/data:/home/ftpusers/www -v /home/ftp/data:/home/ftp -e "PUBLICHOST=localhost" stilliard/pure-ftpd /bin/bash -c "useradd ftp;usermod -d /home/ftp ftp;/run.sh -c 100 -C 10 -l puredb:/etc/pure-ftpd/pureftpd.pdb -j -i -R -P 192.168.1.56 -p 30000:30009"
- 参数说明

	|参数|说明|
	|---|---|
	|-d |后台模式运行|
	|--name ftpd_server | 为当前容器指定名称|
	|-p 20-21:20-21 | 将容器的20-21端口映射到宿主机的20-21端口（左边为宿主机端口，右边为容器内的端口）|
	|-p 30000-30009:30000-30009	| 将容器内的30000-30009端口映射到宿主机的30000-30009端口上|
	|-v /home/ftp/conf:/etc/pure-ftpd/passwd	| 将宿主机/home/ftp/conf目录挂载到容器的/etc/pure-ftpd/passwd目录|
	|-v /home/ftp/data:/home/ftpusers/www | 将宿主机的|/home/ftp/data目录挂载到容器的/home/ftpusers/www目录|
	|-v /home/ftp/data:/home/ftp	| 将宿主机的/home/ftp/data目录挂载到容器的|/home/ftp目录
	|-e "PUBLICHOST=localhost"| 设置环境变量|
	|stilliard/pure-ftpd	| 待运行的镜像名称|
	|/bin/bash –c “xxx” | 容器内需要执行的cmd|
	|useradd ftp | 添加ftp用户，用于匿名登录|
	|usermod -d /home/ftp ftp | 为ftp用户指定家目录|
	|-c 100| 最大客户端数量100|
	|-C 10 | 每个ip最大能运行10个用户|
	|-l puredb:/etc/pure-ftpd/pureftpd.pdb | 虚拟用户登录文件|
	|-j | 自动创建家目录|
	|-i | 匿名用户不允许上传|
	|-R | 不允许执行chmod|
	|-P 192.168.1.56 | PASV(被动模式)绑定的IP，值得注意，这里一定要绑定宿主机IP，容器本身并不绑定192.168.1.56，而是客户端通知服务端开启PASV模式的时候，服务端需要将此IP通知给客户端，客户端便可以通过此IP连接服务端；如果配置为localhost或者127.0.0.1，通知给客户端的IP是127.0.0.1，显然被动模式就无法正常工作了|
	|-p 30000:30009 | PASV(被动模式)端口范围为30000-30009|

- 配置非匿名用户（由于已经进行了数据持久化，所以只需要操作一次即可）
	- 进入容器命令行 : `docker exec -it ftpd_server /bin/bash`
	
			-it :在容器内指定一个伪终端（-t），并且可以对容器内的标准输入（STDIN）进行交互（-i）

	- 添加pure-ftp虚拟用户 www ，并按照提示输入密码：

			pure-pw useradd www -f /etc/pure-ftpd/passwd/pureftpd.passwd -m -u ftpuser -d /home/ftpusers/www


	- 参数说明

	|参数|说明|
	|---|---|
	|pure-pw useradd www | 添加虚拟用户www|
	|-f /etc/pure-ftpd/passwd/pureftpd.passwd | 指定密码文件存放位置|
	|-m | 代替 pure-pw mkdb 指令|
	|-u ftpuser | 指定uid|
	|-d /home/ftpusers/www | 指定家目录，该用户只能访问此目录|


- 后续每次停止ftp服务命令：docker stop ftpd_server	
- 后续每次启动ftp服务命令：docker start ftpd_server

----

## 检查ftp服务是否正常运作 ##
- 在宿主机`/home/ftp/data`创建文件  `touch test.txt`
- 网页浏览器输入`ftp://192.168.1.56:21`,应该可以不输入密码，直接登录，并且可查看到文件`test.txt`
- 利用ftp工具登录，可匿名登录成功，能查看到`test.txt`文件，但是不能删除，可以正常上传文件
- 利用ftp工具，可使用账户www登录成功，能查看到`test.txt`文件，可以删除该文件，可以正常上传文件
- 切换主、被动模式，均可正常上传下载文件


## 参考文献 ##
[FTP主动模式和被动模式的区别](http://www.cnblogs.com/xiaohh/p/4789813.html)
