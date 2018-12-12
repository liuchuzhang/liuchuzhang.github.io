===

标题: 计算浮点数
标签: javascript

===

浮点数的加减乘除 (网络收集，暂未发现计算错误的情况)

```javascript
/**
 * 浮点数相加
 * @param {*} a
 * @param {*} b
 */
export function addFloat(a, b) {
  var c, d, e
  try {
    c = a.toString().split('.')[1].length
  } catch (f) {
    c = 0
  }
  try {
    d = b.toString().split('.')[1].length
  } catch (f) {
    d = 0
  }
  return (
    (e = Math.pow(10, Math.max(c, d))), (mulFloat(a, e) + mulFloat(b, e)) / e
  )
}

/**
 * 浮点数相减
 * @param {*} a
 * @param {*} b
 */
export function subFloat(a, b) {
  var c, d, e
  try {
    c = a.toString().split('.')[1].length
  } catch (f) {
    c = 0
  }
  try {
    d = b.toString().split('.')[1].length
  } catch (f) {
    d = 0
  }
  return (
    (e = Math.pow(10, Math.max(c, d))), (mulFloat(a, e) - mulFloat(b, e)) / e
  )
}

/**
 * 浮点数相乘
 * @param {*} a
 * @param {*} b
 */
export function mulFloat(a, b) {
  var c = 0,
    d = a.toString(),
    e = b.toString()
  try {
    c += d.split('.')[1].length
  } catch (f) {}
  try {
    c += e.split('.')[1].length
  } catch (f) {}
  return (
    (Number(d.replace('.', '')) * Number(e.replace('.', ''))) / Math.pow(10, c)
  )
}

/**
 * 浮点数相除
 * @param {*} a
 * @param {*} b
 */
export function divFloat(a, b) {
  var c,
    d,
    e = 0,
    f = 0
  try {
    e = a.toString().split('.')[1].length
  } catch (g) {}
  try {
    f = b.toString().split('.')[1].length
  } catch (g) {}
  return (
    (c = Number(a.toString().replace('.', ''))),
    (d = Number(b.toString().replace('.', ''))),
    mulFloat(c / d, Math.pow(10, f - e))
  )
}

```
