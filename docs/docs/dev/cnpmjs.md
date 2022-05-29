# cnpmjs 的使用【转】

转[如何搭建一个 cnpm](https://blog.csdn.net/XUEER88888888888888/article/details/104053311)

## 一、方案分析
业界主流的私有npm仓库搭建的主流方案有如下几种：

付费购买
使用 git+ssh 这种方式直接引用到 GitHub 项目地址
使用 Sinopia
使用 cnpmjs.org
第一种，一是考虑到公司可能不会提供经费，二npm在国内访问很慢，就 是花钱也买不到好的体验。

第二种，不能更新即 npm update，不能使用semver（语义化版本规范）。

第三种，sinopia 在15年的时候就停止更新了，继而由 verdaccio 提供更新升级，所以两者用法基本上都是一致的

sinopia 的优点是配置简单，对环境依赖少（仅 node 就够了），并且支持 windows 系统下运行。

但它也有缺点，主要是以下几点：

权限管理比较弱，对用户权限，发布权限，下载权限控制不是很得心应手；

缓存优化不足，经常会在安装共有包的时候处于挂起状态；

不能做官方仓库的镜像。

所以，sinopia 比较适合个人搭建在本地作为 npm 缓存，这样，安装过的包会直接从缓存中获取，加快安装速度。

对于企业级的应用来说，就需要另外一个解决方案了：cnpm + cnpmjs.org

以下仅阐述采用cnpmjs.org的部署方案

私有库原理及优势请参考文末相关链接，在此不再赘述

## 二、环境依赖

考虑本公司搭建环境，采用 mysql 数据库举例说明，放弃使用官方案例使用的 sqlite3 数据库

node >= 4.3.1 （mac 本机搭建没有问题，Linux node 版本升到了 10.14.2，问题后面记录）
linux（不支持 windows），
数据库（mysql, sqlite, MariaDB, PostgreSQL）
## 三、服务端部署
3.1、安装 mysql（已安装跳过该步骤）
mysql8.0 以上加密方式，Node 还不支持,登陆 mysql，执行以下命令：

```bash
alter user 'root'@'localhost' identified with mysql_native_password by 'admin123';
```

数据库常见问题解决方案：

1）已按上述链接步骤安装，终端输入 mysql -u root -p 报错 command not found

      解决方案参考：https://www.cnblogs.com/yanlin-10/p/9388911.html

2）没有权限修改文件，终端报错：Can’t open file for writing

      解决方案参考：https://blog.csdn.net/yangkai_hudong/article/details/30513837

3）修改 mysql 密码

      mysql> set password for root@localhost = password('123');

3.2 安装 cnpmjs.org

3.2.1 从 github 上下载源码

# clone from github

```bash

$ git clone git://github.com/cnpm/cnpmjs.org.git $HOME/cnpmjs.org

$ cd $HOME/cnpmjs.org
```

3.3 创建数据库

#create mysql tables（若报错参照 1.1 解决方案）

终端输入：

```bash
$ mysql -u yourname -p

mysql> create database cnpmjs

mysql> use cnpmjs;

mysql> source docs/db.sql
```

3.4 配置

命令：vim ~/cnpmjs.org/config/index.js

部分配置项说明，标红部分为本地配置必修改项

```bash
module.exports = {

/*

* server configure //服务器配置

*/

registryPort: 7001,         //仓库访问端口（执行发布安装）

webPort: 7002,              //展示查询站点访问端口

bindingHost: '',   //监听绑定的 Host，默认127.0.0.1，外网访问注释掉此项或改为0.0.0.0即可

/**

* database config //数据库相关设置

*/

database: {

        db: ‘cnpmjs’,//数据库名称

        host: '127.0.0.1',//数据库访问IP，通常127.0.0.1

        port: 3306,//数据库访问端口，通常3306

        username: ‘root’,//数据库访问账号

        password: 'z1x2c3v4' //数据库密码

    },

/**

* default system admins //管理员相关设置，拉取or发布都需要在此添加

*/

   admins: {

       // name: email

       admin: '管理员的邮箱，形如xxx@163.com',

    },

    dialect: ‘mysql’,//使用数据库，默认sqlite，这里我们改成mysql

syncModel: 'exist',// 'none', 'all', ‘exist'
/**
模块文件存储，默认将发布的私有模块跟缓存公共模块存储在本地文件系统中，路径~/.cnpmjs.org/nfs ,也就是模块文件都存储在这个目录下；或者可以选择三方储存方式比如七牛等，着这里配置插件；也支持接口开发扩展储存
*/
nfs: require('fs-cnpm')({
    dir: path.join(dataDir, 'nfs')
}),

// registry url name //模块注册列表访问域名，默认r.cnpmjs.org，安装模块时会到这个域名下查找，这个默认设置略坑，建议没有外网域名的先清空回头再配

registryHost: '',

/*
* registry mode config  私有模块发布相关配置
*/

  //是否开启私有模式，默认为 false；

  //私有模式下只有管理员能发布模块，其他账号只有同步权限

  //非私有模式，注册用户都可以发布模块

  enablePrivate: false, //私有模式改为true

  // registry scopes

//若为非私有模式发布则此项必填，非管理员发布模块式命名必须以scopes字段开头，模块命名示例“@cnpm/packagename”

  //更多了解npm-scope请查阅https://docs.npmjs.com/misc/scope

  scopes: [ '@cnpm', '@cnpmtest', '@cnpm-test' ],

  // 私有模块非scopes白名单，各种非以scope方式发布的老模块的白名单管理，数组形式维护

  privatePackages: [],

/**
* sync configs 同步源仓库相关设置
*/

//npm官方registry地址，不会直接从这个地址同步模块，但有时会从这里获取模块信息，除非必要请勿更改

officialNpmRegistry: 'https://registry.npmjs.com',

officialNpmReplicate: 'https://replicate.npmjs.com',

//同步模块上游registry地址

sourceNpmRegistry: 'https://registry.npm.taobao.org',

//上游registry是否是cnpm，默认true，若要使用npm官方地址作为同步上游，请设置为false

sourceNpmRegistryIsCNpm: true,

//若安装时模块不存在，是否向源registry进行同步，默认true

syncByInstall: true,

// 同步模式选项

// none: 不进行同步，只管理用户上传的私有模块，公共模块直接从上游获取

// exist: 只同步已经存在于数据库的模块

// all: 定时同步所有源registry的模块

syncModel: 'exist', // 'none', 'all', 'exist'

// 同步时间间隔，默认10分钟

syncInterval: '10m',

// 是否同步模块中devDependencies，默认false

syncDevDependencies: false,

//用户账号系统接入，可以扩展接入公司的账号系统

//本文暂不涉及，详见https://github.com/cnpm/cnpmjs.org/wiki/Use-Your-Own-User-Authorization

userService: null,
 //另外一个比较坑的默认设置,默认false，踩坑记录里详细说
enableAbbreviatedMetadata: true,
};
```
3.5.启动服务

3.5.1 终端执行命令：node --harmony_generators dispatch.js 

若报错：node: bad option: --harmony_generators

改用命令 node dispatch.js 或者 nohup node dispatch.js &

都不行请检查node版本，升最新版

3.5.2 终端执行命令：npm run restart

启动服务后，在浏览器中输入：http://127.0.0.1:7002 ，如果看到下面这个页面就表示成功啦！

3.6 安装依赖 

 终端执行命令：npm install --build-from-source --registry=https://registry.npm.taobao.org --disturl=https://npm.taobao.org/mirrors/node

3.6.1 自己本机上（Mac环境）装没有问题，转到Linux各种坑，详见 五、Linux上安装踩坑记录

## 四、发布模块 
4.1 添加用户

npm adduser --registry=http://127.0.0.1:7001 

(本机就改为127.0.0.1，其他机器访问改为同一个局域网下的部署了cnpm机器的对外ip地址)

只有admin用户才能发布，所以就添加admin用户：(即~/cnpmjs.org/config/index.js admins 中添加的用户名&密码)

Username: admin
Password: 设置密码
Email: (this IS public) 上面修改后的邮箱地址

4.2 登陆账户

npm login --registry=http://127.0.0.1:7001

这里也会出现和添加用户一样的提示要你填写，因为刚刚添加过用户，所以直接回车用默认的。

Username: (admin)
Password: (or leave unchanged)
Email: (this IS public) (你的邮箱)
4.3 测试

准备就绪了，下面简单写一个模块来测试一下：

vi justice.js
/*

* 公共模块

*/

function hello(name) {

        console.log("Hello " + name);

}

exports.hello = hello;

编写package.json文件

vi package.json

{

        "name": "justice",

        "version": "1.0.0",

        "main": "./justice.js",

        "description": "A Common Module",

        "author": "justice"

}

编写完之后，就可以发布啦：

4.4 发布

npm publish --registry=http://127.0.0.1:7001

输出：justice@1.0.0

也可以加上 —verbose参数来查看更详细的日志。

4.4.1发布错误记录

1）npm Remove the 'private'

npm  ERR! This package has been marked as private

npm ERR! Remove the 'private' field from the package.json to publish it.

解决方法：删除 package.json文件的 "private": true,

 

2) npm Request Entity Too Large

解决方法：vim ~/cnpmjs.org/config/index.js

修改：jsonLimit: ‘100mb’,//传输数据大小限制

 

3）npm ERR! forbidden cannot modify pre-existing version: 1.0.0: caculate2

解决方法：修改package.json里的version版本号


.5 安装

安装测试一下，转到其他目录，输入命令：

npm install justice@lastest --registry=http://127.0.0.1:7001

(没有@lastest默认安装最新，@lastest存在安装指定版本)

 

## 五、Linux上安装踩坑记录
我在自己本机（Mac环境上）装完没问题以后，公司要部署到服务器上，又碰到几个坑

1.执行3.6语句时，一直报错没有权限



解决方案：sudo chmod -R 777 /root (给这个报错的目录加权限)

 

2. 执行3.6语句时，加了上面的权限依然报错没有权限，于是乎我改用

sudo (3.6语句..此处省略)，然后报错sudo npm ：没有找到命令（忘记截图了）

解决方案：

终端输入： which node

终端输出： /usr/local/node-v10.14.2-linux-x64/bin/node (node文件位置)

终端输入： which npm 

终端输出： /usr/local/node-v10.14.2-linux-x64/bin/npm (npm文件位置)

终端输入：ln -s   /usr/local/node-v10.14.2-linux-x64/bin/node /usr/local/bin/node  

终端输入：ln -s   /usr/local/node-v10.14.2-linux-x64/bin/npm /usr/local/bin/npm

（标黄位置替换成你上面对应输出的路径）

目的是把node 和 npm 命令改为全局变量，否则会找不到该命令

 

3.还是执行sudo 3.6语句,终于不报没有权限了，但是又换了个报错，又忘记截图了，网上找个类似的?

network 'proxy' config is set properly. See: 'npm help config'



解决方案:

终端输入：npm config set proxy  

终端输出：null

终端输入：npm config set https_proxy

终端输出：null

终端输入：npm config set registry http://registry.cnpmjs.org

(百度说是换成cnpmjs的镜像，但我改成这个还是不行，但是换成淘宝的镜像就可以了。。遇见类似问题，两个镜像都试试看吧，总有一个能行哈哈)

我是执行这个成功的：npm config set registry https://registry.npm.taobao.org

 

4.依旧执行3.6语句，换了镜像还是有问题哈哈哈哈哈哈，一直报无法安装sqlite3的错。。

解决方案：

更换3.6语句，删除--build-from-source

终端输入：

sudo npm install --registry=https://registry.npm.taobao.org --disturl=https://npm.taobao.org/mirrors/node

终于装好了。。。。感觉自己已经成了半个运维。。

参考文章：

https://github.com/cnpm/cnpmjs.org/wiki/Deploy（官方git地址）

https://www.colabug.com/2731929.html

https://www.cnblogs.com/wyzfzu/p/4149310.html

https://www.jianshu.com/p/3ad957663363