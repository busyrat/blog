# WEB 协议

## 第一章：HTTP/1.1 协议  (38 讲)

### 01 | 课程介绍

### 02 | 内容综述

### 03 | 浏览器发起 HTTP 请求的典型场景

### 04 | 基于 ABNF 语义定义的 HTTP 消息格式

### 05 | 网络为什么要分层：OSI 模型与 TCP/IP 模型

### 06 | HTTP 解决了什么问题？

### 07 | 评估 Web 架构的七大关键属性

### 08 | 从五种架构风格推导出 HTTP 的 REST 架构

### 09 | 如何用 Chrome 的 Network 面板分析 HTTP 报文

### 10 | URI 的基本格式以及与 URL 的区别

### 11 | 为什么要对 URI 进行编码？

### 12 | 详解 HTTP 的请求行

### 13 | HTTP 的正确响应码

### 14 | HTTP 的错误响应码

### 15 | 如何管理跨代理服务器的长短连接？

- Connection 头部 （HTTP/1.1 才有）

  - Keep-Alive：长连接
    - 客户端请求长连接：`Connection: Keep-Alive`
    - 服务端表示支持长连接：`Connection: Keep-Alive`
    - 客户端复用连接
    - HTTP/1.1 默认支持长连接
  - Close：短连接
  - 对代理服务器的要求：不转发 Connection 列出头部，**该头部仅与当前连接相关**

- Proxy-Connection

  - 陈旧的代理服务器不识别该头部，退化为短连接
  - 新版本的代理服务器理解该头部，用 Connection 代替 Proxy-Connection

- [NodeJS 长连接](https://juejin.im/post/5c7b1be9f265da2dac4568a2)

  ```js
  const request = require("request");
  request(
    {
      method: "GET",
      uri: "http://xxx:8887/xxx",
      time: true, // 配置这个属性可以看到时间信息
      forever: true, // 配置这个开启长连接
    },
    (error, response, body) => {
      console.log("timingPhases", response.timingPhases);
    }
  );
  ```

### 16 | HTTP 消息在服务器端的路由

- Host = uri-host[":" port]

  - HTTP/1.1 规范要求，不传递 Host 头部则返回 400 错误响应码
  - 域名众多，IP 相对来说不多
  - 为防止陈旧的代理服务器，发向正向代理的请求 request-target 必须 以 absolute-form 形式出现
    - request-line = method SP request-target SP HTTP-version CRLF
    - absolute-form = absolute-URI
      - absolute-URI = scheme ":" hier-part ["?"query]

### 17 | 代理服务器转发消息时的相关头部

- 如何传递 IP 地址

  - TCP 连接四元组
  - HTTP 头部 `X-Forwarded-For` 用于传递 IP，可以有多个，用逗号分割
  - HTTP 头部 `X-Real-IP` 用于传递用户 IP
  - 网络中存在许多反向代理

- 消息的转发

  - `Max-Forwards`：限制 Proxy 代理服务器的最大转发次数
  - `Via` 头部：指明经过的代理服务器名称及版本
  - `Cache-Control: no-transform`：禁止代理服务器修改响应包体

### 18 | 请求与响应的上下文

- 请求的上下文：

  - `User-Agent`
  - `Referer` 浏览器对来自某一页面的请求自动添加的头部
    - 服务器端常用于统计分析、缓存优化、防盗链等功能
    - Referer 不会被添加的场景
      - 来源页面采用的协议为表示本地文件的 file
      - 当请求页面采用 http 协议，而来源页面采用的是 https 协议

- 响应的上下文

  - `Server`
  - `Allow` 告诉客户端，服务器上该 URI 对应的资源允许哪些方法的执行
  - `Accept-Ranges` 告诉客户端服务器上该资源是否允许 range 请求

### 19 | 内容协商与资源表述

- 内容协商
  每个 URI 指向的资源可以是任何事物，可以有多种不同的表述，例如不同的语言、不同的媒体格式、不同的编码等

- Proactive 主动式内容协商

  - 质量因子 q：内容的质量、可接受类型的优先级
  - 媒体资源 MIME 类型及质量因子
    - Accept
    - Accept-Charset
    - Accept-Encoding
    - Accept-Langugage
  - 响应，元数据头部
    - 媒体类型、编码：content-type
    - 内容编码：content-encoding
    - 语言：Content-language

- Reactive 响应式内容协商，没有统一，很少使用

### 20 | HTTP 包体的传输方式（1）：定长包体

- 请求或者响应都可以携带包体

  - HTTP-message = start-line \*(header-field CRLF) CRLF [message-body]

    - message-body = \*OCTET：二进制字节流，且必须与实际传输的长度一致

  - 以下消息不能含有包体

    - HEAD 方法请求对应的响应
    - 1xx、204、304 对应的响应
    - CONNECT 方法对应的 2xx 响应

  - 使用 Content-Length 头部明确指明包体长度

    - Content-Length = 1 \*DIGIT (字节个数)
    - 当数字小于实际包体长度的时候，超过的数据客户端会丢掉；如果大于了，浏览器就会抛错

### 21 | HTTP 包体的传输方式（2）：不定长包体

- 不能确定包体的全部长度

  - 使用 `Transfer-Encoding`头部指明使用 `Chunk` 传输方式
  - 优点：

    - 基于长连接持续推送动态内容
    - 压缩体积较大的包体时，不必完全压缩完再发送，可以边发送变压缩
    - 传递必须在包体传输完才能计算出的 Trailer 头部

  - 头部：`transfer-coding = "chunked"`

    - chunked-body = \*chunk last-chunk trailer-part CRLF
      - chunk = chunk-size[chunk-ext] CRLF chunk-data CRLF
      - last-chunk = 1 \* ("0")[chunk-ext] CRLF
      - trailer-part = \* (header-field CRLF)

  - Trailer 头部的传输，很多浏览器还不支持

    - TE 头部：客户端的请求在声明是否接收 Trailer 头部 `TE: trailers`
    - Trailer 头部：服务器告知接下来 chunk 包体后会传输哪些 Trailer 头部

- Content-Disposition

  - disposition-type = "inline" | "attachment" | disp-ext-type

    - inline：指定包体是以内联的方式，作为页面的一部分展示
    - attachment：指定浏览器将包体以附件的方式下载 -例如：`Content-Disposition: attachment; filename="aaa.jpg"`

### 22 | HTML form 表单提交时的协议格式

- Form 表单：HTML 中的元素，提供了交互控制元件用来向服务器通过 HTTTP 协议提交信息，常见控件有：

  - Text Input
  - Checkboxes
  - Radio
  - Select
  - File
  - Clickable Button
  - Submit and Reset Button

- 关键属性

  - action：提交时发起 HTTP 请求的 URI
  - method：post / get
  - enctype：在 POST 方法下，对表单内容在请求包体中的编码方式
    - application/x-www-form-urlencoded 默认的
    - multipart/form-data
      - boundary 分隔符
      - 每部分表述皆有 HTTP 头部描述子包体
      - last boundary 结尾

- multipart：一个包体中多个资源表述

  - Content-type 头部指明这是个多表述包体
    - Content-type: multipart/form-data;

### 23 | 断点续传与多线程下载是如何做到的？^

- 多线程、断点续传、随机点播等场景的步骤

  - 客户端明确任务：从哪开始下载
    - 本地是否已有部分文件
      - 文件已下载部分在服务器端发生改变？
    - 使用几个线程并发下载
  - 下载文件的指定部分内容
  - 下载完毕后拼装成统一的文件

### 24 | Cookie 的格式与约束

- Cookie 头部可以存放多个 name/value 名值对

  - cookie-header = "Cookie:" OWS cookie-string OWS
    - cookie-string = cookie-pair \*(";" SP cookie-pair)
      - cookie-pair = cookie-name "=" cookie-value

- Set-Cookie 头部一次只能传递一个 name/value 名值对，响应中可以含多个头部

  - set-cookie-header = "Set-Cookie:" SP set-cookie-string
    - set-cookie-string = cookie-pair \*(";" SP cookie-av)
      - cookie-av = 描述 cookie-pair 的可选属性

- cookie-av = expires-av / max-age-av / domain-av / path-av / secure-av / httponly-av / extension-av

  - httponly-av = "HttpOnly"：不能使用 JS（Document.cookie、XMLHttpRequest、Request APIS）访问到 cookie

- 设计上的问题

  - Cookie 会被附加在每个 HTTP 请求中，所以无形中增加了流量
  - 明文传输
  - 上限 4KB，对于复杂的存储需要来说不够用

### 25 | Session 及第三方 Cookie 的工作原理

![](https://raw.githubusercontent.com/busyrat/picgo/master/20200521103407.png)

- 第三方 Cookie

  - 浏览器允许对于不安全域下的资源（如广告图片）响应中的 Set-Cookie 保存，并在后续访问该域时自动使用 Cookie

### 26 | 浏览器为什么要有同源策略？

同一个浏览器发出的请求，未必都是用户自愿发出的请求

同源：协议、主机、端口 三者必须完全相同

- 安全性与可用性需要一个平衡点

  - 可用性：HTML 决定跨域请求是否对本站点安全

    - script \ img \ iframe \ link \ video \ audio
    - 允许跨域写操作：例如表单提交或者重定向请求
      - CSRF 安全性问题

  - 安全性：浏览器需要防止站点 A 的脚本向站点 B 发起危险动作

    - Cookie \ LocalStorage 和 IndexDB
    - DOM 无法获得
    - AJAX 请求不能发送

- CSRF 利用表单跨域写

  ![](https://raw.githubusercontent.com/busyrat/picgo/master/20200521110006.png)

  真正的服务可以查看 Referer 头验证，如果浏览器不支持 Refeer 就无法防止。

  ![](https://raw.githubusercontent.com/busyrat/picgo/master/20200521110211.png)

### 27 | 如何“合法”地跨域访问？

CORS：Cross-Origin Resource Sharing

- 浏览器同源策略下的跨域访问解决方案

  - 如果站点 A 允许站点 B 的脚本访问其资源，必须在 HTTP 响应中显式的告知浏览器：站点 B 是被允许的
  - 策略 1：何为简单请求
    - GET / HEAD / POST 方法之一
    - 仅能使用 CORS 安全的头部：
      - Accept
      - Accept-Language
      - Content-Language
      - Content-Type
    - Content-Type 只能是三者其中之一：
      - text/plain
      - multipart/form-data
      - application/x-www-form-urlencoded
  - 策略 2：简单请求以外的请求
    - 访问资源前，需要先发起 prefilght 预检请求（方法为 OPTIONS）询问何种请求是被允许的

- nginx 相关配置举例

  ```nginx
  location / {
    add_header Access-Control-Allow-Origin 'http://main.com'
  }
  ```

- 非简单跨域
  - 请求头部
    - Access-Control-Request-Method
    - Access-Control-Request-Header
  - 响应头部
    - Access-Control-Allow-Methods
    - Access-Control-Allow-Headers
    - Access-Control-Max-Age
    - Access-Control-Expose-Headers
    - Access-Control-Allow-Origin
    - Access-Control-Allow-Credentials

### 28 | 条件请求的作用

### 29 | 缓存的工作原理

### 30 | 缓存新鲜度的四种计算方式

- response_is_fresh = (freshness_lifetime > current_age)

  - freshness_lifetime：按优先级，取以下响应头部的值
    - s-maxage > max-age > Expires > 预估过期时间
      - 通常的服务端都没有配置 max-age 等，所以浏览器有个预估过期时间：(DownloadTime - LastModified) \* 10%

- Age 表示自源服务器发出响应（或者验证过期混存），到使用缓存的响应发出时经过的秒数

### 31 | 复杂的 Cache-Control 头部

### 32 | 什么样的响应才会被缓存

### 33 | 多种重定向跳转方式的差异

### 34 | 如何通过 HTTP 隧道访问被限制的网络
 
### 35 | 网络爬虫的工作原理与应对方式

### 36 | HTTP 协议的基本认证

### 37 | Wireshark 的基本用法

### 38 | 如何通过 DNS 协议解析域名？

## 第二章：WebSocket 协议  (10 讲)

### 39 | Wireshark 的捕获过滤器

### 40 | Wireshark 的显示过滤器

### 41 | Websocket 解决什么问题

### 42 | Websocket 的约束

### 43 | WebSocket 协议格式

### 44 | 如何从 HTTP 升级到 WebSocket

### 45 | 传递消息时的编码格式

### 46 | 掩码及其所针对的代理污染攻击

### 47 | 如何保持会话心跳

### 48 | 如何关闭会话

## 第三章：HTTP/2 协议  (21 讲)

### 49 | HTTP/1.1 发展中遇到的问题

### 50 | HTTP/2 特性概述

### 51 | 如何使用 Wireshark 解密 TLS/SSL 报文？

### 52 | h2c：在 TCP 上从 HTTP/1 升级到 HTTP/2

### 53 | h2：在 TLS 上从 HTTP/1 升级到 HTTP/2

### 54 | 帧、消息、流的关系

### 55 | 帧格式：Stream 流 ID 的作用

### 56 | 帧格式：帧类型及设置帧的子类型

### 57 | HPACK 如何减少 HTTP 头部的大小？

### 58 | HPACK 中如何使用 Huffman 树编码？

### 59 | HPACK 中整型数字的编码

### 60 | HPACK 中头部名称与值的编码格式

### 61 | 服务器端的主动消息推送

### 62 | Stream 的状态变迁

### 63 | RST_STREAM 帧及常见错误码

### 64 | 我们需要 Stream 优先级

### 65 | 不同于 TCP 的流量控制

### 66 | HTTP/2 与 gRPC 框架

### 67 | HTTP/2 的问题及 HTTP/3 的意义

### 68 | HTTP/3: QUIC 协议格式

### 69 | 七层负载均衡做了些什么？

## 第四章：TLS/SSL 协议  (14 讲)

### 70 | TLS 协议的工作原理

### 71 | 对称加密的工作原理（1）：XOR 与填充

### 72 | 对称加密的工作原理（2）：工作模式

### 73 | 详解 AES 对称加密算法

### 74 | 非对称密码与 RSA 算法

### 75 | 基于 openssl 实战验证 RSA

### 76 | 非对称密码应用：PKI 证书体系

### 77 | 非对称密码应用：DH 密钥交换协议

### 78 | ECC 椭圆曲线的特性

### 79 | DH 协议升级：基于椭圆曲线的 ECDH 协议

### 80 | TLS1.2 与 TLS1.3 中的 ECDH 协议

### 81 | 握手的优化：session 缓存、ticket 票据及 TLS1.3 的 0-RTT

### 82 | TLS 与量子通讯的原理

### 83 | 量子通讯 BB84 协议的执行流程

## 第五章：TCP 协议  (25 讲)

### 84 | TCP 历史及其设计哲学

### 85 | TCP 解决了哪些问题

### 86 | TCP 报文格式

### 87 | 如何使用 tcpdump 分析网络报文

### 88 | 三次握手建立连接

### 89 | 三次握手过程中的状态变迁

### 90 | 三次握手中的性能优化与安全问题

### 91 | 数据传输与 MSS 分段

### 92 | 重传与确认

### 93 | RTO 重传定时器的计算

### 94 | 滑动窗口：发送窗口与接收窗口

### 95 | 窗口的滑动与流量控制

### 96 | 操作系统缓冲区与滑动窗口的关系

### 97 | 如何减少小报文提高网络效率

### 98 | 拥塞控制（1）：慢启动

### 99 | 拥塞控制（2）：拥塞避免

### 100 | 拥塞控制（3）：快速重传与快速恢复

### 101 | SACK 与选择性重传算法

### 102 | 从丢包到测量驱动的拥塞控制算法

### 103 | Google BBR 拥塞控制算法原理

### 104 | 关闭连接过程优化

### 105 | 优化关闭连接时的 TIME-WAIT 状态

### 106 | keepalive 、校验和及带外数据

### 107 | 面向字节流的 TCP 连接如何多路复用

### 108 | 四层负载均衡可以做什么

## 第六章：IP 协议  (13 讲)

### 109 | 网络层与链路层的功能

### 110 | IPv4 分类地址

### 111 | CIDR 无分类地址

### 112 | IP 地址与链路地址的转换：ARP 与 RARP 协议

### 113 | NAT 地址转换与 LVS 负载均衡

### 114 | IP 选路协议

### 115 | MTU 与 IP 报文分片

### 116 | IP 协议的助手：ICMP 协议

### 117 | 多播与 IGMP 协议

### 118 | 支持万物互联的 IPv6 地址

### 119 | IPv6 报文及分片

### 120 | 从 wireshark 报文统计中找规律

### 121 | 结课测试&结束语"
