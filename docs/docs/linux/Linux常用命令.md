# shell 学习

## Linux 命令

### 用户管理

1. `useradd` 新增用户

    ```bash
    [root@localhost ~]# useradd john
    [root@localhost ~]# useradd -u 555 user1 # 指定UID
    [root@localhost ~]# useradd -g user1 user2 # 指定GID
    [root@localhost ~]# useradd -d /home/mydir3 user3 #指定home目录
    ```

2. `passwd` 设置密码

    > root用户
    ```bash
    [root@localhost ~]# passwd john
    Changing password for user john.
    New password:
    BAD PASSWORD: The password is a palindrome
    Retype new password:
    passwd: all authentication tokens updated successfully.
    [root@localhost ~]#
    ```
    > 普通用户
    ```bash
    [john@localhost ~]$ passwd
    Changing password for user john.
    Changing password for john.
    (current) UNIX password:
    New password:
    Retype new password:
    passwd: all authentication tokens updated successfully.
    [john@localhost ~]$
    ```

3. `usermod` 修改用户

    ```bash
    [root@localhost ~]# useradd alice
    [root@localhost ~]# passwd alice
    Changing password for user alice.
    New password:
    BAD PASSWORD: The password is a palindrome
    Retype new password:
    passwd: all authentication tokens updated successfully.
    [root@localhost ~]# cat /etc/passwd | grep alice
    alice:x:1002:1002::/home/alice:/bin/bash
    # 修改用户alice home目录
    [root@localhost ~]# usermod -d /home/alice_new -m alice
    [root@localhost ~]# cat /etc/passwd | grep alice
    alice:x:1002:1002::/home/alice_new:/bin/bash
    ```

4. `userdel` 删除用户

    ```bash
    [root@localhost ~]# userdel alice
    [root@localhost ~]#
    ```

5. `groupadd` 新增用户组

    ```bash
    [root@localhost home]# groupadd group1
    [root@localhost home]#
    ```

6. `groupdel` 删除用户组

    ```bash
    [root@localhost home]# groupdel group1
    ```

7. `users who w` 查看用户

    ```bash
    [root@localhost home]# users
    root test
    [root@localhost home]# who
    root     pts/0        2019-01-08 01:57 (192.168.56.1)
    test     pts/1        2019-01-08 01:16 (192.168.56.1)
    [root@localhost home]# w
    02:24:09 up  4:24,  2 users,  load average: 0.00, 0.01, 0.05
    USER     TTY      FROM             LOGIN@   IDLE   JCPU   PCPU WHAT
    root     pts/0    192.168.56.1     01:57    1.00s  0.09s  0.01s w
    test     pts/1    192.168.56.1     01:16   30:09   0.03s  0.03s -bash
    ```

    > `w`命令
    * 第一行显示 当前时间 系统运行时间 已登录用户数 系统负载
    * 下面信息分为8列：
        + 登录用户的用户名
        + 用户登录终端
        + 如果用户从网络登录，显示远程主机的主机名或IP
        + 用户登录时间
        + 用户闲置时间
        + 与终端相关的当前所有运行进程消耗的CPU时间总量
        + 当前WHAT列所对应的进程消耗的CPU时间总量
        + 用户当前运行的进程

8. `finger` 调查用户

    ```bash
    [root@localhost ~]# finger
    Login     Name       Tty      Idle  Login Time   Office     Office Phone   Host
    root      root       pts/1          Jan  8 04:14                           (192.168.56.1)
    test                 pts/0      24  Jan  8 04:14                           (192.168.56.1)
    [root@localhost ~]# finger test
    Login: test                             Name:
    Directory: /home/test                   Shell: /bin/bash
    On since Tue Jan  8 04:14 (EST) on pts/0 from 192.168.56.1
    25 minutes 18 seconds idle
    No mail.
    No Plan.
    [root@localhost ~]#
    ```

9. `su` 切换用户

    > 切换用户
    ```bash
    [test@localhost ~]$ su
    Password:
    [root@localhost test]# pwd
    /home/test
    [root@localhost test]# exit
    exit
    [test@localhost ~]$
    ```
    > 切换用户环境
    ```bash
    [test@localhost ~]$ su -
    Password:
    Last login: Tue Jan  8 04:22:09 EST 2019 on pts/0
    [root@localhost ~]# pwd
    /root
    [root@localhost ~]# exit
    logout
    [test@localhost ~]$
    ```

10. `sudo` 用其他用户身份执行命令

    ```bash
    [root@localhost ~]# visudo

    [john@localhost test]$ sudo passwd user1

    We trust you have received the usual lecture from the local System
    Administrator. It usually boils down to these three things:

        #1) Respect the privacy of others.
        #2) Think before you type.
        #3) With great power comes great responsibility.

    [sudo] password for john:
    Changing password for user user1.
    New password:
    BAD PASSWORD: The password is a palindrome
    Retype new password:
    passwd: all authentication tokens updated successfully.
    ```

11. `at` 单一时刻执行一次任务

    `at` `atq` `atrm`

12. `cron` 周期性执行任务

### 文件管理

1. 绝对路径

    `/home/test`

2. 当前目录

    ```bash
    [root@localhost ~]# pwd
    /root
    ```

3. 特殊目录

    + `.` 当前目录
    + `..` 当前目录父级目录

4. 相对路径

5. 文件操作

    1. `touch` 创建文件

        ```bash
        [test@localhost tmp]$ touch test.txt
        [test@localhost tmp]$ ls
        total 0
        -rw-r--r--. 1 test users  0 Jan  8 06:40 test.txt
        [test@localhost tmp]$
        ```

    2. `rm` 删除文件

        ```bash
        [root@localhost tmp]# rm test.txt
        rm: remove regular empty file ‘test.txt’? y
        [root@localhost tmp]#
        ```

    3. `mv` 移动或删除文件

        ```bash
        [root@localhost tmp]# ls
        
        [root@localhost tmp]# touch test.txt
        [root@localhost tmp]# ls
        test.txt
        [root@localhost tmp]# ls /mnt/
        [root@localhost tmp]# mv test.txt /mnt/
        [root@localhost tmp]# ls /mnt/
        test.txt
        [root@localhost tmp]# ls

        ```

    4. `cat` 查看文件

        ```bash
        [root@localhost ~]# cat instll.log

        [root@localhost ~]# cat -n instll.log # 显示行号
        ```

    5. `head` 查看文件头

        ```bash
        [root@localhost ~]# head get-docker.sh
        #!/bin/sh
        set -e

        # This script is meant for quick & easy install via:
        #   $ curl -fsSL https://get.docker.com -o get-docker.sh
        #   $ sh get-docker.sh
        #
        # For test builds (ie. release candidates):
        #   $ curl -fsSL https://test.docker.com -o test-docker.sh
        #   $ sh test-docker.sh
        [root@localhost ~]#
        // -n 显示指定的行数
        [root@localhost ~]# head -n 20 get-docker.sh
        #!/bin/sh
        set -e

        # This script is meant for quick & easy install via:
        #   $ curl -fsSL https://get.docker.com -o get-docker.sh
        #   $ sh get-docker.sh
        #
        # For test builds (ie. release candidates):
        #   $ curl -fsSL https://test.docker.com -o test-docker.sh
        #   $ sh test-docker.sh
        #
        # NOTE: Make sure to verify the contents of the script
        #       you downloaded matches the contents of install.sh
        #       located at https://github.com/docker/docker-install
        #       before executing.
        #
        # Git commit from https://github.com/docker/docker-install when
        # the script was uploaded (Should only be modified by upload job):
        SCRIPT_COMMIT_SHA=4957679

        [root@localhost ~]#
        ```

    6. `tail` 查看文件尾

        > 同`head`命令

        > 动态查看文件尾
        ```bash
        [root@localhost ~]# tail -f get-docker.sh
        ```

    7. `doc2unix` 文件格式转换

        ```bash
        [root@localhost ~]# doc2unix test.txt
        ```

6. 目录操作

    1. `cd` 进入目录

        ```bash
        [root@localhost /]# cd
        [root@localhost ~]# pwd
        /root
        [root@localhost ~]# cd /tmp
        [root@localhost tmp]# pwd
        /tmp
        [root@localhost tmp]# cd /mnt
        [root@localhost mnt]# pwd
        /mnt
        [root@localhost mnt]#
        ```

    2. `mkdir` 创建目录

        ```bash
        [root@localhost ~]# cd
        [root@localhost ~]# mkdir dir1
        [root@localhost ~]# cd dir1/
        [root@localhost dir1]# mkdir dir2
        [root@localhost dir1]# cd dir2/
        [root@localhost dir2]# pwd
        /root/dir1/dir2
        [root@localhost dir1]#
        ```
        > 创建多层目录
        ```bash
        [root@localhost dir2]# mkdir -p dir3/dir4
        [root@localhost dir2]# cd dir3/dir4/
        [root@localhost dir4]# pwd
        /root/dir1/dir2/dir3/dir4
        [root@localhost dir4]#
        ```

    3. `rmdir` `rm` 删除目录

        ```bash
        [root@localhost dir2]# rmdir dir3/
        rmdir: failed to remove ‘dir3/’: Directory not empty
        [root@localhost dir2]# rmdir dir3/dir4/
        [root@localhost dir2]# rmdir dir3/
        [root@localhost dir2]#
        ```

        ```bash
        [root@localhost dir2]# cd
        [root@localhost ~]# rm -r dir1/
        rm: descend into directory ‘dir1/’? y
        rm: remove directory ‘dir1/dir2’? y
        rm: remove directory ‘dir1/’? y
        [root@localhost ~]#
        ```
        > 删除目录及文件无提示
        ```bash
        [root@localhost ~]# rm -rf dir1/
        ```
    4. `cp` 文件和目录复制

        > 复制文件
        ```bash
        [root@localhost test]# cp test.txt test.copy.txt
        [root@localhost test]# ls
        test.copy.txt  test.txt
        [root@localhost test]#
        ```
        > 复制目录
        ```bash
        [root@localhost test]# ls
        a  test.copy.txt  test.txt
        [root@localhost test]# cp a b
        cp: omitting directory ‘a’
        [root@localhost test]# cp -r a b
        [root@localhost test]# ls
        a  b  test.copy.txt  test.txt
        [root@localhost test]#
        ```

7. 文件和目录权限

    1. `ls -al` 查看文件或目录权限

        ```bash
        [root@localhost test]# ls -al
        total 0
        drwxr-xr-x. 4 root root  61 Jan  9 04:21 .
        dr-xr-x---. 4 root root 180 Jan  9 04:14 ..
        drwxr-xr-x. 2 root root   6 Jan  9 04:20 a
        drwxr-xr-x. 2 root root   6 Jan  9 04:21 b
        -rw-r--r--. 1 root root   0 Jan  9 04:15 test.copy.txt
        -rw-r--r--. 1 root root   0 Jan  9 04:14 test.txt
        [root@localhost test]#
        ```

        > 
        >* 第一列是文件类别和权限，这列由10个字符组成，
        >   * 第一个字符表明该文件的类型。接下来的属性中，每3个字符为一组，
        >   * 第2~4个字符代表该文件所有者（user）的权限，
        >   * 第5~7个字符代表给文件所有组（group）的权限，
        >   * 第8~10个字符代表其他用户（others）拥有的权限。每组都是rwx的组合，如果拥有读权限，则该组的第一个字符显示r，否则显示一个小横线；如果拥有写权限，则该组的第二个字符显示w，否则显示一个小横线；如果拥有执行权限，则第三个字符显示x，否则显示一个小横线。
        >* 第二列代表“连接数”，除了目录文件之外，其他所有文件的连接数都是1，目录文件的连接数是该目录中包含其他目录的总个数+2，也就是说，如果目录A中包含目录B和C，则目录A的连接数为4。
        >* 第三列代表该文件的所有人，
        >* 第四列代表该文件的所有组，
        >* 第五列是该文件的大小，
        >* 第六列是该文件的创建时间或最近的修改时间，
        >* 第七列是文件名。

        | 第一个个字符 | 含义 |
        |------------|-----|
        | d | 目录 |
        | - | 普通文件 |
        | l | 链接文件 |
        | b | 块文件 |
        | c | 字符文件 |
        | s | socket文件 |
        | p | 管道文件 |

    2. `lsattr` 查看文件隐藏属性

        ```bash
        [root@localhost ~]# lsattr anaconda-ks.cfg
        ---------------- anaconda-ks.cfg
        [root@localhost ~]#
        ```
    
    3. `chattr` 设置文件隐藏属性

        ```bash
        [root@localhost ~]# chattr +a anaconda-ks.cfg
        -----a---------- anaconda-ks.cfg
        [root@localhost ~]#
        ```

    3. `chmod` 改变文件权限

        | 命令 | 作用 |
        |------|------|
        | `chmod u+r somefile` | 给某文件添加用户读权限 |
        | `chmod u-r somefile` | 给某文件删除用户读权限 |
        | `chmod u+w somefile` | 给某文件添加用户写权限 |
        | `chmod u-w somefile` | 给某文件删除用户写权限 |
        | `chmod u+x somefile` | 添加用户对某文件读写执行权限 |
        | `chmod u-x somefile` | 删除用户对某文件读写执行权限 |
        | `chmod u=rwx somefile` | 给某文件设定用户拥有读写执行权限 |

    4. `chown` 改变文件拥有者

        ```bash
        [root@localhost test]# touch a.txt
        [root@localhost test]# ll a.txt
        -rw-r--r--. 1 root root 0 Jan  9 20:50 a.txt
        [root@localhost test]# chown john a.txt
        [root@localhost test]# ls -l a.txt
        -rw-r--r--. 1 john root 0 Jan  9 20:50 a.txt
        [root@localhost test]# chown :john a.txt
        [root@localhost test]# ls -l a.txt
        -rw-r--r--. 1 john john 0 Jan  9 20:50 a.txt
        [root@localhost test]# chown john:john a.txt
        ```

    5. `chgrp` 改变文件的拥有组

        ```bash
        [root@localhost test]# touch b.txt
        [root@localhost test]# ls -l b.txt
        -rw-r--r--. 1 root root 0 Jan  9 20:52 b.txt
        [root@localhost test]# chgrp john b.txt
        [root@localhost test]# ls -l b.txt
        -rw-r--r--. 1 root john 0 Jan  9 20:52 b.txt
        [root@localhost test]#
        ```

    6. `file` 查看文件类型

        ```bash
        [root@localhost test]# file /root
        /root: directory
        [root@localhost test]# file /tmp
        /tmp: sticky directory
        [root@localhost test]# file /etc/passwd
        /etc/passwd: ASCII text
        [root@localhost test]# file /usr/bin/passwd
        /usr/bin/passwd: setuid ELF 64-bit LSB shared object, x86-64, version 1 (SYSV), dynamically linked (uses shared libs), for GNU/Linux2.6.32, BuildID[sha1]=1e5735bf7b317e60bcb907f1989951f6abd50e8d, stripped
        [root@localhost test]#
        ```

8. 查找文件

    1. `find` 一般查找

        `find PATH -name FILENAME`

        ```bash
        [root@localhost test]# find ./ -name a.txt
        ./a.txt
        [root@localhost test]#
        ```

        | 参数 | 含义 |
        |------|------|
        | -name filename | 查找文件名为filename的文件 |
        | -perm | 根据文件权限查找 |
        | -user username | 根据用户名查找 |
        | -mtime -n/+n | 查找n天内/n天前更改过的文件 |
        | -atime -n/+n | 查找n天内/n天前访问过的文件 |
        | -ctime -n/+n | 查找n天内/n天前创建的文件 |
        | -newer filename | 查找更改时间比filename新的文件 |
        | -type b/d/c/p/l/f/s | 查找块/目录/字符/管道/链接/普通/套接字文件 |
        | -size | 根据文件大小查找 |
        | -depth n | 最大的查找目录深度 |

    2. `locate` 数据库查找


    3. `which` \ `whereis` 查找执行文件

        ```bash
        [root@localhost ~]# which passwd
        /usr/bin/passwd
        [root@localhost ~]# whereis passwd
        passwd: /usr/bin/passwd /etc/passwd /usr/share/man/man1/passwd.1.gz
        [root@localhost ~]#
        ```
        
9. 文件压缩

    1. `gzip/gunzip`

        > 压缩单个文件

        ```bash
        [root@localhost test]# gzip test.txt
        [root@localhost test]# ls
        test.txt.gz
        [root@localhost test]# gunzip test.txt.gz
        [root@localhost test]# ls
        test.txt
        [root@localhost test]#
        ```

    2. `tar`

        ```bash
        [root@localhost test]# tar -zcvf boot.tgz /boot
        ```

        | 参数 | 含义 |
        |------|-----|
        | -z | gzip压缩 |
        | -c | 创建压缩文件 |
        | -v | 显示当前被压缩的文件 |
        | -f | 指使用文件名 |

        ```bash
        [root@localhost test]# tar -zxvf boot.tgz
        ```

        | 参数 | 含义 |
        |------|-----|
        | -z | 解压 |

        ```bash
        [root@localhost test]# tar -zxvf boot.tgz -C /tmp
        ```
        > 指定压缩存放目录

    3. `bzip2`

        ```bash
        [root@localhost test]# bzip2 test.txt
        [root@localhost test]# bzip2 -d test.txt.bz2
        [root@localhost test]#
        ```
    
    4. `cpio`

### Linux文件系统

### 字符处理

1. `|` 管道

    ```bash
    [root@localhost ~]# help | more
    ```

2. `grep` 搜索文本

    ```bash
    [root@localhost ~]# grep [-ivnc] '匹配的字符' 文件名
    ```

    | 参数 | 含义 |
    |------|------|
    | i | 不区分大小写 |
    | v | 反向匹配 |
    | n | 输出行号 |
    | c | 统计包含匹配的行数 |

3. `sort` 排序

    ```bash
    [root@localhost ~]# sort [-ntkr] 文件名
    ```

    | 参数 | 含义 |
    |------|------|
    | n | 采取数字排序 |
    | t | 指定分隔符 |
    | k | 指定第几列 |
    | r | 反向排序 |

    ```bash
    [root@localhost test]# cat sort.txt
    b:3
    c:2
    a:4
    e:5
    d:1
    f:11
    [root@localhost test]# cat sort.txt | sort
    a:4
    b:3
    c:2
    d:1
    e:5
    f:11
    [root@localhost test]# cat sort.txt | sort -r
    f:11
    e:5
    d:1
    c:2
    b:3
    a:4
    [root@localhost test]# cat sort.txt | sort -t ":" -k 2
    d:1
    f:11
    c:2
    b:3
    a:4
    e:5
    [root@localhost test]# cat sort.txt | sort -t ":" -k 2 -n
    d:1
    c:2
    b:3
    a:4
    e:5
    f:11
    [root@localhost test]#
    ```

4. `uniq` 删除重复内容

    ```bash
    [root@localhost test]# uniq [-ic]
    ```

    | 参数 | 含义 |
    |------|------|
    | i | 忽略大小写 |
    | c | 计算重复行数 |

    ```bash
    [root@localhost test]# cat uniq.txt | uniq
    asd
    123
    asd
    123
    [root@localhost test]# cat uniq.txt | sort | uniq
    123
    asd
    [root@localhost test]# cat uniq.txt | sort | uniq -c
        2 123
        2 asd
    [root@localhost test]#
    ```
5. `cut` 截取文本

    ```bash
    [root@localhost test]# cut -f指定列 -d'分隔符'
    [root@localhost test]# cut -c指定字符
    ```

    ```bash
    [root@localhost test]# cat /etc/passwd | cut -f1,6 -d':'
    root:/root
    bin:/bin
    admin:/home/admin
    john:/home/john
    [root@localhost test]#
    ```

6. `tr` 文本替换

    ```bash
    [root@localhost test]# cat /etc/passwd | tr '[a-z]' '[A-Z]'
    ROOT:X:0:0:ROOT:/ROOT:/BIN/BASH
    BIN:X:1:1:BIN:/BIN:/SBIN/NOLOGIN
    ADMIN:X:1000:1000::/HOME/ADMIN:/BIN/BASH
    JOHN:X:1001:1001::/HOME/JOHN:/BIN/BASH
    [root@localhost test]#
    [root@localhost test]# cat /etc/passwd | tr -d ':'
    rootx00root/root/bin/bash
    binx11bin/bin/sbin/nologin
    adminx10001000/home/admin/bin/bash
    johnx10011001/home/john/bin/bash
    [root@localhost test]#
    ```

7. `paste` 文本合并

    ```bash
    [root@localhost test]# cat a.txt
    1
    2
    3
    [root@localhost test]# cat b.txt
    a
    b
    c
    [root@localhost test]# paste a.txt b.txt
    1       a
    2       b
    3       c
    [root@localhost test]# paste -d: a.txt b.txt
    1:a
    2:b
    3:c
    [root@localhost test]#
    ```

8. `spit` 分割大文件

    ```bash
    [root@localhost test]# spilt -l 500 test.txt small_file_ # 按行分割
    [root@localhost test]# spilt -b 64m test.txt small_file_ # 按文件大小分割
    ```



### 网络管理

### 进程管理

    1. `ps`、`top` 进程的观察

        ```bash
        [root@localhost ~]# ps 参数

        # -A 列出所有的进程，与-e有同样的作用
        # -a 列出不和本终端有关的所有进程
        # -w 显示加宽可以显示更多内容
        # -u 显示有效使用者相关的进程
        # aux 显示所有包含其他使用者的进程
        # 使用aux参数的输出：
        # USER PID %CPU %MEM VSZ RSS TTY STAT START TIME COMMAND
            # USER 进程拥有者
            # PID pid
            # %CPU 占用的CPU使用率
            # %MEM 占用内存使用率
            # VSZ 占用的虚拟内存大小
            # RSS 占用内存大小
            # TTY 运行的终端的号码
            # STAT 进程状态
                # D：不可中断
                # R：运行中
                # S：休眠
                # T：暂停
                # Z：僵尸进程
                # W：没有足够的内存可分配
                # <：高优先级的进程
                # N：低优先级的进程
            # START 进程开始时间
            # TIME 累计使用CPU的时间
            # COMMAND 执行的命令
        ```

    2. `kill`、`killall` 进程的终止

        > `kill`信号代码
        ```bash
        1) SIGHUP 重启   2) SIGINT       3) SIGQUIT      4) SIGILL          5) SIGTRAP
        6) SIGABRT      7) SIGBUS       8) SIGFPE       9) SIGKILL 强行杀掉 10) SIGUSR1
        11) SIGSEGV     12) SIGUSR2     13) SIGPIPE     14) SIGALRM         15) SIGTERM 正常结束
        16) SIGSTKFLT   17) SIGCHLD     18) SIGCONT     19) SIGSTOP         20) SIGTSTP
        21) SIGTTIN     22) SIGTTOU     23) SIGURG      24) SIGXCPU         25) SIGXFSZ
        26) SIGVTALRM   27) SIGPROF     28) SIGWINCH    29) SIGIO           30) SIGPWR
        31) SIGSYS      34) SIGRTMIN    35) SIGRTMIN+1  36) SIGRTMIN+2      37) SIGRTMIN+3
        38) SIGRTMIN+4  39) SIGRTMIN+5  40) SIGRTMIN+6  41) SIGRTMIN+7      42) SIGRTMIN+8
        43) SIGRTMIN+9  44) SIGRTMIN+10 45) SIGRTMIN+11 46) SIGRTMIN+12     47) SIGRTMIN+13
        48) SIGRTMIN+14 49) SIGRTMIN+15 50) SIGRTMAX-14 51) SIGRTMAX-13     52) SIGRTMAX-12
        53) SIGRTMAX-11 54) SIGRTMAX-10 55) SIGRTMAX-9  56) SIGRTMAX-8      57) SIGRTMAX-7
        58) SIGRTMAX-6  59) SIGRTMAX-5  60) SIGRTMAX-4  61) SIGRTMAX-3      62) SIGRTMAX-2
        63) SIGRTMAX-1  64) SIGRTMAX
        ```
        ```bash
        # 停止系统中所有httpd进程
        [root@localhost ~]# killall httpd
        ```

    3. `lsof` 查询进程打开的文件

        ```bash
        [root@localhost ~]# lsof [options] filename
        # 常用的参数列表
        # lsof filename 显示打开指定文件的进程
        # lsof -c string 显示COMMAND列中包含指定字符的进程所有打开的文件
        # lsof -u username 显示所属于user进程打开的文件
        # lsof -g gid 显示归属于gid的进程情况
        # lsof +d /DIR/ 显示目录下被进程打开的文件
        # lsof +D /DIR/ 同上，但是会搜索目录下的所有目录，时间较长
        # lsof -d FD 显示指定文件描述符的进程
        # lsof -n 不将IP转换为hostname
        # lsof -i 用一显示符合条件的进程情况
        # lsof -i[46] [protocol][@hostname][hostaddr][:service|port]
        #       46 指IPv4或IPv6
        #       protocol 指TCP或UDP
        #       hostname 指主机名
        #       hostaddr 是IPv4地址
        #       service 是/etc/service中的service name
        #       port 是端口号
        ```

    4. `nice`、`renice` 进程优先级调整

### 安装软件


### vi\vim编辑器

1. vi编辑器

    | 键 | 动作 |
    |------|------|
    | h | 光标左移 |
    | j | 光标下移 |
    | k | 光标上移 |
    | l | 光标左移 |
    | $ | 移动到本行末 |
    | G | 移动到文件末尾 |
    | :n | 移动到第n行 |
    | n | 往下移n行 |
    | Ctrl+f | 往下移动一页 |
    | Ctrl+b | 往上移动一页 |
    | Ctrl+d | 往下移动半页 |
    | Ctrl+u | 往上移动半页 |

## Shell编程

1. `type` 确定內建命令
2. `.` 执行程序
3. `alias` 别名
4. `unalias` 删除别名
5. `bg`、`fg`、`jobs` 任务前后台切换
6. `cd` 改变目录
7. `declare`、`typeset` 声明变量
8. `echo` 打印字符
9. `break` 跳出循坏
10. `continue` 循坏控制
11. `exec` 执行命令来取代当前Shell
12. `exit` 退出Shell
13. `export` 使变量能被子Shell识别
14. `kill` 发送信号给指定PID和进程
15. `let` 整数运算
16. `pwd` 显示当前工作目录
17. `local` 声明局部变量
18. `read` 从标准输入读取一行到变量
19. `return` 定义函数返回值
20. `shift` 向左移动位置参数
21. `ulimit` 显示并设置进程资源限度
22. `test` 测试表达式

### Shell编程基础

1. 变量

    1. 局部变量
    2. 环境变量

        | 变量 | 含义 |
        |------|------|
        | BASH | Bash Shell的全路径 |
        | BASH_VERSION | Bash Shell的版本 |
        | CDPATH | 用于快速进入某个目录 |
        | EUID | 记录当前用户的UID |
        | FUNCNAME | 在用户函数体内部记录当前函数体的函数名 |
        | HISTCMD | 记录下一条命令在history中的编号 |
        | HISTFILE | 记录history命令记录文件的位置 |
        | HISTFILESIZE | 设置HISTFILE文件记录命令的行数 |
        | HISTSIZE | 定义缓存区的大小 |
        | HOSTNAME | 展示主机名 |
        | HOSTTYPE | 展示主机架构 |
        | MACHTYPE | 主机类型的GNU标识 |
        | LANG | 设置当前系统的语言环境 |
        | PWD | 记录当前目录 |
        | OLDPWD | 记录之前目录 |
        | PATH | 命令的搜索路径 |
        | PS1 | 命令提示符 |

    3. 变量命名

        > 变量区分大小写
    
    4. 变量赋值和取值

        赋值：`name=jhon`、`msg="Hello world!"`
        取值：`echo $name`、`echo ${msg}`
    
    5. 取消变量`unset name`
    6. 特殊变量
        1. 位置参数

            | 参数 | 含义 |
            |------|------|
            | $0 | 脚本本身 |
            | $1 | 第一个参数 |
            | $2 | 第二个参数 |
            | ... | ... |
            | ${10} | 第10个参数 |
            | $# | 脚本参数个数总和 |
            | $@ | 脚本所有参数 |
            | $* | 脚本所有参数 |

        2. `$?` 脚本或命令返回值

    7. 数组
        1. 数组定义

            ```bash
            [root@localhost ~]# declare -a Array
            [root@localhost ~]# Array[0]=0
            [root@localhost ~]# Array[1]=1
            [root@localhost ~]# Array[2]="HelloWorld"
            [root@localhost ~]# declare -a Name=('jhon' 'sue')
            [root@localhost ~]# Name[2]='wang'
            [root@localhost ~]# Name1=('jhon' 'sue')
            [root@localhost ~]# Score=([3]=3 [5]=5 [7]=7)
            ```
        2. 数组操作
            ```bash
            # 取数组第一个值
            [root@localhost ~]# echo ${Array[0]}
            0
            # 取数组第三个值
            [root@localhost ~]# echo ${Array[2]}
            HelloWorld
            # 打印数组中的值
            [root@localhost ~]# echo ${Name[0]}
            jhon
            [root@localhost ~]# echo ${Name[1]}
            sue
            # 获取数组所有的值
            [root@localhost ~]# echo ${Array[@]}
            0 1 HelloWorld
            [root@localhost ~]# echo ${Array[*]}
            0 1 HelloWorld
            # 获取数组长度
            [root@localhost ~]# echo ${#Array[@]}
            3
            [root@localhost ~]# echo ${#Array[*]}
            3
            # 获取数组某个元素的长度
            [root@localhost ~]# echo ${#Array[2]}
            10
            # 取出数组中第一个、第二个元素
            [root@localhost ~]# echo ${Array[@]:1:2}
            1 HelloWorld
            # 取出数组中第二个元素从第0个字符开始连续5个字符
            [root@localhost ~]# echo ${Array[2]:0:5}
            Hello
            # 数组拼接
            [root@localhost ~]# Conn=(${Array[@]} ${Name[@]})
            [root@localhost ~]# echo ${Conn[@]}
            0 1 HelloWorld jhon sue wang
            # 数组替换元素
            [root@localhost ~]# Array=(${Array[@]/HelloWorld/HelloJhon})
            [root@localhost ~]# echo ${Array[@]}
            0 1 HelloJhon
            # 删除数组中的一个元素
            [root@localhost ~]# unset Array[1]
            [root@localhost ~]# echo ${Array[@]}
            0 HelloJhon
            # 删除数组
            [root@localhost ~]# unset Array
            [root@localhost ~]# echo ${Array[@]}

            [root@localhost ~]#
            ```
    8. 只读变量
        `readonly R0=100`或`declare -r R0=100`
    9. 变量作用域

2. 转义和引用

    1. 转义 `\`
    2. 引用 
        1. 部分引用
        2. 全引用
    3. 命令替换
        1. ``` `命令` ```
        2. `$(命令)`
3. 运算符

    1. 算数运算

        | 运算符 | 含义 |
        |------|------|
        | `+` | 加 |
        | `-` | 减 |
        | `*` | 乘 |
        | `/` | 除 |
        | `%` | 取余 |
        | `**` | 幂运算 |
        | `+=` | 加等 |
        | `-=` | 减等 |
        | `*=` | 乘等 |
        | `/=` | 除等 |
        | `%=` | 取余等 |

    2. 位运算

        | 运算符 | 含义 |
        |------|------|
        | `<<` | 左移 | 
        | `>>` | 右移 |
        | `&` | 按位与 |
        | `|` | 按位或 |
        | `^` | 按位异或 |
        | `~` | 按位非 |

    3. 自增`++`、自减`--`

    4. 其他
        1. `$[]`
        2. `expr`
        3. `declare` 内建运算命令
        4. 算数扩展 `$((算数表达式))`
        5. `bc`

4. 特殊字符

    1. 通配符 `*`、`?`、`[]`
    2. 引号
    3. 注释符 `#`
    4. 大括号 
    5. 控制字符
    6. 杂项

### 测试和判断

1. 测试

    > `0`为真，其他为假

    1. 测试结构

        `test exp`或`[ exp ]`
    
    2. 文本测试

        * `test file_operator FILE`
        * `[ file_operator FILE ]`

        ```bash
        [root@localhost ~]# test -e /var/log/messages
        [root@localhost ~]# echo $?
        0
        [root@localhost ~]# [ -e /var/log/messages ]
        [root@localhost ~]# echo $?
        0
        [root@localhost ~]#
        ```

        | 文件测试符 | 含义 |
        |------|------|
        | -b FILE | 当文件存在且是个块文件时返回真，否则为假 |
        | -c FILE | 当文件存在且是个字符设备时返回真，否则为假 |
        | -d FILE | 当文件存在且是个目录时返回真，否则为假 |
        | -e FILE | 当文件存在或目录时返回真，否则为假 |
        | -f FILE | 当文件存在且是普通文件时返回真，否则为假 |
        | -x FILE | 当文件存在且是可执行文件时返回真，否则为假 |
        | -w FILE | 当文件存在且是可写文件时返回真，否则为假 |
        | -r FILE | 当文件存在且是可读文件时返回真，否则为假 |
        | -l FILE | 当文件存在且是连接文件时返回真，否则为假 |
        | -p FILE | 当文件存在且是管道文件时返回真，否则为假 |
        | -s FILE | 当文件存在且大小不为零时返回真，否则为假 |
        | -S FILE | 当文件存在且是socket文件时返回真，否则为假 |
        | -g FILE | 当文件存在且设置了SGID时返回真，否则为假 |
        | -u FILE | 当文件存在且设置了SUID时返回真，否则为假 |
        | -k FILE | 当文件存在且设置了sticky属性时返回真，否则为假 |
        | -G FILE | 当文件存在且属于有效的用户组时返回真，否则为假 |
        | -O FILE | 当文件存在且属于有效的用户时返回真，否则为假 |
        | FILE1 -nt FILE2 | 当FILE1比FILE2新时返回真，否则为假 |
        | FILE1 -ot FILE2 | 当FILE1比FILE2旧时返回真，否则为假 |

    3. 字符串测试

        | 字符串测试 | 含义 |
        |------|------|
        | -z "string" | 字符串string为空时返回真，否则为假 |
        | -n "string" | 字符串string非空时返回真，否则为假 |
        | "string1"="string2" | 字符串string1和string2相同时返回真，否则为假 |
        | "string1"!="string2" | 字符串string1和string2不相同时返回真，否则为假 
        | "string1">"string2" | 按字典排序，字符串string1在string2之前时返回真，否则为假 |
        | "string1"<"string2" | 按字典排序，字符串string1在string2之后时返回真，否则为假 |
        
        ```bash
        [root@localhost ~]# str1=""
        [root@localhost ~]# test -z "$str1"
        [root@localhost ~]# echo $?
        0
        [root@localhost ~]# test -n "$str1"
        [root@localhost ~]# echo $?
        1
        [root@localhost ~]# str2="hello"
        [root@localhost ~]# [ -z "str2" ]
        [root@localhost ~]# echo $?
        1
        [root@localhost ~]# [ -n "str2" ]
        [root@localhost ~]# echo $?
        0
        [root@localhost ~]# [ "$str1" = "$str2" ]
        [root@localhost ~]# echo $?
        1
        [root@localhost ~]# [ "$str1" != "$str2" ]
        [root@localhost ~]# echo $?
        0
        [root@localhost ~]# [ "$str1" \> "$str2" ]
        [root@localhost ~]# echo $?
        1
        [root@localhost ~]# [ "$str1" \< "$str2" ]
        [root@localhost ~]# echo $?
        0
        [root@localhost ~]# [[ "$str1" > "$str2" ]]
        [root@localhost ~]# echo $?
        1
        [root@localhost ~]# [[ "$str1" < "$str2" ]]
        [root@localhost ~]# echo $?
        0
        [root@localhost ~]#
        ```
    
    4. 整数比较

        | 整数比较 | 说明 |
        |------|------|
        | "num1" -eq "num2" | num1 == num2时返回真，否则为假。eq为equal |
        | "num1" -gt "num2" | num1 > num2时返回真，否则为假。gt为great than |
        | "num1" -lt "num2" | num1 < num2时返回真，否则为假。lt为less than |
        | "num1" -ge "num2" | num1 >= num2时返回真，否则为假。ge为great equal |
        | "num1" -le "num2" | num1 <= num2时返回真，否则为假。le为less equal |
        | "num1" -ne "num2" | num1 != num2时返回真，否则为假。ne为not equal |

        ```bash
        [root@localhost ~]# num1=10
        [root@localhost ~]# num2=10
        [root@localhost ~]# num3=9
        [root@localhost ~]# num4=11
        [root@localhost ~]# [ "$num1" -eq "$num2" ]
        [root@localhost ~]# echo $?
        0
        [root@localhost ~]# [ "$num1" -gt "$num3" ]
        [root@localhost ~]# echo $?
        0
        [root@localhost ~]# [ "$num1" -lt "$num4" ]
        [root@localhost ~]# echo $?
        0
        [root@localhost ~]# [ "$num1" -ge "$num2" ]
        [root@localhost ~]# echo $?
        0
        [root@localhost ~]# [ "$num1" -le "$num3" ]
        [root@localhost ~]# echo $?
        1
        [root@localhost ~]# [ "$num1" -ne "$num3" ]
        [root@localhost ~]# echo $?
        0
        [root@localhost ~]#
        ```

    5. 逻辑测试符和逻辑运算符

        * 测试符

            + `!` 非
            + `-a` 与
            + `-o` 或
        * 运算符

            + `!` 逻辑非
            + `&&` 逻辑与
            + `||` 逻辑或
    
    2. 判断

        1. `if`判断结构

            ```
            if exp; then
                command1
                command2
                ...
            fi
            ```
        
        2. `if/else`判断结构

            ```
            if exp; then
                command
            else
                command
            fi
            ```

        3. `if/elif/else`判断结构

            ```
            if exp1; then
                command1
            elif exp2; then
                command2
            elif exp3; then
                command3
            ...
            else
                command
            fi
            ```

        4. `case`判断

            ```
            case VAR in
            var1) command1;;
            var2) command2;;
            var3) command3;;
            ...
            *) command;;
            esac
            ```

2. 循环

    1. `for`循坏

        ```
        for VARIABLE in (list)
        do
            command
        done
        ```
    2. 不带列表的`for`循坏
        ```
        for VARIABLE
        do
            command
        done
        ```
        ```bash
        #!/bin/bash
        # for_list_2.sh
        for var
        do 
            echo "$var "
        done
        echo
        ```
        ```bash
        [root@localhost code]# bash for_list_2.sh 1 2 3
        1 2 3
        ```
    3. 类C的`for`循坏

        ```
        for ((exp1;exp2;exp3))
        do
            command
        done
        ```
    4. `for`的无限循坏

2. `while`循坏

    1. `while`循坏语法

        ```
        while exp
        do
            cmd
        done
        ```

    2. 使用`while`按行读取文件

        ```bash
        #!/bin/bash
        while read LINK
        do
            NAME=`echo $LINK | awk '{print $1}'`
            AGE=`echo $LINK | awk '{print $2}'`
            Sex=`echo $LINK | awk '{print $3}'`
            echo "My name is $NAME, I'm $AGE years old, I'm a $Sex."
        done < student_info.txt
        ```
        ```bash
        [root@localhost code]# bash while04.sh
        My name is John, I'm 30 years old, I'm a Boy.
        My name is Sue, I'm 28 years old, I'm a Girl.
        My name is Wang, I'm 25 years old, I'm a Boy.
        My name is Xu, I'm 23 years old, I'm a Girl.
        [root@localhost code]#
        ```
    
    3. `while`的无限循坏

        ```bash
        # 1
        while ((1))
        do
            cmd
        done

        # 2
        while true
        do
            cmd
        done

        #3
        while :
        do
            cmd
        done
        ```

3. `until`循坏

    1. `until`循坏语法

        ```
        until exp
        do
            cmd
        done
        ```
    
    2. `until`无限循坏

        ```bash
        #1
        until ((0))
        do 
            cmd
        done

        # 2
        until false
        do
            cmd
        done
        ```
4. `select`循坏

    ```
    select MENU in (list)
    do
        cmd
    done
    ```

5. 嵌套循坏

6. 循坏控制

    1. `break`语句
    2. `continue`语句

### 函数

1. 函数的基本知识

    1. 函数定义和调用

        * 定义

            ```sh
            function FUNCTION_NAME(){
                cmd1
                cmd2
                ...
            }
            FUNCTION_NAME(){
                cmd1
                cmd2
                ...
            }
            ```
        * 调用

            ```sh
            FUNCTION_NAME
            ```

    2. 函数的返回值

        ```sh
        FILE=/etc/noExistFile
        function checkFileExist(){
            if [ -f $FILE ]; then
                return 0
            else
                return 1
            fi
        }

        echo "Call function checkFileExist"
        checkFileExist
        if [ $? -eq 0 ]; then
            echo "$FILE exist"
        else
            echo "$FILE not exist"
        fi
        ```

2. 带参数的函数

    1. 位置参数

        ```sh
        function checkFileExist(){
            if [ -f $1 ]; then
                return 0
            else
                return 1
            fi
        }

        echo "Call function checkFileExist"
        checkFileExist $1
        if [ $? -eq 0 ]; then
            echo "$1 exist"
        else
            echo "$1 not exist"
        fi
        ```

        调用

        ```bash
        [root@localhost code]# checkFileExist_v2 /etc/noExistFile
        ```

    2. 指定位置参数值

        > 使用内置命令`set`给脚本指定位置设置参数的值

    3. 移动位置参数

        > 使用`shift`移动位置参数，`shift`的命令可让位置参数左移一位。

3. 函数库

    1. 自定义函数库

    `source /PATH/TO/LIB` 加载函数库

    2. 函数库`/etc/init.d/function`简介

    3. 递归函数

        ```sh
        function factorial01(){
            local NUMBER=$1
            if [ $NUMBER -le 0 ]; then
                RES=1
            else
                factorial01 $((NUMBER-1))
                TEMP=$RES
                NUMBER=$NUMBER
                RES=$((NUMBER*TEMP))
            fi
        }
        factorial01 $1
        echo $RES
        ```

### 重定向

1. 重定向简介

    1. 基本概念

    2. 文件标识符和标准输入输出

2. I/O重定向

    1. I/O重定向符号和用法

        | 符号 | 含义 |
        |------|------|
        | `>` | 标准输出覆盖重定向 |
        | `>>` | 标准输出追加重定向 |
        | `>&` | 标识输出重定向 |
        | `<` | 标准输入重定向 |
        | `|` | 管道 |

    2. 使用`exec`

        | 命令 | 说明 |
        |------|------|
        | `exec <file` | 将file文件中的内容作为`exec`的标准输入 |
        | `exec >file` | 将file文件作为标准输出 |
        | `exec 3<file` | 指定文件标识符 |
        | `exec 3<&-` | 关闭文件标识符 |
        | `exec 3>file` | 将写入指定文件标识符的内容写入指定文件 |
        | `exec 4<&3` | 创建文件标识符3的拷贝4 |

    3. **here Document**

        格式为`<< delimiter`, `delimiter`是一个用于标注的“分隔符”。

### 脚本范例

1. [文件打成zip包](./code/file_to_zip.sh)


## 用到的命令

1. 通过**ssh**连接远程服务器

    ```bash
    [zerone@localhost ~]$ ssh root@192.168.56.5
    ```

2. 通过**scp**上传文件到服务器

    ```bash
    [zerone@localhost ~]$ scp ./test.txt test@192.168.56.5:test.txt
    ```

3. 通过**scp**下载文件到本地

    ```bash
    [zerone@localhost ~]$ scp test@192.168.56.5:test.txt  ./test.txt
    ```

4. 配置静态IP

    1. `cd /etc/sysconfig/network-scripts/`
    2. `vi ifcfg-eth1`
    3. 添加如下代码
        ```
        NM_CONTROLLED=yes
        ONBOOT=yes
        BOOTPROTO=static
        TYPE=Ethernet
        HWADDR=08:00:27:9B:FF:5A // MAC地址
        IPADDR=192.168.56.6 // IP地址
        NETMASK=255.255.255.0 // 子网掩码
        GATEWAY=192.168.56.1 // 网关
        ```
    4. 重启系统

5. 无法访问web服务器
    
    > CentOS7防火墙没有开启端口

    ```bash
    [root@localhost html]# firewall-cmd --permanent --add-port=80/tcp
    success
    [root@localhost html]# firewall-cmd --reload
    success
    ```

6. 端口占用

    `netstat  -anp | grep 8080`

7. 创建软链接

    `sudo ln -s /home/zerone/app/v/v /usr/local/bin/v`

8. 删除软链接

    `sudo rm /usr/local/bin/v`