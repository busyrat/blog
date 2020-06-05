(window.webpackJsonp=window.webpackJsonp||[]).push([[53],{595:function(t,a,s){"use strict";s.r(a);var e=s(18),r=Object(e.a)({},function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h1",{attrs:{id:"linux"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#linux","aria-hidden":"true"}},[t._v("#")]),t._v(" linux")]),t._v(" "),s("h2",{attrs:{id:"ssh"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#ssh","aria-hidden":"true"}},[t._v("#")]),t._v(" ssh")]),t._v(" "),s("ul",[s("li",[s("p",[t._v("修改 ssh 默认 22 端口")]),t._v(" "),s("div",{staticClass:"language-shell extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("vim /etc/ssh/sshd_config\n\n# 找到 Port 22那一行，修改成\nPort 22\nPort 2202\n\n# 重启 sshd 服务\nsystemctl restart sshd\n")])])])]),t._v(" "),s("li",[s("p",[t._v("免问权限")]),t._v(" "),s("div",{staticClass:"language-shell extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("$ ssh -o StrictHostKeyChecking=no\n")])])])]),t._v(" "),s("li",[s("p",[t._v("免密登录")]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("# .ssh/authorized_keys 添加ssh公钥\nssh-rsa xxxxxxx\n")])])])])]),t._v(" "),s("h2",{attrs:{id:"定时任务"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#定时任务","aria-hidden":"true"}},[t._v("#")]),t._v(" 定时任务")]),t._v(" "),s("ul",[s("li",[t._v("crontabs 命令`可以定时按计划执行任务\n"),s("ul",[s("li",[t._v("有些教程是执行 "),s("code",[t._v("crond")]),t._v("，实际上是 "),s("code",[t._v("cron")])])])]),t._v(" "),s("li",[s("code",[t._v("ls -l /etc/init.d")]),t._v(" 查看那些命令可以执行")])]),t._v(" "),s("h2",{attrs:{id:"进程"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#进程","aria-hidden":"true"}},[t._v("#")]),t._v(" 进程")]),t._v(" "),s("ul",[s("li",[t._v("查看"),s("code",[t._v("ps -ef | grep mongo")])])]),t._v(" "),s("h2",{attrs:{id:"系统信息"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#系统信息","aria-hidden":"true"}},[t._v("#")]),t._v(" 系统信息")]),t._v(" "),s("ul",[s("li",[t._v("查看系统："),s("code",[t._v("cat /etc/os-release")])]),t._v(" "),s("li",[t._v("Centos 查看 系统信息："),s("code",[t._v("uname -r")]),t._v(" 和 "),s("code",[t._v("cat /etc/issue")]),t._v(" 或 "),s("code",[t._v("cat /etc/redhat-release")])])]),t._v(" "),s("h2",{attrs:{id:"systemctl"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#systemctl","aria-hidden":"true"}},[t._v("#")]),t._v(" systemctl")]),t._v(" "),s("ul",[s("li",[s("a",{attrs:{href:"%5Bhttp://www.ruanyifeng.com/blog/2016/03/systemd-tutorial-commands.html%5D(http://www.ruanyifeng.com/blog/2016/03/systemd-tutorial-commands.html)"}},[t._v("参考")])])]),t._v(" "),s("h2",{attrs:{id:"curl"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#curl","aria-hidden":"true"}},[t._v("#")]),t._v(" curl")]),t._v(" "),s("ul",[s("li",[t._v("post 请求：`curl -X POST -d 'name=xiaoming&age=18' http://localhost:3000/api/add")])]),t._v(" "),s("h2",{attrs:{id:"重置密码"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#重置密码","aria-hidden":"true"}},[t._v("#")]),t._v(" 重置密码")]),t._v(" "),s("div",{staticClass:"language-shell extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("sudo passwd root\n")])])]),s("h2",{attrs:{id:"yum"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#yum","aria-hidden":"true"}},[t._v("#")]),t._v(" yum")]),t._v(" "),s("ul",[s("li",[s("p",[t._v("换源")]),t._v(" "),s("div",{staticClass:"language-shell extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("$ mv /etc/yum.repos.d/CentOS-Base.repo /etc/yum.repos.d/CentOS-Base.repo.backup\n\n$ wget -O /etc/yum.repos.d/CentOS-Base.repo http://mirrors.aliyun.com/repo/Centos-7.repo\n\n# 运行yum makecache生成缓存\n$ yum makecache\n\n$ yum -y update\n已加载插件：fastestmirror, refresh-packagekit, security\n设置更新进程Loading mirror speeds from cached hostfile\n* base: mirrors.aliyun.com\n* extras: mirrors.aliyun.com\n* updates: mirrors.aliyun.com\n")])])])])]),t._v(" "),s("h2",{attrs:{id:"切换到-root-用户"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#切换到-root-用户","aria-hidden":"true"}},[t._v("#")]),t._v(" 切换到 root 用户")]),t._v(" "),s("div",{staticClass:"language-shell extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("$ su\n")])])]),s("h2",{attrs:{id:"第三方仓库-ius-安装-git2-x"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#第三方仓库-ius-安装-git2-x","aria-hidden":"true"}},[t._v("#")]),t._v(" 第三方仓库("),s("a",{attrs:{href:"https://ius.io/GettingStarted/",target:"_blank",rel:"noopener noreferrer"}},[t._v("IUS"),s("OutboundLink")],1),t._v(")安装 git2.x")]),t._v(" "),s("div",{staticClass:"language-shell extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("# 安装IUS 工具\n$ curl https://setup.ius.io | sh\n\n# 查询到 git2u\n$ yum search git\n...\ngit.x86_64 : Fast Version Control System\ngit2u.x86_64 : Fast Version Control System\ngitflow.noarch : Extensions providing operations for V. Driessen's branching model\n...\n\n# 安装 git 2.x\n$ yum -y install git2u\n\n# 完成\n$ git --version\ngit version 2.16.4\n")])])]),s("p",[s("a",{attrs:{href:"https://blog.csdn.net/caimengyuan/article/details/80634752",target:"_blank",rel:"noopener noreferrer"}},[t._v("参考"),s("OutboundLink")],1)]),t._v(" "),s("h2",{attrs:{id:"sshpass"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#sshpass","aria-hidden":"true"}},[t._v("#")]),t._v(" sshpass")]),t._v(" "),s("p",[t._v("一个可以带上密码免交互的工具")]),t._v(" "),s("div",{staticClass:"language-shell extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("sshpass -p $PASSWORD scp -r ./dist/* $USER@$SERVER:/data/www/\n")])])]),s("h2",{attrs:{id:"lftp"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#lftp","aria-hidden":"true"}},[t._v("#")]),t._v(" lftp")]),t._v(" "),s("p",[t._v("传送文件到目标服务器")]),t._v(" "),s("div",{staticClass:"language-shell extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v('lftp -c "mirror -R dist/ sftp://$USER:$PASSWORD@$SERVER/$TARGET/dist"\n')])])]),s("h2",{attrs:{id:"测速"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#测速","aria-hidden":"true"}},[t._v("#")]),t._v(" 测速")]),t._v(" "),s("div",{staticClass:"language-shell extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("wget https://raw.githubusercontent.com/sivel/speedtest-cli/master/speedtest.py\nchmod +rx speedtest.py\nsudo mv speedtest.py /usr/local/bin/speedtest-cli\nsudo chown root:root /usr/local/bin/speedtest-cli\nspeedtest-cli\n")])])]),s("h2",{attrs:{id:"防火墙开放-ip-段"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#防火墙开放-ip-段","aria-hidden":"true"}},[t._v("#")]),t._v(" 防火墙开放 IP 段")]),t._v(" "),s("p",[t._v("在一台服务器上部署了一个 npm 私有仓库（xxx:4873），但是在用 gitlab-ci runner 下载依赖的时候，怎么都访问不到。")]),t._v(" "),s("p",[t._v("有一个这样的报错：")]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v('error An unexpected error occurred: "http://xxx:4873/debug/-/debug-3.1.0.tgz: connect EHOSTUNREACH xxx:4873".\n')])])]),s("p",[t._v("在容器内部是可以 Ping 通私有仓库的地址的，就是访问不到。")]),t._v(" "),s("p",[t._v("接着我又尝试直接访问页面")]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("$ curl xxx:4873\ncurl: (7) Failed to connect to xxx port 4873: No route to host\n")])])]),s("p",[t._v("配置防火墙白名单")]),t._v(" "),s("div",{staticClass:"language-xml extra-class"},[s("pre",{pre:!0,attrs:{class:"language-xml"}},[s("code",[t._v("// /etc/firewalld/zones/public.xml\n"),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("zone")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n\t...\n  "),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("rule")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("family")]),s("span",{pre:!0,attrs:{class:"token attr-value"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("ipv4"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("source")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("address")]),s("span",{pre:!0,attrs:{class:"token attr-value"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("172.17.0.0/24"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("/>")])]),t._v(" # 代表开放172.17.0.0 - 172.17.0.255\n    "),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("accept")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("/>")])]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("rule")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("zone")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n")])])]),s("p",[t._v("重启防火墙："),s("code",[t._v("systemctl restart firewalld.service")]),t._v("，一切 OK")]),t._v(" "),s("p",[s("a",{attrs:{href:"https://blog.csdn.net/ywd1992/article/details/80401630",target:"_blank",rel:"noopener noreferrer"}},[t._v("参考：Linux 系统通过 firewall 限制或开放 IP 及端口"),s("OutboundLink")],1)]),t._v(" "),s("p",[s("a",{attrs:{href:"https://blog.csdn.net/bacteriumX/article/details/83589126",target:"_blank",rel:"noopener noreferrer"}},[t._v("参考：Docker 启动容器报错: connect: no route to host"),s("OutboundLink")],1)]),t._v(" "),s("h2",{attrs:{id:"文件大小"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#文件大小","aria-hidden":"true"}},[t._v("#")]),t._v(" 文件大小")]),t._v(" "),s("p",[s("code",[t._v("du -h -d 1")])]),t._v(" "),s("h2",{attrs:{id:"字符串处理"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#字符串处理","aria-hidden":"true"}},[t._v("#")]),t._v(" 字符串处理")]),t._v(" "),s("p",[t._v("把根目录下的 *.md 文件以链接的形式写入 README")]),t._v(" "),s("p",[s("code",[t._v('ls -1 | awk -F \'.md\' \'{print "[" $1 "](./" $1 ")\\n" }\' >> README.md')])]),t._v(" "),s("h2",{attrs:{id:"tree"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#tree","aria-hidden":"true"}},[t._v("#")]),t._v(" tree")]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("tree -L 2 -I 'node_modules|.git|.DS_Store' -a\n")])])]),s("h2",{attrs:{id:"rpm-redhat-package-manager（redhat-软件包管理工具）"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#rpm-redhat-package-manager（redhat-软件包管理工具）","aria-hidden":"true"}},[t._v("#")]),t._v(" Rpm RedHat Package Manager（RedHat 软件包管理工具）")]),t._v(" "),s("div",{staticClass:"language-shell extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("# 下载\n$ rpm -i xxx\n# 查询\n$ rpm -q xxx\n# 删除\n$ rpm -e\n")])])]),s("h2",{attrs:{id:"frp"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#frp","aria-hidden":"true"}},[t._v("#")]),t._v(" frp")]),t._v(" "),s("blockquote",[s("p",[t._v("frp 是一个可用于内网穿透的高性能的反向代理应用，支持 tcp, udp, http, https 协议。")])]),t._v(" "),s("h3",{attrs:{id:"使用"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#使用","aria-hidden":"true"}},[t._v("#")]),t._v(" 使用")]),t._v(" "),s("ul",[s("li",[s("p",[s("a",{attrs:{href:"https://github.com/fatedier/frp/releases",target:"_blank",rel:"noopener noreferrer"}},[t._v("下载软件"),s("OutboundLink")],1),t._v(" (mac 使用 darwin, 小米路由器 3 使用 mipsle)")])]),t._v(" "),s("li",[s("p",[t._v("安装软件分为两部分：将 frps 及 frps.ini 放到具有公网 IP 的机器上；将 frpc 及 frpc.ini 放到处于内网环境的机器上。两个软件需要版本一致。")])]),t._v(" "),s("li",[s("p",[t._v("配置 frps.ini 执行 "),s("code",[t._v("./frps -c ./frps.ini")])])]),t._v(" "),s("li",[s("p",[t._v("配置 frpc.ini 执行 "),s("code",[t._v("./frpc -c ./frpc.ini")])])]),t._v(" "),s("li",[s("p",[t._v("后台运行")]),t._v(" "),s("ul",[s("li",[s("p",[t._v("screen command")])]),t._v(" "),s("li",[s("p",[t._v("nohup command &")])])])])]),t._v(" "),s("h3",{attrs:{id:"参考"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#参考","aria-hidden":"true"}},[t._v("#")]),t._v(" 参考")]),t._v(" "),s("p",[s("a",{attrs:{href:"https://github.com/fatedier/frp",target:"_blank",rel:"noopener noreferrer"}},[t._v("frp 官方"),s("OutboundLink")],1)]),t._v(" "),s("p",[s("a",{attrs:{href:"http://www.sunnyrx.com/2016/10/21/simple-to-use-frp/",target:"_blank",rel:"noopener noreferrer"}},[t._v("一篇好博文"),s("OutboundLink")],1)])])},[],!1,null,null,null);a.default=r.exports}}]);