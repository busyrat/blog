# docker-compose

## 目标

- 搭建一个博客平台

## 整体架构

- nginx
- Ghost app
- mysql

## 安装

```shell
sudo curl -L "https://github.com/docker/compose/releases/download/1.24.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

# 添加权限
sudo chmod a+x /usr/local/bin/docker-compose

docker-compose --version
```

## nginx



## ghost app



## 启动

```shell
# 第一次不用 build
docker-compose up -d
docker-compose stop
docker-compose rm
docker-compose build
```



