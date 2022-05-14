# macOS big sur(mac m1)安装nvm

NVM是一个版本管理[的node.js](https://nodejs.org/en/)，设计每个用户进行安装，并且每个外壳调用。`nvm`适用于任何符合 POSIX 的 shell（sh、dash、ksh、zsh、bash），特别是在这些平台上：unix、macOS 和 windows WSL。

## 安装前注意

1、不要使用brew安装，[官网有说明](https://github.com/nvm-sh/nvm#usage-1)

2、M1芯片需要使用Rosetta

​        应用程序>控制台>右键显示简介>勾选使用Rosetta打开

![截屏2021-08-30 下午9.44.14](/Users/liushanshan/Library/Application Support/typora-user-images/截屏2021-08-30 下午9.44.14.png)

3、使用curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash

报错 raw.githubusercontent.com 443

通过IPAddress.com首页,输入raw.githubusercontent.com查询到真实IP地址
`185.199.111.133`

配置/etc/hosts，添加以下代码

`185.199.111.133  raw.githubusercontent.com`

不过发现并没有解决问题，放弃，使用git安装成功

### 安装

如果你已经`git`安装（需要 git v1.7.10+）：

在您的用户配置文件的根目录中克隆此 repo

- `cd ~/` 然后从任何地方 `git clone https://github.com/nvm-sh/nvm.git .nvm`

1. `cd ~/.nvm` 并查看最新版本 `git checkout v0.38.0`
2. `nvm`通过从您的 shell 中获取它来激活：`. ./nvm.sh`

现在将这些行添加到您的`~/.bashrc`, `~/.profile`, 或`~/.zshrc`文件中，以便在登录时自动获取它：（您可能需要添加到以上文件中的一个以上）

```
export NVM_DIR= " $HOME /.nvm " 
[ -s  " $NVM_DIR /nvm.sh " ] &&  \.  " $NVM_DIR /nvm.sh "   #这会加载 nvm 
[ -s  " $NVM_DIR /bash_completion " ] &&  \.  " $NVM_DIR /bash_completion "   #这会加载 nvm bash_completion
```

### 验证安装

要验证 nvm 是否已安装，请执行以下操作：

command -v nvm

如果安装成功，应该输出`nvm`。请注意，这`which nvm`将不起作用，因为它`nvm`是一个源 shell 函数，而不是一个可执行的二进制文件。

## 用法

要下载、编译和安装最新版本的node，请执行以下操作：

```
nvm install node # "node" 是最新版本的别名
```

要安装特定版本的node：

```
nvm install 6.14.4 #或 10.10.0、8.9.1 等
```

安装的第一个版本成为默认版本。新的 shell 将以 node 的默认版本（例如，`nvm alias default`）开始。

您可以使用`ls-remote`以下命令列出可用版本：

```
nvm ls-remote
```

然后在任何新 shell 中使用已安装的版本：

```
nvm use node
```

或者你可以直接运行它：

```
nvm use node --version
```

或者，您可以使用所需版本的node在子 shell 中运行任意命令：

```
nvm exec 4.2 node --version
```

您还可以获取可执行文件的安装路径：

```
nvm which 5.0
```

代替诸如“0.10”或“5.0”或“4.2.1”之类的版本指针，您可以使用以下特殊的默认别名`nvm install`，包括`nvm use`、`nvm run`、`nvm exec`、`nvm which`、 等：

- `node`：这将安装最新版本的 [`node`](https://nodejs.org/en/)
- `iojs`：这将安装最新版本的 [`io.js`](https://iojs.org/en/)
- `stable`: 这个别名已被弃用，并且只真正适用于`node` `v0.12`和更早。目前，这是`node`.
- `unstable`: 这个别名指向`node` `v0.11`- 最后一个“不稳定”的节点版本，自 1.0 之后，所有节点版本都是稳定的。（在 SemVer 中，版本传达的是破损，而不是稳定性）。

### 长期支持

节点有一个[时间表](https://github.com/nodejs/Release#release-schedule)的长期支持（LTS）你可以引用别名和LTS版本`.nvmrc`的文件与符号`lts/*`最新的LTS，并`lts/argon`为LTS版本从“氩气”的路线，例如。此外，以下命令支持 LTS 参数：

- `nvm install --lts`/ `nvm install --lts=argon`/ `nvm install 'lts/*'`/`nvm install lts/argon`
- `nvm uninstall --lts`/ `nvm uninstall --lts=argon`/ `nvm uninstall 'lts/*'`/`nvm uninstall lts/argon`
- `nvm use --lts`/ `nvm use --lts=argon`/ `nvm use 'lts/*'`/`nvm use lts/argon`
- `nvm exec --lts`/ `nvm exec --lts=argon`/ `nvm exec 'lts/*'`/`nvm exec lts/argon`
- `nvm run --lts`/ `nvm run --lts=argon`/ `nvm run 'lts/*'`/`nvm run lts/argon`
- `nvm ls-remote --lts`/ `nvm ls-remote --lts=argon` `nvm ls-remote 'lts/*'`/`nvm ls-remote lts/argon`
- `nvm version-remote --lts`/ `nvm version-remote --lts=argon`/ `nvm version-remote 'lts/*'`/`nvm version-remote lts/argon`

任何时候您的本地副本`nvm`连接到[https://nodejs.org](https://nodejs.org/)，它都会为所有可用的 LTS 线路重新创建适当的本地别名。这些别名（存储在 下`$NVM_DIR/alias/lts`）由 管理`nvm`，您不应修改、删除或创建这些文件 - 预计您的更改会被撤消，并预计干预这些文件会导致可能不受支持的错误。

要获取最新的节点 LTS 版本并迁移现有的已安装包，请使用

```
nvm install 'lts /* '-- reinstall-packages-from=current
```

### Node系统版本

如果要使用系统安装版本的node，可以使用特殊的默认别名“system”：

```
nvm use system
nvm run system --version
```

### 列出版本

如果要查看安装了哪些版本：

```
nvm ls
```

如果您想查看可以安装哪些版本：

```
nvm ls-remote
```

## 环境变量

nvm 公开以下环境变量：

- `NVM_DIR` - nvm 的安装目录。
- `NVM_BIN` - node、npm 和 node 活动版本的全局包的安装位置。
- `NVM_INC` - 节点的包含文件目录（用于为节点构建 C/C++ 插件）。
- `NVM_CD_FLAGS` - 用于保持与 zsh 的兼容性。
- `NVM_RC_VERSION` - .nvmrc 文件中的版本（如果正在使用）。

此外， nvm 修改`PATH`, and ，如果存在，`MANPATH`以及`NODE_PATH`更改版本时。

#### 设置默认节点版本

要设置在任何新 shell 中使用的默认节点版本，请使用别名“default”：

```
nvm别名默认节点
```

#### 使用node二进制文件的镜像

要使用node二进制文件的镜像为淘宝镜像，请设置`$NVM_NODEJS_ORG_MIRROR`：

```
export NVM_NODEJS_ORG_MIRROR=http://npm.taobao.org/mirrors/node
nvm install node 

NVM_NODEJS_ORG_MIRROR=https://nodejs.org/dist 
nvm install 4.2
```

要使用 io.js 二进制文件的镜像为淘宝镜像，请设置`$NVM_IOJS_ORG_MIRROR`：

```
export NVM_IOJS_ORG_MIRROR=http://npm.taobao.org/mirrors/
nvm install iojs-v1.0.3

NVM_IOJS_ORG_MIRROR=http://npm.taobao.org/mirrors/
nvm install iojs-v1.0.3
```

`nvm use`默认情况下，不会创建“当前”符号链接。设置`$NVM_SYMLINK_CURRENT`为“true”以启用此行为，这有时对 IDE 很有用。请注意，`nvm`在启用此环境变量的多个 shell 选项卡中使用可能会导致竞争条件。

### 使用例子

虚拟机:

> $ nvm `Tab`

```
alias               deactivate          install             list-remote         reinstall-packages  uninstall           version
cache               exec                install-latest-npm  ls                  run                 unload              version-remote
current             help                list                ls-remote           unalias             use                 which
```

nvm 别名:

> $ nvm alias `Tab`

```
default      iojs         lts/*        lts/argon    lts/boron    lts/carbon   lts/dubnium  lts/erbium   node         stable       unstable
```

> $ nvm alias my_alias `Tab`

```
v10.22.0       v12.18.3      v14.8.0
```

nvm 使用:

> $ nvm use `Tab`

```
my_alias        default        v10.22.0       v12.18.3      v14.8.0
```

nvm 卸载:

> $ nvm uninstall `Tab`

```
my_alias        default        v10.22.0       v12.18.3      v14.8.0
```

## 卸载/删除

### 手动卸载

要`nvm`手动删除，请执行以下操作：

```
$ rm -rf " $NVM_DIR "
```

编辑`~/.zshrc`（或其他 shell 资源配置）并删除以下行：

```
export NVM_DIR= " $HOME /.nvm " 
[ -s  " $NVM_DIR /nvm.sh " ] &&  \.  " $NVM_DIR /nvm.sh "  #这会加载 nvm 
[[ -r  $NVM_DIR /bash_completion ]] &&  \.  $NVM_DIR /bash_completion
```