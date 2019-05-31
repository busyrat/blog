# docker

Tip加速: dokcer -> Preferences -> Advanced -> Registry mirrors

## 目标

- docker介绍
- 如何制作一个镜像
- 如何持久化容器数据
- 如何分享一个镜像

## 架构图

![](http://ww1.sinaimg.cn/large/a75caef7gy1g3ihcawq4lj20r20f2n1k.jpg)

## 初识 docker

- 第一个 docker 服务

  ```shell
  $ docker run ubuntu echo hello docker
  ```

- 第二个 docker 服务

  ```shell
  $ docker run -p 8080:80 -d nginx
  04907b26c8a3756a449be983be09aac6ddd61b67e0fde4d49e04efd200e20b4d
  # -p(--publish list): Publish a container's port(s) to the host 即端口映射
  # -d(--detach): Run container in background and print container ID 后台运行
  
  # 修改 nginx 默认显示
  $ echo <html><h1>hello docker!</h1><html> tmp/index.html
  $ docker cp tmp/index.html 04907b26c8a3://usr/share/nginx/html
  
  # 停止
  $ docker stop 04907b26c8a3
  
  # 保存刚刚的修改，生成一个新的 image
  $ docker commit -m 'fun' 04907b26c8a3 nginx-fun
  $ sha256:f8cbe4b06e8237a68e2d806736682c99eb3138a2aa949527aa56782665bdf271
  ```

## 制作一个 docker 镜像

- 第一个 dockerfile

  编写一个 Dockerfile 文件

  ```dockerfile
  FROM alpine:latest
  MAINTAINER wh
  CMD echo 'hello docker'
  ```

  打包：`docker build -t hello_docker` 得到一个新的 image

- 第二个 dockerfile

  ```dockerfile
  FROM ubuntu
  MAINTAINER wh
  RUN apt-get update
  RUN apt-get install -y nginx
  COPY index.html /var/www/html
  ENTRYPOINT ["/usr/sbin/nginx", "-g", "daemon off;"]
  EXPOSE 80
  ```

  没一个语句都会生成一个新的 images

## 持久化方案

- Volume 提供独立于容器之外的持久化存储

  ```shell
  # 映射
  $ docker run -p 8080:80 -d -v $PWD/html:/usr/share/nginx/html nginx
  
  # 创建一个容器
  $ docker create -v $PWD/data:/vaar/mydata --name my ubuntu
  
  # 创建一个容器并继承上一个容器的挂载
  $ dokeer run -it --volumes-from my unbuntu /bin/bash
  ```

- Registry 共享仓库

  ```shell
  docker search xxx
  docker pull xxx
  
  docker login
  docker push
  ```

- 其他命令

  ```shell
  docker logs -f xxx
  docker build -t xxx:1.0 -f /root/Dockfile
  # -t(--tag) 起名字  -f(--file) 指定文件
  ```

  