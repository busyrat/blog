# Redis

> http是无状态的，存储 session 的数据库



## 安装、启动

```shell
# 安装
yum install redis

# 启动
systemctl start redis
# mac
redis-server &

# 测试是否成功
redis-cli
127.0.0.1:6379> ping
pang
```



## 使用

```shell
# 修改 host，让 redis 服务能够远程操作
vim /etc/redis.conf 
```

```
# bind 127.0.0.1
bind 0.0.0.0
```

```shell
# 暂停
systemctl stop redis
systemctl start redis

redis-cli
> keys * 
> hget keyname propname // key 对应的 value 有多个属性用 hget
```



## docker

```she
docker search redis
docker pull redis
docker images redis
docker run --name wh-redis -p 6379:6379 -v $PWD/data:/data -d redis redis-server --appendonly yes
```













