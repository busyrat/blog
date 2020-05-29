查看 nginx 进程 `ps -ef | grep nginx`

配置文件地址变更 `nginx -c /home/app/nginx/conf/nginx.conf`

重新生成日志 `nginx -s reopen`

测试配置 `nginx -t`

一个简单的代理：

```nginx
http {
  upstream local {
		server 127.0.0.1:8080;
	}
  server {
    location /proxy/ {
    	proxy_pass http://local/;
    }
  }
}
```

## 16丨SSL 证书的公信力是如何保证的？

### PKI公钥基础设施

<img src="https://raw.githubusercontent.com/busyrat/picgo/master/image-20200518145210155.png" alt="image-20200518145210155" />

### 证书类型

<img src="https://raw.githubusercontent.com/busyrat/picgo/master/image-20200518145255303.png" alt="image-20200518145255303" />

### 证书链

目前所有证书由三个证书构成：根证书、二级证书、主证书

