===

标题: 日常记录
标签: vue

===

## 记录

vue version:2.3.4 `this.$refs.input.focus()` 无效，最新版本无此问题。
```javascript
this.$nextTick( ()=> {
    this.$refs.input.focus()
})
```


