const fs = require('fs')
const path = require('path')
fs.readFile(path.join(__dirname, 'goods.json'), 'utf8', function (err, data) {
  if (err) console.log(err)
  let newData = JSON.parse(data)
  let i = 0
  let pushData = []
  newData.RECORDS.map(function (value, index) {
    if (value.IMAGE1 != null) {
      i++
      //   console.log(value.NAME)
      pushData.push(value)
    }
  })
  console.log(i)
  //   console.log(pushData)
  fs.writeFile(path.join(__dirname, 'newGoods.json'), JSON.stringify(pushData), function (err) {
    if (err) console.log('写文件操作失败')
    else console.log('写文件操作成功')
  })
})
