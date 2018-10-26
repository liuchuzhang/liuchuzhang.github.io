===

标题: 第二篇
标签: test,markdown,yarn,npm

===

## 第二篇

### 记录无缘无故 `yarn install` 网络连接的问题

安装依赖

```
$ yarn install
yarn install v1.10.1
info No lockfile found.
[1/4] Resolving packages...
[2/4] Fetching packages...
info There appears to be trouble with your network connection. Retrying...
info There appears to be trouble with your network connection. Retrying...
info There appears to be trouble with your network connection. Retrying...
info There appears to be trouble with your network connection. Retrying...
```


平时可以正常安装的今天突然就安装不上了。 
之前遇到过这样的问题原因是因为安装 node sass 。
要装依赖的这个项目没有 node sass 。上百度寻找解决办法无果，这类问题很少。

Google 上找到解决，需要要删掉 yarn 和 npm 的代理。

输入命令

```shell
yarn config delete proxy
npm config rm proxy
npm config rm https-proxy
yarn config delete https-proxy
```