# mac m1 安装mongod

[中文文档](https://www.mongodb.org.cn/manual/)
[英文文档]()

## 安装

1、下载tgz

[download community version](https://www.mongodb.com/try/download/community)
* In the Version dropdown, select the version of MongoDB to download.
* In the Platform dropdown, select macOS.
* In the Package dropdown, select tgz.
* Click Download.

2、解压缩tgz
```bash
tar -zxvf mongodb-macos-x86_64-enterprise-5.0.tgz
```
If your web browser automatically unzips the file as part of the download, the file would end in .tar instead.

3、确保二进制文件位于PATH环境变量中

MongoDB的二进制文件在bin/目录下面，你可以选择：
--The MongoDB binaries are in the bin/ directory of the tarball. You can either:

方法一：把二进制文件拷贝到已配置的path环境变量中，例如/usr/local/bin

--Copy the binaries into a directory listed in your PATH variable, such as /usr/local/bin (Update /path/to/the/mongodb-directory/ with your installation directory as appropriate)

```bash
sudo cp /path/to/the/mongodb-directory/bin/* /usr/local/bin/
```

方法二：创建mongodb的软链接

-- Create symbolic links to the binaries from a directory listed in your PATH variable, such as /usr/local/bin (Update /path/to/the/mongodb-directory/ with your installation directory as appropriate):

```bash
sudo ln -s  /path/to/the/mongodb-directory/bin/* /usr/local/bin/
```


## 使用

1、创建data目录

```bash 
sudo mkdir -p /usr/local/var/mongodb
```

说明：Starting with macOS 10.15 Catalina, Apple restricts access to the MongoDB default data directory of /data/db. On macOS 10.15 Catalina, you must use a different data directory, such as /usr/local/var/mongodb.

2、创建log目录

```bash
sudo mkdir -p /usr/local/var/log/mongodb
```

3、获得对data目录、log目录的权限

```bash
sudo chown my_mongodb_user /usr/local/var/mongodb
sudo chown my_mongodb_user /usr/local/var/log/mongodb
```

4、启动mongod
```bash
mongod --dbpath /usr/local/var/mongodb --logpath /usr/local/var/log/mongodb/mongo.log --fork
```
NOTE

- macOS Prevents mongod From Opening
macOS may prevent mongod from running after installation. If you receive a security error when starting mongod indicating that the developer could not be identified or verified, do the following to grant mongod access to run:

Open System Preferences
Select the Security and Privacy pane.
Under the General tab, click the button to the right of the message about mongod, labelled either Open Anyway or Allow Anyway depending on your version of macOS.

5、检查mongod是否启动成功

```bash
ps aux | grep -v grep | grep mongod
```

## 操作数据库

```bash
mongo
```
### 增删改查

[创建数据库]https://www.mongodb.org.cn/tutorial/8.html

```bash 
> show dbs
admin      0.000GB
config     0.000GB
local      0.000GB

> use lss
switched to db lss
> db
lss
> db.lss.insert({"name":"lss"})
WriteResult({ "nInserted" : 1 })
> show dbs
admin      0.000GB
config     0.000GB
local      0.000GB
lss        0.000GB

> show collections

```