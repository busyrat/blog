## Gitlab CI持续集成 实例 

## 基于Docker的Executor构建流程 ##

1. 用户提交代码
2. Gitlab CI检测是否有.gitlab-ci.yml文件
3. 如果有，调用注册到Gitlab CI上的runner；如果没有，停止，不执行任何操作
4. runner启动指定的Docker镜像，生成executor容器
5. 进入容器，同步项目代码
6. 执行.gitlab-ci.yml中的script代码
7. 结束

### 前提条件 ###

- 已搭建好Gitlab服务器（Gitlab服务器已经自带Gitlab-CI）
- 已有Gitlab项目权限（联系管理员添加）
- 准备好构建服务器（用于安装Citlab runner），并安装好docker

### 安装、注册Gitlab-runner ###
  有关runner的详细信息参考[官方网站](https://docs.gitlab.com/ee/ci/runners/README.html)

- 登入192.168.1.48，拉取gitlab-runner镜像：
		
		docker search gitlab-runner
		docker pull gitlab/gitlab-runner

- 启动runner：
	
		docker run -d --name gitlab-runner-back-end --restart always \
		-v /home/docker/gitlab-runner-back-end/config:/etc/gitlab-runner \
		-v /var/run/docker.sock:/var/run/docker.sock \
		gitlab/gitlab-runner:latest

	>注：/etc/gitlab-runner文件夹中存放runner的配置信息（config.toml），刚启动时无此文件，在注册完毕后自动生成

- 注册runner
	
	进入runner容器
	
		docker exec -it gitlab-runner-back-end /bin/bash

	然后按照以下9个步骤进行：
	
	>注：注册过程中的第2、3两步使用的URL和token可以在gitlab项目的设置中拿到：进入项目，setting->pipelines，找到Specific Runners，内容如下
	
		How to setup a specific Runner for a new project
		1.Install a Runner compatible with GitLab CI (checkout the GitLab Runner section for information on how to install it).
		2.Specify the following URL during the Runner setup: https://git.fpi-inc.com/
		3.Use the following registration token during setup: aZf4y4SaJkHNDZh9cvJL
		4.Start the Runner!

	1. Run the following command:

			sudo gitlab-runner register

	2. Enter your GitLab instance URL:

	>URL需要在以下位置获得：进入Gitlab项目->Settings->Pipelines->Specific Runners

			Please enter the gitlab-ci coordinator URL (e.g. https://gitlab.com )
			https://gitlab.com

	3. Enter the token you obtained to register the Runner:

		>token需要在以下位置获得：进入Gitlab项目->Settings->Pipelines->Specific Runners

			Please enter the gitlab-ci token for this runner
			xxx
	
	4. Enter a description for the Runner, you can change this later in GitLab's UI:

			Please enter the gitlab-ci description for this runner
			[hostame] my-runner

	5. Enter the tags associated with the Runner, you can change this later in GitLab's UI:

		>Gitlab CI可以使用tags来指定对应的runner执行脚本

			Please enter the gitlab-ci tags for this runner (comma separated):
			my-tag,another-tag

	6. Choose whether the Runner should pick up jobs that do not have tags, you can change this later in GitLab's UI (defaults to false):

			Whether to run untagged jobs [true/false]:
			[false]: true

	7. Choose whether to lock the Runner to the current project, you can change this later in GitLab's UI. Useful when the Runner is specific (defaults to true):

			Whether to lock Runner to current project [true/false]:
			[true]: true

	8. Enter the Runner executor:

		>这里选择docker作为执行器

			Please enter the executor: ssh, docker+machine, docker-ssh+machine, kubernetes, docker, parallels, virtualbox, docker-ssh, shell:
			docker

	9. If you chose Docker as your executor, you'll be asked for the default image to be used for projects that do not define one in .gitlab-ci.yml:

		>设置默认的镜像，如果.gitlab-ci.yml中指定了镜像，则此设置会被覆盖
		
			Please enter the Docker image (eg. ruby:2.1):
			alpine:latest

	注册完毕后，配置信息会存入config.toml文件，可以按需手动修改。我生成的配置文件如下：
		
		concurrent = 1
		check_interval = 0
		
		[[runners]]
		  name = "emergency-back-end"
		  url = "https://git.fpi-inc.com/"
		  token = "bdb9b14351edc5dd2977cac2ef1afc"
		  executor = "docker"
		  [runners.docker]
		    tls_verify = false
		    image = "maven:3.5.0-jdk-8"
			#pull_policy
			pull_policy = "if-not-present"
		    privileged = false
		    disable_cache = false
		    volumes = ["/cache","/home/docker/gitlab-runner-back-end/.m2:/root/.m2"]
		    shm_size = 0
		  [runners.cache]

	>修改volumes配置项，默认只有"/cache"，此处添加了.m2挂载，为maven仓库目录，如果不挂载，每次构建maven都要重新下载各种依赖，拉长构建过程；

	>添加了pull_policy参数，"if-not-present"表示先从本地查找镜像，再从远程仓库（docker hub）查找；如果不指定，则默认只从远端仓库查找，这时使用本地镜像就会报错。
	
	>参考文献[How pull policies work](https://docs.gitlab.com/runner/executors/docker.html#how-pull-policies-work)

	

	检查是否注册成功，进入Gitlab项目->Settings->Pipelines，找到Runners activated for this project，可以看到刚刚注册的runner。


### 编辑.gitlab-ci.yml文件，push到项目根目录 ###
	我的.gitlab-ci.yml文件内容如下：
	
		before_script:
		#配置ssh key，用于script中的scp命令和ssh命令，可免于输入密码；[详细教程](https://docs.gitlab.com/ee/ci/ssh_keys/README.html)
	
		- 'which ssh-agent || ( apt-get update -y && apt-get install openssh-client -y )'
		- eval $(ssh-agent -s)
		
		# $SSH_PRIVATE_KEY 需要在Gitlab项目->Settings->Pipelines->Add a variable 中配置完毕后，这里才能取到，需要在runner所在服务器上生成秘钥对，并私钥添加到变量$SSH_PRIVATE_KEY中；
		- ssh-add <(echo "$SSH_PRIVATE_KEY")
	
		- mkdir -p ~/.ssh
		- '[[ -f /.dockerenv ]] && echo -e "Host 
	
		variables:
		#APP_PATH in host
		APP_PATH: "/home/docker/tomcat/tomcat-emergency/webapps"
		
		stages:
		- build
	
		build:
		image: maven:3.5.0-jdk-8
		stage: build
		script:
		- mvn clean compile war:war
		- scp ./target/emergency-server-0.0.1-SNAPSHOT.war root@192.168.1.48:$APP_PATH/ROOT.war
		- ssh root@192.168.1.48 'docker restart tomcat-emergency'
		only:
		- master
