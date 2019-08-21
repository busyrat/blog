# Git 

> 一个快速、可扩展的分布式版本控制系统



## 开篇一张图

![1.png](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015120901.png)

- 工作区

- 暂存区：stage

- 本地仓库

- 远程仓库

- 临时储藏：stash

  

## 常用的命令

```shell
# 初始化
git init

# 查看 git 的配置，里面包含全局的配置和项目的配置
git config --list

# 修改配置，全局的文件在 users/.gitconfig，项目的在 .git/config
git config -e [--global]

# 通常开始一个项目需要配置的个人信息，有个很好用的工具 gitter 切换
git config user.name 'xxx'
git config user.email 'xxx'

# 提交一次代码，依次是提交到暂存区，仓库，远程仓库
git add .
git commit -m 'feat: xxx'
git push

# 分支开发，查看本地和远程的分支
git branch
git branch -r

# 切换分支，回到上一个分支的快捷
git checkout xxx
git checkout -b xxx
git checkout -

# 剪切提交
git cherry-pick [commit]

# 代码撤销，从暂存区撤回来、从本地仓库撤回来
git checkout [file]
git reset
git reset "HEAD^"

# 查看状态，查看日志，查看操作记录
git status
git log
git reflog
```



## 不常用

```shell
# 解决 git status 中文不能正常显示的问题
git config --global core.quotepath false

# 撤销第一个提交：
git update-ref -d HEAD

# 搜索关键词
git grep --break --heading -n "xxx"
```



## git hooks

在 git 各个动作下会触发的脚本

[一次简单的尝试](https://www.npmjs.com/package/sensitive-code)

也可以不依赖 [husky](https://github.com/typicode/husky) ，直接写 .git/hooks/pre-commit 脚本，但是这是在 git 客户端的修改，所以只对本地仓库有效

### 参考

[官方]([https://git-scm.com/book/zh/v2/%E8%87%AA%E5%AE%9A%E4%B9%89-Git-Git-%E9%92%A9%E5%AD%90](https://git-scm.com/book/zh/v2/自定义-Git-Git-钩子))

[用 Node.js 写前端自己的 Git-hooks](https://github.com/zwhu/blog/issues/31)

## 练习各种指令

http://git-school.github.io/visualizing-git/

https://learngitbranching.js.org/

## 一次关于 git rebase 的分享

### 目标

这次的分享主要解决以下几个问题：

- 解决由于对 git 概念的不清晰，导致使用上出现的各种问题
- 规范 git 的使用
- 抛弃 GUI，拥抱终端命令
- 分享一些日常高频使用的插件



### 现状

目前的操作，我观察到，大家都是

- 基于 master 或某个分支新建的一个分支
- 在新分支上开发自己的代码，并提交到本地仓库
- 把原分支代码拉到本地，合并
- 上传自己的分支



主要出现的问题：

- 分支代码很容易忘记合并到主干分支，每个人在上传代码的时候都不能确保主干的代码是最新的
- 多次合并代码出现的无效日志：```merge: xxx```
- 主干分支不明显，给跟踪代码，review 代码带来了很多不必要的麻烦



### 解决方案：rebase

- 多看说话

  ![](https://backlog.com/git-tutorial/cn/img/post/stepup/capture_stepup2_8_1_1.png)

  

  一个命令就梳理清楚：

  ![](https://backlog.com/git-tutorial/cn/img/post/stepup/capture_stepup2_8_1.png)

  

- 相关的命令

  ```shell
  # 提交代码前
  git pull --rebase
  git push
  
  # 或者
  git rebase master
  git checkout master
  git merge mybranch
  git push
  ```



### commit 的规范

```shell
<type>: <message>
```

type类型：

- feat：新功能（feature）
- fix：修补bug
- docs：文档（documentation）
- style： 格式（不影响代码运行的变动）
- refactor：重构（即不是新增功能，也不是修改bug的代码变动）
- test：增加测试
- chore：构建过程或辅助工具的变动



**后期会在项目中集成插件校验**



### 工具提高效率

推荐大家都用 vscode

- GitLens 查看代码历史记录
- Git History 查看提交记录



### 参考文章

- [常用 Git 命令清单 · 阮一峰]([http://www.ruanyifeng.com/blog/2015/12/git-cheat-sheet.html](http://www.ruanyifeng.com/blog/2015/12/git-cheat-sheet.html))
- [Git教程 - 廖雪峰](https://www.liaoxuefeng.com/wiki/896043488029600)
- [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0-beta.4/)



## 合并多次 commit

`git rebase -i xxxxxxx`会让你选择合并的提交：

```
pick xxxxxxx '注释**********'
...
```

把 `pick` 换成 `squash`就代表那个提交需要合并，然后保存退出，后面的操作就跟 `rebase`一样了

