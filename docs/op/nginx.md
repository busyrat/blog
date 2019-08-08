# nginx

## Nginx启用压缩

```nginx
# 开启压缩  
gzip  on;   
# 设置允许压缩的页面最小字节数，页面字节数从header头得content-length中进行获取。默认值是0，不管页面多大都压缩。建议设置成大于2k的字节数，小于2k可能会越压越大。  
gzip_min_length 2k;  
# 设置系统获取几个单位的缓存用于存储gzip的压缩结果数据流。 例如 4 4k 代表以4k为单位，按照原始数据大小以4k为单位的4倍申请内存。 4 8k 代表以8k为单位，按照原始数据大小以8k为单位的4倍申请内存。  
# 如果没有设置，默认值是申请跟原始数据相同大小的内存空间去存储gzip压缩结果。  
gzip_buffers 4 16k;  
#压缩级别，1-10，数字越大压缩的越好，也越占用CPU时间  
gzip_comp_level 5;  
# 默认值: gzip_types text/html (默认不对js/css文件进行压缩)  
# 压缩类型，匹配MIME类型进行压缩  
# 不能用通配符 text/*  
# (无论是否指定)text/html默认已经压缩   
# 设置哪压缩种文本文件可参考 conf/mime.types  
gzip_types text/plain application/x-javascript text/css application/xml;    
# 值为1.0和1.1 代表是否压缩http协议1.0，选择1.0则1.0和1.1都可以压缩  
gzip_http_version 1.0   
# IE6及以下禁止压缩  
gzip_disable "MSIE [1-6]\.";   
# 默认值：off  
# Nginx作为反向代理的时候启用，开启或者关闭后端服务器返回的结果，匹配的前提是后端服务器必须要返回包含"Via"的 header头。  
# off - 关闭所有的代理结果数据的压缩  
# expired - 启用压缩，如果header头中包含 "Expires" 头信息  
# no-cache - 启用压缩，如果header头中包含 "Cache-Control:no-cache" 头信息  
# no-store - 启用压缩，如果header头中包含 "Cache-Control:no-store" 头信息  
# private - 启用压缩，如果header头中包含 "Cache-Control:private" 头信息  
# no_last_modified - 启用压缩,如果header头中不包含 "Last-Modified" 头信息  
# no_etag - 启用压缩 ,如果header头中不包含 "ETag" 头信息  
# auth - 启用压缩 , 如果header头中包含 "Authorization" 头信息  
# any - 无条件启用压缩  
gzip_proxied expired no-cache no-store private auth;  
# 给CDN和代理服务器使用，针对相同url，可以根据头信息返回压缩和非压缩副本  
gzip_vary on;  
```

## 设置消息头

```nginx
proxy_set_header X-Real-IP $remote_addr;
proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
proxy_set_header Host $host:$server_port;
```

## 设置nginx可以访问软连接

1. 在http里添加 disable_symlinks off; 
2. 修改目录权限：chmod -R 777 file
3. 实在不行修改nginx.conf文件: user root 使用root用户运行nginx。

