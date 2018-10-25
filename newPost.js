const fs = require('fs')
const path = require('path')
const inquirer = require('inquirer')
const moment = require('moment')
const sample = require('./sample.json')
var fsex = require('fs-extra')

const prompt = [
  {
    type: 'input',
    message: '请输入文章名(用于创建目录，仅限英文)',
    name: 'post_name',
    validate(val) {
      if (/(\.|\*|\?|\\|\/|:)/gi.test(val)) {
        return '文章名不得包含特殊符号（.*?\\/:），请重新输入'
      }

      if (/(([A-z]+-)+)?[A-z]+/gi.test(val)) {
        return true
      }

      return '文章名不合法，请重新输入(不能以数字开头，长度不能大于 30 )'
    },
    filter: val => val.replace(/\s+/gi, '-')
  },
  {
    type: 'input',
    message: '请输入创建时间(输入格式： `2018-01-01T11;11;11` 时分秒用 `;` 隔开，回车键默认当前时间):',
    name: 'create_time',
    validate(val) {
      if (/\d{4}-\d\d-\d\dT\d\d;\d\d;\d\d/gi.test(val)) {
        return true
      }

      return '时间格式不合法，请重新输入'
    },
    default() {
      return moment().format('YYYY-MM-DDThh;mm;ss')
    }
  }
]

inquirer
  .prompt(prompt)
  .then(answers => {
    const { post_name, create_time } = answers
    //文章目录
    const dirPath = `src/posts/${create_time}_${post_name}/`
    if (fs.existsSync(path.resolve(dirPath))) {
      console.log('文章已存在!')
    } else {
      //创建文章目录
      fs.mkdirSync(path.resolve(dirPath))
      //写入md
      fs.writeFileSync(path.resolve(`${dirPath}article.md`), sample.md, 'utf-8')
      //复制写入图片
      fsex.copy(sample.image, `${dirPath}image.jpg`, function(err) {
        if (err) return console.error(err)
        console.log(`创建文章成功！路径:${dirPath}。打包命令：\`yarn post-pack\``)
      })

      //写入图片
      //   const readerStream = fs.createReadStream(sample.image)
      //   const writeStream = fs.createWriteStream(`${dirPath}image.jpg`)
      //   readerStream.on('data', function(chunk) {
      //     writeStream.write(chunk)
      //   })
      //   readerStream.on('end', function() {
      //     writeStream.end()
      //     console.log(`创建文章成功！路径:${dirPath}`)
      //   })
    }
  })
  .catch(err => {
    console.log(err)
    console.log('文章目录创建失败')
  })
