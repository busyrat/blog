# GitLab CI



[GitLab Runner](https://docs.gitlab.com/runner/install/)

[GitLab CI](https://docs.gitlab.com/ee/ci/README.html)

## 安装

```shell
# 下载镜像
sudo docker pull gitlab/gitlab-runner:latest

# 启动
sudo docker run -d --name gitlab-runner --restart always \
>   -v /srv/gitlab-runner/config:/etc/gitlab-runner \
>   -v /var/run/docker.sock:/var/run/docker.sock \
>   gitlab/gitlab-runner:latest

# 注册
sudo docker exec -it gitlab-runner gitlab-ci-multi-runner register
```

生成的 `/srv/gitlab-runner/config/config.toml` 文件

```toml
concurrent = 1
check_interval = 0

[session_server]
  session_timeout = 1800

[[runners]]
  name = "wh-fe-62-101"
  url = "https://git.wh.com/"
  token = "d66c0d2167e5c450e0e6d3e3009ed7"
  executor = "docker"
  [runners.custom_build_dir]
  [runners.docker]
    tls_verify = false
    image = "alpine:latest"
    privileged = false
    disable_entrypoint_overwrite = false
    oom_kill_disable = false
    disable_cache = false
    volumes = ["/cache"]
    shm_size = 0
  [runners.cache]
    [runners.cache.s3]
    [runners.cache.gcs]
```

## 补充

### SSH 常用操作

- 生成 ssh-key： `ssh-keygen` ，默认情况下会在 `~/.ssh/`目录下生成两个文件：`id_rsa`、`id_rsa.pub`，分别存放私钥和公钥

- gitlab / github 仓库免密 `clone` 代码，需要将 ssh 的公钥添加到目标平台的 SSH Keys 中

- 免密登录服务器：将客户端的公钥复制到服务器的 `~/.ssh/authorized_keys` 里面

- 第一次连接 ssh 出现一个询问：

  ```cmd
  $ ssh xx.xx.xx.xx
  The authenticity of host 'xx.xx.xx.xx (xx.xx.xx.xx)' can't be established. 
  ```

  关闭这个地提示可以加上 `ssh -o StrictHostKeyChecking=no xx.xx.xx.xx  `

- 有个很好用的工具 `sshpass` ，免 `ssh` 登录交互，使用 `sshpass -p [password] ssh ...`



###Docker 常用操作

- docker images 查看本地的镜像
- docker run -it [image-name] /bin/bash 运行镜像并进入
- docker ps 查看进程，`docker ps -as` 查看所有进程
- docker rm [contrainer-name] 删除容器
- docker image rm [image-name] 删除镜像



### CI 脚本

```yaml
before_script:
  - 'which ssh-agent || ( apt-get update -y && apt-get install openssh-client -y )'
  - eval $(ssh-agent -s)
  - ssh-add <(echo "$SSH_PRIVATE_KEY")
  # 创建 .ssh 目录，-p --parents 可以创建一个路径的名称，不存在就自动创建
  - mkdir -p ~/.ssh
  - '[[ -f /.dockerenv ]] && echo -e "Host *\n\tStrictHostKeyChecking no\n\n" > ~/.ssh/config'

```



### runner使用本地image

```toml
[[runners]]
  ...
  [runners.docker]
    ...
    volumes = ["/cache"]
    pull_policy = "if-not-present"	// 添加这一行配置，重启runner
```

[参考](https://www.jianshu.com/p/2b7e73b0a096)