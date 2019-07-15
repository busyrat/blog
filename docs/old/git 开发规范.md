## 日志提交规范

* [Git日志提交规范](Git日志提交规范)

## Git Ignore 规范

为了避免将不必要的文件提交到仓库中，需要我们在每个工程的`根目录下`里面编写正确的`.gitignore` 文件。

由于Java和前端工程目录结构、编译内容等不一致的原因，我们需要根据前后端的不同编写不同的`.gitignore`文件。

+ [.gitignore for java project](gitignore-for-java-project)
+ [.gitignore for web project](gitignore-for-web-project)

## 分支开发流程

### Git Flow

![github_flow](/uploads/0d9ee292f61d9d222f277b9dac9f8893/github_flow.png)

**说明**

1. 创建特性分支：当你要开发一个新功能的时候，从master分支创建一个特性分支，`git checkout -b [fixture-branch-name]`
2. 在新分支上提交代码，[参考Git提交的日志规范](Git日志提交规范)，`git add [files]; git commit -m 'commit messages'`
3. 与主干同步，`git fetch origin; git rebase origin/master`
4. [合并 commit](合并Commit)（该步骤可选）
5. 将代码push到远程仓库，`git push`
6. 如果该特性分支所有功能开发完成，在 [git.fpi-inc.com](http://git.fpi-inc.com) 上提交 Merge Request，Merge Request 的目的分支是 master
7. 开发负责人进行[代码审核](#代码审核)，审核通过后方可以执行`Merge`操作，审核未通过的，提交审核反馈内容
8. `Merge`成功后删除特性分支

> 为了保护master分支不被破坏，需要将 master 分支设置为保护的分支：`Settings -> Repository -> Protected Branches`

### 分支命名规范

> 分支命名采用`[issue-id-][issue-name]`

* issue-id：可选，表示 gitlab 中的 issue 编号
* issue-name：以中划线连接的英文短语，表示该分支对应的Feature的概述，必填

保留的分支名称，严禁个人使用：

* master*
* dev*
* release*
* test*
* snapshot*
* prod*
* production*
* tag*

> `*`是通配符

示例：

```
git checkout -b 123-add-user-management-service // 正确

git checkout -b 'xiongzhijun'  // 错误，不能用个人的名字作为分支

git checkout -b 'dev' // 错误，dev 是保留分支名称
```

### Git工程强制设置

1.以下分支，不允许直接push

* master*
* dev*
* release*
* test*
* snapshot*
* prod*
* production*
* tag*
* milestones*
 
> 设置路径：Settings->Repository->Protected Branches->Allowed to push=No one

> 加这一条的目的是为了推行：基于特性分支的开发模式、以及推行代码审查合并模式

2.开启 Fast-forward merge
    
开启了这条设置，就不能再发起merge请求，所有的merge都是fast-forward的。如果你的分支不能进行Fast-forward merge，就要进行rebase

> 设置路径：Settings->General->Merge request->Merge method->Fast-forward merge

3.开启 Only allow merge requests to be merged if the pipeline succeeds 

只有pipeline成功的时候才可以merge（如果没配置CI，这条设置不生效）。你有一个分支A，如果A分支的CI未通过，则A分支不能合并到master分支上。

> 设置路径：Settings->General->Merge request->Merge method->Only allow merge requests to be merged if the pipeline succeeds

4.开启 Only allow merge requests to be merged if all discussions are resolved

只有所有的discussions解决了才允许merge。

> 设置路径：Settings->General->Merge request->Merge method->Only allow merge requests to be merged if all discussions are resolved

### 代码审核

**基于分支的代码 Review**

1. 新建 Issue (无论是 bug 还是 feature), 描述背景或问题,
2. 本地创建分支 123-[issue] (123是 issue 的 ID), 围绕关联 issue 进行 program -> commit -> push,
3. 新建 Merge Request 从 123-[issue] 到 master, 并指派给项目 Owner (或合适 Reviewer) ,
4. 被指派人完成代码审查后， 执行代码合并, 同时删除分支 123-[issue] 
5. 如果审查不通过，则在有问题的代码处进行标记，也可以通过提交 Comment 进行讨论

**多人 Review**

1. 提交 Merge Request 后， 被指派人可通过 @someone 邀请一个或多个额外的 Reviewer （它们会收到邮件通知）
2. 被邀请的 Reviewer 看过代码后， 可回复:thumbsup:或+1表示通过， 反之给出修改建议。

### 项目开发规范

当某个项目需要用到现有产品（或者某个其他已经交付的项目）时，必须通过 Fork 的方式创建新的 Repository，而不是在老的 Repository 上创建分支。

## 文档规范

每个 Project 的技术文档记录在这个 Project 对应的 Wiki 中，包括：

1. 系统目标（解决的问题、应用场景等）
2. 系统架构
3. 概要设计
4. 数据库设计
5. 详细设计
6. 配置信息说明
7. 第三方使用说明
8. 开发（贡献）说明

相关文档应当以 MarkDown 的形式直接写到 Wiki 中，避免编写 Word/Excel 类型的文档，因为 Wiki 更加直观，可读性强，方便在线编辑更新。

`TODO 项目管理相关文档等后续制定规范`

## 持续集成

参考[Gitlab CI](https://docs.gitlab.com/ce/ci/)实现。

Gitlab CI 相对于 Jenkins 的优势是：相关持续集成配置文件直接跟随 Git Project，在创建（Fork）新的项目后，配置文件也直接带上了，只需要少量的环境变量配置就好了。

### .gitlab-ci.yml配置规范

**1. 总体阶段**

  ``` yaml
  stages:
    - pre_build
    - build
    - auto_test
    - push
    - deploy
  ```
其中每个阶段需要完成的任务如下：
- `pre_build`阶段需要包含以下几个动作
    - `静态检查`
        - 除了打tag触发的CI以外，其它所有触发都要执行该动作
    - `maven site`
        - 只在master分支被push或merge时执行该动作
    - `单元测试`
        - 除了打tag触发的CI以外，其它所有触发都要执行该动作
- `build`阶段
    - 编译docker镜像并上传到本地仓库
    - 需要将版本信息加入镜像中，例如java项目可以把包含版本信息的`version`文件加入war包中
    - 仅在master分支或/\^hotfix-.*$/被push或merge时执行该动作
    - 打tag时不执行该动作
- `auto_test`阶段
    - 自动化测试
    - 仅在master分支或/\^hotfix-.*$/被push或merge时执行该动作
    - 打tag时不执行该动作
- `push`阶段
    - 将docker镜像打tag([打tag规则](https://git.fpi-inc.com/simple/servers/simple-user-center-server#docker%E9%95%9C%E5%83%8F%E5%91%BD%E5%90%8D%E8%A7%84%E5%88%99))
        - tag的组成为 `仓库名/镜像名:镜像版本`
        - 仓库名为本地或远端仓库的域名
        - 镜像名固定为工程名：`$CI_PROJECT_NAME`
        - tag的version为`latest`和`$CI_COMMIT_TAG`
        - 示例：需要上传到本地仓库的docker镜像tag：`$LOCAL_REPERTORY/$CI_PROJECT_NAME:latest`和`$LOCAL_REPERTORY/$CI_PROJECT_NAME:$CI_COMMIT_TAG`
    - 将打好tag的docker镜像上传到本地和远端仓库
    - 只有在打tag(这个tag指的是git的tag而不是docker的tag)时执行该动作
- `deploy`阶段
    - 开发环境部署：
        - 除了打tag触发的CI以外，其它所有触发都要执行该动作
        - 需要自动执行
        - 需要定义`environment`信息
    - 测试环境部署
        - 仅在master分支或/\^hotfix-.*$/被push或merge时执行该动作
        - 打tag时不执行该动作
        - 需要手动执行
        - 需要定义`environment`信息
    - 其他生产环境部署
        - 只有在打tag时执行该动作
        - 需要手动执行
        - 需要定义`environment`信息

**2. 变量**

- yml文件中预置的变量如下，其它工程如果不同，可以用gitlab工程中创建同名变量进行覆盖

  ```yaml
  variables:
    LOCAL_REPERTORY: "docker-lh.fpi-inc.site"
    LOCAL_REPERTORY_USERNAME: admin
    REMOTE_REPERTORY: "docker.fpi-inc.site"
    REMOTE_REPERTORY_USERNAME: admin
  ```
- gitlab工程中的预置变量（优先级最高）
    - SSH_PRIVATE_KEY：用来免密码登录远程linux系统
    - LOCAL_NEXUS_PASSWD：本地仓库登录密码
    - REMOTE_REPERTORY_PASSWD：远程仓库登录密码

**3. 预处理**

>用来免密登录远程linux系统

  ```yaml
  before_script:
    - 'which ssh-agent || ( apt-get update -y && apt-get install 
  openssh-client -y )'
    - eval $(ssh-agent -s)
    - ssh-add <(echo "$SSH_PRIVATE_KEY")
    - mkdir -p ~/.ssh
    - '[[ -f /.dockerenv ]] && echo -e "Host 
  *\n\tStrictHostKeyChecking no\n\n" > ~/.ssh/config'
  ```


**5. `.gitlab-ci.yml`[文件样例](https://git.fpi-inc.com/simple/servers/simple-user-center-server/blob/master/.gitlab-ci.yml)**

## 其它

* [合并 Commit](合并Commit)
