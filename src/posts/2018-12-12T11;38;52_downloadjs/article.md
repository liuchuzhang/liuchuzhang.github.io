===

标题: 下载二进制文件
标签: download,javascript

===

## 在 IE 下 `download` 属性无效。

使用 [downloadjs](https://github.com/rndme/download)
 安装 `npm install downloadjs` 后导入
```js
const url = 'http:// ... /abc.jpg'
let xhr
if (window.XMLHttpRequest) {
    // code for IE7+, Firefox, Chrome, Opera, Safari
    xhr = new XMLHttpRequest()
} else {
    // code for IE6, IE5
    xhr = new ActiveXObject('Microsoft.XMLHTTP')
}
xhr.open('GET', url, true)
xhr.responseType = 'blob'
xhr.onload = function(e) {
    // fileName：下载的文件名 
    // 参数3：.xlsx 对应的 Mime-Type
    download(e.target.response, fileName, fileMime['.xlsx'])
}
xhr.send()

// url直接下载（不可给文件名）
download(url)
```

常用 Content-Type(Mime-Type)  [更多](http://tool.oschina.net/commons)

```js
export default {
  '.xls': 'application/vnd.ms-excel',
  '.xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
  '.docx':'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  '.doc':'application/msword'
}
```
