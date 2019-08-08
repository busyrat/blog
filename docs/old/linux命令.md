### 目录树

linux的目录树：linux下所有的目录与文件都是从/(根)开始的。/是所有目录、文件的源头，各个文件目录都是从/开始，一个个分支走下来，有点像树枝，所以这种目录配置就叫目录树。

需要区别于windows的分区模式

- .   指当前路径
- ..  指上级路径
- /aaa/bbb/c.txt 绝对路径
- ./abc/cde/f.img 相对路径



### cd：change directory，改变当前工作目录

- cd /home : 进入一个绝对路径，无论当前工作路径在哪里
- cd ./abc : 进入一个相对路径，例如当前工作路径是/home，执行完命令后所在的目录为/home/abc
- cd .. : 进入父级目录，例如当前工作路径是/home/abc，执行完命令所在的目录为/home
- cd ~ : 进入当前用户的home目录

### ls：显示文件信息

```
root@master-01:/home/kubernetes# ls -lah
total 108K
drwxr-xr-x 24 root root 4.0K Nov 29 12:58 .
drwxr-xr-x  9 root root 4.0K Sep 26 16:39 ..
drwxr-xr-x  2 root root 4.0K Oct 13 16:58 admin-user
drwxr-xr-x  3 root root 4.0K Nov 30 09:55 agms
drwxr-xr-x  3 root root 4.0K Nov 26 16:30 calico
drwxr-xr-x  2 root root 4.0K Nov  8 20:21 cfssl
drwxr-xr-x  3 root root 4.0K Nov  7 14:20 dashboard
drwxr-xr-x  2 root root 4.0K Jun 21 16:05 docker
drwxr-xr-x  3 root root 4.0K Nov 14 19:06 dongying-demo
drwxr-xr-x  3 root root 4.0K Nov 29 16:23 etcd
drwxr-xr-x  3 root root 4.0K Nov 30 14:09 fpi-micro-service
drwxr-xr-x  2 root root 4.0K Nov  7 20:06 fpi-test-service
drwxr-xr-x  2 root root 4.0K Nov 21 15:58 fpi-wuhan-service
drwxr-xr-x  3 root root 4.0K Jul 30 17:12 hello-world
drwxr-xr-x  9 root root 4.0K Dec  2 15:38 helm
drwxr-xr-x  3 root root 4.0K Sep 29 16:43 images
drwxr-xr-x  2 root root 4.0K Oct  9 16:53 ingress
drwxr-xr-x  2 root root 4.0K Nov  9 16:14 ingress-nginx
drwxr-xr-x  2 root root 4.0K Nov 29 11:57 keepalived
-rw-r--r--  1 root root 1.9K Sep 26 17:43 kubeadm.init
-rw-r--r--  1 root root  240 Oct 12 16:43 list
drwxr-xr-x  2 root root 4.0K Dec  2 15:36 other
drwxr-xr-x  2 root root 4.0K Jun 20 18:29 secrets
drwxr-xr-x  2 root root 4.0K Nov 29 16:21 ssl
drwxr-xr-x  2 root root 4.0K Jul 30 17:14 superuser
drwxr-xr-t  3 root root 4.0K Jun 20 11:56 tmp
-rwxr-xr-x  1 root root  114 Sep  6 15:36 uninstall.sh
```
- -a: 显示隐藏文件，以.开头的文件属于隐藏文件，例如.abc.txt  .  ..
- -l: 显示详细信息，按文件名排序
- -lt: 排序，不指定排序方式时，按照创建时间排序，最后编辑的排在最前面
- -lu: 显示访问时间
- -ltu: 显示访问时间，并按照访问时间排序，最后编辑的排在前面
- -ltS: 按照文件大小排序，最大的排在前面
- -ltuS: 包含两个排序参数，以前面的为准（u）
- -ltur: 显示访问时间，并按照访问时间排序，最早编辑的排在前面(倒序)
- -lh: 文件大小以K，M等易识别的方式显示

### 文件权限

在linux中的每个用户必须属于一个组，不能独立于组外。在linux中每个文件有所有者、所在组、其它组的概念

- 所有者
  + 一般为文件的创建者，谁创建了该文件，就天然的成为该文件的所有者
  + 用ls ‐ahl命令可以看到文件的所有者
  + 也可以使用chown 用户名 文件名来修改文件的所有者
- 所在组
  + 当某个用户创建了一个文件后，这个文件的所在组就是该用户所在的组
  + 用ls ‐ahl命令可以看到文件的所有组
  + 也可以使用chgrp 组名 文件名来修改文件所在的组
- 其它组
  + 除开文件的所有者和所在组的用户外，系统的其它用户都是文件的其它组

- 改变用户、所在的组
  + chown : chown zhouchunsong:tester abc.txt
  + chgrp : chgrp root abc.txt

- 改变权限
  + chmod : chmod +x abc.txt , chmod 777 abc.txt


- 例如`drwxr-xr--`， 这10个字符确定不同用户能对文件干什么
  + 第一个字符代表文件（-）、目录（d），链接（l）
  + 其余字符每3个一组（rwx），读（r）、写（w）、执行（x）
  + 第一组rwx：文件所有者的权限是读、写和执行
  + 第二组r-x：与文件所有者同一组的用户的权限是读、执行但不能写
  + 第三组r--：不与文件所有者同组的其他用户的权限是读不能写和执行
  + 也可用数字表示为：r=4，w=2，x=1  因此rwx=4+2+1=7

*注意：
如果用户没有一个目录的执行权限，那么是无法进入该目录的
	以.开头的文件、目录是隐藏的，需要加-a命令才能显示 ls -a
	两个特殊目录.与..，.表示当前目录，..表示上层目录，所以返回上层目录的命令是cd .. ,返回上层的上层就是cd ../..

### 执行命令、脚本

执行命令、脚本的时候需要指明路径

当前用户需要有该命令、脚本的可执行权限

例如有一个脚本/home/zcs/abc.sh

- ./abc.sh : 需要当前的工作目录处于/home/zcs/下才能执行
- /home/zcs/abc.sh : 以绝对路径的方式执行，在任意路径均可以执行
- abc.sh : /home/zcs/路径被加入PATH环境变量，则可以在任意路径执行

### netstat -lntup
>显示网络连接，路由表，接口统计，伪装链接，组播成员等信息

|参数|说明|
|---|---|
|-l|--listening 只显示正在监听的socket|
|-n|--numeric 使用数字展示主机、端口、用户等信息|
|-t|--tcp 显示tcp协议的socket|
|-u|--udo 显示udp协议的socket|
|-a|--all 显示所有监听或未监听d额socket|
|-p|--program 显示socket所属程序的PID|

### 查看系统进程ps

```
root@master-01:/home/kubernetes# ps -ef|grep edge
root      5606 10146  0 14:11 pts/5    00:00:00 grep --color=auto edge
root     28983     1  0 Nov21 ?        00:15:03 /home/n2n_v1/edge -d n2n0 -a 10.0.9.4 -c w3 -m 3C:A0:10:00:09:04 -M 1200 -k Fpi123456. -l 47.97.102.78:12000
```

- ps -ef
- ps -ef | grep docker
- ps -ef | grep docker | grep -v abc
- pstree : 以属性结构展示结果

### 查看系统进程监听端口情况

- netstat -lntp 
- ss -plat

### 为命令添加别名

- alias l='ls -latr'

### 杀死进程kill

 - kill 28983 : 杀死进程id为28983的进程
 - kill -9 28983 : 强制杀死28983进程

### 删除文件 rm

 - rm abc.txt : 删除文件abc.txt
 - rm -r abc : 删除文件夹abc及其中所有子目录和文件
 - rm -rf abc : 删除文件夹abc，并且不需要确认

> 注意：不要执行`rm -rf /`命令
> 不要执行`cd abc;rm -rf *`命令

### 重命名文件

 - mv abc cde : 将abc重命名为cde

### 复制文件

- cp abc.txt abc.txt.bak
- cp -r abc abc.bak

### 对比文件不同

- diff abc.txt def.txt

### 合并文件内容

- cat a.txt b.txt > c.txt

### 截取awk

 - echo "ab,cde,fg,hi" | awk -F ',' '{print $1}'  : 打印第一列
 - echo "ab,cde,fg,hi" | awk -F ',' '{print $NF}' : 打印最后一列

### 软连接ln

- ln -s /home/abc /opt/abc

### 替换

- sed -i 's/abc/efg/g' a.txt : 将a.txt中的abc替换为efg

### man查看用户手册

- man ls

### 查看网卡信息

- ifconfig


### iptables
>主机防火墙


### sed
  - 替换file文件中的abc为123

        sed -i "s/abc/123/g" file


### awk

### top

[参考](https://www.cnblogs.com/sparkdev/p/8176778.html)

top 命令主要用于查看进程的相关信息，同时它也会提供系统平均负载，cpu 信息和内存信息。下面的截图展示了 top 命令默认提供的信息：



系统平均负载
top 命令输出中的第一行是系统的平均负载，这和 uptime 命令的输出是一样的：



13:05:49      表示系统当前时间。
up 7 days    表示系统最后一次启动后总的运行时间。
1 user          表示当前系统中只有一个登录用户。
load average: 0.01, 0.04, 0.00      表示系统的平均负载，最后的三个数字分别表示最后一分钟的系统平均负载，最后五分钟的系统平均负载，最后十五分钟的系统平均负载。

小写字母 i 可以控制是否显示系统平均负载信息。

任务信息汇总
在 linux 系统中，一般把进程和线程统称为任务。第二行信息是对当前系统中所有任务的统计：



Tasks:270 total    表示当前系统的进程总数。
1 running             表示当前系统中有 1 个正在运行的进程。
269 sleeping        表示当前系统中有 269 个休眠的进程。
0 stopped            表示停止状态的进程数为 0。
0 zombie              表示处于僵死状态的进程数为 0。

CPU 信息
第三行显示 CPU 的使用情况：



这里一共有八个字段，是我们了解 CPU 负载的主要依据，下面我们逐一介绍。

us
进程在用户地址空间中消耗 CPU 时间的百分比。像 shell程序、各种语言的编译器、数据库应用、web 服务器和各种桌面应用都算是运行在用户地址空间的进程。这些程序如果不是处于 idle 状态，那么绝大多数的 CPU 时间都是运行在用户态。

sy
进程在内核地址空间中消耗 CPU 时间的百分比。所有进程要使用的系统资源都是由 Linux 内核处理的。当处于用户态(用户地址空间)的进程需要使用系统的资源时，比如需要分配一些内存、或是执行 IO 操作、再或者是去创建一个子进程，此时就会进入内核态(内核地址空间)运行。事实上，决定进程在下一时刻是否会被运行的进程调度程序就运行在内核态。对于操作系统的设计来说，消耗在内核态的时间应该是越少越好。在实践中有一类典型的情况会使 sy 变大，那就是大量的 IO 操作，因此在调查 IO 相关的问题时需要着重关注它。

ni
ni 是 nice 的缩写，可以通过 nice 值调整进程用户态的优先级。这里显示的 ni 表示调整过 nice 值的进程消耗掉的 CPU 时间。如果系统中没有进程被调整过 nice 值，那么 ni 就显示为 0。

id
CPU 处于 idle 状态的百分比。一般情况下， us + ni + id 应该接近 100%。

wa
CPU 等待磁盘 IO 操作的时间。和 CPU 的处理速度相比，磁盘 IO 操作是非常慢的。有很多这样的操作，比如：CPU 在启动一个磁盘读写操作后，需要等待磁盘读写操作的结果。在磁盘读写操作完成前，CPU 只能处于空闲状态。Linux 系统在计算系统平均负载时会把 CPU 等待 IO 操作的时间也计算进去，所以在我们看到系统平均负载过高时，可以通过 wa 来判断系统的性能瓶颈是不是过多的 IO 操作造成的。

hi & si
这两个值表示系统处理中断消耗的时间。中断分为硬中断和软中断，hi 表示处理硬中断消耗的时间，si 表示处理软中断消耗的时间。硬中断是硬盘、网卡等硬件设备发送给 CPU 的中断消息，当 CPU 收到中断消息后需要进行适当的处理(消耗 CPU 时间)。软中断是由程序发出的中断，最终也会执行相应的处理程序(消耗 CPU 时间)。

st
只有 Linux 在作为虚拟机运行时 st 才是有意义的。它表示虚机等待 CPU 资源的时间(虚机分到的是虚拟 CPU，当需要真实的 CPU 时，可能真实的 CPU 正在运行其它虚机的任务，所以需要等待)。

小写字母 t 可以控制是否显示任务信息汇总和 CPU 信息。没错，它能控制是否显示两行信息。

内存信息
内存信息包含两行内容，内存和交换空间：



top 命令中这部分的输出和 free 命令的输出基本相同，笔者在《linux free 命令》一文已经详细介绍过，这里不再赘述。

控制显示单位
top 命令默认以 K 为单位显示内存大小，这让人十分抓狂。好在我们可以通过大写字母 E 来切换内存信息区域的显示单位(注意，E 不能控制任务区域中的内存单位)，下图以 GB 显示内存大小：



小写字母 m 可以控制是否显示内存信息。

任务详情
内存信息下面是一个空行(其实是与用户交互的区域)，空行的下面就是任务详情区域：



默认情况下这里会显示 12 列数据，都是我们比较关心的进行相关的信息，下面我们一个一个的介绍。
PID     表示进程 ID。
USER  表示进程所有者的有效用户名称。简单说就是以哪个用户权限启动的进程。比如上图中有两个进程是用户 nick 启动的，还有一个是用户 prometheus 启动的，其它都是 root 用户启动的。
PR      表示进程执行的优先级，PR 的值是以 Linux 内核的视角看到的进程执行的优先级。
NI       从用户视角看到的进程执行优先级。注意上图中 NI 值为 -20 的两个进程，它们的 PR 值都是  0。
VIRT   表示进程使用的虚拟内存大小。
RES    表示进程使用的物理内存大小。
SHR   表示进程使用的共享内存的大小。
S        表示进程当前的状态。S 值有下面几种：
    D 不可中断的睡眠状态(uninterruptible sleep)
    R 正在运行的状态(running) 
    S 睡眠状态(sleeping)
    T 跟踪或停止状态(traced or stopped)
    Z 僵尸状态(zombie)
%CPU     表示进程使用 CPU 的百分比。
%MEM   表示进程使用内存的百分比。
TIME+    表示进程累计使用的 CPU 时间。
COMMAND    表示运行进程对应的程序。

一般情况下这些信息足够了，但是如果你还想要更多的信息，你可以尝试添加更多的列。按下小写字母 f 可以进入任务信息的配置界面：



在这里你可以选择要显示的列，并且可以配置以哪一列进行排序。

显示内存大小的单位问题在任务详情区域也同样存在，默认的单位也是 KB。要改变它的单位需要使用小写字母 e 来进行切换，比如我可以把它切换为以 MB 为单位：



这样看起来就直观多了！

top 是一个非常复杂的命令，上面介绍的内容仅仅是一些皮毛而已。即便如此，你也可以用它来干不少的事情了！如果你想了解更多详细的信息，请参考 top 的使用手册。我们接下来介绍一些常见的用例。

显示多个 CPU 核心的详细信息
无论系统中有多少个 CPU 核心，默认的 CPU 信息总是输出一行，即所有核心加起来的综合数据。能不能查看各个 CPU 核心单独的数据呢？答案是，可以的。按键盘上的数字 1 就可以在不同的视图之间切换了：



以某列对进程排序
按小写字母 f 进入排序设置界面，选择某一列，按小写 's' 指定排序，然后退出。
奇怪的是默认主界面上并看不出是以哪列排序的！可以使用小写字母 x 来粗体显示当前排序的列：



可以看到 %CPU 列的字体加粗了吗？虽然不太明显，但勉强可以看到了。
还有一些预定义的命令可以直接完成以某列排序的功能，比如大写字母 M 以 %MEM 列排序；大写字母 N 以 PID 列排序；大写字母 P 以 %CPU 列排序；大写字母 T 以 TIME+ 列排序。
M        %MEM                     
N         PID                           
P         %CPU                        
T         TIME+

反转排序的结果是常见的需求，大写字母 R 可以将当期排序的结果反转。

显示进程执行的完整命令
默认 COMMAND 列只显示程序的名字，并不包含程序的路径。有时能够看到程序的完整路径是很方便的。你可以通过小写字母 c 来切换 COMMAND 列的显示模式：



不仅是程序的完整路径，连启动程序的参数都显示出来了！

隐藏 idle 的进程
在我们调查问题时，总希望以最快的方式找到繁忙的进程。但是 top 命令会把所有的进程列出，这就需要我们通过昏花的老眼去扫描一行行的进程信息。还好，我们可以借助小写字母 i 来控制是否显示处于 idle 状态的进程！使用这个命令后你会发现世界好清爽啊！

只显示某个用户的进程
如果你想查看以某个用户权限启动的进程，可以使用小写字母 u 。这会提示你输入用户的名称，在你输入用户名称后，按回车键：



上图中笔者输入的用户名为 nick，按回车键后就会过滤出所有以用户 nick 权限启动的进程。

top 命令的配置文件
top 命令是有配置文件的，也就是说你通过命令修改的配置都可以保存下来。保存配置的命令为大写字母 W。在你修改了 top 命令的配置后按下大写字母 W，然后退出 top 命令并再次执行 top 命令，此时你的修改仍然在起作用。

帮助文档
帮助文档永远都是我们的好朋友，小写字母 h 或者是 ？ 可以打开 top 命令的帮助文档。不要太惊奇，文档有点长哟！