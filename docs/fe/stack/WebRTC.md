# WebRTC

## Docker部署coturn

[coturn](https://hub.docker.com/r/instrumentisto/coturn)

新建my.conf，添加一些配置：

```conf
listening-ip=<内网地址>
listening-port=3478
relay-ip=<内网地址>
external-ip=<外网地址>
relay-threads=500
lt-cred-mech
pidfile="/var/run/turnserver.pid"
min-port=49152
max-port=65535
user=admin:123456
realm=Aha
```

启动容器：

```shell
docker run -d --network=host --name=coturn -v $(pwd)/my.conf:/etc/coturn/turnserver.conf instrumentisto/coturn --no-cli
```

tips: 可以先把 -d 换成 --rf 参数，看输出没问题了再后台运行也不迟

启动完成去验证：

https://webrtc.github.io/samples/src/content/peerconnection/trickle-ice/

