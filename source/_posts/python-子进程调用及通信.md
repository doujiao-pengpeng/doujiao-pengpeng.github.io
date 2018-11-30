---
title: python 子进程调用及通信
date: 2018-11-29 12:57:34
tags: python
---
在使用python写后台接口时，需要使用grep类似的系统调用。想到的是使用子进程的方式，但是调用命令很容易，但是还需要研究下，怎么讲子进程的输入输出以及错误能够完美地和python进行结合。
ps: python 2.7环境

## subprocess模块
官方文档：[subprocess](https://docs.python.org/2/library/subprocess.html)
> 这个模块允许我们创建新的进程，连接它们的输入/输出/错误 管道（pipe），并获得返回码。

有两种方式使用该模块：
1. 使用常见函数 call(), check_all(), check_output()
2. 使用Popen 类和communicate()方法。

这里仅研究第二种

## Popen类
suprocess主要通过Popen类管理进程（创建、管理），来满足便捷函数不能满足的功能。
```python
class subprocess.Popen(args, bufsize=0, executable=None,
  stdin=None, stdout=None, stderr=None, preexec_fn=None,
  close_fds=False, shell=False, cwd=None, env=None,
  universal_newlines=False, startupinfo=None, creationflags=0)

# args: 数组（推荐）或者是字符串。如果是数组默认执行数组第一个参数，如果是字符串默认使用平台默认shell解释器。
# shell： 默认false,表示是否使用shell作为程序执行,如果为true，args推荐使用string
# bufsize: 同样作为一个参数，0：无 1： line buffer, 其它正值：给定大小 负值: 系统默认。
# executable: 指定执行程序，shell为false时，替换args第一个参数，但是仍然传递，可以作显示实际执行的程序名的作用，shell为true，替换默认的/bin/sh
# stdin, stdout and stderr: 分别指定执行程序的标准输入输出，错误处理。有效值：pipe,有效文件描述符，有效文件对象，none.
```


### Popen实例方法

#### Popen.poll()
检查子进程是否终止，设置并返回`returncode`

#### Popen.wait()
等待子进程终止，设置并返回`returncode`

#### Popen.communicate(input=None)
与子进程交互: 向stdin发送数据, 从stdout/stderr读取数据，直到文件尾, 并等待子进程终止。
输入：input应该是一个要发送给子进程的字符串或none
输出：返回一个turple(stdoutdata, stderrdata)
**注意**：
1. 如果想要读取或者发送数据, 需要在创建子进程时指定stdin=PIPE、stdout=PIPE、stderr=PIPE
2. 数据都是存放在内存buffer中的，数据过大时不要使用这个方法

#### Popen.send_signal(signal)
发送`signal`信号给子进程

#### Popen.terminate()
终止子进程

#### Popen.kill()
杀死子进程

### Popen实例属性
#### Popen.stdin
如果stdin参数是pipe,该属性将是表示数据的文件对象,否则为None

#### Popen.stdout Popen.stderr
同上

#### Popen.pid
子进程pid

#### Popen.returncode
子进程的返回码，由 poll() and wait() 设置，间接由communicate设置。None表示子进程还没有结束，
-N表示子进程通过`singal`结束
