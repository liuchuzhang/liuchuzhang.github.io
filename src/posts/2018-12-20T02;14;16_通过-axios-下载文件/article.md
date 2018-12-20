===

标题: 通过 axios 下载文件
标签: download

===

```js
function downExcel(id) {
  // 设置请求响应类型为blob
  return axios.post(URL, { id }, { responseType: 'blob' }).then(res => res.data)
}

class Download {
  async downloadJs(id) {
    let data = await downExcel(id)
    if (data.size < 1) {
      //下载错误没有可导出的数据
      return false
    }
    const blob = new Blob([data])
    if (window.navigator.msSaveOrOpenBlob) {
      //IE浏览器
      navigator.msSaveBlob(blob, 'excel.xls')
    } else {
      const link = document.createElement('a')
      link.download = 'excel.xls' // 文件名
      link.style.display = 'none'
      link.href = URL.createObjectURL(blob)
      document.body.appendChild(link)
      link.click()
      setTimeout(() => document.body.removeChild(link))
    }
  }
}
```
