# mongodb

[官方下载地址](https://www.mongodb.com/download-center/community)

[社区教程](https://www.digitalocean.com/community/tutorials/how-to-install-mongodb-on-centos-7)



## 概念

- Step 1

  ```
  # vim /etc/yum.repos.d/mongodb-org-3.4.repo
  [mongodb-org-3.4]
  name=MongoDB Repository
  # baseurl=https://repo.mongodb.org/yum/redhat/$releasever/mongodb-org/3.4/x86_64/
  baseurl=https://mirrors.aliyun.com/mongodb/yum/redhat/7Server/mongodb-org/3.4/x86_64
  gpgcheck=1
  enabled=1
  gpgkey=https://www.mongodb.org/static/pgp/server-3.4.asc
  ```

  

- Step 2

  ```shell
  sudo yum install -y mongodb-org
  ```



- Step 3

  ```
  # start / stop / reload
  sudo systemctl start mongod
  
  # 查看日志
  sudo tail /var/log/mongodb/mongod.log
  ```

  

- step 4

  ```
  $ cd /tmp
  
  $ curl -LO https://raw.githubusercontent.com/mongodb/docs-assets/primer-dataset/primer-dataset.json
  
  $ mongoimport --db test --collection restaurants --file /tmp/primer-dataset.json
  
  $ mongo
  
  > db.restaurants.find().limit( 1 ).pretty()
  ```


- Step 5

  设置密码

  ```
  $ mongo
  
  > use admin
  
  > db.createUser({user: 'root', pwd: '123456', roles: ['root']})
  
  > db.auth('root', '123456') 验证：返回 1 是成功
  
  > use Article
  
  > db.createUser({user:'zwVic',pwd:'adgjmp123',roles: [{role:'readWrite',db:'Article'}]})
  
  $ mongod --auth 重启带上权限
  ```

- step 6

  xxx.db('mongodb://your name: your pwd@ ip :27017/Article');

  连接

  

## 概念

|      | mysql  |    mongo    |
| :--: | :----: | :---------: |
| 类别 | 关系型 |  非关系型   |
|  表  | Table  | Collections |
|  行  |  Row   |  Document   |
|  列  | Column |    Filed    |







## 坑

- 远程服务器的 mongo 连上不，需要修改 /etc/mongod.conf 的 net.bindIp: 0.0.0.0