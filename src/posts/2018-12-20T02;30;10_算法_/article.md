===

标题: 算法
标签: javascript

===

## FizzBuzz

```js
const FizzBuzz = (start, end, cb) => {
  for (let i = start; i <= end; i++) {
    if (i % 3 === 0 && i % 5 === 0) {
      cb(0)
    } else if (i % 3 === 0) {
      cb(1)
    } else if (i % 5 === 0) {
      cb(2)
    } else {
      continue
    }
  }
}

FizzBuzz(1, 100, type => {
  switch (type) {
    case 0:
      console.log('FizzBuzz')
      break
    case 1:
      console.log('Fizz')
      break
    case 2:
      console.log('Buzz')
      break
    default:
      break
  }
})
```

## 二叉树的递归遍历方法

二叉树的一个例子

```js
{
    "ruleId":"",
    "name":"客户年龄大于20",
    "id":"root",
    "expression":"age>20",
    "yes":{
        "name":"客户年龄大于25",
        "id":"root-true",
        "expression":"age>25",
        "yes":{
            "name":"可贷金额为五万",
            "id":"root-true-true",
            "expression":"money = 50000"
        },
        "no":{
            "name":"可贷金额为三万",
            "id":"root-true-false",
            "expression":"money = 30000"
        }
    },
    "no":{
        "name":"客户年龄小于18",
        "id":"root-false",
        "expression":"age<18",
        "yes":{
            "name":"不可贷款",
            "id":"root-false-true",
            "expression":"money = 0"
        },
        "no":{
            "name":"可贷金额为一万",
            "id":"root-false-false",
            "expression":"money = 10000"
        }
    }
}
```

1. 先序遍历

```js
function preorder(data) {
  if (data) {
    console.log(data)
    preorder(data.yes)
    preorder(data.no)
  }
}
```

2. 中序遍历

```js
function preorder(data) {
  if (data) {
    preorder(data.yes)
    console.log(data)
    preorder(data.no)
  }
}
```

3. 后序遍历

```js
function preorder(data) {
  if (data) {
    preorder(data.yes)
    preorder(data.no)
    console.log(data)
  }
}
```

## 遍历树状结构

```js
const data = [
  {
    name: '中国',
    children: [
      {
        name: '教第三节课'
      },
      {
        name: '教呼呼',
        children: [
          {
            name: '大一',
            children: [
              {
                name: '课程1',
                children: [
                  {
                    name: '1231'
                  },
                  {
                    name: '121'
                  }
                ]
              },
              {
                name: '课程2',
                children: [
                  {
                    name: '1232'
                  },
                  {
                    name: '122'
                  }
                ]
              },
              {
                name: '课程3',
                children: [
                  {
                    name: '1233'
                  },
                  {
                    name: '123'
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        name: '活动',
        children: null
      }
    ]
  }
]

getArray(data, '活动')
function getArray(data, name) {
  for (var i in data) {
    console.log('i', i)
    console.log('datai', data[i].children)
    if (data[i].name == name) {
      console.log(data[i])
      break
    } else {
      getArray(data[i].children, name)
    }
  }
}
```
