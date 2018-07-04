# killport
Kill the application of the specified port；

## 1.api的功能

   能够方便的杀掉占用指定端口的所有进程，支持Windows和Mac平台，同时支持过滤指定应用的进程可以不被强制杀掉；

**注意**： 如有问题，欢迎PR。

## 2.安装

```bash
npm install killport --save
```

## 3.使用

```js
    let killport = require('killport');
    killport(8999, 'Electron').then(() => {
        //do sth
    }).catch(() => {
        //do sth
    })
```

## 4.License
[MIT License](https://github.com/qfight/Pucker)
